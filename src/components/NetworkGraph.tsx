'use client';

import { motion } from 'framer-motion';
import { useEffect, useState, useRef } from 'react';
import { Zap, TrendingUp, Shield, Activity } from 'lucide-react';

interface Node {
  id: string;
  x: number;
  y: number;
  label: string;
  type: 'protocol' | 'chain' | 'user';
  color: string;
  size: number;
  icon?: string;
}

interface Connection {
  from: string;
  to: string;
  animated: boolean;
  color: string;
}

export function NetworkGraph() {
  const [activeNode, setActiveNode] = useState<string | null>(null);
  const [currentFlow, setCurrentFlow] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);

  // Network nodes representing different DeFi protocols and chains
  const nodes: Node[] = [
    // User/Central node
    { id: 'user', x: 300, y: 250, label: 'Your Intent', type: 'user', color: '#8B5CF6', size: 60, icon: '👤' },
    
    // Protocol nodes
    { id: 'uniswap', x: 150, y: 150, label: 'Uniswap', type: 'protocol', color: '#FF007A', size: 40, icon: '🦄' },
    { id: 'aave', x: 450, y: 150, label: 'Aave', type: 'protocol', color: '#B6509E', size: 40, icon: '👻' },
    { id: 'compound', x: 150, y: 350, label: 'Compound', type: 'protocol', color: '#00D395', size: 40, icon: '🏛️' },
    { id: 'curve', x: 450, y: 350, label: 'Curve', type: 'protocol', color: '#FD0D2C', size: 40, icon: '📈' },
    
    // Chain nodes
    { id: 'ethereum', x: 100, y: 250, label: 'Ethereum', type: 'chain', color: '#627EEA', size: 35, icon: 'Ξ' },
    { id: 'polygon', x: 500, y: 250, label: 'Polygon', type: 'chain', color: '#8247E5', size: 35, icon: '⬟' },
    { id: 'arbitrum', x: 250, y: 100, label: 'Arbitrum', type: 'chain', color: '#213147', size: 35, icon: '🔷' },
    { id: 'optimism', x: 350, y: 400, label: 'Optimism', type: 'chain', color: '#FF0420', size: 35, icon: '🔴' },
  ];

  // Connections between nodes
  const [connections, setConnections] = useState<Connection[]>([
    { from: 'user', to: 'uniswap', animated: false, color: '#8B5CF6' },
    { from: 'user', to: 'aave', animated: false, color: '#8B5CF6' },
    { from: 'user', to: 'compound', animated: false, color: '#8B5CF6' },
    { from: 'user', to: 'curve', animated: false, color: '#8B5CF6' },
    { from: 'uniswap', to: 'ethereum', animated: false, color: '#627EEA' },
    { from: 'aave', to: 'polygon', animated: false, color: '#8247E5' },
    { from: 'compound', to: 'arbitrum', animated: false, color: '#213147' },
    { from: 'curve', to: 'optimism', animated: false, color: '#FF0420' },
  ]);

  // Data flows representing different portfolio strategies
  const dataFlows = [
    { name: 'BTC Accumulation', path: ['user', 'uniswap', 'ethereum'], value: '$12.4K', apy: '8.2%' },
    { name: 'Yield Farming', path: ['user', 'aave', 'polygon'], value: '$8.7K', apy: '12.1%' },
    { name: 'Stable Strategy', path: ['user', 'compound', 'arbitrum'], value: '$15.2K', apy: '5.8%' },
    { name: 'LP Rewards', path: ['user', 'curve', 'optimism'], value: '$9.1K', apy: '18.7%' },
  ];

  // Animate data flows
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentFlow((prev) => (prev + 1) % dataFlows.length);
      
      // Reset all connections
      setConnections(prev => prev.map(conn => ({ ...conn, animated: false })));
      
      // Animate current flow path
      setTimeout(() => {
        const currentFlowData = dataFlows[currentFlow];
        setConnections(prev => prev.map(conn => {
          const isInPath = currentFlowData.path.some((node, index) => {
            const nextNode = currentFlowData.path[index + 1];
            return nextNode && ((conn.from === node && conn.to === nextNode) || 
                                 (conn.from === nextNode && conn.to === node));
          });
          return { ...conn, animated: isInPath };
        }));
      }, 100);
    }, 3000);

    return () => clearInterval(interval);
  }, [currentFlow]);

  // Get node position
  const getNodePosition = (nodeId: string) => {
    const node = nodes.find(n => n.id === nodeId);
    return node ? { x: node.x, y: node.y } : { x: 0, y: 0 };
  };

  return (
    <motion.div
      ref={containerRef}
      className="relative w-full h-[600px] bg-gradient-to-br from-gray-900 via-purple-900/20 to-blue-900/20 rounded-2xl overflow-hidden"
      initial={{ opacity: 0, scale: 0.9 }}
      whileInView={{ opacity: 1, scale: 1 }}
      transition={{ duration: 1 }}
      viewport={{ once: true }}
    >
      {/* Background Grid */}
      <div className="absolute inset-0 opacity-10">
        <svg width="100%" height="100%">
          <defs>
            <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
              <path d="M 40 0 L 0 0 0 40" fill="none" stroke="#8B5CF6" strokeWidth="1"/>
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#grid)" />
        </svg>
      </div>

      {/* Network Visualization */}
      <svg className="absolute inset-0 w-full h-full">
        {/* Connections */}
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
                strokeWidth="2"
                opacity="0.3"
              />
              
              {/* Animated line */}
              {connection.animated && (
                <motion.line
                  x1={fromPos.x}
                  y1={fromPos.y}
                  x2={toPos.x}
                  y2={toPos.y}
                  stroke={connection.color}
                  strokeWidth="3"
                  initial={{ pathLength: 0, opacity: 0 }}
                  animate={{ pathLength: 1, opacity: 1 }}
                  transition={{ duration: 0.8, ease: "easeInOut" }}
                />
              )}
              
              {/* Data packet animation */}
              {connection.animated && (
                <motion.circle
                  r="4"
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
                    duration: 1.2, 
                    ease: "easeInOut",
                    delay: 0.3
                  }}
                />
              )}
            </g>
          );
        })}
      </svg>

      {/* Nodes */}
      {nodes.map((node, index) => (
        <motion.div
          key={node.id}
          className={`absolute transform -translate-x-1/2 -translate-y-1/2 cursor-pointer group`}
          style={{ left: node.x, top: node.y }}
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: index * 0.1, duration: 0.5 }}
          whileHover={{ scale: 1.2 }}
          onHoverStart={() => setActiveNode(node.id)}
          onHoverEnd={() => setActiveNode(null)}
        >
          {/* Node circle */}
          <motion.div
            className={`relative rounded-full border-2 flex items-center justify-center text-white font-bold backdrop-blur-lg`}
            style={{ 
              width: node.size, 
              height: node.size,
              backgroundColor: `${node.color}40`,
              borderColor: node.color,
              boxShadow: `0 0 20px ${node.color}40`
            }}
            animate={activeNode === node.id ? { 
              boxShadow: [`0 0 20px ${node.color}40`, `0 0 40px ${node.color}80`, `0 0 20px ${node.color}40`]
            } : {}}
            transition={{ duration: 1, repeat: activeNode === node.id ? Infinity : 0 }}
          >
            <span className="text-sm">{node.icon}</span>
            
            {/* Pulse effect */}
            <motion.div
              className="absolute inset-0 rounded-full border-2"
              style={{ borderColor: node.color }}
              animate={{
                scale: [1, 1.5, 1],
                opacity: [0.5, 0, 0.5],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut",
                delay: index * 0.3,
              }}
            />
          </motion.div>

          {/* Node label */}
          <motion.div
            className="absolute top-full mt-2 left-1/2 transform -translate-x-1/2 bg-gray-900/90 backdrop-blur-lg border border-gray-700 rounded-lg px-3 py-1 text-white text-xs font-medium whitespace-nowrap"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: activeNode === node.id ? 1 : 0.7, y: 0 }}
            transition={{ duration: 0.2 }}
          >
            {node.label}
          </motion.div>
        </motion.div>
      ))}

      {/* Current Flow Info */}
      <motion.div
        key={currentFlow}
        className="absolute top-6 left-6 bg-gray-900/90 backdrop-blur-lg border border-purple-500/30 rounded-2xl p-6 min-w-[280px]"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="flex items-center justify-between mb-3">
          <h3 className="text-white font-semibold">{dataFlows[currentFlow].name}</h3>
          <div className="flex items-center space-x-1">
            <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
            <span className="text-green-400 text-xs">Active</span>
          </div>
        </div>
        
        <div className="space-y-2">
          <div className="flex justify-between">
            <span className="text-gray-400 text-sm">Value Deployed</span>
            <span className="text-white font-medium">{dataFlows[currentFlow].value}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-400 text-sm">Current APY</span>
            <span className="text-green-400 font-medium">{dataFlows[currentFlow].apy}</span>
          </div>
        </div>

        {/* Progress bar */}
        <div className="mt-4">
          <div className="flex justify-between text-xs text-gray-400 mb-1">
            <span>Execution Progress</span>
            <span>100%</span>
          </div>
          <div className="w-full bg-gray-700 rounded-full h-2">
            <motion.div
              className="h-2 bg-gradient-to-r from-purple-500 to-blue-500 rounded-full"
              initial={{ width: 0 }}
              animate={{ width: '100%' }}
              transition={{ duration: 2, ease: "easeInOut" }}
            />
          </div>
        </div>
      </motion.div>

      {/* Performance Metrics */}
      <motion.div
        className="absolute bottom-6 right-6 space-y-3"
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 1 }}
      >
        {[
          { icon: TrendingUp, label: 'Total APY', value: '11.2%', color: 'text-green-400' },
          { icon: Shield, label: 'Risk Score', value: '4.2/10', color: 'text-blue-400' },
          { icon: Activity, label: 'Active Strategies', value: '4', color: 'text-purple-400' },
        ].map((metric, index) => (
          <motion.div
            key={metric.label}
            className="bg-gray-900/80 backdrop-blur-lg border border-gray-700/50 rounded-lg p-3 min-w-[140px]"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 1.2 + index * 0.1 }}
          >
            <div className="flex items-center justify-between mb-1">
              <metric.icon className={`w-4 h-4 ${metric.color}`} />
              <span className={`font-bold ${metric.color}`}>{metric.value}</span>
            </div>
            <div className="text-gray-400 text-xs">{metric.label}</div>
          </motion.div>
        ))}
      </motion.div>

      {/* Central Pulse Effect */}
      <motion.div
        className="absolute"
        style={{ left: 300, top: 250 }}
        animate={{
          scale: [1, 2, 1],
          opacity: [0.3, 0, 0.3],
        }}
        transition={{
          duration: 3,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      >
        <div className="w-20 h-20 rounded-full bg-purple-500/20 transform -translate-x-1/2 -translate-y-1/2" />
      </motion.div>

      {/* Interaction Hint */}
      <motion.div
        className="absolute bottom-6 left-6 text-gray-400 text-xs flex items-center space-x-1"
        animate={{ opacity: [0.5, 1, 0.5] }}
        transition={{ duration: 2, repeat: Infinity }}
      >
        <span>Hover nodes to explore</span>
        <Zap className="w-3 h-3" />
      </motion.div>
    </motion.div>
  );
}