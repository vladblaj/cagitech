import { Link } from 'react-router-dom';
import { Zap } from 'lucide-react';
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
        <div className="flex items-center justify-between mb-8">
          <Link to="/" className="flex items-center gap-3">
            <div className="w-8 h-8 bg-jonquil rounded-lg flex items-center justify-center">
              <Zap className="w-4 h-4 text-eerie-black" />
            </div>
            <span className="text-xl font-bold font-mono text-timberwolf">
              Bitlads Software
            </span>
          </Link>
          <LanguageToggle />
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