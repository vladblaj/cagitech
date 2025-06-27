import React, { useState } from 'react';
import { cn } from '../lib/utils';
import { useLanguage } from '../contexts/LanguageContext';
import { 
  Zap, 
  Search, 
  Database, 
  MessageSquare, 
  Package, 
  FileText, 
  Mail, 
  Bell, 
  Link, 
  Bot, 
  User, 
  Send 
} from 'lucide-react';

interface WorkflowNode {
  id: string;
  titleEn: string;
  titleRo: string;
  description: string;
  icon: React.ReactNode;
  type: 'trigger' | 'action' | 'output';
}

interface IndustryWorkflowGraphProps {
  industry: 'marketing' | 'ecommerce' | 'recruiting';
  className?: string;
}

export function IndustryWorkflowGraph({ industry, className }: IndustryWorkflowGraphProps) {
  const { language } = useLanguage();
  const [hoveredNode, setHoveredNode] = useState<string | null>(null);

  const workflows: {
    marketing: WorkflowNode[];
    ecommerce: WorkflowNode[];
    recruiting: WorkflowNode[];
  } = {
    marketing: [
      {
        id: 'trigger-lead',
        titleEn: 'New Lead',
        titleRo: 'Lead nou',
        description: 'Fires when a form is submitted or a lead appears in the ad platform.',
        icon: <Zap className="w-5 h-5" />,
        type: 'trigger' as const
      },
      {
        id: 'enrich-data',
        titleEn: 'Enrich Lead Data',
        titleRo: 'Îmbogățește datele lead-ului',
        description: 'Pull firmographic info (Clearbit, Apollo, etc.) to calculate lead score.',
        icon: <Search className="w-5 h-5" />,
        type: 'action' as const
      },
      {
        id: 'upsert-crm',
        titleEn: 'Upsert in CRM',
        titleRo: 'Actualizează/creează în CRM',
        description: 'Creates or updates the contact and attaches the score & source channel.',
        icon: <Database className="w-5 h-5" />,
        type: 'action' as const
      },
      {
        id: 'slack-alert',
        titleEn: 'Slack Alert',
        titleRo: 'Alertă Slack condiționată',
        description: 'Sends a message only if score ≥ 80, keeping noise low.',
        icon: <MessageSquare className="w-5 h-5" />,
        type: 'output' as const
      }
    ],
    ecommerce: [
      {
        id: 'stock-trigger',
        titleEn: 'Stock Threshold',
        titleRo: 'Prag de stoc',
        description: 'Listens for SKU inventory falling below a set level.',
        icon: <Package className="w-5 h-5" />,
        type: 'trigger' as const
      },
      {
        id: 'generate-po',
        titleEn: 'Generate PO Draft',
        titleRo: 'Generează comandă către furnizor',
        description: 'Builds a purchase-order PDF/CSV and attaches SKU quantities needed.',
        icon: <FileText className="w-5 h-5" />,
        type: 'action' as const
      },
      {
        id: 'email-supplier',
        titleEn: 'Email to Supplier',
        titleRo: 'Trimite e-mail furnizorului',
        description: 'Sends the PO automatically (cc your team).',
        icon: <Mail className="w-5 h-5" />,
        type: 'action' as const
      },
      {
        id: 'notify-ops',
        titleEn: 'Notify Ops Channel',
        titleRo: 'Notifică echipa de operațiuni',
        description: 'Posts a summary (SKU + ETA) in Slack/Teams for transparency.',
        icon: <Bell className="w-5 h-5" />,
        type: 'output' as const
      }
    ],
    recruiting: [
      {
        id: 'profile-scraped',
        titleEn: 'New Profile Scraped',
        titleRo: 'Profil nou extras',
        description: 'Kicks off when a LinkedIn URL is added to a Google Sheet or ATS list.',
        icon: <Link className="w-5 h-5" />,
        type: 'trigger' as const
      },
      {
        id: 'parse-cv',
        titleEn: 'Parse & Score CV',
        titleRo: 'Analizează și punctează CV-ul',
        description: 'Extracts skills/experience, assigns a relevance score.',
        icon: <Bot className="w-5 h-5" />,
        type: 'action' as const
      },
      {
        id: 'create-candidate',
        titleEn: 'Create Candidate in ATS',
        titleRo: 'Creează candidat în ATS',
        description: 'Adds the candidate, tagging by role and score bucket.',
        icon: <User className="w-5 h-5" />,
        type: 'action' as const
      },
      {
        id: 'send-outreach',
        titleEn: 'Auto-Send Outreach Email',
        titleRo: 'Trimite e-mail de contact automat',
        description: 'Personalizes a template and sends from recruiter\'s inbox.',
        icon: <Send className="w-5 h-5" />,
        type: 'output' as const
      }
    ]
  };

  const getNodeColor = (type: string) => {
    switch (type) {
      case 'trigger': return 'bg-aureolin border-jonquil text-eerie-black';
      case 'action': return 'bg-timberwolf/50 border-timberwolf text-eerie-black';
      case 'output': return 'bg-jonquil border-aureolin text-eerie-black';
      default: return 'bg-gray-100 border-gray-300 text-gray-600';
    }
  };

  const currentWorkflow = workflows[industry];

  return (
    <div className={cn("relative", className)}>
      <div className="p-4">
        {/* Workflow nodes in a vertical column */}
        <div className="flex flex-col items-center space-y-4">
          {currentWorkflow.map((node, index) => (
            <div key={node.id} className="flex flex-col items-center w-full">
              {/* Node with title only */}
              <div className="flex items-center gap-3 w-full">
                {/* Node */}
                <div
                  className={cn(
                    "w-12 h-12 rounded-xl border-2 flex items-center justify-center cursor-pointer transition-all duration-200 hover:scale-110 hover:shadow-lg shrink-0",
                    getNodeColor(node.type)
                  )}
                  onMouseEnter={() => setHoveredNode(node.id)}
                  onMouseLeave={() => setHoveredNode(null)}
                >
                  {node.icon}
                </div>

                {/* Node title only */}
                <div className="flex-1 min-w-0">
                  <h4 className="font-mono font-semibold text-base text-eerie-black dark:text-timberwolf">
                    {language === 'en' ? node.titleEn : node.titleRo}
                  </h4>
                </div>
              </div>

              {/* Vertical connector */}
              {index < currentWorkflow.length - 1 && (
                <div className="w-1 h-6 bg-linear-to-b from-timberwolf via-jonquil to-timberwolf rounded-full my-2 opacity-60">
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Tooltip for hover details - Improved positioning */}
        {hoveredNode && (
          <div className="absolute top-full left-1/2 transform -translate-x-1/2 mt-2 z-10 w-80 max-w-sm">
            {currentWorkflow.map((node) => {
              if (node.id !== hoveredNode) return null;
              
              return (
                <div
                  key={node.id}
                  className="bg-eerie-black text-white p-4 rounded-lg shadow-xl border border-jonquil animate-slide-down"
                >
                  <h4 className="font-mono font-bold text-sm text-aureolin mb-2">
                    {language === 'en' ? node.titleEn : node.titleRo}
                  </h4>
                  <p className="text-xs font-mono text-timberwolf leading-relaxed">
                    {node.description}
                  </p>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}