import React from "react";
import { Button } from "./ui/button";
import { Loader2 } from "lucide-react";
import {
  TargetIcon,
  DownloadIcon,
  UploadIcon,
  Cross2Icon,
} from "@radix-ui/react-icons";
import { useLanguage } from "../contexts/LanguageContext";
import { cn } from "../lib/utils";

// Map node IDs to meaningful one-word labels

interface NodeData {
  id: string;
  title: string;
  type: "trigger" | "action" | "output";
  input?: any;
  output?: any;
  description?: string;
  businessDescription?: string;
  whyItMatters?: string;
  icon?: React.ReactNode;
}

interface NodeDetailsPanelProps {
  node: NodeData;
  isExecuting: boolean;
  isCompleted: boolean;
  isGeneratingOutput: boolean;
  onClose: () => void;
  className?: string;
}

export function NodeDetailsPanel({
  node,
  isExecuting,
  isCompleted,
  isGeneratingOutput,
  onClose,
  className,
}: NodeDetailsPanelProps) {
  const { t } = useLanguage();

  const renderOutputSection = () => {
    if (isExecuting && !isGeneratingOutput) {
      return (
        <div className="text-xs font-mono text-gray-500 italic">
          Waiting for processing to complete...
        </div>
      );
    }

    if (isExecuting && isGeneratingOutput) {
      return (
        <div className="space-y-2">
          <div className="flex items-center gap-2 text-xs font-mono text-timberwolf">
            <Loader2 className="w-3 h-3 animate-spin" />
            Computing results...
          </div>
          <div className="h-16 bg-timberwolf/10 rounded border-2 border-dashed border-timberwolf/20 flex items-center justify-center">
            <div className="flex space-x-1">
              <div className="w-2 h-2 bg-timberwolf rounded-full animate-bounce"></div>
              <div
                className="w-2 h-2 bg-timberwolf rounded-full animate-bounce"
                style={{ animationDelay: "0.1s" }}
              ></div>
              <div
                className="w-2 h-2 bg-timberwolf rounded-full animate-bounce"
                style={{ animationDelay: "0.2s" }}
              ></div>
            </div>
          </div>
        </div>
      );
    }

    if (isCompleted && node.output) {
      return (
        <pre className="text-xs font-mono text-timberwolf overflow-x-auto whitespace-pre-wrap leading-relaxed animate-slide-down">
          {typeof node.output === "string"
            ? node.output
            : JSON.stringify(node.output, null, 2)}
        </pre>
      );
    }

    return (
      <div className="text-xs font-mono text-gray-500 italic">
        Output will appear here after execution
      </div>
    );
  };

  const getOutputSectionStyles = () => {
    if (isExecuting && isGeneratingOutput) {
      return "bg-jonquil/40 border-jonquil animate-pulse";
    }
    if (isCompleted) {
      return "bg-jonquil/10 border-aureolin/50";
    }
    return "bg-gray-800 border-gray-600";
  };

  const getOutputHeaderStyles = () => {
    if (isExecuting && isGeneratingOutput) {
      return "text-eerie-black";
    }
    if (isCompleted) {
      return "text-aureolin";
    }
    return "text-gray-400";
  };

  return (
    <div className={cn("relative", className)}>
      <div className="p-6 bg-eerie-black rounded-xl border-2 border-aureolin shadow-2xl">
        <div className="space-y-6">
          {/* Header */}
          <div className="flex items-center justify-between pb-4 border-b border-jet">
            <div>
              <h4 className="font-mono font-bold text-lg text-aureolin">
                {node.title}
              </h4>
              {isExecuting && (
                <p className="text-xs uppercase tracking-wide font-mono transition-all duration-300 text-aureolin animate-pulse">
                  EXECUTING...
                </p>
              )}
            </div>

            {/* Close button - Hide during execution */}
            {!isExecuting && (
              <Button
                variant="ghost"
                size="sm"
                onClick={onClose}
                className="text-timberwolf hover:text-aureolin"
              >
                <Cross2Icon className="w-4 h-4" />
              </Button>
            )}
          </div>

          {/* Business Description */}
          <div>
            <h5 className="font-mono font-semibold text-aureolin mb-3">
              What this step does (in simple terms)
            </h5>
            <p className="text-timberwolf font-mono text-sm leading-relaxed bg-jonquil/10 p-4 rounded-lg border border-aureolin/30">
              {node.businessDescription}
            </p>
          </div>

          {/* Why It Matters */}
          <div>
            <h5 className="font-mono font-semibold text-aureolin mb-3 flex items-center gap-2">
              <TargetIcon className="w-4 h-4" />
              {t("whyItMatters")}
            </h5>
            <p className="text-timberwolf font-mono text-sm leading-relaxed">
              {node.whyItMatters}
            </p>
          </div>

          {/* Input/Output Grid */}
          <div className="grid grid-cols-1 gap-6">
            {/* Input Section */}
            {node.input && (
              <div
                className={cn(
                  "rounded-lg p-4 border transition-all duration-300",
                  isExecuting
                    ? "bg-aureolin/30 border-aureolin animate-pulse"
                    : "bg-jet/50 border-jet"
                )}
              >
                <h6
                  className={cn(
                    "font-mono text-xs font-semibold mb-3 flex items-center gap-2 transition-all duration-300",
                    isExecuting
                      ? "text-eerie-black"
                      : "text-timberwolf"
                  )}
                >
                  <DownloadIcon className="w-3 h-3" />
                  {t("demoInput")}
                  {isExecuting && (
                    <span className="text-xs bg-eerie-black text-aureolin px-2 py-1 rounded-full animate-pulse">
                      PROCESSING
                    </span>
                  )}
                </h6>
                <pre
                  className={cn(
                    "text-xs font-mono overflow-x-auto whitespace-pre-wrap leading-relaxed transition-all duration-300",
                    isExecuting
                      ? "text-eerie-black"
                      : "text-timberwolf"
                  )}
                >
                  {typeof node.input === "string"
                    ? node.input
                    : JSON.stringify(node.input, null, 2)}
                </pre>
              </div>
            )}

            {/* Output Section */}
            <div
              className={cn(
                "rounded-lg p-4 border transition-all duration-500",
                getOutputSectionStyles()
              )}
            >
              <h6
                className={cn(
                  "font-mono text-xs font-semibold mb-3 flex items-center gap-2 transition-all duration-300",
                  getOutputHeaderStyles()
                )}
              >
                <UploadIcon className="w-3 h-3" />
                {t("demoOutput")}
                {isExecuting && isGeneratingOutput && (
                  <span className="text-xs bg-eerie-black text-jonquil px-2 py-1 rounded-full animate-pulse flex items-center gap-1">
                    <Loader2 className="w-3 h-3 animate-spin" />
                    GENERATING
                  </span>
                )}
              </h6>

              {/* Output Content */}
              {renderOutputSection()}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}