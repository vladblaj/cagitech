import React, { useState, useRef } from "react";
import { WorkflowNode } from "./WorkflowNode";
import { NodeDetailsPanel } from "./NodeDetailsPanel";
import { Button } from "./ui/button";
import { Card } from "./ui/card";
import { Badge } from "./ui/badge";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "./ui/collapsible";
import {
  Play,
  RotateCcw,
  ChevronRight,
  ChevronDown,
  TrendingUp,
  Eye,
  EyeOff,
} from "lucide-react";
import { useLanguage } from "../contexts/LanguageContext";
import { cn } from "../lib/utils";

/** *********************************************************************
 * TYPES
 ********************************************************************* */
interface WorkflowData {
  id: string;
  title: string;
  description: string;
  businessValue: string;
  nodes: Array<{
    id: string;
    title: string;
    type: "trigger" | "action" | "output";
    input?: any;
    output?: any;
    description?: string;
    businessDescription?: string;
    whyItMatters?: string;
    icon?: React.ReactNode;
  }>;
}

interface WorkflowDemoProps {
  workflow: WorkflowData;
  className?: string;
}

/** *********************************************************************
 * COMPONENT
 ********************************************************************* */
export function WorkflowDemo({ workflow, className }: WorkflowDemoProps) {
  /* -------------------------------------------------- hooks */
  const { t } = useLanguage();
  const [currentNode, setCurrentNode] = useState(-1);
  const [completedNodes, setCompletedNodes] = useState<Set<string>>(
    new Set()
  );
  const [isRunning, setIsRunning] = useState(false);
  const [selectedNodeDetails, setSelectedNodeDetails] = useState<string | null>(
    null
  );
  const [isExpanded, setIsExpanded] = useState(false);
  const [isGeneratingOutput, setIsGeneratingOutput] = useState(false);

  // Keep a ref map for quick DOM access (no auto‑scrolling now, but retained for future)
  const nodeRefs = useRef<{ [key: string]: HTMLDivElement | null }>({});

  /* -------------------------------------------------- helpers */
  const getSelectedNode = () =>
    selectedNodeDetails
      ? workflow.nodes.find((n) => n.id === selectedNodeDetails) ?? null
      : null;

  const isCurrentlyExecuting = () =>
    currentNode >= 0 &&
    workflow.nodes[currentNode]?.id === selectedNodeDetails &&
    isRunning;

  const isCurrentlyCompleted = () =>
    (selectedNodeDetails && completedNodes.has(selectedNodeDetails)) || false;

  /* -------------------------------------------------- actions */
  const startDemo = async () => {
    setIsRunning(true);
    setCurrentNode(-1);
    setCompletedNodes(new Set());
    setSelectedNodeDetails(null);
    setIsExpanded(true);

    // Wait for expansion animation
    await new Promise((r) => setTimeout(r, 400));

    for (let i = 0; i < workflow.nodes.length; i++) {
      const node = workflow.nodes[i];

      setCurrentNode(i);
      setSelectedNodeDetails(node.id);

      // Simulate processing & generation
      await new Promise((r) => setTimeout(r, 800));
      setIsGeneratingOutput(true);
      await new Promise((r) => setTimeout(r, 1700));
      setIsGeneratingOutput(false);

      // Mark complete
      setCompletedNodes((prev) => new Set([...prev, node.id]));
      await new Promise((r) => setTimeout(r, 300));
    }

    // Finished
    setCurrentNode(-1);
    setIsRunning(false);
  };

  const resetDemo = () => {
    setCurrentNode(-1);
    setCompletedNodes(new Set());
    setIsRunning(false);
    setSelectedNodeDetails(null);
    setIsGeneratingOutput(false);
  };

  const handleNodeClick = (nodeId: string) => {
    setSelectedNodeDetails((prev) => (prev === nodeId ? null : nodeId));
  };

  /* -------------------------------------------------- render */
  return (
    <Card
      className={cn(
        "overflow-hidden bg-eerie-black border border-jet",
        className
      )}
    >
      {/* ---------------- Header */}
      <div className="p-6 border-b border-jet">
        <div className="flex items-start justify-between mb-6 gap-6 flex-wrap md:flex-nowrap">
          {/* Title + description */}
          <div className="flex-1 min-w-[16rem]">
            <h3 className="text-2xl font-bold mb-2 text-timberwolf">
              {workflow.title}
            </h3>
            <p className="text-timberwolf font-mono mb-4">
              {workflow.description}
            </p>

            {/* Business value */}
            <div className="flex items-center gap-2 p-3 bg-aureolin rounded-lg">
              <TrendingUp className="w-5 h-5 text-eerie-black" />
              <span className="text-eerie-black font-mono text-sm font-medium">
                {workflow.businessValue}
              </span>
            </div>
          </div>

          {/* Controls */}
          <div className="flex flex-col gap-3">
            <Button
              onClick={startDemo}
              disabled={isRunning}
              className="bg-jonquil hover:bg-aureolin text-eerie-black font-mono font-semibold border-2 border-transparent hover:border-eerie-black transition-all duration-200"
            >
              <Play className="w-4 h-4 mr-2" />
              {isRunning ? t("running") || "Running..." : t("playDemo")}
            </Button>
            <Button
              onClick={resetDemo}
              variant="outline"
              className="font-mono font-semibold border-2 border-jet hover:border-jonquil hover:bg-jonquil hover:text-eerie-black text-timberwolf bg-eerie-black transition-all duration-200"
            >
              <RotateCcw className="w-4 h-4 mr-2" />
              {t("resetDemo")}
            </Button>
          </div>
        </div>

        {/* Progress bar */}
        <div className="w-full bg-jet rounded-full h-2">
          <div
            className="bg-jonquil h-2 rounded-full transition-all duration-500"
            style={{ width: `${(completedNodes.size / workflow.nodes.length) * 100}%` }}
          />
        </div>
        <div className="flex justify-between items-center mt-2">
          <span className="text-sm font-mono text-timberwolf">
            {completedNodes.size} of {workflow.nodes.length} steps completed
          </span>
          <span className="text-sm font-mono text-aureolin font-semibold">
            {Math.round((completedNodes.size / workflow.nodes.length) * 100)}%
          </span>
        </div>
      </div>

      {/* ---------------- Collapsible content */}
      <Collapsible open={isExpanded} onOpenChange={setIsExpanded}>
        <CollapsibleTrigger asChild>
          <Button
            variant="ghost"
            className="w-full p-6 justify-between text-left font-mono hover:bg-jet/50 rounded-none border-0 group"
          >
            <span className="flex items-center gap-3">
              {isExpanded ? (
                <Eye className="w-5 h-5 text-jonquil group-hover:text-aureolin transition-colors" />
              ) : (
                <EyeOff className="w-5 h-5 text-jonquil group-hover:text-aureolin transition-colors" />
              )}
              <span className="text-timberwolf font-semibold group-hover:text-aureolin transition-colors">
                {isExpanded ? "Hide workflow details" : "Show how it works step‑by‑step"}
              </span>
            </span>
            {isExpanded ? (
              <ChevronDown className="w-5 h-5 text-jonquil group-hover:text-aureolin transition-colors" />
            ) : (
              <ChevronRight className="w-5 h-5 text-jonquil group-hover:text-aureolin transition-colors" />
            )}
          </Button>
        </CollapsibleTrigger>

        <CollapsibleContent className="px-6 pb-6">
          {/* *****************************************************************
            * MAIN LAYOUT
            * grid: | nodes | details | OR centered nodes when no details
            *****************************************************************/}
          <div className={cn(
            selectedNodeDetails
              ? "grid md:grid-cols-[1fr_420px] gap-8"
              : "flex justify-center"
          )}>
            {/* ------------ NODES column */}
            <div
              className={cn(
                "bg-jet/20 rounded-xl p-8 flex flex-col items-center max-h-[calc(100vh-12rem)] overflow-y-auto",
                selectedNodeDetails ? "w-full" : "w-full max-w-md"
              )}
            >
              {workflow.nodes.map((node, index) => {
                const isCompleted = completedNodes.has(node.id);
                const isExecuting = currentNode === index && isRunning;
                const isSelected = selectedNodeDetails === node.id;

                return (
                  <div
                    key={node.id}
                    ref={(el) => {
                      nodeRefs.current[node.id] = el;
                    }}
                    className="flex flex-col items-center w-full mb-6 last:mb-0"
                  >
                    {/* badge */}
                    <div className="relative w-full max-w-xs mb-4">
                      <div className="absolute -top-3 -left-3 z-20">
                        <Badge
                          variant="outline"
                          className={cn(
                            "w-6 h-6 rounded-full p-0 flex items-center justify-center font-mono text-xs border-2 transition-all duration-300",
                            isCompleted
                              ? "bg-jonquil text-eerie-black border-jonquil shadow-lg"
                              : isExecuting
                              ? "bg-aureolin text-eerie-black border-aureolin animate-pulse"
                              : "bg-eerie-black border-jet text-timberwolf"
                          )}
                        >
                          {index + 1}
                        </Badge>
                      </div>

                      <div className="relative z-10">
                        <WorkflowNode
                          node={node}
                          isCompleted={isCompleted}
                          isExecuting={isExecuting}
                          isSelected={isSelected}
                          onClick={() => handleNodeClick(node.id)}
                          className="w-full h-40"
                        />
                      </div>
                    </div>

                    {/* connector */}
                    {index < workflow.nodes.length - 1 && (
                      <div className="flex flex-col items-center">
                        <div className="relative w-1 h-12 bg-jet rounded-full overflow-hidden">
                          <div
                            className={cn(
                              "absolute inset-0 rounded-full transition-all duration-500",
                              isCompleted ? "bg-jonquil" : "bg-jet"
                            )}
                          />
                          {isExecuting && (
                            <div className="absolute inset-0">
                              <div className="h-4 w-full bg-linear-to-b from-transparent via-aureolin to-transparent animate-data-flow-vertical rounded-full" />
                            </div>
                          )}
                        </div>
                        <div
                          className={cn(
                            "w-0 h-0 border-l-2 border-r-2 border-t-4 border-l-transparent border-r-transparent mt-1 transition-all duration-500",
                            isCompleted ? "border-t-jonquil" : "border-t-jet"
                          )}
                        />
                      </div>
                    )}
                  </div>
                );
              })}
            </div>

            {/* ------------ DETAILS column */}
            {selectedNodeDetails && getSelectedNode() && (
              <div className="sticky top-4 self-start max-h-[calc(100vh-6rem)] overflow-y-auto animate-fade-in">
                <NodeDetailsPanel
                  node={getSelectedNode()!}
                  isExecuting={isCurrentlyExecuting()}
                  isCompleted={isCurrentlyCompleted()}
                  isGeneratingOutput={isGeneratingOutput}
                  onClose={() => setSelectedNodeDetails(null)}
                />
              </div>
            )}
          </div>
        </CollapsibleContent>
      </Collapsible>
    </Card>
  );
}