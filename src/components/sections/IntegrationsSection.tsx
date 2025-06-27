import { useState } from 'react';
import { 
  Plus, 
  ChevronDown, 
  ChevronRight,
  Slack,
  Mail,
  Github,
  ShoppingCart,
  CreditCard,
  FileSpreadsheet,
  Bot,
  Webhook,
  Users,
  MessageSquare,
  Send,
  Cog,
  Target,
  Server,
  Cloud,
  Database,
  HardDrive,
  Globe,
  TrendingUp,
  BarChart3,
  PieChart,
  Activity,
  Cpu,
  Building,
  Image,
  FileText
} from 'lucide-react';
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from '../ui/collapsible';
import { useLanguage } from '../../contexts/LanguageContext';

interface Integration {
  name: string;
  icon: React.ReactNode;
  category?: string;
}

export function IntegrationsSection() {
  const { t } = useLanguage();
  const [isExpanded, setIsExpanded] = useState(false);

  const popularIntegrations: Integration[] = [
    { name: "Slack", icon: <Slack className="w-5 h-5" /> },
    { name: "Gmail", icon: <Mail className="w-5 h-5" /> },
    { name: "GitHub", icon: <Github className="w-5 h-5" /> },
    { name: "Shopify", icon: <ShoppingCart className="w-5 h-5" /> },
    { name: "Stripe", icon: <CreditCard className="w-5 h-5" /> },
    { name: "Google Sheets", icon: <FileSpreadsheet className="w-5 h-5" /> },
    { name: "OpenAI", icon: <Bot className="w-5 h-5" /> },
    { name: "Webhooks", icon: <Webhook className="w-5 h-5" /> },
  ];

  const allIntegrations: Integration[] = [
    // Communication & Collaboration
    { name: "Slack", icon: <Slack className="w-5 h-5" />, category: "Communication" },
    { name: "Microsoft Teams", icon: <Users className="w-5 h-5" />, category: "Communication" },
    { name: "Discord", icon: <MessageSquare className="w-5 h-5" />, category: "Communication" },
    { name: "Telegram", icon: <Send className="w-5 h-5" />, category: "Communication" },

    // Development & Code
    { name: "GitHub", icon: <Github className="w-5 h-5" />, category: "Development" },
    { name: "GitLab", icon: <Cog className="w-5 h-5" />, category: "Development" },
    { name: "Jira", icon: <Target className="w-5 h-5" />, category: "Development" },
    { name: "Jenkins", icon: <Server className="w-5 h-5" />, category: "Development" },

    // Email & Marketing
    { name: "Gmail", icon: <Mail className="w-5 h-5" />, category: "Email" },
    { name: "Outlook", icon: <Mail className="w-5 h-5" />, category: "Email" },
    { name: "Mailchimp", icon: <Send className="w-5 h-5" />, category: "Marketing" },
    { name: "SendGrid", icon: <Mail className="w-5 h-5" />, category: "Email" },

    // E-commerce & Payments
    { name: "Shopify", icon: <ShoppingCart className="w-5 h-5" />, category: "E-commerce" },
    { name: "WooCommerce", icon: <ShoppingCart className="w-5 h-5" />, category: "E-commerce" },
    { name: "Stripe", icon: <CreditCard className="w-5 h-5" />, category: "Payments" },
    { name: "PayPal", icon: <CreditCard className="w-5 h-5" />, category: "Payments" },

    // Cloud & Storage
    { name: "Google Drive", icon: <Cloud className="w-5 h-5" />, category: "Storage" },
    { name: "Dropbox", icon: <Cloud className="w-5 h-5" />, category: "Storage" },
    { name: "OneDrive", icon: <Cloud className="w-5 h-5" />, category: "Storage" },
    { name: "AWS S3", icon: <Server className="w-5 h-5" />, category: "Cloud" },

    // Productivity & Office
    { name: "Google Sheets", icon: <FileSpreadsheet className="w-5 h-5" />, category: "Productivity" },
    { name: "Microsoft Excel", icon: <FileSpreadsheet className="w-5 h-5" />, category: "Productivity" },
    { name: "Notion", icon: <FileText className="w-5 h-5" />, category: "Productivity" },
    { name: "Airtable", icon: <Database className="w-5 h-5" />, category: "Database" },

    // CRM & Sales
    { name: "Salesforce", icon: <Building className="w-5 h-5" />, category: "CRM" },
    { name: "HubSpot", icon: <TrendingUp className="w-5 h-5" />, category: "CRM" },
    { name: "Pipedrive", icon: <BarChart3 className="w-5 h-5" />, category: "CRM" },
    { name: "Zoho CRM", icon: <Users className="w-5 h-5" />, category: "CRM" },

    // Social Media
    { name: "Twitter", icon: <MessageSquare className="w-5 h-5" />, category: "Social" },
    { name: "LinkedIn", icon: <Users className="w-5 h-5" />, category: "Social" },
    { name: "Facebook", icon: <Users className="w-5 h-5" />, category: "Social" },
    { name: "Instagram", icon: <Image className="w-5 h-5" />, category: "Social" },

    // Analytics & Monitoring
    { name: "Google Analytics", icon: <BarChart3 className="w-5 h-5" />, category: "Analytics" },
    { name: "Mixpanel", icon: <PieChart className="w-5 h-5" />, category: "Analytics" },
    { name: "Datadog", icon: <Activity className="w-5 h-5" />, category: "Monitoring" },
    { name: "New Relic", icon: <Activity className="w-5 h-5" />, category: "Monitoring" },

    // AI & Machine Learning
    { name: "OpenAI", icon: <Bot className="w-5 h-5" />, category: "AI" },
    { name: "Anthropic", icon: <Bot className="w-5 h-5" />, category: "AI" },
    { name: "Google AI", icon: <Cpu className="w-5 h-5" />, category: "AI" },
    { name: "Azure AI", icon: <Bot className="w-5 h-5" />, category: "AI" },

    // Databases
    { name: "MySQL", icon: <Database className="w-5 h-5" />, category: "Database" },
    { name: "PostgreSQL", icon: <Database className="w-5 h-5" />, category: "Database" },
    { name: "MongoDB", icon: <Database className="w-5 h-5" />, category: "Database" },
    { name: "Redis", icon: <HardDrive className="w-5 h-5" />, category: "Database" },

    // Webhooks & APIs
    { name: "Webhooks", icon: <Webhook className="w-5 h-5" />, category: "Integration" },
    { name: "REST API", icon: <Globe className="w-5 h-5" />, category: "Integration" },
    { name: "GraphQL", icon: <Globe className="w-5 h-5" />, category: "Integration" },
    { name: "HTTP Request", icon: <Globe className="w-5 h-5" />, category: "Integration" },
  ];

  return (
    <section className="max-w-6xl mx-auto px-6 py-12 border-b border-jet">
      <div className="bg-jet/20 rounded-xl p-8">
        <Collapsible open={isExpanded} onOpenChange={setIsExpanded}>
          <header className="flex items-center justify-between mb-6">
            <div>
              <h3 className="text-lg font-bold text-timberwolf font-mono mb-1">
                {t("integrationsTitle")}
              </h3>
              <p className="text-sm text-timberwolf font-mono opacity-75">
                {t("integrationsSubtitle")}
              </p>
            </div>
          </header>

          {/* Popular integrations preview */}
          <div className="flex flex-wrap items-center gap-4 mb-6">
            {popularIntegrations.map((integration, index) => (
              <IntegrationItem key={index} integration={integration} />
            ))}

            <CollapsibleTrigger asChild>
              <button className="flex items-center gap-2 bg-aureolin hover:bg-jonquil rounded-lg px-4 py-3 transition-colors cursor-pointer">
                <Plus className="w-4 h-4 text-eerie-black" />
                <span className="text-sm font-mono font-semibold text-eerie-black">
                  {t("manyMore")}
                </span>
                {isExpanded ? (
                  <ChevronDown className="w-3 h-3 text-eerie-black" />
                ) : (
                  <ChevronRight className="w-3 h-3 text-eerie-black" />
                )}
              </button>
            </CollapsibleTrigger>
          </div>

          <CollapsibleContent className="mt-6">
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
              {allIntegrations.map((integration, index) => (
                <IntegrationCard key={index} integration={integration} />
              ))}
            </div>

            <div className="text-center mt-8 p-6 bg-aureolin/20 rounded-lg">
              <p className="text-sm font-mono text-timberwolf">
                <strong>{t("customIntegrations")}</strong>
              </p>
            </div>
          </CollapsibleContent>
        </Collapsible>
      </div>
    </section>
  );
}

interface IntegrationItemProps {
  integration: Integration;
}

function IntegrationItem({ integration }: IntegrationItemProps) {
  return (
    <div className="flex items-center gap-2 bg-eerie-black border border-timberwolf rounded-lg px-4 py-3 hover:border-jonquil transition-colors">
      <div className="text-timberwolf">
        {integration.icon}
      </div>
      <span className="text-sm font-mono text-timberwolf">
        {integration.name}
      </span>
    </div>
  );
}

interface IntegrationCardProps {
  integration: Integration;
}

function IntegrationCard({ integration }: IntegrationCardProps) {
  return (
    <div className="group bg-eerie-black border border-timberwolf rounded-lg p-4 hover:border-jonquil transition-all duration-200 hover:shadow-md">
      <div className="flex items-center gap-2">
        <div className="text-timberwolf group-hover:text-jonquil transition-colors">
          {integration.icon}
        </div>
        <div className="min-w-0 flex-1">
          <h4 className="text-xs font-mono font-semibold text-timberwolf truncate">
            {integration.name}
          </h4>
          {integration.category && (
            <span className="text-xs font-mono text-timberwolf opacity-60">
              {integration.category}
            </span>
          )}
        </div>
      </div>
    </div>
  );
}