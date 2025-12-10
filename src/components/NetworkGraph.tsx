'use client';

import { motion } from 'framer-motion';
import { useEffect, useRef, useState } from 'react';
import { getPerformanceMetrics } from '@/data/performanceMetrics';
import { useNetworkGraph } from '@/hooks/useNetworkGraph';
import { NETWORK_GRAPH_ANIMATION } from '@/config/visualization.config';
import { NetworkBackground } from './network-graph/NetworkBackground';
import { NetworkConnection } from './network-graph/NetworkConnection';
import { NetworkNode } from './network-graph/NetworkNode';
import { IntentExecutionPanel } from './network-graph/IntentExecutionPanel';
import { PerformanceMetrics } from './network-graph/PerformanceMetrics';
import { AIStatusIndicator } from './network-graph/AIStatusIndicator';
import { InteractionHint } from './network-graph/InteractionHint';

export function NetworkGraph() {
  const [isMobile, setIsMobile] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  // Responsive layout detection
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };

    checkMobile();
    let timeoutId: NodeJS.Timeout;
    const throttledResize = () => {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(checkMobile, NETWORK_GRAPH_ANIMATION.RESIZE_THROTTLE);
    };

    window.addEventListener('resize', throttledResize);
    return () => {
      window.removeEventListener('resize', throttledResize);
      clearTimeout(timeoutId);
    };
  }, []);

  const {
    nodes,
    connections,
    activeNode,
    setActiveNode,
    focusedNodeIndex,
    setFocusedNodeIndex,
    currentFlowData,
    isExecuting,
    executionProgress,
    getNodePosition,
  } = useNetworkGraph(isMobile);

  const performanceMetrics = getPerformanceMetrics();

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (!containerRef.current?.contains(document.activeElement)) return;

      switch (event.key) {
        case 'ArrowRight':
        case 'ArrowDown':
          event.preventDefault();
          setFocusedNodeIndex(prev => (prev < nodes.length - 1 ? prev + 1 : 0));
          break;
        case 'ArrowLeft':
        case 'ArrowUp':
          event.preventDefault();
          setFocusedNodeIndex(prev => (prev > 0 ? prev - 1 : nodes.length - 1));
          break;
        case 'Enter':
        case ' ':
          event.preventDefault();
          if (focusedNodeIndex >= 0) {
            setActiveNode(nodes[focusedNodeIndex].id);
          }
          break;
        case 'Escape':
          event.preventDefault();
          setActiveNode(null);
          setFocusedNodeIndex(-1);
          break;
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [nodes, focusedNodeIndex, setActiveNode, setFocusedNodeIndex]);

  return (
    <motion.div
      ref={containerRef}
      className={`relative w-full ${isMobile ? 'h-[400px]' : 'h-[600px]'} bg-gradient-to-br from-gray-900 via-purple-900/20 to-blue-900/20 rounded-2xl overflow-hidden`}
      initial={{ opacity: 0, scale: 0.9 }}
      whileInView={{ opacity: 1, scale: 1 }}
      transition={{ duration: 1 }}
      viewport={{ once: true }}
      role="img"
      aria-label="Interactive network graph showing DeFi protocol connections and intent-based execution flows"
      tabIndex={0}
    >
      <NetworkBackground />

      {/* Network Visualization */}
      <svg className="absolute inset-0 w-full h-full">
        {connections.map(connection => (
          <NetworkConnection
            key={`${connection.from}-${connection.to}`}
            connection={connection}
            fromPos={getNodePosition(connection.from)}
            toPos={getNodePosition(connection.to)}
          />
        ))}
      </svg>

      {/* Nodes */}
      {nodes.map((node, index) => (
        <NetworkNode
          key={node.id}
          index={index}
          node={node}
          isActive={activeNode === node.id}
          isFocused={focusedNodeIndex === index}
          hasActiveConnection={connections.some(
            c => (c.from === node.id || c.to === node.id) && c.animated
          )}
          onClick={id => setActiveNode(activeNode === id ? null : id)}
          onHoverStart={setActiveNode}
          onHoverEnd={() => setActiveNode(null)}
          onFocus={() => setFocusedNodeIndex(index)}
        />
      ))}

      <IntentExecutionPanel
        isMobile={isMobile}
        isExecuting={isExecuting}
        executionProgress={executionProgress}
        currentFlowData={currentFlowData}
      />

      <PerformanceMetrics isMobile={isMobile} metrics={performanceMetrics} />

      <AIStatusIndicator isMobile={isMobile} isExecuting={isExecuting} />

      <InteractionHint isMobile={isMobile} />

      {/* Screen reader announcements for dynamic updates */}
      <div className="sr-only" aria-live="polite" aria-atomic="true">
        {isExecuting &&
          `Executing ${currentFlowData.name}: ${Math.round(executionProgress)}% complete`}
      </div>

      {/* Ambient pulse effect */}
      <motion.div
        className="absolute left-1/2 top-1/2 w-40 h-40 rounded-full transform -translate-x-1/2 -translate-y-1/2 pointer-events-none"
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.1, 0.3, 0.1],
        }}
        transition={{
          duration: 4,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
        style={{
          background: 'radial-gradient(circle, rgba(139, 92, 246, 0.3) 0%, transparent 70%)',
        }}
      />
    </motion.div>
  );
}
