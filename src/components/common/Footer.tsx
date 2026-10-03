import { Zap } from 'lucide-react';
import { Link } from 'react-router-dom';

export function Footer() {
  return (
    <footer className="border-t border-jet bg-jet">
      <div className="max-w-6xl mx-auto px-6 py-10 text-center">
        <div className="flex items-center justify-center gap-3 mb-6">
          <div className="w-6 h-6 bg-jonquil rounded-lg flex items-center justify-center">
            <Zap className="w-3 h-3 text-eerie-black" />
          </div>
          <span className="text-lg font-bold font-mono text-timberwolf">
            Bitlads Software
          </span>
        </div>
        <nav className="flex items-center justify-center gap-6 mb-6 flex-wrap">
          <Link
            to="/blog"
            className="text-timberwolf hover:text-aureolin font-mono text-sm"
          >
            Blog
          </Link>
          <Link
            to="/contact"
            className="text-timberwolf hover:text-aureolin font-mono text-sm"
          >
            Contact
          </Link>
        </nav>
        <p className="text-timberwolf font-mono text-sm">
          © 2025 Bagawhey Solutions S.R.L.
        </p>
      </div>
    </footer>
  );
}
