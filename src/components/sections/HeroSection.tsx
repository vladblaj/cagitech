import { Link } from 'react-router-dom';
import { ArrowRight, Target, Wand2, Mail } from 'lucide-react';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import { useLanguage } from '../../contexts/LanguageContext';

export function HeroSection() {
  const { t } = useLanguage();

  const badges = [
    { icon: Target, text: "Real-time Automation" },
    { icon: Wand2, text: "AI-Powered Workflows" },
    { icon: Mail, text: "Email Integration" }
  ];

  return (
    <section className="max-w-6xl mx-auto px-6 py-12">
      <div className="max-w-3xl">
        <h1 className="text-4xl md:text-6xl font-bold mb-6 text-timberwolf">
          {t("title")}
        </h1>
        
        <p className="text-lg text-timberwolf mb-8 font-mono">
          {t("subtitle")}
        </p>

        <div className="flex flex-wrap gap-3 mb-10">
          {badges.map(({ icon: Icon, text }, index) => (
            <Badge
              key={index}
              variant="secondary"
              className="px-4 py-2 bg-aureolin text-eerie-black font-mono"
            >
              <Icon className="w-4 h-4 mr-2" />
              {text}
            </Badge>
          ))}
        </div>

        <Link to="/contact">
          <Button
            size="lg"
            className="bg-jonquil hover:bg-aureolin text-eerie-black font-mono text-lg px-6 py-3 rounded-lg transition-colors"
          >
            {t("cta")}
            <ArrowRight className="w-5 h-5 ml-2" />
          </Button>
        </Link>
      </div>
    </section>
  );
}