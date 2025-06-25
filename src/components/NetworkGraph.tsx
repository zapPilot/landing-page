'use client';

import { motion } from 'framer-motion';
import { useEffect, useState, useRef, useCallback, useMemo } from 'react';
import { Zap, TrendingUp, Shield, Activity, Brain, DollarSign } from 'lucide-react';

interface Node {
  id: string;
  x: number;
  y: number;
  label: string;
  type: 'protocol' | 'chain' | 'user' | 'intent';
  color: string;
  size: number;
  icon?: string;
  apy?: string;
  tvl?: string;
  status?: string;
}

interface Connection {
  from: string;
  to: string;
  animated: boolean;
  color: string;
  strength: number;
}

interface IntentFlow {
  id: string;
  name: string;
  userIntent: string;
  path: string[];
  value: string;
  apy: string;
  executionTime: string;
  gasOptimized: string;
  status: 'executing' | 'completed' | 'optimizing';
  steps: string[];
}

export function NetworkGraph() {
  const [activeNode, setActiveNode] = useState<string | null>(null);
  const [currentFlow, setCurrentFlow] = useState(0);
  const [executionProgress, setExecutionProgress] = useState(0);
  const [isExecuting, setIsExecuting] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [focusedNodeIndex, setFocusedNodeIndex] = useState(-1);
  const containerRef = useRef<HTMLDivElement>(null);

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

  // Enhanced network nodes with responsive positioning
  const getResponsiveNodes = useCallback((): Node[] => {
    const baseNodes = [
      // User/Portfolio Intent node (center)
      { 
        id: 'user', 
        x: isMobile ? 200 : 300, 
        y: isMobile ? 200 : 250, 
        label: 'Portfolio Intent', 
        type: 'intent' as const, 
        color: '#8B5CF6', 
        size: isMobile ? 50 : 70, 
        icon: '💼' 
      },
      
      // DeFi Protocol nodes with responsive positioning
      { 
        id: 'uniswap', 
        x: isMobile ? 100 : 150, 
        y: isMobile ? 120 : 150, 
        label: 'Uniswap V3', 
        type: 'protocol' as const, 
        color: '#FF007A', 
        size: isMobile ? 32 : 45, 
        icon: '🦄',
        apy: '18.4%',
        tvl: '$3.2B',
        status: 'active'
      },
      { 
        id: 'aave', 
        x: isMobile ? 300 : 450, 
        y: isMobile ? 120 : 150, 
        label: 'Aave V3', 
        type: 'protocol' as const, 
        color: '#B6509E', 
        size: isMobile ? 32 : 45, 
        icon: '👻',
        apy: '5.8%',
        tvl: '$5.1B',
        status: 'active'
      },
      { 
        id: 'compound', 
        x: isMobile ? 100 : 150, 
        y: isMobile ? 280 : 350, 
        label: 'Compound', 
        type: 'protocol' as const, 
        color: '#00D395', 
        size: isMobile ? 28 : 40, 
        icon: '🏛️',
        apy: '4.2%',
        tvl: '$1.8B',
        status: 'active'
      },
      { 
        id: 'curve', 
        x: isMobile ? 300 : 450, 
        y: isMobile ? 280 : 350, 
        label: 'Curve', 
        type: 'protocol' as const, 
        color: '#FD0D2C', 
        size: isMobile ? 30 : 42, 
        icon: '📈',
        apy: '12.1%',
        tvl: '$2.9B',
        status: 'active'
      },
      { 
        id: 'morpho', 
        x: isMobile ? 60 : 100, 
        y: isMobile ? 200 : 250, 
        label: 'Morpho', 
        type: 'protocol' as const, 
        color: '#00C4FF', 
        size: isMobile ? 25 : 35, 
        icon: '🔷',
        apy: '8.9%',
        tvl: '$890M',
        status: 'active'
      },
      
      // Chain nodes with responsive positioning
      { 
        id: 'ethereum', 
        x: isMobile ? 150 : 200, 
        y: isMobile ? 80 : 100, 
        label: 'Ethereum', 
        type: 'chain' as const, 
        color: '#627EEA', 
        size: isMobile ? 28 : 38, 
        icon: 'Ξ',
        status: 'mainnet'
      },
      { 
        id: 'polygon', 
        x: isMobile ? 340 : 500, 
        y: isMobile ? 200 : 250, 
        label: 'Polygon', 
        type: 'chain' as const, 
        color: '#8247E5', 
        size: isMobile ? 26 : 36, 
        icon: '⬟',
        status: 'l2'
      },
      { 
        id: 'arbitrum', 
        x: isMobile ? 250 : 350, 
        y: isMobile ? 80 : 100, 
        label: 'Arbitrum', 
        type: 'chain' as const, 
        color: '#213147', 
        size: isMobile ? 26 : 36, 
        icon: '🔷',
        status: 'l2'
      },
      { 
        id: 'base', 
        x: isMobile ? 270 : 400, 
        y: isMobile ? 320 : 400, 
        label: 'Base', 
        type: 'chain' as const, 
        color: '#0052FF', 
        size: isMobile ? 24 : 34, 
        icon: '🔵',
        status: 'l2'
      },
    ];
    
    return baseNodes;
  }, [isMobile]);

  // Memoize nodes to prevent unnecessary re-renders
  const nodes = useMemo(() => getResponsiveNodes(), [getResponsiveNodes]);

  // Enhanced connections with strength and routing data
  const [connections, setConnections] = useState<Connection[]>([
    { from: 'user', to: 'uniswap', animated: false, color: '#8B5CF6', strength: 0.8 },
    { from: 'user', to: 'aave', animated: false, color: '#8B5CF6', strength: 0.9 },
    { from: 'user', to: 'compound', animated: false, color: '#8B5CF6', strength: 0.6 },
    { from: 'user', to: 'curve', animated: false, color: '#8B5CF6', strength: 0.7 },
    { from: 'user', to: 'morpho', animated: false, color: '#8B5CF6', strength: 0.5 },
    { from: 'uniswap', to: 'ethereum', animated: false, color: '#627EEA', strength: 0.9 },
    { from: 'aave', to: 'polygon', animated: false, color: '#8247E5', strength: 0.8 },
    { from: 'compound', to: 'arbitrum', animated: false, color: '#213147', strength: 0.7 },
    { from: 'curve', to: 'base', animated: false, color: '#0052FF', strength: 0.6 },
    { from: 'morpho', to: 'ethereum', animated: false, color: '#627EEA', strength: 0.5 },
  ]);

  // Portfolio-based intent execution flows
  const intentFlows: IntentFlow[] = useMemo(() => [
    {
      id: 'multi-chain-diversification',
      name: 'Multi-Chain Stablecoin Portfolio',
      userIntent: '"Diversify my stablecoins across multiple chains and pools"',
      path: ['user', 'aave', 'polygon'],
      value: '$25,000',
      apy: '9.8%',
      executionTime: '1.4s',
      gasOptimized: '78%',
      status: 'executing',
      steps: [
        'Analyzing optimal chain allocation',
        'Splitting funds across Polygon, Arbitrum, Base',
        'Deploying to highest-yield stable pools',
        'Setting up cross-chain rebalancing'
      ]
    },
    {
      id: 'crypto-index-fund',
      name: 'Crypto Index Fund + Liquidity Mining',
      userIntent: '"Create a crypto index fund with liquidity mining rewards"',
      path: ['user', 'uniswap', 'ethereum'],
      value: '$50,000',
      apy: '14.2%',
      executionTime: '2.1s',
      gasOptimized: '65%',
      status: 'completed',
      steps: [
        'Building diversified crypto portfolio',
        'Allocating to top 10 assets by market cap',
        'Adding liquidity to high-yield pairs',
        'Optimizing for farming rewards'
      ]
    },
    {
      id: 'custom-portfolio',
      name: 'Custom Portfolio Strategy',
      userIntent: '"Build my own portfolio with specific chains and pools"',
      path: ['user', 'curve', 'base'],
      value: '$35,750',
      apy: '11.6%',
      executionTime: '1.8s',
      gasOptimized: '82%',
      status: 'optimizing',
      steps: [
        'Processing custom allocation preferences',
        'Selecting Ethereum, Base, and Arbitrum',
        'Deploying to chosen DeFi protocols',
        'Implementing automated rebalancing'
      ]
    },
    {
      id: 'yield-portfolio',
      name: 'High-Yield Portfolio Optimization',
      userIntent: '"Maximize yields across my entire portfolio automatically"',
      path: ['user', 'morpho', 'ethereum'],
      value: '$42,500',
      apy: '13.7%',
      executionTime: '1.6s',
      gasOptimized: '73%',
      status: 'executing',
      steps: [
        'Scanning all available yield opportunities',
        'Optimizing allocation across protocols',
        'Implementing dynamic yield farming',
        'Setting up automated compounding'
      ]
    }
  ], []);

  // Animate intent execution flows
  useEffect(() => {
    const interval = setInterval(() => {
      setIsExecuting(true);
      setExecutionProgress(0);
      
      // Reset all connections
      setConnections(prev => prev.map(conn => ({ ...conn, animated: false })));
      
      // Start new flow animation
      setTimeout(() => {
        const currentFlowData = intentFlows[currentFlow];
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
        setConnections(prev => prev.map(conn => {
          const isInPath = currentFlowData.path.some((node, index) => {
            const nextNode = currentFlowData.path[index + 1];
            return nextNode && ((conn.from === node && conn.to === nextNode) || 
                                 (conn.from === nextNode && conn.to === node));
          });
          return { 
            ...conn, 
            animated: isInPath,
            strength: isInPath ? 1 : conn.strength
          };
        }));
        
        // Move to next flow
        setTimeout(() => {
          setCurrentFlow((prev) => (prev + 1) % intentFlows.length);
        }, 1000);
      }, 500);
    }, 4000);

    return () => clearInterval(interval);
  }, [currentFlow, intentFlows]);

  // Memoized node position helper for performance
  const getNodePosition = useCallback((nodeId: string) => {
    const node = nodes.find(n => n.id === nodeId);
    return node ? { x: node.x, y: node.y } : { x: 0, y: 0 };
  }, [nodes]);

  // Memoize current flow data to prevent unnecessary re-renders
  const currentFlowData = useMemo(() => intentFlows[currentFlow], [currentFlow, intentFlows]);
  
  // Memoize performance metrics to prevent unnecessary re-renders
  const performanceMetrics = useMemo(() => [
    { icon: TrendingUp, label: 'Avg APY', value: '11.8%', color: 'text-green-400' },
    { icon: Shield, label: 'Success Rate', value: '99.7%', color: 'text-blue-400' },
    { icon: Zap, label: 'Avg Speed', value: '1.4s', color: 'text-yellow-400' },
    { icon: DollarSign, label: 'Gas Saved', value: '73%', color: 'text-purple-400' },
  ], []);

  // Keyboard navigation for accessibility
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (!containerRef.current?.contains(document.activeElement)) return;
      
      switch (event.key) {
        case 'ArrowRight':
        case 'ArrowDown':
          event.preventDefault();
          setFocusedNodeIndex(prev => 
            prev < nodes.length - 1 ? prev + 1 : 0
          );
          break;
        case 'ArrowLeft':
        case 'ArrowUp':
          event.preventDefault();
          setFocusedNodeIndex(prev => 
            prev > 0 ? prev - 1 : nodes.length - 1
          );
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
              <path d="M 30 0 L 0 0 0 30" fill="none" stroke="#8B5CF6" strokeWidth="0.5"/>
            </pattern>
            <pattern id="dots" width="60" height="60" patternUnits="userSpaceOnUse">
              <circle cx="30" cy="30" r="1" fill="#8B5CF6" opacity="0.3"/>
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#grid)" />
          <rect width="100%" height="100%" fill="url(#dots)" />
        </svg>
      </div>

      {/* Network Visualization */}
      <svg className="absolute inset-0 w-full h-full">
        {/* Enhanced Connections */}
        {connections.map((connection) => {
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
                  transition={{ duration: 0.8, ease: "easeInOut" }}
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
                      opacity: 0 
                    }}
                    animate={{ 
                      x: toPos.x, 
                      y: toPos.y,
                      opacity: [0, 1, 1, 0]
                    }}
                    transition={{ 
                      duration: 1.5, 
                      ease: "easeInOut",
                      delay: 0.3
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
                      scale: 0 
                    }}
                    animate={{ 
                      x: toPos.x, 
                      y: toPos.y,
                      scale: [0, 1, 0]
                    }}
                    transition={{ 
                      duration: 1.5, 
                      ease: "easeInOut",
                      delay: 0.3
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
              boxShadow: `0 0 30px ${node.color}40`
            }}
            animate={activeNode === node.id ? { 
              boxShadow: [`0 0 30px ${node.color}40`, `0 0 60px ${node.color}80`, `0 0 30px ${node.color}40`],
              borderWidth: [2, 4, 2]
            } : {}}
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
                ease: "easeInOut",
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
                  <div className={`text-xs mt-2 px-2 py-1 rounded-full ${
                    node.status === 'active' ? 'bg-green-500/20 text-green-400' :
                    node.status === 'mainnet' ? 'bg-blue-500/20 text-blue-400' :
                    'bg-purple-500/20 text-purple-400'
                  }`}>
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

      {/* Enhanced Intent Execution Panel */}
      <motion.div
        key={currentFlow}
        className={`absolute ${isMobile ? 'top-3 left-3 p-3 min-w-[280px]' : 'top-6 left-6 p-6 min-w-[320px]'} bg-gray-900/95 backdrop-blur-lg border border-purple-500/30 rounded-2xl shadow-2xl`}
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-2">
            <Brain className="w-5 h-5 text-purple-400" />
            <h3 className="text-white font-bold text-sm">Intent Execution</h3>
          </div>
          <div className="flex items-center space-x-2">
            <div className={`w-2 h-2 rounded-full animate-pulse ${
              isExecuting ? 'bg-yellow-400' : 'bg-green-400'
            }`} />
            <span className={`text-xs font-medium ${
              isExecuting ? 'text-yellow-400' : 'text-green-400'
            }`}>
              {isExecuting ? 'Executing' : 'Ready'}
            </span>
          </div>
        </div>

        <div className="space-y-4">
          {/* User Intent */}
          <div className="bg-purple-500/10 rounded-lg p-3 border border-purple-500/20">
            <div className="text-purple-300 text-xs font-medium mb-1">User Intent</div>
            <div className="text-white text-sm italic">{currentFlowData.userIntent}</div>
          </div>

          {/* Execution Details */}
          <div className="grid grid-cols-2 gap-3">
            <div className="bg-gray-800/50 rounded-lg p-3">
              <div className="text-gray-400 text-xs">Value</div>
              <div className="text-white font-bold">{currentFlowData.value}</div>
            </div>
            <div className="bg-gray-800/50 rounded-lg p-3">
              <div className="text-gray-400 text-xs">Expected APY</div>
              <div className="text-green-400 font-bold">{currentFlowData.apy}</div>
            </div>
            <div className="bg-gray-800/50 rounded-lg p-3">
              <div className="text-gray-400 text-xs">Execution Time</div>
              <div className="text-blue-400 font-bold">{currentFlowData.executionTime}</div>
            </div>
            <div className="bg-gray-800/50 rounded-lg p-3">
              <div className="text-gray-400 text-xs">Gas Optimized</div>
              <div className="text-purple-400 font-bold">{currentFlowData.gasOptimized}</div>
            </div>
          </div>

          {/* Execution Progress */}
          {isExecuting && (
            <div className="space-y-2">
              <div className="flex justify-between text-xs">
                <span className="text-gray-400">Progress</span>
                <span className="text-white">{Math.round(executionProgress)}%</span>
              </div>
              <div className="w-full bg-gray-700 rounded-full h-2">
                <motion.div
                  className="h-2 bg-gradient-to-r from-purple-500 to-blue-500 rounded-full"
                  initial={{ width: 0 }}
                  animate={{ width: `${executionProgress}%` }}
                  transition={{ duration: 0.1 }}
                />
              </div>
              <div className="text-xs text-gray-400">
                {currentFlowData.steps[Math.floor(executionProgress / 25)] || 'Finalizing...'}
              </div>
            </div>
          )}
        </div>
      </motion.div>

      {/* Enhanced Performance Metrics */}
      <motion.div
        className={`absolute ${isMobile ? 'bottom-3 right-3 space-y-2' : 'bottom-6 right-6 space-y-3'}`}
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 1.2 }}
      >
        {performanceMetrics.map((metric, index) => (
          <motion.div
            key={metric.label}
            className={`bg-gray-900/90 backdrop-blur-lg border border-gray-700/50 rounded-lg ${isMobile ? 'p-2 min-w-[100px]' : 'p-3 min-w-[130px]'} shadow-lg`}
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
            scale: isExecuting ? [1, 1.2, 1] : 1
          }}
          transition={{ 
            rotate: { duration: 2, repeat: isExecuting ? Infinity : 0, ease: 'linear' },
            scale: { duration: 1, repeat: isExecuting ? Infinity : 0 }
          }}
        >
          <Brain className="w-4 h-4 text-green-400" />
        </motion.div>
        <span className="text-green-400 text-sm font-medium">AI Optimizing</span>
      </motion.div>

      {/* Interaction Hint */}
      {!isMobile && (
        <motion.div
          className="absolute bottom-6 left-6 text-gray-400 text-xs flex items-center space-x-2"
          animate={{ opacity: [0.5, 1, 0.5] }}
          transition={{ duration: 3, repeat: Infinity }}
        >
          <span>Hover nodes • Watch real-time execution • Use arrow keys to navigate</span>
          <Activity className="w-3 h-3" />
        </motion.div>
      )}

      {/* Screen reader announcements for dynamic updates */}
      <div 
        className="sr-only" 
        aria-live="polite" 
        aria-atomic="true"
      >
        {isExecuting && `Executing ${currentFlowData.name}: ${Math.round(executionProgress)}% complete`}
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
          ease: "easeInOut",
        }}
        style={{
          background: 'radial-gradient(circle, rgba(139, 92, 246, 0.3) 0%, transparent 70%)',
        }}
      />
    </motion.div>
  );
}