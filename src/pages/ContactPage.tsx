import { Link } from 'react-router-dom';
import { useLanguage } from '../contexts/LanguageContext';
import { ContactForm } from '../components/ContactForm';
import { SEOHead } from '../components/SEOHead';
import { Button } from '../components/ui/button';
import { Card } from '../components/ui/card';
import { ArrowLeft, Zap, Phone, Mail, Clock } from 'lucide-react';
import { LanguageToggle } from '../components/common/LanguageToggle';

export default function ContactPage() { 
  const { t, language } = useLanguage();

  const contactInfo = [
    {
      icon: Phone,
      label: "Phone",
      value: t('contactPhoneNumber')
    },
    {
      icon: Mail,
      label: "Email", 
      value: t('contactEmailAddress')
    },
    {
      icon: Clock,
      label: "Hours",
      value: t('contactHours')
    }
  ];

  const benefits = [
    t('benefit1'),
    t('benefit2'),
    t('benefit3'),
    t('benefit4')
  ];

  return (
    <div className="min-h-screen bg-eerie-black">
      <SEOHead 
        title={language === 'en' 
          ? "Contact Bitlads Software | Get Started with Business Process Automation"
          : "Contact Bitlads Software | Începe cu Automatizarea Proceselor de Afaceri"
        }
        description={language === 'en'
          ? "Ready to transform your business with intelligent workflow automation? Contact our experts to discuss your automation needs. Free consultation available. Save 10+ hours weekly with intelligent automation."
          : "Pregătit să îți transformi afacerea cu automatizarea inteligentă a fluxurilor de lucru? Contactează experții noștri pentru a discuta nevoile tale de automatizare. Consultație gratuită disponibilă."
        }
        keywords={language === 'en'
          ? "contact workflow automation, automation consultation, business process automation expert, automation implementation services, automation consulting, workflow optimization contact"
          : "contact automatizare flux de lucru, consultație automatizare, expert automatizare procese de afaceri, servicii implementare automatizare, consultanță automatizare"
        }
        canonical="https://www.bitladssoftware.com/contact"
      />
      
      {/* Header */}
      <header className="border-b border-jet">
        <div className="max-w-6xl mx-auto px-6 py-8">
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-jonquil rounded-lg flex items-center justify-center">
                <Zap className="w-4 h-4 text-eerie-black" />
              </div>
              <span className="text-xl font-bold font-mono text-timberwolf">
                Bitlads Software
              </span>
            </div>
            <LanguageToggle />
          </div>

          <div className="flex items-center gap-4 mb-6">
            <Link to="/">
              <Button 
                variant="outline" 
                className="font-mono font-semibold border-2 border-jonquil bg-eerie-black text-timberwolf hover:bg-jonquil hover:text-eerie-black hover:border-aureolin transition-all duration-200 shadow-md hover:shadow-lg"
              >
                <ArrowLeft className="w-4 h-4 mr-2" />
                {t('backToHome')}
              </Button>
            </Link>
          </div>

          <div className="max-w-3xl">
            <h1 className="text-4xl md:text-5xl font-bold mb-4 text-timberwolf">
              {t('contactTitle')}
            </h1>
            <p className="text-lg text-timberwolf font-mono">
              {t('contactSubtitle')}
            </p>
          </div>
        </div>
      </header>

      {/* Contact Content */}
      <section className="max-w-6xl mx-auto px-6 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Contact Form */}
          <Card className="p-8 bg-eerie-black border border-jet">
            <ContactForm />
          </Card>

          {/* Contact Information */}
          <div className="space-y-8">
            <Card className="p-8 bg-aureolin border border-jonquil">
              <h3 className="text-2xl font-bold text-eerie-black mb-6 font-mono">
                {t('contactInfo')}
              </h3>
              
              <div className="space-y-6">
                {contactInfo.map(({ icon: Icon, label, value }, index) => (
                  <div key={index} className="flex items-start gap-4">
                    <div className="w-10 h-10 bg-eerie-black rounded-lg flex items-center justify-center shrink-0">
                      <Icon className="w-5 h-5 text-aureolin" />
                    </div>
                    <div>
                      <h4 className="font-mono font-semibold text-eerie-black mb-1">{label}</h4>
                      <p className="text-jet font-mono text-sm">{value}</p>
                    </div>
                  </div>
                ))}
              </div>
            </Card>

            {/* Benefits Card */}
            <Card className="p-8 bg-eerie-black border border-jet">
              <h3 className="text-xl font-bold text-timberwolf mb-4 font-mono">
                {t('whyChooseTitle')}
              </h3>
              <ul className="space-y-3 text-timberwolf font-mono text-sm">
                {benefits.map((benefit, index) => (
                  <li key={index} className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-jonquil rounded-full"></div>
                    {benefit}
                  </li>
                ))}
              </ul>
            </Card>
          </div>
        </div>
      </section>
    </div>
  );
}