import { Link } from 'react-router-dom';
import { Zap, BookOpen, Mail } from 'lucide-react';
import { Button } from '../ui/button';
import { LanguageToggle } from './LanguageToggle';

interface HeaderProps {
  showBackButton?: boolean;
  title?: string;
  subtitle?: string;
}

export function Header({ title, subtitle }: HeaderProps) {
  return (
    <header className="border-b border-jet">
      <div className="max-w-6xl mx-auto px-6 py-8">
        <div className="flex items-center justify-between mb-8 flex-wrap gap-4">
          <Link to="/" className="flex items-center gap-3">
            <div className="w-8 h-8 bg-jonquil rounded-lg flex items-center justify-center">
              <Zap className="w-4 h-4 text-eerie-black" />
            </div>
            <span className="text-xl font-bold font-mono text-timberwolf">
              Bitlads Software
            </span>
          </Link>
          
          <div className="flex items-center gap-4">
            <nav className="hidden md:flex items-center gap-4">
              <Link to="/blog">
                <Button variant="ghost" className="text-timberwolf hover:text-aureolin font-mono">
                  <BookOpen className="w-4 h-4 mr-2" />
                  Blog
                </Button>
              </Link>
              <Link to="/contact">
                <Button variant="ghost" className="text-timberwolf hover:text-aureolin font-mono">
                  <Mail className="w-4 h-4 mr-2" />
                  Contact
                </Button>
              </Link>
            </nav>
            
            <LanguageToggle />
          </div>
        </div>

        {(title || subtitle) && (
          <div className="max-w-3xl">
            {title && (
              <h1 className="text-4xl md:text-5xl font-bold mb-4 text-timberwolf">
                {title}
              </h1>
            )}
            {subtitle && (
              <p className="text-lg text-timberwolf font-mono">
                {subtitle}
              </p>
            )}
          </div>
        )}
      </div>
    </header>
  );
}