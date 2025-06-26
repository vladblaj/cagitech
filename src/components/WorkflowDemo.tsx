import React, { useState, useRef } from 'react';
import { WorkflowNode } from './WorkflowNode';
import { NodeDetailsPanel } from './NodeDetailsPanel';
import { Button } from './ui/button';
import { Card } from './ui/card';
import { Badge } from './ui/badge';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from './ui/collapsible';
import { Play, RotateCcw, ChevronRight, ChevronDown, TrendingUp, Eye, EyeOff } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';
import { cn } from '../lib/utils';

interface WorkflowData {
  id: string;
  title: string;
  description: string;
  businessValue: string;
  nodes: Array<{
    id: string;
    title: string;
    type: 'trigger' | 'action' | 'output';
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

export function WorkflowDemo({ workflow, className }: WorkflowDemoProps) {
  const { t } = useLanguage();
  const [currentNode, setCurrentNode] = useState(-1);
  const [completedNodes, setCompletedNodes] = useState<Set<string>>(new Set());
  const [isRunning, setIsRunning] = useState(false);
  const [selectedNodeDetails, setSelectedNodeDetails] = useState<string | null>(null);
  const [isExpanded, setIsExpanded] = useState(false);
  const [isGeneratingOutput, setIsGeneratingOutput] = useState(false);
  
  // Refs for scrolling
  const nodeRefs = useRef<{ [key: string]: HTMLDivElement | null }>({});
  const detailsPanelRef = useRef<HTMLDivElement | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);

  // Scroll to show node optimally when manually clicked
  const scrollToShowClickedNode = async (nodeId: string) => {
    await new Promise(resolve => setTimeout(resolve, 100));
    
    const nodeElement = nodeRefs.current[nodeId];
    
    if (nodeElement) {
      const nodeRect = nodeElement.getBoundingClientRect();
      const viewportHeight = window.innerHeight;
      
      // Position the node in the upper-middle area of the viewport
      const targetPosition = viewportHeight * 0.3;
      const currentNodeCenter = nodeRect.top + nodeRect.height / 2;
      const scrollOffset = currentNodeCenter - targetPosition;
      
      window.scrollTo({
        top: window.scrollY + scrollOffset,
        behavior: 'smooth'
      });
    }
  };

  // Scroll optimally during demo execution (both node and details)
  const scrollToShowNodeAndDetails = async (nodeId: string) => {
    // Wait for details panel to render
    await new Promise(resolve => setTimeout(resolve, 200));
    
    const nodeElement = nodeRefs.current[nodeId];
    const detailsElement = detailsPanelRef.current;
    const containerElement = containerRef.current;
    
    if (nodeElement && containerElement) {
      // Get the node's position relative to the viewport
      const nodeRect = nodeElement.getBoundingClientRect();
      
      // Calculate the total content area we want to show
      let topBound = nodeRect.top;
      let bottomBound = nodeRect.bottom;
      
      // If details panel exists, include it in the bounds
      if (detailsElement) {
        const detailsRect = detailsElement.getBoundingClientRect();
        topBound = Math.min(topBound, detailsRect.top);
        bottomBound = Math.max(bottomBound, detailsRect.bottom);
      }
      
      const totalContentHeight = bottomBound - topBound;
      const viewportHeight = window.innerHeight;
      
      // Calculate optimal scroll position
      const padding = 80; // Extra padding for better visibility
      const contentCenter = topBound + totalContentHeight / 2;
      const viewportCenter = viewportHeight / 2;
      
      // Calculate how much we need to scroll
      const scrollOffset = contentCenter - viewportCenter;
      
      // Ensure we don't scroll too far up or down
      const maxScroll = document.documentElement.scrollHeight - viewportHeight;
      const targetScroll = Math.max(0, Math.min(maxScroll, window.scrollY + scrollOffset - padding));
      
      window.scrollTo({
        top: targetScroll,
        behavior: 'smooth'
      });
    }
  };

  const startDemo = async () => {
    setIsRunning(true);
    setCurrentNode(-1);
    setCompletedNodes(new Set());
    setSelectedNodeDetails(null);
    setIsExpanded(true);
    
    // Wait for expansion animation to complete
    await new Promise(resolve => setTimeout(resolve, 400));
    
    for (let i = 0; i < workflow.nodes.length; i++) {
      const currentNodeData = workflow.nodes[i];
      
      // Set current node and open its details
      setCurrentNode(i);
      setSelectedNodeDetails(currentNodeData.id);
      
      // Wait for details panel to render and then scroll to show both
      await scrollToShowNodeAndDetails(currentNodeData.id);
      
      // Show input processing phase
      await new Promise(resolve => setTimeout(resolve, 800));
      
      // Show output generation phase
      setIsGeneratingOutput(true);
      await new Promise(resolve => setTimeout(resolve, 1700));
      
      // Complete the node
      setIsGeneratingOutput(false);
      setCompletedNodes(prev => new Set([...prev, currentNodeData.id]));
      
      // Brief pause before moving to next node
      await new Promise(resolve => setTimeout(resolve, 300));
    }
    
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

  // Handle manual node selection (clicking on nodes)
  const handleNodeClick = (nodeId: string) => {
    const newSelection = selectedNodeDetails === nodeId ? null : nodeId;
    setSelectedNodeDetails(newSelection);
    
    // Only scroll if we're selecting a node (not deselecting)
    if (newSelection && !isRunning) {
      scrollToShowClickedNode(nodeId);
    }
  };

  const handleCloseDetails = () => {
    setSelectedNodeDetails(null);
  };

  const handleToggleExpanded = (expanded: boolean) => {
    setIsExpanded(expanded);
  };

  const getSelectedNode = () => {
    if (!selectedNodeDetails) return null;
    return workflow.nodes.find(n => n.id === selectedNodeDetails) || null;
  };

  const isCurrentlyExecuting = () => {
    return currentNode >= 0 && 
           workflow.nodes[currentNode]?.id === selectedNodeDetails && 
           isRunning;
  };

  const isCurrentlyCompleted = () => {
    return selectedNodeDetails ? completedNodes.has(selectedNodeDetails) : false;
  };

  return (
    <Card className={cn(
      "overflow-hidden bg-white dark:bg-eerie-black border border-timberwolf dark:border-jet",
      className
    )}>
      {/* Workflow Header */}
      <div className="p-6 border-b border-timberwolf dark:border-jet">
        <div className="flex items-start justify-between mb-6">
          <div className="flex-1">
            <h3 className="text-2xl font-bold mb-2 text-eerie-black dark:text-timberwolf">
              {workflow.title}
            </h3>
            <p className="text-jet dark:text-timberwolf font-mono mb-4">
              {workflow.description}
            </p>
            
            {/* Business Value */}
            <div className="flex items-center gap-2 p-3 bg-aureolin rounded-lg">
              <TrendingUp className="w-5 h-5 text-eerie-black" />
              <span className="text-eerie-black font-mono text-sm font-medium">
                {workflow.businessValue}
              </span>
            </div>
          </div>
          
          <div className="flex flex-col gap-3 ml-6">
            <Button
              onClick={startDemo}
              disabled={isRunning}
              className="bg-jonquil hover:bg-aureolin text-eerie-black font-mono font-semibold border-2 border-transparent hover:border-eerie-black transition-all duration-200"
            >
              <Play className="w-4 h-4 mr-2" />
              {isRunning ? t('running') || 'Running...' : t('playDemo')}
            </Button>
            <Button
              onClick={resetDemo}
              variant="outline"
              className="font-mono font-semibold border-2 border-timberwolf dark:border-jet hover:border-jonquil hover:bg-jonquil hover:text-eerie-black text-eerie-black dark:text-timberwolf bg-white dark:bg-eerie-black transition-all duration-200"
            >
              <RotateCcw className="w-4 h-4 mr-2" />
              {t('resetDemo')}
            </Button>
          </div>
        </div>
        
        {/* Progress Bar */}
        <div className="w-full bg-timberwolf dark:bg-jet rounded-full h-2">
          <div 
            className="bg-jonquil h-2 rounded-full transition-all duration-500"
            style={{ 
              width: `${(completedNodes.size / workflow.nodes.length) * 100}%` 
            }}
          />
        </div>
        
        {/* Progress Text */}
        <div className="flex justify-between items-center mt-2">
          <span className="text-sm font-mono text-jet dark:text-timberwolf">
            {completedNodes.size} of {workflow.nodes.length} steps completed
          </span>
          <span className="text-sm font-mono text-eerie-black dark:text-aureolin font-semibold">
            {Math.round((completedNodes.size / workflow.nodes.length) * 100)}%
          </span>
        </div>
      </div>

      {/* Collapsible Workflow Content */}
      <Collapsible open={isExpanded} onOpenChange={handleToggleExpanded}>
        <CollapsibleTrigger asChild>
          <Button 
            variant="ghost" 
            className="w-full p-6 justify-between text-left font-mono hover:bg-timberwolf/50 dark:hover:bg-jet/50 rounded-none border-0 group"
          >
            <span className="flex items-center gap-3">
              {isExpanded ? (
                <Eye className="w-5 h-5 text-jonquil group-hover:text-aureolin transition-colors" />
              ) : (
                <EyeOff className="w-5 h-5 text-jonquil group-hover:text-aureolin transition-colors" />
              )}
              <span className="text-eerie-black dark:text-timberwolf font-semibold group-hover:text-eerie-black dark:group-hover:text-aureolin transition-colors">
                {isExpanded ? 'Hide workflow details' : 'Show how it works step-by-step'}
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
          <div 
            className="relative"
            ref={containerRef}
          >
            <div className={cn(
              "flex transition-all duration-300",
              selectedNodeDetails ? "gap-8" : "justify-center"
            )}>
              {/* Graph Container */}
              <div className={cn(
                "flex-shrink-0 transition-all duration-300",
                selectedNodeDetails ? "w-80" : "w-full max-w-md"
              )}>
                <div className="relative bg-timberwolf/20 dark:bg-jet/20 rounded-xl p-8">
                  <div className="flex flex-col items-center space-y-6">
                    {workflow.nodes.map((node, index) => (
                      <div 
                        key={node.id} 
                        className="flex flex-col items-center w-full"
                        ref={(el) => { nodeRefs.current[node.id] = el; }}
                      >
                        {/* Node Container */}
                        <div className="relative w-full max-w-xs">
                          {/* Node Badge */}
                          <div className="absolute -top-3 -left-3 z-20">
                            <Badge 
                              variant="outline" 
                              className={cn(
                                "w-6 h-6 rounded-full p-0 flex items-center justify-center font-mono text-xs border-2 transition-all duration-300",
                                completedNodes.has(node.id) 
                                  ? "bg-jonquil text-eerie-black border-jonquil shadow-lg" 
                                  : currentNode === index
                                  ? "bg-aureolin text-eerie-black border-aureolin animate-pulse"
                                  : "bg-white dark:bg-eerie-black border-timberwolf dark:border-jet text-eerie-black dark:text-timberwolf"
                              )}
                            >
                              {index + 1}
                            </Badge>
                          </div>

                          {/* Execution Indicator */}
                          {currentNode === index && isRunning && (
                            <div className="absolute -inset-2 rounded-xl border-2 border-jonquil animate-pulse-yellow opacity-60"></div>
                          )}

                          {/* Node Component */}
                          <div className="relative z-10">
                            <WorkflowNode
                              node={node}
                              isCompleted={completedNodes.has(node.id)}
                              isExecuting={currentNode === index && isRunning}
                              isSelected={selectedNodeDetails === node.id}
                              onClick={() => handleNodeClick(node.id)}
                              className="w-full h-40"
                            />
                          </div>
                        </div>

                        {/* Vertical Connection Arrow */}
                        {index < workflow.nodes.length - 1 && (
                          <div className="flex flex-col items-center my-4">
                            <div className="relative w-1 h-12 bg-timberwolf dark:bg-jet rounded-full overflow-hidden">
                              <div className={cn(
                                "absolute inset-0 rounded-full transition-all duration-500",
                                completedNodes.has(node.id) 
                                  ? "bg-jonquil" 
                                  : "bg-timberwolf dark:bg-jet"
                              )}></div>
                              
                              {currentNode === index && isRunning && (
                                <div className="absolute inset-0">
                                  <div className="h-4 w-full bg-gradient-to-b from-transparent via-aureolin to-transparent animate-data-flow-vertical rounded-full"></div>
                                </div>
                              )}
                            </div>
                            
                            <div className={cn(
                              "w-0 h-0 border-l-2 border-r-2 border-t-4 border-l-transparent border-r-transparent transition-all duration-500 mt-1",
                              completedNodes.has(node.id) 
                                ? "border-t-jonquil" 
                                : "border-t-timberwolf dark:border-t-jet"
                            )}></div>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Node Details Panel */}
              {selectedNodeDetails && getSelectedNode() && (
                <div 
                  className="flex-1 min-w-0 animate-slide-down"
                  ref={detailsPanelRef}
                >
                  <NodeDetailsPanel
                    node={getSelectedNode()!}
                    isExecuting={isCurrentlyExecuting()}
                    isCompleted={isCurrentlyCompleted()}
                    isGeneratingOutput={isGeneratingOutput}
                    onClose={handleCloseDetails}
                  />
                </div>
              )}
            </div>
          </div>
        </CollapsibleContent>
      </Collapsible>
    </Card>
  );
}