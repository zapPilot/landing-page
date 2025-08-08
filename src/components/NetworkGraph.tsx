'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { useEffect, useState, useRef, useCallback, useMemo } from 'react';
import { Activity, Brain } from 'lucide-react';
import { getNetworkNodes, initialConnections, type Connection } from '@/data/networkNodes';
import { getCurrentIntentFlow, getIntentFlowsCount } from '@/data/intentFlows';
import { getPerformanceMetrics } from '@/data/performanceMetrics';

export function NetworkGraph() {
  const [activeNode, setActiveNode] = useState<string | null>(null);
  const [currentFlow, setCurrentFlow] = useState(0);
  const [executionProgress, setExecutionProgress] = useState(0);
  const [isExecuting, setIsExecuting] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [focusedNodeIndex, setFocusedNodeIndex] = useState(-1);
  const containerRef = useRef<HTMLDivElement>(null);
  const valueProps = [
    'Your DeFi, On Autopilot ✈️',
    'Cut portfolio rebalancing from 30 minutes to 30 seconds.',
    'Move your crypto across chains into higher-yield pools — in one click.',
    'Every token stays in your own wallet.',
  ];
  const [valuePropIndex, setValuePropIndex] = useState(0);

  // Responsive layout detection with optimization
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };

    checkMobile();

    // Throttle resize events for better performance
    let timeoutId: NodeJS.Timeout;
    const throttledResize = () => {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(checkMobile, 150);
    };

    window.addEventListener('resize', throttledResize);
    return () => {
      window.removeEventListener('resize', throttledResize);
      clearTimeout(timeoutId);
    };
  }, []);

  // Memoize nodes to prevent unnecessary re-renders
  const nodes = useMemo(() => getNetworkNodes(isMobile), [isMobile]);

  useEffect(() => {
    const interval = setInterval(
      () => setValuePropIndex(prev => (prev + 1) % valueProps.length),
      4000
    );
    return () => clearInterval(interval);
  }, [valueProps.length]);

  // Enhanced connections with strength and routing data
  const [connections, setConnections] = useState<Connection[]>(
    initialConnections.map(conn => ({ ...conn, animated: false }))
  );

  // Animate intent execution flows
  useEffect(() => {
    const interval = setInterval(() => {
      setIsExecuting(true);
      setExecutionProgress(0);

      // Reset all connections
      setConnections(prev => prev.map(conn => ({ ...conn, animated: false })));

      // Start new flow animation
      setTimeout(() => {
        const currentFlowData = getCurrentIntentFlow(currentFlow);
        const progressInterval = setInterval(() => {
          setExecutionProgress(prev => {
            if (prev >= 100) {
              clearInterval(progressInterval);
              setIsExecuting(false);
              return 100;
            }
            return prev + 2;
          });
        }, 40);

        // Animate current flow path
        setConnections(prev =>
          prev.map(conn => {
            const isInPath = currentFlowData.path.some((node, index) => {
              const nextNode = currentFlowData.path[index + 1];
              return (
                nextNode &&
                ((conn.from === node && conn.to === nextNode) ||
                  (conn.from === nextNode && conn.to === node))
              );
            });
            return {
              ...conn,
              animated: isInPath,
              strength: isInPath ? 1 : conn.strength,
            };
          })
        );

        // Move to next flow
        setTimeout(() => {
          setCurrentFlow(prev => (prev + 1) % getIntentFlowsCount());
        }, 1000);
      }, 500);
    }, 4000);

    return () => clearInterval(interval);
  }, [currentFlow]);

  // Memoized node position helper for performance
  const getNodePosition = useCallback(
    (nodeId: string) => {
      const node = nodes.find(n => n.id === nodeId);
      return node ? { x: node.x, y: node.y } : { x: 0, y: 0 };
    },
    [nodes]
  );

  // Memoize current flow data to prevent unnecessary re-renders
  const currentFlowData = useMemo(() => getCurrentIntentFlow(currentFlow), [currentFlow]);

  // Memoize performance metrics to prevent unnecessary re-renders
  const performanceMetrics = useMemo(() => getPerformanceMetrics(), []);

  // Keyboard navigation for accessibility
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
  }, [nodes, focusedNodeIndex]);

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
      {/* Enhanced Background Grid */}
      <div className="absolute inset-0 opacity-20">
        <svg width="100%" height="100%">
          <defs>
            <pattern id="grid" width="30" height="30" patternUnits="userSpaceOnUse">
              <path d="M 30 0 L 0 0 0 30" fill="none" stroke="#8B5CF6" strokeWidth="0.5" />
            </pattern>
            <pattern id="dots" width="60" height="60" patternUnits="userSpaceOnUse">
              <circle cx="30" cy="30" r="1" fill="#8B5CF6" opacity="0.3" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#grid)" />
          <rect width="100%" height="100%" fill="url(#dots)" />
        </svg>
      </div>

      {/* Network Visualization */}
      <svg className="absolute inset-0 w-full h-full">
        {/* Enhanced Connections */}
        {connections.map(connection => {
          const fromPos = getNodePosition(connection.from);
          const toPos = getNodePosition(connection.to);

          return (
            <g key={`${connection.from}-${connection.to}`}>
              {/* Base line */}
              <line
                x1={fromPos.x}
                y1={fromPos.y}
                x2={toPos.x}
                y2={toPos.y}
                stroke="#374151"
                strokeWidth={1 + connection.strength}
                opacity="0.4"
              />

              {/* Animated flow line */}
              {connection.animated && (
                <motion.line
                  x1={fromPos.x}
                  y1={fromPos.y}
                  x2={toPos.x}
                  y2={toPos.y}
                  stroke={connection.color}
                  strokeWidth={3}
                  initial={{ pathLength: 0, opacity: 0 }}
                  animate={{ pathLength: 1, opacity: 1 }}
                  transition={{ duration: 0.8, ease: 'easeInOut' }}
                />
              )}

              {/* Data packet animation with enhanced visuals */}
              {connection.animated && (
                <>
                  <motion.circle
                    r="6"
                    fill={connection.color}
                    initial={{
                      x: fromPos.x,
                      y: fromPos.y,
                      opacity: 0,
                    }}
                    animate={{
                      x: toPos.x,
                      y: toPos.y,
                      opacity: [0, 1, 1, 0],
                    }}
                    transition={{
                      duration: 1.5,
                      ease: 'easeInOut',
                      delay: 0.3,
                    }}
                  />
                  <motion.circle
                    r="12"
                    fill="none"
                    stroke={connection.color}
                    strokeWidth="2"
                    opacity="0.5"
                    initial={{
                      x: fromPos.x,
                      y: fromPos.y,
                      scale: 0,
                    }}
                    animate={{
                      x: toPos.x,
                      y: toPos.y,
                      scale: [0, 1, 0],
                    }}
                    transition={{
                      duration: 1.5,
                      ease: 'easeInOut',
                      delay: 0.3,
                    }}
                  />
                </>
              )}
            </g>
          );
        })}
      </svg>

      {/* Enhanced Nodes */}
      {nodes.map((node, index) => (
        <motion.div
          key={node.id}
          className={`absolute transform -translate-x-1/2 -translate-y-1/2 cursor-pointer group ${
            focusedNodeIndex === index ? 'ring-2 ring-purple-400 ring-opacity-75' : ''
          }`}
          style={{ left: node.x, top: node.y }}
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: index * 0.1, duration: 0.6 }}
          whileHover={{ scale: 1.15, zIndex: 50 }}
          onHoverStart={() => setActiveNode(node.id)}
          onHoverEnd={() => setActiveNode(null)}
          role="button"
          aria-label={`${node.label} - ${node.type} ${node.apy ? `with ${node.apy} APY` : ''}`}
          tabIndex={focusedNodeIndex === index ? 0 : -1}
          onClick={() => setActiveNode(activeNode === node.id ? null : node.id)}
          onFocus={() => setFocusedNodeIndex(index)}
        >
          {/* Enhanced Node circle */}
          <motion.div
            className={`relative rounded-full border-2 flex items-center justify-center text-white font-bold backdrop-blur-lg shadow-2xl`}
            style={{
              width: node.size,
              height: node.size,
              backgroundColor: `${node.color}60`,
              borderColor: node.color,
              boxShadow: `0 0 30px ${node.color}40`,
            }}
            animate={
              activeNode === node.id
                ? {
                    boxShadow: [
                      `0 0 30px ${node.color}40`,
                      `0 0 60px ${node.color}80`,
                      `0 0 30px ${node.color}40`,
                    ],
                    borderWidth: [2, 4, 2],
                  }
                : {}
            }
            transition={{ duration: 1, repeat: activeNode === node.id ? Infinity : 0 }}
          >
            <span className="text-sm relative z-10">{node.icon}</span>

            {/* Enhanced pulse effect */}
            <motion.div
              className="absolute inset-0 rounded-full border-2"
              style={{ borderColor: node.color }}
              animate={{
                scale: [1, 2, 1],
                opacity: [0.6, 0, 0.6],
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                ease: 'easeInOut',
                delay: index * 0.5,
              }}
            />

            {/* Status indicator for active flows */}
            {connections.some(c => (c.from === node.id || c.to === node.id) && c.animated) && (
              <motion.div
                className="absolute -top-1 -right-1 w-3 h-3 bg-green-400 rounded-full"
                animate={{ scale: [1, 1.3, 1] }}
                transition={{ duration: 0.6, repeat: Infinity }}
              />
            )}
          </motion.div>

          {/* Enhanced Node tooltip */}
          {activeNode === node.id && (
            <motion.div
              className="absolute top-full mt-3 left-1/2 transform -translate-x-1/2 bg-gray-900/95 backdrop-blur-lg border border-gray-700 rounded-xl p-4 min-w-[200px] z-50 shadow-2xl"
              initial={{ opacity: 0, y: -10, scale: 0.8 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -10, scale: 0.8 }}
            >
              <div className="text-center">
                <div className="text-white font-bold text-sm mb-1">{node.label}</div>
                {node.apy && (
                  <div className="space-y-1">
                    <div className="flex justify-between text-xs">
                      <span className="text-gray-400">APY:</span>
                      <span className="text-green-400 font-semibold">{node.apy}</span>
                    </div>
                    <div className="flex justify-between text-xs">
                      <span className="text-gray-400">TVL:</span>
                      <span className="text-blue-400 font-semibold">{node.tvl}</span>
                    </div>
                  </div>
                )}
                {node.status && (
                  <div
                    className={`text-xs mt-2 px-2 py-1 rounded-full ${
                      node.status === 'active'
                        ? 'bg-green-500/20 text-green-400'
                        : node.status === 'mainnet'
                          ? 'bg-blue-500/20 text-blue-400'
                          : 'bg-purple-500/20 text-purple-400'
                    }`}
                  >
                    {node.status.toUpperCase()}
                  </div>
                )}
              </div>
              {/* Arrow */}
              <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-full w-0 h-0 border-l-4 border-r-4 border-b-4 border-transparent border-b-gray-700" />
            </motion.div>
          )}
        </motion.div>
      ))}

      {/* Compact Intent Execution Panel - Bottom */}
      <motion.div
        key={currentFlow}
        className={`absolute ${isMobile ? 'bottom-3 left-3 right-3 p-2' : 'bottom-4 left-4 right-4 p-3'} bg-gray-900/95 backdrop-blur-lg border border-purple-500/30 rounded-xl shadow-2xl`}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center space-x-2">
            <Brain className="w-4 h-4 text-purple-400" />
            <h3 className="text-white font-bold text-xs">Intent Execution</h3>
          </div>
          <div className="flex items-center space-x-2">
            <div
              className={`w-2 h-2 rounded-full animate-pulse ${
                isExecuting ? 'bg-yellow-400' : 'bg-green-400'
              }`}
            />
            <span
              className={`text-xs font-medium ${
                isExecuting ? 'text-yellow-400' : 'text-green-400'
              }`}
            >
              {isExecuting ? 'Executing' : 'Ready'}
            </span>
          </div>
        </div>

        <div className="flex flex-col lg:flex-row lg:items-center lg:space-x-4 space-y-2 lg:space-y-0">
          {/* User Intent - Compact */}
          <div className="flex-1 bg-purple-500/10 rounded-lg p-2 border border-purple-500/20">
            <div className="text-purple-300 text-xs font-medium mb-1">Intent</div>
            <div className="text-white text-xs italic truncate">{currentFlowData.userIntent}</div>
          </div>

          {/* Execution Details - Horizontal */}
          <div className="flex space-x-2 lg:space-x-3">
            <div className="bg-gray-800/50 rounded-lg p-2 min-w-[60px]">
              <div className="text-gray-400 text-xs">Value</div>
              <div className="text-white font-bold text-xs">{currentFlowData.value}</div>
            </div>
            <div className="bg-gray-800/50 rounded-lg p-2 min-w-[50px]">
              <div className="text-gray-400 text-xs">APY</div>
              <div className="text-green-400 font-bold text-xs">{currentFlowData.apy}</div>
            </div>
            <div className="bg-gray-800/50 rounded-lg p-2 min-w-[50px]">
              <div className="text-gray-400 text-xs">Time</div>
              <div className="text-blue-400 font-bold text-xs">{currentFlowData.executionTime}</div>
            </div>
            <div className="bg-gray-800/50 rounded-lg p-2 min-w-[50px]">
              <div className="text-gray-400 text-xs">Gas</div>
              <div className="text-purple-400 font-bold text-xs">
                {currentFlowData.gasOptimized}
              </div>
            </div>
          </div>

          {/* Execution Progress - Compact */}
          {isExecuting && (
            <div className="flex items-center space-x-2 min-w-[100px]">
              <div className="flex-1 bg-gray-700 rounded-full h-2">
                <motion.div
                  className="h-2 bg-gradient-to-r from-purple-500 to-blue-500 rounded-full"
                  initial={{ width: 0 }}
                  animate={{ width: `${executionProgress}%` }}
                  transition={{ duration: 0.1 }}
                />
              </div>
              <span className="text-white text-xs font-medium">
                {Math.round(executionProgress)}%
              </span>
            </div>
          )}
        </div>
      </motion.div>

      {/* Performance Metrics - Right Side */}
      <motion.div
        className={`absolute ${isMobile ? 'top-12 right-3 space-y-2' : 'top-16 right-6 space-y-3'}`}
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 1.2 }}
      >
        {performanceMetrics.map((metric, index) => (
          <motion.div
            key={metric.label}
            className={`bg-gray-900/90 backdrop-blur-lg border border-gray-700/50 rounded-lg ${isMobile ? 'p-2 min-w-[90px]' : 'p-3 min-w-[120px]'} shadow-lg`}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 1.4 + index * 0.1 }}
            whileHover={{ scale: 1.05, borderColor: '#8B5CF6' }}
          >
            <div className="flex items-center justify-between mb-1">
              <metric.icon className={`w-4 h-4 ${metric.color}`} />
              <span className={`font-bold ${metric.color}`}>{metric.value}</span>
            </div>
            <div className="text-gray-400 text-xs">{metric.label}</div>
          </motion.div>
        ))}
      </motion.div>

      {/* AI Status Indicator */}
      <motion.div
        className={`absolute ${isMobile ? 'top-3 right-3 px-3 py-1' : 'top-6 right-6 px-4 py-2'} bg-gray-900/90 backdrop-blur-lg border border-green-500/30 rounded-full flex items-center space-x-2 shadow-lg`}
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1 }}
      >
        <motion.div
          animate={{
            rotate: isExecuting ? 360 : 0,
            scale: isExecuting ? [1, 1.2, 1] : 1,
          }}
          transition={{
            rotate: { duration: 2, repeat: isExecuting ? Infinity : 0, ease: 'linear' },
            scale: { duration: 1, repeat: isExecuting ? Infinity : 0 },
          }}
        >
          <Brain className="w-4 h-4 text-green-400" />
        </motion.div>
        <span className="text-green-400 text-sm font-medium">Autopilot Triggered</span>
      </motion.div>

      {/* Value Proposition Rotator */}
      <AnimatePresence mode="wait">
        <motion.div
          key={valuePropIndex}
          className={`absolute ${isMobile ? 'top-3 left-3 right-3' : 'top-6 left-6 max-w-xs'}`}
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 10 }}
          transition={{ duration: 0.5 }}
        >
          <p className="text-gray-200 text-sm leading-snug">{valueProps[valuePropIndex]}</p>
        </motion.div>
      </AnimatePresence>

      {/* Interaction Hint */}
      {!isMobile && (
        <motion.div
          className="absolute top-16 left-6 text-gray-400 text-xs flex items-center space-x-2"
          animate={{ opacity: [0.5, 1, 0.5] }}
          transition={{ duration: 3, repeat: Infinity }}
        >
          <span>Hover nodes • Watch real-time execution • Use arrow keys to navigate</span>
          <Activity className="w-3 h-3" />
        </motion.div>
      )}

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
