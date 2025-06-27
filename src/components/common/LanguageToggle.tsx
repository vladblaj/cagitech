import { Button } from '../ui/button';
import { useLanguage } from '../../contexts/LanguageContext';
import { Globe } from 'lucide-react';

export function LanguageToggle() {
  const { language, setLanguage } = useLanguage();

  const buttonBaseClasses = "rounded-lg font-mono text-xs px-3 transition-all duration-200";
  const activeClasses = "bg-jonquil hover:bg-aureolin text-eerie-black";
  const inactiveClasses = "hover:bg-aureolin/20 text-timberwolf";

  return (
    <div className="flex items-center gap-2 bg-jet rounded-lg p-2 border border-jet">
      <Globe className="w-4 h-4 text-timberwolf" />
      <Button
        variant={language === 'en' ? 'default' : 'ghost'}
        size="sm"
        onClick={() => setLanguage('en')}
        className={`${buttonBaseClasses} ${language === 'en' ? activeClasses : inactiveClasses}`}
      >
        EN
      </Button>
      <Button
        variant={language === 'ro' ? 'default' : 'ghost'}
        size="sm"
        onClick={() => setLanguage('ro')}
        className={`${buttonBaseClasses} ${language === 'ro' ? activeClasses : inactiveClasses}`}
      >
        RO
      </Button>
    </div>
  );
}