import { Card } from '../ui/card';
import { IndustryWorkflowGraph } from '../IndustryWorkflowGraph';
import { useLanguage } from '../../contexts/LanguageContext';

interface IndustryExample {
  id: 'marketing' | 'ecommerce' | 'recruiting';
  titleKey: string;
  subtitleKey: string;
  descriptionKey: string;
}

export function IndustryExamplesSection() {
  const { t } = useLanguage();

  const industries: IndustryExample[] = [
    {
      id: 'marketing',
      titleKey: 'marketingTitle',
      subtitleKey: 'marketingSubtitle',
      descriptionKey: 'marketingDescription'
    },
    {
      id: 'ecommerce',
      titleKey: 'ecommerceTitle',
      subtitleKey: 'ecommerceSubtitle',
      descriptionKey: 'ecommerceDescription'
    },
    {
      id: 'recruiting',
      titleKey: 'recruitingTitle',
      subtitleKey: 'recruitingSubtitle',
      descriptionKey: 'recruitingDescription'
    }
  ];

  return (
    <section className="max-w-6xl mx-auto px-6 py-20">
      <header className="text-center mb-16">
        <h2 className="text-3xl font-bold mb-6 text-timberwolf">
          {t("industryTitle")}
        </h2>
        <p className="text-lg text-timberwolf font-mono max-w-3xl mx-auto">
          {t("industryDescription")}
        </p>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
        {industries.map((industry) => (
          <IndustryCard
            key={industry.id}
            industry={industry}
            t={t}
          />
        ))}
      </div>
    </section>
  );
}

interface IndustryCardProps {
  industry: IndustryExample;
  t: (key: string) => string;
}

function IndustryCard({ industry, t }: IndustryCardProps) {
  return (
    <Card className="p-8 bg-eerie-black border border-timberwolf hover:border-jonquil transition-all duration-300 hover:shadow-xl">
      <header className="mb-6">
        <h3 className="text-lg font-bold text-timberwolf font-mono">
          {t(industry.titleKey)}
        </h3>
        <p className="text-sm text-timberwolf font-mono opacity-75">
          {t(industry.subtitleKey)}
        </p>
      </header>

      <IndustryWorkflowGraph industry={industry.id} className="mb-6" />

      <p className="text-sm font-mono text-timberwolf leading-relaxed">
        {t(industry.descriptionKey)}
      </p>
    </Card>
  );
}