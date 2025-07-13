import { Link } from 'react-router-dom';
import { Calendar, User, Tag, ArrowRight } from 'lucide-react';
import { Card } from './ui/card';
import { Badge } from './ui/badge';
import { Button } from './ui/button';

interface BlogPost {
  slug: string;
  title: string;
  description: string;
  author: string;
  date: string;
  image?: string;
  tags: string[];
  featured: boolean;
}

interface BlogCardProps {
  post: BlogPost;
  featured?: boolean;
}

export function BlogCard({ post, featured = false }: BlogCardProps) {
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  return (
    <Card className={`group overflow-hidden bg-eerie-black border border-jet hover:border-jonquil transition-all duration-300 hover:shadow-xl ${featured ? 'lg:col-span-2' : ''}`}>
      {/* Featured Image */}
      {post.image && (
        <div className="aspect-video overflow-hidden">
          <img 
            src={post.image} 
            alt={post.title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          />
        </div>
      )}
      
      <div className="p-6">
        {/* Tags */}
        <div className="flex flex-wrap gap-2 mb-4">
          {post.tags.slice(0, 3).map((tag) => (
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
        <h3 className={`font-bold text-timberwolf mb-3 group-hover:text-aureolin transition-colors ${featured ? 'text-2xl' : 'text-xl'}`}>
          <Link to={`/blog/${post.slug}`} className="hover:underline">
            {post.title}
          </Link>
        </h3>

        {/* Description */}
        <p className={`text-timberwolf font-mono opacity-80 mb-4 leading-relaxed ${featured ? 'text-base' : 'text-sm'}`}>
          {post.description}
        </p>

        {/* Meta Information */}
        <div className="flex items-center gap-4 text-xs font-mono text-timberwolf opacity-60 mb-4">
          <div className="flex items-center gap-1">
            <User className="w-3 h-3" />
            {post.author}
          </div>
          <div className="flex items-center gap-1">
            <Calendar className="w-3 h-3" />
            {formatDate(post.date)}
          </div>
        </div>

        {/* Read More Button */}
        <Link to={`/blog/${post.slug}`}>
          <Button 
            variant="outline"
            className="w-full font-mono font-semibold border-2 border-jet hover:border-jonquil hover:bg-jonquil hover:text-eerie-black text-timberwolf bg-eerie-black transition-all duration-200 group"
          >
            Read More
            <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
          </Button>
        </Link>
      </div>
    </Card>
  );
}