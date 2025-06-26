import { useState } from "react";
import { Link } from "react-router-dom";
import { useLanguage } from "../contexts/LanguageContext";
import { WorkflowDemo } from "../components/WorkflowDemo";
import { IndustryWorkflowGraph } from "../components/IndustryWorkflowGraph";
import { LanguageToggle } from "../components/LanguageToggle";
import { SEOHead } from "../components/SEOHead";
import { Button } from "../components/ui/button";
import { Badge } from "../components/ui/badge";
import { Card } from "../components/ui/card";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "../components/ui/collapsible";
import {
  ArrowRight,
  Zap,
  Cog,
  Target,
  Mail,
  Clock,
  FileSpreadsheet,
  Globe,
  MessageSquare,
  Bot,
  FileText,
  Send,
  Database,
  Slack,
  Github,
  ShoppingCart,
  CreditCard,
  Users,
  Building,
  Webhook,
  Cloud,
  Server,
  Image,
  TrendingUp,
  BarChart3,
  PieChart,
  Activity,
  Cpu,
  HardDrive,
  Plus,
  ChevronDown,
  ChevronRight,
  Wand2,
} from "lucide-react";

export default function HomePage() {
  const { t, language } = useLanguage();
  const [integrationsExpanded, setIntegrationsExpanded] = useState(false);

  const getWorkflowsData = () => [
    {
      id: "seo-enrichment",
      title: t("workflow1Title"),
      description: t("workflow1Description"),
      businessValue: t("workflow1BusinessValue"),
      nodes: [
        {
          id: "cron",
          title: t("w1n1Title"),
          type: "trigger" as const,
          description: t("w1n1Description"),
          businessDescription: t("w1n1BusinessDescription"),
          input: t("w1n1Input"),
          output: t("w1n1Output"),
          whyItMatters: t("w1n1WhyItMatters"),
          icon: <Clock className="w-4 h-4" />,
        },
        {
          id: "excel",
          title: t("w1n2Title"),
          type: "action" as const,
          description: t("w1n2Description"),
          businessDescription: t("w1n2BusinessDescription"),
          input: t("w1n2Input"),
          output: t("w1n2Output"),
          whyItMatters: t("w1n2WhyItMatters"),
          icon: <FileSpreadsheet className="w-4 h-4" />,
        },
        {
          id: "http",
          title: t("w1n3Title"),
          type: "action" as const,
          description: t("w1n3Description"),
          businessDescription: t("w1n3BusinessDescription"),
          input: t("w1n3Input"),
          output: t("w1n3Output"),
          whyItMatters: t("w1n3WhyItMatters"),
          icon: <Globe className="w-4 h-4" />,
        },
        {
          id: "openai",
          title: t("w1n4Title"),
          type: "action" as const,
          description: t("w1n4Description"),
          businessDescription: t("w1n4BusinessDescription"),
          input: t("w1n4Input"),
          output: t("w1n4Output"),
          whyItMatters: t("w1n4WhyItMatters"),
          icon: <Bot className="w-4 h-4" />,
        },
        {
          id: "slack",
          title: t("w1n5Title"),
          type: "output" as const,
          description: t("w1n5Description"),
          businessDescription: t("w1n5BusinessDescription"),
          input: t("w1n5Input"),
          output: t("w1n5Output"),
          whyItMatters: t("w1n5WhyItMatters"),
          icon: <MessageSquare className="w-4 h-4" />,
        },
      ],
    },
    {
      id: "quote-invoice",
      title: t("workflow2Title"),
      description: t("workflow2Description"),
      businessValue: t("workflow2BusinessValue"),
      nodes: [
        {
          id: "webhook",
          title: t("w2n1Title"),
          type: "trigger" as const,
          description: t("w2n1Description"),
          businessDescription: t("w2n1BusinessDescription"),
          input: t("w2n1Input"),
          output: t("w2n1Output"),
          whyItMatters: t("w2n1WhyItMatters"),
          icon: <Zap className="w-4 h-4" />,
        },
        {
          id: "set",
          title: t("w2n2Title"),
          type: "action" as const,
          description: t("w2n2Description"),
          businessDescription: t("w2n2BusinessDescription"),
          input: t("w2n2Input"),
          output: t("w2n2Output"),
          whyItMatters: t("w2n2WhyItMatters"),
          icon: <Cog className="w-4 h-4" />,
        },
        {
          id: "document",
          title: t("w2n3Title"),
          type: "action" as const,
          description: t("w2n3Description"),
          businessDescription: t("w2n3BusinessDescription"),
          input: t("w2n3Input"),
          output: t("w2n3Output"),
          whyItMatters: t("w2n3WhyItMatters"),
          icon: <FileText className="w-4 h-4" />,
        },
        {
          id: "email",
          title: t("w2n4Title"),
          type: "action" as const,
          description: t("w2n4Description"),
          businessDescription: t("w2n4BusinessDescription"),
          input: t("w2n4Input"),
          output: t("w2n4Output"),
          whyItMatters: t("w2n4WhyItMatters"),
          icon: <Send className="w-4 h-4" />,
        },
        {
          id: "excel-log",
          title: t("w2n5Title"),
          type: "output" as const,
          description: t("w2n5Description"),
          businessDescription: t("w2n5BusinessDescription"),
          input: t("w2n5Input"),
          output: t("w2n5Output"),
          whyItMatters: t("w2n5WhyItMatters"),
          icon: <Database className="w-4 h-4" />,
        },
      ],
    },
    {
      id: "slack-bot",
      title: t("workflow3Title"),
      description: t("workflow3Description"),
      businessValue: t("workflow3BusinessValue"),
      nodes: [
        {
          id: "slack-trigger",
          title: t("w3n1Title"),
          type: "trigger" as const,
          description: t("w3n1Description"),
          businessDescription: t("w3n1BusinessDescription"),
          input: t("w3n1Input"),
          output: t("w3n1Output"),
          whyItMatters: t("w3n1WhyItMatters"),
          icon: <MessageSquare className="w-4 h-4" />,
        },
        {
          id: "function",
          title: t("w3n2Title"),
          type: "action" as const,
          description: t("w3n2Description"),
          businessDescription: t("w3n2BusinessDescription"),
          input: t("w3n2Input"),
          output: t("w3n2Output"),
          whyItMatters: t("w3n2WhyItMatters"),
          icon: <Database className="w-4 h-4" />,
        },
        {
          id: "openai-answer",
          title: t("w3n3Title"),
          type: "action" as const,
          description: t("w3n3Description"),
          businessDescription: t("w3n3BusinessDescription"),
          input: t("w3n3Input"),
          output: t("w3n3Output"),
          whyItMatters: t("w3n3WhyItMatters"),
          icon: <Bot className="w-4 h-4" />,
        },
        {
          id: "slack-post",
          title: t("w3n4Title"),
          type: "action" as const,
          description: t("w3n4Description"),
          businessDescription: t("w3n4BusinessDescription"),
          input: t("w3n4Input"),
          output: t("w3n4Output"),
          whyItMatters: t("w3n4WhyItMatters"),
          icon: <MessageSquare className="w-4 h-4" />,
        },
        {
          id: "excel-journal",
          title: t("w3n5Title"),
          type: "output" as const,
          description: t("w3n5Description"),
          businessDescription: t("w3n5BusinessDescription"),
          input: t("w3n5Input"),
          output: t("w3n5Output"),
          whyItMatters: t("w3n5WhyItMatters"),
          icon: <FileSpreadsheet className="w-4 h-4" />,
        },
      ],
    },
  ];

  // Popular integrations - showing only the most essential ones
  const popularIntegrations = [
    { name: "Slack", icon: <Slack className="w-5 h-5" /> },
    { name: "Gmail", icon: <Mail className="w-5 h-5" /> },
    { name: "GitHub", icon: <Github className="w-5 h-5" /> },
    { name: "Shopify", icon: <ShoppingCart className="w-5 h-5" /> },
    { name: "Stripe", icon: <CreditCard className="w-5 h-5" /> },
    { name: "Google Sheets", icon: <FileSpreadsheet className="w-5 h-5" /> },
    { name: "OpenAI", icon: <Bot className="w-5 h-5" /> },
    { name: "Webhooks", icon: <Webhook className="w-5 h-5" /> },
  ];

  const allIntegrations = [
    // Communication & Collaboration
    {
      name: "Slack",
      icon: <Slack className="w-5 h-5" />,
      category: "Communication",
    },
    {
      name: "Microsoft Teams",
      icon: <Users className="w-5 h-5" />,
      category: "Communication",
    },
    {
      name: "Discord",
      icon: <MessageSquare className="w-5 h-5" />,
      category: "Communication",
    },
    {
      name: "Telegram",
      icon: <Send className="w-5 h-5" />,
      category: "Communication",
    },

    // Development & Code
    {
      name: "GitHub",
      icon: <Github className="w-5 h-5" />,
      category: "Development",
    },
    {
      name: "GitLab",
      icon: <Cog className="w-5 h-5" />,
      category: "Development",
    },
    {
      name: "Jira",
      icon: <Target className="w-5 h-5" />,
      category: "Development",
    },
    {
      name: "Jenkins",
      icon: <Server className="w-5 h-5" />,
      category: "Development",
    },

    // Email & Marketing
    { name: "Gmail", icon: <Mail className="w-5 h-5" />, category: "Email" },
    { name: "Outlook", icon: <Mail className="w-5 h-5" />, category: "Email" },
    {
      name: "Mailchimp",
      icon: <Send className="w-5 h-5" />,
      category: "Marketing",
    },
    { name: "SendGrid", icon: <Mail className="w-5 h-5" />, category: "Email" },

    // E-commerce & Payments
    {
      name: "Shopify",
      icon: <ShoppingCart className="w-5 h-5" />,
      category: "E-commerce",
    },
    {
      name: "WooCommerce",
      icon: <ShoppingCart className="w-5 h-5" />,
      category: "E-commerce",
    },
    {
      name: "Stripe",
      icon: <CreditCard className="w-5 h-5" />,
      category: "Payments",
    },
    {
      name: "PayPal",
      icon: <CreditCard className="w-5 h-5" />,
      category: "Payments",
    },

    // Cloud & Storage
    {
      name: "Google Drive",
      icon: <Cloud className="w-5 h-5" />,
      category: "Storage",
    },
    {
      name: "Dropbox",
      icon: <Cloud className="w-5 h-5" />,
      category: "Storage",
    },
    {
      name: "OneDrive",
      icon: <Cloud className="w-5 h-5" />,
      category: "Storage",
    },
    { name: "AWS S3", icon: <Server className="w-5 h-5" />, category: "Cloud" },

    // Productivity & Office
    {
      name: "Google Sheets",
      icon: <FileSpreadsheet className="w-5 h-5" />,
      category: "Productivity",
    },
    {
      name: "Microsoft Excel",
      icon: <FileSpreadsheet className="w-5 h-5" />,
      category: "Productivity",
    },
    {
      name: "Notion",
      icon: <FileText className="w-5 h-5" />,
      category: "Productivity",
    },
    {
      name: "Airtable",
      icon: <Database className="w-5 h-5" />,
      category: "Database",
    },

    // CRM & Sales
    {
      name: "Salesforce",
      icon: <Building className="w-5 h-5" />,
      category: "CRM",
    },
    {
      name: "HubSpot",
      icon: <TrendingUp className="w-5 h-5" />,
      category: "CRM",
    },
    {
      name: "Pipedrive",
      icon: <BarChart3 className="w-5 h-5" />,
      category: "CRM",
    },
    { name: "Zoho CRM", icon: <Users className="w-5 h-5" />, category: "CRM" },

    // Social Media
    {
      name: "Twitter",
      icon: <MessageSquare className="w-5 h-5" />,
      category: "Social",
    },
    {
      name: "LinkedIn",
      icon: <Users className="w-5 h-5" />,
      category: "Social",
    },
    {
      name: "Facebook",
      icon: <Users className="w-5 h-5" />,
      category: "Social",
    },
    {
      name: "Instagram",
      icon: <Image className="w-5 h-5" />,
      category: "Social",
    },

    // Analytics & Monitoring
    {
      name: "Google Analytics",
      icon: <BarChart3 className="w-5 h-5" />,
      category: "Analytics",
    },
    {
      name: "Mixpanel",
      icon: <PieChart className="w-5 h-5" />,
      category: "Analytics",
    },
    {
      name: "Datadog",
      icon: <Activity className="w-5 h-5" />,
      category: "Monitoring",
    },
    {
      name: "New Relic",
      icon: <Activity className="w-5 h-5" />,
      category: "Monitoring",
    },

    // AI & Machine Learning
    { name: "OpenAI", icon: <Bot className="w-5 h-5" />, category: "AI" },
    { name: "Anthropic", icon: <Bot className="w-5 h-5" />, category: "AI" },
    { name: "Google AI", icon: <Cpu className="w-5 h-5" />, category: "AI" },
    { name: "Azure AI", icon: <Bot className="w-5 h-5" />, category: "AI" },

    // Databases
    {
      name: "MySQL",
      icon: <Database className="w-5 h-5" />,
      category: "Database",
    },
    {
      name: "PostgreSQL",
      icon: <Database className="w-5 h-5" />,
      category: "Database",
    },
    {
      name: "MongoDB",
      icon: <Database className="w-5 h-5" />,
      category: "Database",
    },
    {
      name: "Redis",
      icon: <HardDrive className="w-5 h-5" />,
      category: "Database",
    },

    // Webhooks & APIs
    {
      name: "Webhooks",
      icon: <Webhook className="w-5 h-5" />,
      category: "Integration",
    },
    {
      name: "REST API",
      icon: <Globe className="w-5 h-5" />,
      category: "Integration",
    },
    {
      name: "GraphQL",
      icon: <Globe className="w-5 h-5" />,
      category: "Integration",
    },
    {
      name: "HTTP Request",
      icon: <Globe className="w-5 h-5" />,
      category: "Integration",
    },
  ];

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

      {/* Header */}
      <header className="border-b border-timberwolf dark:border-jet">
        <div className="max-w-6xl mx-auto px-6 py-12">
          <div className="flex items-center justify-between mb-10">
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

          <div className="max-w-3xl">
            <h1 className="text-4xl md:text-6xl font-bold mb-6 text-timberwolf">
              {t("title")}
            </h1>
            <p className="text-lg text-jet dark:text-timberwolf mb-8 font-mono">
              {t("subtitle")}
            </p>

            <div className="flex flex-wrap gap-3 mb-10">
              <Badge
                variant="secondary"
                className="px-4 py-2 bg-aureolin text-eerie-black font-mono"
              >
                <Target className="w-4 h-4 mr-2" />
                Real-time Automation
              </Badge>
              <Badge
                variant="secondary"
                className="px-4 py-2 bg-timberwolf text-eerie-black font-mono"
              >
                <Wand2 className="w-4 h-4 mr-2" />
                AI-Powered Workflows
              </Badge>
              <Badge
                variant="secondary"
                className="px-4 py-2 bg-jonquil text-eerie-black font-mono"
              >
                <Mail className="w-4 h-4 mr-2" />
                Email Integration
              </Badge>
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
        </div>
      </header>

      {/* Industry Automation Examples Section */}
      <section className="max-w-6xl mx-auto px-6 py-20">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold mb-6 text-timberwolf">
            {t("industryTitle")}
          </h2>
          <p className="text-lg text-jet dark:text-timberwolf font-mono max-w-3xl mx-auto">
            {t("industryDescription")}
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
          {/* Digital Marketing Manager */}
          <Card className="p-8 bg-eerie-black border border-timberwolf hover:border-jonquil transition-all duration-300 hover:shadow-xl">
            <div className="mb-6">
              <h3 className="text-lg font-bold text-timberwolf font-mono">
                {t("marketingTitle")}
              </h3>
              <p className="text-sm text-jet dark:text-timberwolf font-mono opacity-75">
                {t("marketingSubtitle")}
              </p>
            </div>

            <IndustryWorkflowGraph industry="marketing" className="mb-6" />

            <p className="text-sm font-mono text-jet dark:text-timberwolf leading-relaxed">
              {t("marketingDescription")}
            </p>
          </Card>

          {/* E-commerce Store Owner */}
          <Card className="p-8 bg-eerie-black border border-timberwolf hover:border-jonquil transition-all duration-300 hover:shadow-xl">
            <div className="mb-6">
              <h3 className="text-lg font-bold text-timberwolf font-mono">
                {t("ecommerceTitle")}
              </h3>
              <p className="text-sm text-jet dark:text-timberwolf font-mono opacity-75">
                {t("ecommerceSubtitle")}
              </p>
            </div>

            <IndustryWorkflowGraph industry="ecommerce" className="mb-6" />

            <p className="text-sm font-mono text-jet dark:text-timberwolf leading-relaxed">
              {t("ecommerceDescription")}
            </p>
          </Card>

          {/* Recruiter */}
          <Card className="p-8 bg-eerie-black border border-timberwolf hover:border-jonquil transition-all duration-300 hover:shadow-xl">
            <div className="mb-6">
              <h3 className="text-lg font-bold text-timberwolf font-mono">
                {t("recruitingTitle")}
              </h3>
              <p className="text-sm text-jet dark:text-timberwolf font-mono opacity-75">
                {t("recruitingSubtitle")}
              </p>
            </div>

            <IndustryWorkflowGraph industry="recruiting" className="mb-6" />

            <p className="text-sm font-mono text-jet dark:text-timberwolf leading-relaxed">
              {t("recruitingDescription")}
            </p>
          </Card>
        </div>
      </section>

      {/* Compact Integrations Section */}
      <section className="max-w-6xl mx-auto px-6 py-12 border-b border-timberwolf dark:border-jet">
        <div className="bg-timberwolf/20 dark:bg-jet/20 rounded-xl p-8">
          <Collapsible
            open={integrationsExpanded}
            onOpenChange={setIntegrationsExpanded}
          >
            {/* Always visible popular integrations */}
            <div className="flex items-center justify-between mb-6">
              <div>
                <h3 className="text-lg font-bold text-timberwolf font-mono mb-1">
                  {t("integrationsTitle")}
                </h3>
                <p className="text-sm text-jet dark:text-timberwolf font-mono opacity-75">
                  {t("integrationsSubtitle")}
                </p>
              </div>
            </div>

            {/* Popular integrations preview */}
            <div className="flex flex-wrap items-center gap-4 mb-6">
              {popularIntegrations.map((integration, index) => (
                <div
                  key={index}
                  className="flex items-center gap-2 bg-eerie-black border border-timberwolf rounded-lg px-4 py-3 hover:border-jonquil transition-colors"
                >
                  <div className="text-jet dark:text-timberwolf">
                    {integration.icon}
                  </div>
                  <span className="text-sm font-mono text-timberwolf">
                    {integration.name}
                  </span>
                </div>
              ))}

              {/* Clickable "Many more" badge that expands the collapsible */}
              <CollapsibleTrigger asChild>
                <button className="flex items-center gap-2 bg-aureolin hover:bg-jonquil rounded-lg px-4 py-3 transition-colors cursor-pointer">
                  <Plus className="w-4 h-4 text-eerie-black" />
                  <span className="text-sm font-mono font-semibold text-eerie-black">
                    {t("manyMore")}
                  </span>
                  {integrationsExpanded ? (
                    <ChevronDown className="w-3 h-3 text-eerie-black" />
                  ) : (
                    <ChevronRight className="w-3 h-3 text-eerie-black" />
                  )}
                </button>
              </CollapsibleTrigger>
            </div>

            {/* Collapsible full list */}
            <CollapsibleContent className="mt-6">
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
                {allIntegrations.map((integration, index) => (
                  <div
                    key={index}
                    className="group bg-eerie-black border border-timberwolf rounded-lg p-4 hover:border-jonquil transition-all duration-200 hover:shadow-md"
                  >
                    <div className="flex items-center gap-2">
                      <div className="text-jet dark:text-timberwolf group-hover:text-jonquil transition-colors">
                        {integration.icon}
                      </div>
                      <div className="min-w-0 flex-1">
                        <h4 className="text-xs font-mono font-semibold text-timberwolf truncate">
                          {integration.name}
                        </h4>
                        <span className="text-xs font-mono text-jet dark:text-timberwolf opacity-60">
                          {integration.category}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <div className="text-center mt-8 p-6 bg-aureolin/20 rounded-lg">
                <p className="text-sm font-mono text-eerie-black dark:text-timberwolf">
                  <strong>{t("customIntegrations")}</strong>
                </p>
              </div>
            </CollapsibleContent>
          </Collapsible>
        </div>
      </section>

      {/* Workflows Section - Hidden on mobile (md and below) */}
      <section className="hidden lg:block max-w-6xl mx-auto px-6 py-20">
        <div className="mb-16">
          <h2 className="text-3xl font-bold mb-4 text-timberwolf">
            {t("workflows")}
          </h2>
          <p className="text-lg text-jet dark:text-timberwolf font-mono">
            {t("workflowDescription")}
          </p>
        </div>

        <div className="space-y-16">
          {getWorkflowsData().map((workflow) => (
            <WorkflowDemo key={workflow.id} workflow={workflow} />
          ))}
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-timberwolf dark:border-jet bg-timberwolf dark:bg-jet">
        <div className="max-w-6xl mx-auto px-6 py-10 text-center">
          <div className="flex items-center justify-center gap-3 mb-6">
            <div className="w-6 h-6 bg-jonquil rounded-lg flex items-center justify-center">
              <Zap className="w-3 h-3 text-eerie-black" />
            </div>
            <span className="text-lg font-bold font-mono text-timberwolf">
              Bitlads Software
            </span>
          </div>
          <p className="text-jet dark:text-timberwolf font-mono text-sm">
            © 2025 Bitlads Software.
          </p>
        </div>
      </footer>
    </div>
  );
}
