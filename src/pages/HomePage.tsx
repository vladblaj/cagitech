import { SEOHead } from '../components/SEOHead';
import { Header } from '../components/common/Header';
import { Footer } from '../components/common/Footer';
import { HeroSection } from '../components/sections/HeroSection';
import { IndustryExamplesSection } from '../components/sections/IndustryExamplesSection';
import { IntegrationsSection } from '../components/sections/IntegrationsSection';
import { WorkflowsSection } from '../components/sections/WorkflowsSection';
import { useLanguage } from '../contexts/LanguageContext';

export default function HomePage() {
  const { language } = useLanguage();

  return (
    <div className="min-h-screen bg-eerie-black">
      <SEOHead
        title={
          language === "en"
            ? "Intelligent Workflow Automation Solutions | Business Process Optimization & Integration"
            : "Soluții Inteligente de Automatizare a proceselor de lucru | Optimizarea Proceselor de Afaceri"
        }
        description={
          language === "en"
            ? "Transform your business with intelligent workflow automation. Save 10+ hours weekly, reduce errors by 95%, and streamline operations with our interactive automation demos. Connect 400+ services including Slack, Gmail, Shopify, and more."
            : "Transformă-ți afacerea cu automatizarea inteligentă a fluxurilor de lucru. Economisește peste 10 ore săptămânal, reduce erorile cu 95% și eficientizează operațiunile cu demonstrații interactive."
        }
        keywords={
          language === "en"
            ? "workflow automation, business process automation, no-code automation, automation platform, workflow management, business automation, process optimization, API integration, slack automation, email automation, crm automation, marketing automation, sales automation, invoice automation, seo automation, ai chatbot, knowledge base automation"
            : "automatizare flux de lucru, automatizare procese de afaceri, automatizare fără cod, platformă automatizare, management flux de lucru, automatizare afaceri, optimizare procese, integrare API, automatizare slack, automatizare email, automatizare crm, automatizare marketing, automatizare vânzări"
        }
        canonical="https://www.bitladssoftware.com/"
      />

      <Header />
      
      <main>
        <HeroSection />
        <IndustryExamplesSection />
        <IntegrationsSection />
        <WorkflowsSection />
      </main>

      <Footer />
    </div>
  );
}