import { useState, useEffect } from 'react';
import axios from 'axios';

export interface BlogPost {
  slug: string;
  title: string;
  description: string;
  author: string;
  date: string;
  image?: string;
  tags: string[];
  featured: boolean;
  content: string;
}

interface GitHubContent {
  name: string;
  path: string;
  sha: string;
  url: string; // Needed for fetching file content
}

export function useBlogPosts() {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadBlogPosts = async () => {
      try {
        setLoading(true);

        const response = await axios.get<GitHubContent[]>(
          'https://api.github.com/repos/vladblaj/cagitech/contents/content/blog'
        );

        if (!Array.isArray(response.data)) {
          throw new Error('Invalid response format from GitHub API');
        }

        const postsPromises = response.data.map(async (file) => {
          if (!file.name.endsWith('.md')) return null;

          const contentResponse = await axios.get(file.url);

          const encodedContent = contentResponse.data.content;
          // Properly decode base64 as UTF-8 to handle emojis and special characters
          const binary = atob(encodedContent);
          const bytes = Uint8Array.from(binary, c => c.charCodeAt(0));
          const decodedContent = new TextDecoder('utf-8').decode(bytes);

          const parts = decodedContent.split('---');
          if (parts.length < 3) {
            console.warn(`File ${file.name} missing frontmatter.`);
            return null;
          }

          const frontmatter = parts[1].trim();
          const body = parts.slice(2).join('---').trim();

          const metadata: Record<string, any> = {};
          frontmatter.split('\n').forEach((line) => {
            const [key, ...valueParts] = line.split(':');
            if (key && valueParts.length) {
              let value: string | string[] | boolean = valueParts.join(':').trim();
              if (value.startsWith('[') && value.endsWith(']')) {
                value = value.slice(1, -1).split(',').map((v) => v.trim());
              } else if (value === 'true' || value === 'false') {
                value = value === 'true';
              }
              metadata[key.trim()] = value;
            }
          });

          const slug = file.name.replace('.md', '');

          return {
            slug,
            title: metadata.title || '',
            description: metadata.description || '',
            author: metadata.author || 'Bitlads Software',
            date: metadata.date || new Date().toISOString(),
            image: metadata.image || '',
            tags: Array.isArray(metadata.tags) ? metadata.tags : [],
            featured: Boolean(metadata.featured),
            content: body
          } as BlogPost;
        });

        const resolvedPosts = (await Promise.all(postsPromises))
          .filter((post): post is BlogPost => post !== null)
          .sort(
            (a, b) =>
              new Date(b.date).getTime() - new Date(a.date).getTime()
          );

        setPosts(resolvedPosts);
      } catch (err) {
        console.error('Error loading blog posts:', err);
        setError('Failed to load blog posts');
      } finally {
        setLoading(false);
      }
    };

    loadBlogPosts();
  }, []);

  const getFeaturedPosts = () => posts.filter((post) => post.featured);
  const getRegularPosts = () => posts.filter((post) => !post.featured);
  const getPostBySlug = (slug: string) =>
    posts.find((post) => post.slug === slug);

  return {
    posts,
    loading,
    error,
    getFeaturedPosts,
    getRegularPosts,
    getPostBySlug
  };
}
