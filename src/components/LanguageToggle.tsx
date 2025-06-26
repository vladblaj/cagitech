import { Button } from './ui/button';
import { useLanguage } from '../contexts/LanguageContext';
import { Globe } from 'lucide-react';

export function LanguageToggle() {
  const { language, setLanguage } = useLanguage();

  return (
    <div className="flex items-center gap-2 bg-timberwolf dark:bg-jet rounded-lg p-2 border border-timberwolf dark:border-jet">
      <Globe className="w-4 h-4 text-eerie-black dark:text-timberwolf" />
      <Button
        variant={language === 'en' ? 'default' : 'ghost'}
        size="sm"
        onClick={() => setLanguage('en')}
        className={`rounded-lg font-mono text-xs px-3 transition-all duration-200 ${
          language === 'en' 
            ? 'bg-jonquil hover:bg-aureolin text-eerie-black' 
            : 'hover:bg-aureolin/20 text-eerie-black dark:text-timberwolf'
        }`}
      >
        EN
      </Button>
      <Button
        variant={language === 'ro' ? 'default' : 'ghost'}
        size="sm"
        onClick={() => setLanguage('ro')}
        className={`rounded-lg font-mono text-xs px-3 transition-all duration-200 ${
          language === 'ro' 
            ? 'bg-jonquil hover:bg-aureolin text-eerie-black' 
            : 'hover:bg-aureolin/20 text-eerie-black dark:text-timberwolf'
        }`}
      >
        RO
      </Button>
    </div>
  );
}