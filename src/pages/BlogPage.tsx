import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Header } from '../components/common/Header';
import { Footer } from '../components/common/Footer';
import { BlogCard } from '../components/BlogCard';
import { SEOHead } from '../components/SEOHead';
import { Button } from '../components/ui/button';
import { Badge } from '../components/ui/badge';
import { useBlogPosts } from '../hooks/useBlogPosts';
import { useLanguage } from '../contexts/LanguageContext';
import { Search, Filter, Loader2, BookOpen, TrendingUp } from 'lucide-react';

export default function BlogPage() {
  const { language } = useLanguage();
  const { posts, loading, error, getFeaturedPosts, getRegularPosts } = useBlogPosts();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedTag, setSelectedTag] = useState<string | null>(null);

  // Get all unique tags
  const allTags = Array.from(new Set(posts.flatMap(post => post.tags)));

  // Filter posts based on search and tag
  const filteredPosts = posts.filter(post => {
    const matchesSearch = post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         post.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesTag = !selectedTag || post.tags.includes(selectedTag);
    return matchesSearch && matchesTag;
  });

  const featuredPosts = getFeaturedPosts().filter(post => {
    const matchesSearch = post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         post.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesTag = !selectedTag || post.tags.includes(selectedTag);
    return matchesSearch && matchesTag;
  });

  const regularPosts = getRegularPosts().filter(post => {
    const matchesSearch = post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         post.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesTag = !selectedTag || post.tags.includes(selectedTag);
    return matchesSearch && matchesTag;
  });

  if (loading) {
    return (
      <div className="min-h-screen bg-eerie-black">
        <Header />
        <div className="max-w-6xl mx-auto px-6 py-20">
          <div className="flex items-center justify-center">
            <Loader2 className="w-8 h-8 animate-spin text-jonquil" />
            <span className="ml-3 text-timberwolf font-mono">Loading blog posts...</span>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-eerie-black">
        <Header />
        <div className="max-w-6xl mx-auto px-6 py-20">
          <div className="text-center">
            <p className="text-red-400 font-mono mb-4">{error}</p>
            <Link to="/">
              <Button className="bg-jonquil hover:bg-aureolin text-eerie-black font-mono">
                Return Home
              </Button>
            </Link>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-eerie-black">
      <SEOHead
        title={language === 'en' 
          ? "Automation Blog | Workflow Tips, Insights & Best Practices"
          : "Blog Automatizare | Sfaturi, Perspective și Cele Mai Bune Practici"
        }
        description={language === 'en'
          ? "Stay updated with the latest workflow automation trends, tips, and best practices. Learn how to optimize your business processes and increase efficiency."
          : "Rămâi la curent cu cele mai noi tendințe în automatizarea fluxurilor de lucru, sfaturi și cele mai bune practici. Învață cum să îți optimizezi procesele de afaceri."
        }
        keywords={language === 'en'
          ? "automation blog, workflow automation tips, business process optimization, automation best practices, workflow management insights"
          : "blog automatizare, sfaturi automatizare flux de lucru, optimizare procese de afaceri, cele mai bune practici automatizare"
        }
        canonical="https://www.bitladssoftware.com/blog"
      />

      <Header 
        title="Automation Insights & Best Practices"
        subtitle="Stay ahead with the latest trends, tips, and strategies in workflow automation"
      />

      <main className="max-w-6xl mx-auto px-6 py-12">
        {/* Blog Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          <div className="bg-jet/50 rounded-xl p-6 border border-jet">
            <div className="flex items-center gap-3 mb-2">
              <BookOpen className="w-5 h-5 text-jonquil" />
              <span className="text-sm font-mono text-timberwolf opacity-75">Total Posts</span>
            </div>
            <span className="text-2xl font-bold text-aureolin font-mono">{posts.length}</span>
          </div>
          
          <div className="bg-jet/50 rounded-xl p-6 border border-jet">
            <div className="flex items-center gap-3 mb-2">
              <TrendingUp className="w-5 h-5 text-jonquil" />
              <span className="text-sm font-mono text-timberwolf opacity-75">Featured</span>
            </div>
            <span className="text-2xl font-bold text-aureolin font-mono">{getFeaturedPosts().length}</span>
          </div>
          
          <div className="bg-jet/50 rounded-xl p-6 border border-jet">
            <div className="flex items-center gap-3 mb-2">
              <Filter className="w-5 h-5 text-jonquil" />
              <span className="text-sm font-mono text-timberwolf opacity-75">Categories</span>
            </div>
            <span className="text-2xl font-bold text-aureolin font-mono">{allTags.length}</span>
          </div>
        </div>

        {/* Search and Filter */}
        <div className="bg-jet/20 rounded-xl p-6 mb-12">
          <div className="flex flex-col lg:flex-row gap-6">
            {/* Search */}
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-timberwolf opacity-50" />
                <input
                  type="text"
                  placeholder="Search blog posts..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 bg-eerie-black border border-jet rounded-lg text-timberwolf font-mono focus:ring-2 focus:ring-jonquil focus:border-transparent"
                />
              </div>
            </div>

            {/* Tag Filter */}
            <div className="flex flex-wrap gap-2">
              <Button
                variant={selectedTag === null ? "default" : "outline"}
                size="sm"
                onClick={() => setSelectedTag(null)}
                className={`font-mono text-xs ${
                  selectedTag === null 
                    ? "bg-jonquil text-eerie-black" 
                    : "border-jet text-timberwolf hover:border-jonquil"
                }`}
              >
                All
              </Button>
              {allTags.map((tag) => (
                <Button
                  key={tag}
                  variant={selectedTag === tag ? "default" : "outline"}
                  size="sm"
                  onClick={() => setSelectedTag(tag)}
                  className={`font-mono text-xs ${
                    selectedTag === tag 
                      ? "bg-jonquil text-eerie-black" 
                      : "border-jet text-timberwolf hover:border-jonquil"
                  }`}
                >
                  {tag}
                </Button>
              ))}
            </div>
          </div>

          {/* Active Filters */}
          {(searchTerm || selectedTag) && (
            <div className="mt-4 pt-4 border-t border-jet">
              <div className="flex items-center gap-2 text-sm font-mono text-timberwolf">
                <span>Active filters:</span>
                {searchTerm && (
                  <Badge variant="outline" className="bg-aureolin/20 text-aureolin border-aureolin/30">
                    Search: "{searchTerm}"
                  </Badge>
                )}
                {selectedTag && (
                  <Badge variant="outline" className="bg-aureolin/20 text-aureolin border-aureolin/30">
                    Tag: {selectedTag}
                  </Badge>
                )}
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => {
                    setSearchTerm('');
                    setSelectedTag(null);
                  }}
                  className="text-xs text-timberwolf hover:text-aureolin"
                >
                  Clear all
                </Button>
              </div>
            </div>
          )}
        </div>

        {/* Results Count */}
        <div className="mb-8">
          <p className="text-sm font-mono text-timberwolf opacity-75">
            Showing {filteredPosts.length} of {posts.length} posts
          </p>
        </div>

        {/* Featured Posts */}
        {featuredPosts.length > 0 && (
          <section className="mb-16">
            <h2 className="text-2xl font-bold text-timberwolf mb-8 font-mono">Featured Posts</h2>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {featuredPosts.map((post) => (
                <BlogCard key={post.slug} post={post} featured />
              ))}
            </div>
          </section>
        )}

        {/* Regular Posts */}
        {regularPosts.length > 0 && (
          <section>
            <h2 className="text-2xl font-bold text-timberwolf mb-8 font-mono">
              {featuredPosts.length > 0 ? 'Latest Posts' : 'All Posts'}
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {regularPosts.map((post) => (
                <BlogCard key={post.slug} post={post} />
              ))}
            </div>
          </section>
        )}

        {/* No Results */}
        {filteredPosts.length === 0 && (
          <div className="text-center py-16">
            <div className="w-16 h-16 bg-aureolin/20 rounded-full flex items-center justify-center mx-auto mb-4">
              <Search className="w-8 h-8 text-aureolin" />
            </div>
            <h3 className="text-xl font-bold text-timberwolf mb-2 font-mono">No posts found</h3>
            <p className="text-timberwolf font-mono opacity-75 mb-6">
              Try adjusting your search terms or filters
            </p>
            <Button
              onClick={() => {
                setSearchTerm('');
                setSelectedTag(null);
              }}
              className="bg-jonquil hover:bg-aureolin text-eerie-black font-mono"
            >
              Clear Filters
            </Button>
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
}