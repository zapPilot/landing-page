'use client';

import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { useRef, useState, useEffect } from 'react';
import { 
  TrendingUp, 
  Eye, 
  Zap, 
  Shield, 
  Brain
} from 'lucide-react';

interface FloatingPanel {
  id: string;
  title: string;
  data: Record<string, unknown>;
  position: { x: number; y: number; z: number };
  rotation: { x: number; y: number; z: number };
  size: { width: number; height: number };
}

export function HolographicDashboard() {
  const containerRef = useRef<HTMLDivElement>(null);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  
  const rotateX = useSpring(useTransform(mouseY, [-300, 300], [15, -15]));
  const rotateY = useSpring(useTransform(mouseX, [-300, 300], [-15, 15]));
  
  const [activePanel, setActivePanel] = useState<string | null>(null);
  const [aiThinking, setAiThinking] = useState(false);

  // Handle mouse movement for 3D effect
  const handleMouseMove = (event: React.MouseEvent) => {
    if (containerRef.current) {
      const rect = containerRef.current.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;
      mouseX.set(event.clientX - centerX);
      mouseY.set(event.clientY - centerY);
    }
  };

  // Floating panels data
  const panels: FloatingPanel[] = [
    {
      id: 'portfolio-value',
      title: 'Portfolio Value',
      data: {
        current: '$124,567.89',
        change: '+$3,246.78',
        changePercent: '+2.68%',
        trend: 'up'
      },
      position: { x: 0, y: -50, z: 100 },
      rotation: { x: 5, y: 0, z: 0 },
      size: { width: 280, height: 140 }
    },
    {
      id: 'ai-insights',
      title: 'AI Insights',
      data: {
        action: 'Rebalancing Portfolio',
        confidence: '94%',
        recommendation: 'Increase BTC allocation by 5%',
        reasoning: 'Market volatility decreasing'
      },
      position: { x: -200, y: 50, z: 80 },
      rotation: { x: -5, y: 15, z: 0 },
      size: { width: 260, height: 160 }
    },
    {
      id: 'performance',
      title: 'Performance Metrics',
      data: {
        apy: '12.4%',
        sharpe: '1.87',
        drawdown: '4.2%',
        volatility: '8.1%'
      },
      position: { x: 200, y: 80, z: 60 },
      rotation: { x: 0, y: -10, z: 5 },
      size: { width: 240, height: 180 }
    },
    {
      id: 'strategies',
      title: 'Active Strategies',
      data: {
        strategies: [
          { name: 'BTC Vault', allocation: '35%', status: 'Optimizing' },
          { name: 'ETH Staking', allocation: '25%', status: 'Active' },
          { name: 'Stable Yield', allocation: '25%', status: 'Active' },
          { name: 'Index500', allocation: '15%', status: 'Rebalancing' }
        ]
      },
      position: { x: -150, y: -120, z: 70 },
      rotation: { x: 10, y: 20, z: 0 },
      size: { width: 300, height: 200 }
    },
    {
      id: 'risk-analysis',
      title: 'Risk Analysis',
      data: {
        overall: '4.2/10',
        breakdown: {
          'Smart Contract': '3/10',
          'Market Risk': '5/10',
          'Liquidity Risk': '2/10',
          'Impermanent Loss': '4/10'
        }
      },
      position: { x: 180, y: -80, z: 90 },
      rotation: { x: -10, y: -15, z: 0 },
      size: { width: 260, height: 180 }
    }
  ];

  // AI thinking simulation
  useEffect(() => {
    const interval = setInterval(() => {
      setAiThinking(prev => !prev);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <motion.div
      ref={containerRef}
      className="relative w-full h-[600px] bg-gradient-to-br from-gray-950 via-purple-950/30 to-blue-950/30 rounded-2xl overflow-hidden cursor-none"
      onMouseMove={handleMouseMove}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1 }}
      style={{
        perspective: '1000px',
        transformStyle: 'preserve-3d'
      }}
    >
      {/* Holographic Background */}
      <div className="absolute inset-0">
        {/* Grid */}
        <motion.div
          className="absolute inset-0 opacity-20"
          animate={{
            backgroundPosition: ['0% 0%', '100% 100%'],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: 'linear',
          }}
          style={{
            backgroundImage: `
              linear-gradient(90deg, rgba(139, 92, 246, 0.3) 1px, transparent 1px),
              linear-gradient(rgba(139, 92, 246, 0.3) 1px, transparent 1px)
            `,
            backgroundSize: '30px 30px',
          }}
        />

        {/* Floating particles */}
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-purple-400 rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [0, -20, 0],
              opacity: [0.3, 1, 0.3],
              scale: [0.5, 1, 0.5],
            }}
            transition={{
              duration: 3 + Math.random() * 2,
              repeat: Infinity,
              delay: Math.random() * 2,
            }}
          />
        ))}
      </div>

      {/* 3D Container */}
      <motion.div
        className="absolute inset-0"
        style={{
          rotateX,
          rotateY,
          transformStyle: 'preserve-3d',
        }}
      >
        {/* Floating Panels */}
        {panels.map((panel, index) => (
          <motion.div
            key={panel.id}
            className="absolute"
            style={{
              left: '50%',
              top: '50%',
              width: panel.size.width,
              height: panel.size.height,
              transform: `
                translate(-50%, -50%)
                translate3d(${panel.position.x}px, ${panel.position.y}px, ${panel.position.z}px)
                rotateX(${panel.rotation.x}deg)
                rotateY(${panel.rotation.y}deg)
                rotateZ(${panel.rotation.z}deg)
              `,
            }}
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: index * 0.2, duration: 0.8 }}
            whileHover={{ 
              scale: 1.05,
              z: panel.position.z + 20,
            }}
            onHoverStart={() => setActivePanel(panel.id)}
            onHoverEnd={() => setActivePanel(null)}
          >
            {/* Glass Panel */}
            <div className="relative w-full h-full">
              {/* Background with glassmorphism */}
              <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-xl border border-white/20 rounded-2xl shadow-2xl" />
              
              {/* Holographic edge glow */}
              <motion.div
                className="absolute inset-0 rounded-2xl"
                animate={activePanel === panel.id ? {
                  boxShadow: [
                    '0 0 20px rgba(139, 92, 246, 0.4)',
                    '0 0 40px rgba(139, 92, 246, 0.6)',
                    '0 0 20px rgba(139, 92, 246, 0.4)'
                  ]
                } : {}}
                transition={{ duration: 1, repeat: activePanel === panel.id ? Infinity : 0 }}
              />

              {/* Content */}
              <div className="relative p-6 h-full">
                {/* Panel Header */}
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-white font-semibold text-sm">{panel.title}</h3>
                  {panel.id === 'ai-insights' && (
                    <motion.div
                      className="flex items-center space-x-1"
                      animate={aiThinking ? { opacity: [0.5, 1, 0.5] } : {}}
                      transition={{ duration: 1, repeat: aiThinking ? Infinity : 0 }}
                    >
                      <Brain className="w-4 h-4 text-purple-400" />
                      <span className="text-purple-400 text-xs">
                        {aiThinking ? 'Thinking...' : 'Ready'}
                      </span>
                    </motion.div>
                  )}
                </div>

                {/* Panel Content */}
                {panel.id === 'portfolio-value' && (
                  <div className="space-y-3">
                    <motion.div
                      className="text-3xl font-bold text-white"
                      animate={{ opacity: [0.8, 1, 0.8] }}
                      transition={{ duration: 2, repeat: Infinity }}
                    >
                      {panel.data.current}
                    </motion.div>
                    <div className="flex items-center space-x-2">
                      <TrendingUp className="w-4 h-4 text-green-400" />
                      <span className="text-green-400 font-medium">{panel.data.change}</span>
                      <span className="text-green-400 text-sm">({panel.data.changePercent})</span>
                    </div>
                    <div className="text-gray-400 text-xs">Last 24 hours</div>
                  </div>
                )}

                {panel.id === 'ai-insights' && (
                  <div className="space-y-3">
                    <div className="bg-purple-500/20 rounded-lg p-3">
                      <div className="text-purple-300 text-sm font-medium mb-1">Current Action</div>
                      <div className="text-white text-xs">{panel.data.action}</div>
                    </div>
                    <div className="space-y-2">
                      <div className="flex justify-between text-xs">
                        <span className="text-gray-400">Confidence</span>
                        <span className="text-green-400 font-medium">{panel.data.confidence}</span>
                      </div>
                      <div className="text-white text-xs">{panel.data.recommendation}</div>
                      <div className="text-gray-400 text-xs">{panel.data.reasoning}</div>
                    </div>
                  </div>
                )}

                {panel.id === 'performance' && (
                  <div className="grid grid-cols-2 gap-3">
                    {Object.entries(panel.data).map(([key, value]) => (
                      <div key={key} className="text-center">
                        <div className="text-purple-400 text-xs uppercase tracking-wide">{key}</div>
                        <div className="text-white font-bold">{value as string}</div>
                      </div>
                    ))}
                  </div>
                )}

                {panel.id === 'strategies' && (
                  <div className="space-y-2">
                    {panel.data.strategies.map((strategy: Record<string, unknown>, i: number) => (
                      <motion.div
                        key={strategy.name}
                        className="flex items-center justify-between p-2 bg-white/5 rounded-lg"
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: i * 0.1 }}
                      >
                        <div>
                          <div className="text-white text-xs font-medium">{strategy.name}</div>
                          <div className="text-gray-400 text-xs">{strategy.allocation}</div>
                        </div>
                        <div className={`text-xs px-2 py-1 rounded-full ${
                          strategy.status === 'Active' ? 'bg-green-500/20 text-green-400' :
                          strategy.status === 'Optimizing' ? 'bg-blue-500/20 text-blue-400' :
                          'bg-yellow-500/20 text-yellow-400'
                        }`}>
                          {strategy.status}
                        </div>
                      </motion.div>
                    ))}
                  </div>
                )}

                {panel.id === 'risk-analysis' && (
                  <div className="space-y-3">
                    <div className="text-center">
                      <div className="text-2xl font-bold text-blue-400">{panel.data.overall}</div>
                      <div className="text-gray-400 text-xs">Overall Risk Score</div>
                    </div>
                    <div className="space-y-1">
                      {Object.entries(panel.data.breakdown).map(([risk, score]) => (
                        <div key={risk} className="flex justify-between text-xs">
                          <span className="text-gray-300">{risk}</span>
                          <span className="text-white">{score as string}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </motion.div>
        ))}

        {/* Central Hologram */}
        <motion.div
          className="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2"
          style={{
            transform: 'translate(-50%, -50%) translateZ(0px)',
          }}
          animate={{
            rotateY: [0, 360],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: 'linear',
          }}
        >
          <div className="relative">
            {/* Central Core */}
            <motion.div
              className="w-16 h-16 rounded-full bg-gradient-to-r from-purple-500 to-blue-500 flex items-center justify-center"
              animate={{
                scale: [1, 1.2, 1],
                opacity: [0.8, 1, 0.8],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
              }}
            >
              <Eye className="w-8 h-8 text-white" />
            </motion.div>

            {/* Orbiting Elements */}
            {[0, 120, 240].map((rotation, i) => (
              <motion.div
                key={i}
                className="absolute w-6 h-6 rounded-full bg-purple-400/60"
                style={{
                  left: '50%',
                  top: '50%',
                  originX: 0.5,
                  originY: 0.5,
                }}
                animate={{
                  rotate: [rotation, rotation + 360],
                  x: [0, 40, 0, -40, 0],
                  y: [0, 0, 40, 0, 0],
                }}
                transition={{
                  duration: 4,
                  repeat: Infinity,
                  ease: 'linear',
                  delay: i * 0.5,
                }}
              />
            ))}
          </div>
        </motion.div>
      </motion.div>

      {/* UI Overlays */}
      <div className="absolute inset-0 pointer-events-none">
        {/* Status Indicators */}
        <motion.div
          className="absolute top-6 left-6 flex items-center space-x-4"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1 }}
        >
          <div className="flex items-center space-x-2 bg-gray-900/80 backdrop-blur-lg border border-green-500/30 rounded-full px-4 py-2">
            <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
            <span className="text-green-400 text-sm">AI Active</span>
          </div>
          <div className="flex items-center space-x-2 bg-gray-900/80 backdrop-blur-lg border border-blue-500/30 rounded-full px-4 py-2">
            <Shield className="w-4 h-4 text-blue-400" />
            <span className="text-blue-400 text-sm">Secure</span>
          </div>
        </motion.div>

        {/* Performance Summary */}
        <motion.div
          className="absolute bottom-6 left-6 bg-gray-900/80 backdrop-blur-lg border border-purple-500/30 rounded-2xl p-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.2 }}
        >
          <div className="flex items-center space-x-4">
            <div className="text-center">
              <div className="text-white font-bold">$45.2K</div>
              <div className="text-gray-400 text-xs">24h Volume</div>
            </div>
            <div className="text-center">
              <div className="text-green-400 font-bold">+18.7%</div>
              <div className="text-gray-400 text-xs">YTD Return</div>
            </div>
            <div className="text-center">
              <div className="text-blue-400 font-bold">99.9%</div>
              <div className="text-gray-400 text-xs">Uptime</div>
            </div>
          </div>
        </motion.div>

        {/* Interaction Hint */}
        <motion.div
          className="absolute bottom-6 right-6 text-gray-400 text-xs flex items-center space-x-1"
          animate={{ opacity: [0.5, 1, 0.5] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <span>Move mouse to explore</span>
          <Zap className="w-3 h-3" />
        </motion.div>
      </div>
    </motion.div>
  );
}