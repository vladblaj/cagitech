import { useParams, Link, Navigate } from 'react-router-dom';
import { Header } from '../components/common/Header';
import { Footer } from '../components/common/Footer';
import { SEOHead } from '../components/SEOHead';
import { Button } from '../components/ui/button';
import { Badge } from '../components/ui/badge';
import { useBlogPosts } from '../hooks/useBlogPosts';
import { useLanguage } from '../contexts/LanguageContext';
import { ArrowLeft, Calendar, User, Tag, Share2, Clock, Loader2 } from 'lucide-react';
import ReactMarkdown from 'react-markdown';

export default function BlogPostPage() {
  const { slug } = useParams<{ slug: string }>();
  const { getPostBySlug, loading, error } = useBlogPosts();

  if (loading) {
    return (
      <div className="min-h-screen bg-eerie-black">
        <Header />
        <div className="max-w-4xl mx-auto px-6 py-20">
          <div className="flex items-center justify-center">
            <Loader2 className="w-8 h-8 animate-spin text-jonquil" />
            <span className="ml-3 text-timberwolf font-mono">Loading blog post...</span>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  if (error || !slug) {
    return <Navigate to="/blog" replace />;
  }

  const post = getPostBySlug(slug);

  if (!post) {
    return <Navigate to="/blog" replace />;
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const estimatedReadTime = Math.ceil(post.content.split(' ').length / 200);

  const handleShare = async () => {
    const shareData = {
      title: post.title,
      text: post.description,
      url: window.location.href,
    };

    // Check if Web Share API is supported
    if (navigator.share && navigator.canShare && navigator.canShare(shareData)) {
      try {
        await navigator.share(shareData);
      } catch (err) {
        // User cancelled or error occurred, fallback to clipboard
        fallbackShare();
      }
    } else {
      // Fallback for browsers without Web Share API
      fallbackShare();
    }
  };

  const fallbackShare = async () => {
    try {
      await navigator.clipboard.writeText(window.location.href);
      // You could add a toast notification here
      alert('Link copied to clipboard!');
    } catch (err) {
      // Final fallback: show share dialog with URL
      if (window.prompt) {
        window.prompt('Copy this link to share:', window.location.href);
      } else {
        console.log('Share failed:', err);
      }
    }
  };

  return (
    <div className="min-h-screen bg-eerie-black">
      <SEOHead
        title={`${post.title} | Bitlads Software Blog`}
        description={post.description}
        keywords={post.tags.join(', ')}
        canonical={`https://www.bitladssoftware.com/blog/${post.slug}`}
        ogType="article"
      />

      <Header />

      <main className="max-w-4xl mx-auto px-6 py-12">
        {/* Back Button */}
        <div className="mb-8">
          <Link to="/blog">
            <Button 
              variant="outline" 
              className="font-mono font-semibold border-2 border-jonquil bg-eerie-black text-timberwolf hover:bg-jonquil hover:text-eerie-black hover:border-aureolin transition-all duration-200"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Blog
            </Button>
          </Link>
        </div>

        {/* Article Header */}
        <header className="mb-12">
          {/* Tags */}
          <div className="flex flex-wrap gap-2 mb-6">
            {post.tags.map((tag) => (
              <Badge 
                key={tag}
                variant="secondary" 
                className="bg-aureolin/20 text-aureolin border-aureolin/30 font-mono text-xs"
              >
                <Tag className="w-3 h-3 mr-1" />
                {tag}
              </Badge>
            ))}
            {post.featured && (
              <Badge className="bg-jonquil text-eerie-black font-mono text-xs font-semibold">
                Featured
              </Badge>
            )}
          </div>

          {/* Title */}
          <h1 className="text-4xl md:text-5xl font-bold text-timberwolf mb-6 leading-tight">
            {post.title}
          </h1>

          {/* Description */}
          <p className="text-xl text-timberwolf font-mono opacity-80 mb-8 leading-relaxed">
            {post.description}
          </p>

          {/* Meta Information */}
          <div className="flex flex-wrap items-center gap-6 text-sm font-mono text-timberwolf opacity-60 mb-8">
            <div className="flex items-center gap-2">
              <User className="w-4 h-4" />
              {post.author}
            </div>
            <div className="flex items-center gap-2">
              <Calendar className="w-4 h-4" />
              {formatDate(post.date)}
            </div>
            <div className="flex items-center gap-2">
              <Clock className="w-4 h-4" />
              {estimatedReadTime} min read
            </div>
          </div>

          {/* Share Button */}
          <div className="flex items-center gap-4">
            <Button
              onClick={handleShare}
              variant="outline"
              className="font-mono font-semibold border-2 border-jet hover:border-jonquil hover:bg-jonquil hover:text-eerie-black text-timberwolf bg-eerie-black transition-all duration-200"
            >
              <Share2 className="w-4 h-4 mr-2" />
              Share
            </Button>
          </div>
        </header>

        {/* Featured Image */}
        {post.image && (
          <div className="mb-12">
            <img 
              src={post.image} 
              alt={post.title}
              className="w-full rounded-xl border border-jet"
            />
          </div>
        )}

        {/* Article Content */}
        <article className="prose prose-lg max-w-none">
          <div className="text-timberwolf font-mono leading-relaxed">
            <ReactMarkdown
              components={{
                h1: ({ children }) => (
                  <h1 className="text-3xl font-bold text-aureolin mb-6 mt-8 first:mt-0">{children}</h1>
                ),
                h2: ({ children }) => (
                  <h2 className="text-2xl font-bold text-aureolin mb-4 mt-8">{children}</h2>
                ),
                h3: ({ children }) => (
                  <h3 className="text-xl font-bold text-aureolin mb-3 mt-6">{children}</h3>
                ),
                p: ({ children }) => (
                  <p className="mb-4 leading-relaxed text-timberwolf">{children}</p>
                ),
                ul: ({ children }) => (
                  <ul className="mb-4 space-y-2 text-timberwolf">{children}</ul>
                ),
                ol: ({ children }) => (
                  <ol className="mb-4 space-y-2 text-timberwolf">{children}</ol>
                ),
                li: ({ children }) => (
                  <li className="flex items-start">
                    <span className="w-2 h-2 bg-jonquil rounded-full mt-2 mr-3 shrink-0"></span>
                    <span>{children}</span>
                  </li>
                ),
                blockquote: ({ children }) => (
                  <blockquote className="border-l-4 border-jonquil pl-6 py-2 my-6 bg-aureolin/10 rounded-r-lg">
                    <div className="text-timberwolf italic">{children}</div>
                  </blockquote>
                ),
                code: ({ children }) => (
                  <code className="bg-jet px-2 py-1 rounded text-aureolin font-mono text-sm">
                    {children}
                  </code>
                ),
                pre: ({ children }) => (
                  <pre className="bg-jet p-4 rounded-lg overflow-x-auto mb-4 border border-jet">
                    <code className="text-aureolin font-mono text-sm">{children}</code>
                  </pre>
                ),
                a: ({ href, children }) => (
                  <a 
                    href={href} 
                    className="text-jonquil hover:text-aureolin underline transition-colors"
                    target={href?.startsWith('http') ? '_blank' : undefined}
                    rel={href?.startsWith('http') ? 'noopener noreferrer' : undefined}
                  >
                    {children}
                  </a>
                ),
                strong: ({ children }) => (
                  <strong className="text-aureolin font-semibold">{children}</strong>
                ),
                em: ({ children }) => (
                  <em className="text-aureolin italic">{children}</em>
                ),
              }}
            >
              {post.content}
            </ReactMarkdown>
          </div>
        </article>

        {/* Article Footer */}
        <footer className="mt-16 pt-8 border-t border-jet">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="text-center md:text-left">
              <p className="text-timberwolf font-mono text-sm opacity-75 mb-2">
                Published by {post.author}
              </p>
              <p className="text-timberwolf font-mono text-xs opacity-60">
                {formatDate(post.date)}
              </p>
            </div>

            <div className="flex items-center gap-4">
              <Button
                onClick={handleShare}
                variant="outline"
                className="font-mono font-semibold border-2 border-jet hover:border-jonquil hover:bg-jonquil hover:text-eerie-black text-timberwolf bg-eerie-black transition-all duration-200"
              >
                <Share2 className="w-4 h-4 mr-2" />
                Share Article
              </Button>

              <Link to="/contact">
                <Button className="bg-jonquil hover:bg-aureolin text-eerie-black font-mono font-semibold">
                  Get Started
                </Button>
              </Link>
            </div>
          </div>
        </footer>
      </main>

      <Footer />
    </div>
  );
}