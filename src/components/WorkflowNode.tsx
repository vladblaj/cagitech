import { cn } from '../lib/utils';
import { CheckCircle } from "lucide-react";
import { InfoCircledIcon } from '@radix-ui/react-icons';

// Map node IDs to meaningful one-word labels
const getNodeLabel = (nodeId: string, nodeType: string): string => {
  const nodeLabels: { [key: string]: string } = {
    // Workflow 1 - SEO Enhancement
    'cron': 'Schedule',
    'excel': 'Extract', 
    'http': 'Fetch',
    'openai': 'Analyze',
    'slack': 'Notify',
    
    // Workflow 2 - Quote to Invoice
    'webhook': 'Listen',
    'set': 'Prepare',
    'document': 'Generate',
    'email': 'Send',
    'excel-log': 'Archive',
    
    // Workflow 3 - Slack Bot
    'slack-trigger': 'Listen',
    'function': 'Query',
    'openai-answer': 'Process',
    'slack-post': 'Reply',
    'excel-journal': 'Log',
    
    // Industry workflow fallbacks
    'enrich-data': 'Enrich',
    'upsert-crm': 'Update',
    'slack-alert': 'Alert',
    'generate-po': 'Generate',
    'email-supplier': 'Send',
    'notify-ops': 'Notify',
    'parse-cv': 'Parse',
    'create-candidate': 'Create',
    'send-outreach': 'Outreach'
  };

  return nodeLabels[nodeId] || nodeType;
};

interface NodeData {
  id: string;
  title: string;
  type: 'trigger' | 'action' | 'output';
  input?: any;
  output?: any;
  description?: string;
  businessDescription?: string;
  icon?: React.ReactNode;
}

interface WorkflowNodeProps {
  node: NodeData;
  isCompleted: boolean;
  isExecuting: boolean;
  isSelected?: boolean;
  onClick: () => void;
  className?: string;
}

export function WorkflowNode({ 
  node, 
  isCompleted, 
  isExecuting, 
  isSelected = false,
  onClick,
  className 
}: WorkflowNodeProps) {
  const getNodeStyles = () => {
    // Executing state takes priority - pulse the existing border
    if (isExecuting) {
      return {
        bg: "bg-linear-to-br from-aureolin/30 to-jonquil/20 dark:from-aureolin/20 dark:to-jonquil/10",
        border: "border-jonquil",
        text: "text-eerie-black dark:text-timberwolf"
      };
    }
    
    // Selected state takes priority for visual feedback
    if (isSelected) {
      return {
        bg: "bg-linear-to-br from-aureolin/30 to-jonquil/20 dark:from-aureolin/20 dark:to-jonquil/10",
        border: "border-jonquil",
        text: "text-eerie-black dark:text-timberwolf"
      };
    }
    
    if (node.type === "trigger") {
      return {
        bg: "bg-linear-to-br from-white to-timberwolf dark:from-eerie-black dark:to-jet",
        border: "border-timberwolf dark:border-jet",
        text: "text-eerie-black dark:text-timberwolf"
      };
    }
    if (node.type === "output") {
      return {
        bg: "bg-linear-to-br from-white to-timberwolf dark:from-eerie-black dark:to-jet",
        border: "border-timberwolf dark:border-jet", 
        text: "text-eerie-black dark:text-timberwolf"
      };
    }
    return {
      bg: "bg-linear-to-br from-timberwolf to-white dark:from-jet dark:to-eerie-black",
      border: "border-timberwolf dark:border-jet",
      text: "text-eerie-black dark:text-timberwolf"
    };
  };

  const nodeStyles = getNodeStyles();

  // Determine ring styles - only for selected and completed states
  const getRingStyles = () => {
    if (isCompleted && !isExecuting) {
      return "ring-2 ring-aureolin/70";
    }
    return "";
  };

  // Get animation styles - separate from border/ring styles
  const getAnimationStyles = () => {
    return "";
  };

  const getStatusIndicator = () => {
    if (isCompleted) {
      return (
        <div className="absolute -top-2 -right-2 w-6 h-6 bg-aureolin rounded-full flex items-center justify-center">
          <CheckCircle className="w-3 h-3 text-eerie-black" />
        </div>
      );
    }
    return null;
  };

  return (
    <div
      onClick={onClick}
      className={cn(
        "relative group cursor-pointer transition-all duration-300 transform hover:scale-105",
        "rounded-xl border-2 shadow-lg hover:shadow-xl w-full",
        nodeStyles.bg,
        nodeStyles.border,
        getRingStyles(),
        getAnimationStyles(),
        className
      )}
    >
      {/* Status Indicator */}
      {getStatusIndicator()}

      {/* Selection Indicator */}
      {isSelected && (
        <div className="absolute -top-1 -left-1 w-4 h-4 bg-jonquil rounded-full flex items-center justify-center">
          <div className="w-2 h-2 bg-eerie-black rounded-full"></div>
        </div>
      )}

      {/* Main Content Container - Fixed height and proper flex layout */}
      <div className="flex flex-col h-40 p-4">
        {/* Node Icon & Type */}
        <div className="flex items-center justify-between mb-3">
          <div className={cn(
            "w-8 h-8 rounded-lg flex items-center justify-center font-bold transition-all duration-300",
            isSelected ? "bg-jonquil shadow-lg text-black" : "bg-jonquil text-black"
          )}>
            {node.icon}
          </div>
          <div className={cn(
            "px-2 py-1 rounded-full text-xs font-mono font-semibold uppercase tracking-wide transition-all duration-300",
            isSelected 
              ? "bg-jonquil/40 text-eerie-black border border-jonquil" 
              : node.type === "trigger" ? "bg-jonquil/20 text-eerie-black dark:text-timberwolf" :
              node.type === "output" ? "bg-jonquil/20 text-eerie-black dark:text-timberwolf" :
              "bg-white/20 dark:bg-eerie-black/20 text-eerie-black dark:text-timberwolf"
          )}>
            {getNodeLabel(node.id, node.type)}
          </div>
        </div>

        {/* Node Title */}
        <h3 className={cn(
          "font-mono text-sm font-bold mb-2 leading-tight transition-all duration-300",
          isSelected ? "text-eerie-black dark:text-aureolin" : nodeStyles.text
        )}>
          {node.title}
        </h3>

        {/* Node Description - Takes available space */}
        <p className={cn(
          "text-xs font-mono leading-relaxed opacity-80 flex-1 transition-all duration-300",
          isSelected ? "text-eerie-black dark:text-timberwolf opacity-90" : nodeStyles.text
        )}>
          {node.description}
        </p>

        {/* Click hint - Fixed at bottom with proper alignment */}
        <div className="mt-auto pt-3 border-t border-current/10">
          <div className="flex items-center justify-center">
            <span className={cn(
              "text-xs font-mono transition-all duration-300 flex items-center gap-1.5",
              isSelected 
                ? "text-eerie-black dark:text-aureolin opacity-100 font-semibold" 
                : "opacity-60 group-hover:opacity-100",
              nodeStyles.text
            )}>
              <InfoCircledIcon className="w-3 h-3 shrink-0" />
              <span className="whitespace-nowrap">
                {isSelected ? "Details shown" : "Click for details"}
              </span>
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}