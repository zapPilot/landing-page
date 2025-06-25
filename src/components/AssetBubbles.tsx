'use client';

import { motion, useMotionValue } from 'framer-motion';
import { useRef, useState, useEffect, useCallback } from 'react';
import { TrendingUp, Zap, Shield, Droplets } from 'lucide-react';

interface Bubble {
  id: string;
  name: string;
  symbol: string;
  value: number;
  percentage: number;
  color: string;
  x: number;
  y: number;
  vx: number;
  vy: number;
  radius: number;
  isActive: boolean;
  lastSplit: number;
}

interface Connection {
  from: string;
  to: string;
  strength: number;
}

export function AssetBubbles() {
  const containerRef = useRef<HTMLDivElement>(null);
  const animationRef = useRef<number>();
  const [bubbles, setBubbles] = useState<Bubble[]>([]);
  const [connections, setConnections] = useState<Connection[]>([]);
  const [isRebalancing, setIsRebalancing] = useState(false);
  const [activeAsset, setActiveAsset] = useState<string | null>(null);

  // Mouse interaction
  const mouseX = useMotionValue(300);
  const mouseY = useMotionValue(300);

  // Initial bubble data
  const initialAssets = [
    { name: 'Bitcoin', symbol: 'BTC', value: 43500, percentage: 35, color: '#F7931A' },
    { name: 'Ethereum', symbol: 'ETH', value: 31200, percentage: 25, color: '#627EEA' },
    { name: 'Stablecoins', symbol: 'USDC', value: 24900, percentage: 20, color: '#26A17B' },
    { name: 'DeFi Index', symbol: 'IDX', value: 19800, percentage: 20, color: '#8B5CF6' },
  ];

  // Initialize bubbles
  useEffect(() => {
    const newBubbles: Bubble[] = initialAssets.map((asset, index) => ({
      id: asset.symbol,
      name: asset.name,
      symbol: asset.symbol,
      value: asset.value,
      percentage: asset.percentage,
      color: asset.color,
      x: 200 + Math.cos(index * Math.PI / 2) * 100,
      y: 200 + Math.sin(index * Math.PI / 2) * 100,
      vx: (Math.random() - 0.5) * 0.5,
      vy: (Math.random() - 0.5) * 0.5,
      radius: Math.sqrt(asset.percentage) * 8 + 20,
      isActive: false,
      lastSplit: 0,
    }));

    setBubbles(newBubbles);

    // Create initial connections
    const newConnections: Connection[] = [];
    for (let i = 0; i < newBubbles.length; i++) {
      for (let j = i + 1; j < newBubbles.length; j++) {
        newConnections.push({
          from: newBubbles[i].id,
          to: newBubbles[j].id,
          strength: Math.random() * 0.5 + 0.3,
        });
      }
    }
    setConnections(newConnections);
  }, []);

  // Physics simulation
  const updateBubbles = useCallback(() => {
    setBubbles(prevBubbles => {
      const newBubbles = [...prevBubbles];
      const centerX = 300;
      const centerY = 250;

      newBubbles.forEach((bubble, i) => {
        // Boundary forces
        const boundaryForce = 0.02;
        if (bubble.x < bubble.radius) bubble.vx += boundaryForce;
        if (bubble.x > 600 - bubble.radius) bubble.vx -= boundaryForce;
        if (bubble.y < bubble.radius) bubble.vy += boundaryForce;
        if (bubble.y > 500 - bubble.radius) bubble.vy -= boundaryForce;

        // Center attraction
        const centerDx = centerX - bubble.x;
        const centerDy = centerY - bubble.y;
        const centerDistance = Math.sqrt(centerDx * centerDx + centerDy * centerDy);
        const centerForce = 0.0005;
        bubble.vx += (centerDx / centerDistance) * centerForce;
        bubble.vy += (centerDy / centerDistance) * centerForce;

        // Bubble interactions
        newBubbles.forEach((other, j) => {
          if (i !== j) {
            const dx = other.x - bubble.x;
            const dy = other.y - bubble.y;
            const distance = Math.sqrt(dx * dx + dy * dy);
            const minDistance = bubble.radius + other.radius;

            if (distance < minDistance) {
              // Repulsion
              const force = (minDistance - distance) * 0.01;
              const angle = Math.atan2(dy, dx);
              bubble.vx -= Math.cos(angle) * force;
              bubble.vy -= Math.sin(angle) * force;
            } else if (distance < minDistance + 50) {
              // Weak attraction
              const force = 0.0002;
              const angle = Math.atan2(dy, dx);
              bubble.vx += Math.cos(angle) * force;
              bubble.vy += Math.sin(angle) * force;
            }
          }
        });

        // Apply velocity with damping
        bubble.vx *= 0.98;
        bubble.vy *= 0.98;
        bubble.x += bubble.vx;
        bubble.y += bubble.vy;

        // Update activity based on movement
        const speed = Math.sqrt(bubble.vx * bubble.vx + bubble.vy * bubble.vy);
        bubble.isActive = speed > 0.1;
      });

      return newBubbles;
    });
  }, []);

  // Animation loop
  useEffect(() => {
    const animate = () => {
      updateBubbles();
      animationRef.current = requestAnimationFrame(animate);
    };
    animationRef.current = requestAnimationFrame(animate);

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [updateBubbles]);

  // Rebalancing effect
  useEffect(() => {
    const interval = setInterval(() => {
      setIsRebalancing(true);
      
      // Simulate rebalancing by adjusting bubble sizes
      setBubbles(prev => prev.map(bubble => ({
        ...bubble,
        radius: Math.sqrt(bubble.percentage + (Math.random() - 0.5) * 5) * 8 + 20,
        vx: bubble.vx + (Math.random() - 0.5) * 0.3,
        vy: bubble.vy + (Math.random() - 0.5) * 0.3,
      })));

      setTimeout(() => setIsRebalancing(false), 2000);
    }, 8000);

    return () => clearInterval(interval);
  }, []);

  // Handle mouse interaction
  const handleMouseMove = (event: React.MouseEvent) => {
    if (containerRef.current) {
      const rect = containerRef.current.getBoundingClientRect();
      const x = event.clientX - rect.left;
      const y = event.clientY - rect.top;
      mouseX.set(x);
      mouseY.set(y);

      // Apply mouse influence to bubbles
      setBubbles(prev => prev.map(bubble => {
        const dx = x - bubble.x;
        const dy = y - bubble.y;
        const distance = Math.sqrt(dx * dx + dy * dy);
        
        if (distance < 100) {
          const force = (100 - distance) * 0.0001;
          const angle = Math.atan2(dy, dx);
          return {
            ...bubble,
            vx: bubble.vx + Math.cos(angle) * force,
            vy: bubble.vy + Math.sin(angle) * force,
          };
        }
        return bubble;
      }));
    }
  };

  // Split bubble effect
  const handleBubbleClick = (bubbleId: string) => {
    const now = Date.now();
    setBubbles(prev => prev.map(bubble => {
      if (bubble.id === bubbleId && now - bubble.lastSplit > 3000) {
        // Create split effect
        return {
          ...bubble,
          lastSplit: now,
          vx: bubble.vx + (Math.random() - 0.5) * 0.5,
          vy: bubble.vy + (Math.random() - 0.5) * 0.5,
        };
      }
      return bubble;
    }));
  };

  return (
    <motion.div
      ref={containerRef}
      className="relative w-full h-[600px] bg-gradient-to-br from-gray-950 via-purple-950/20 to-blue-950/20 rounded-2xl overflow-hidden cursor-none"
      onMouseMove={handleMouseMove}
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 1 }}
    >
      {/* Background Effects */}
      <div className="absolute inset-0">
        {/* Flowing background */}
        <motion.div
          className="absolute inset-0 opacity-30"
          animate={{
            background: [
              'radial-gradient(circle at 20% 80%, rgba(139, 92, 246, 0.2) 0%, transparent 50%)',
              'radial-gradient(circle at 80% 20%, rgba(59, 130, 246, 0.2) 0%, transparent 50%)',
              'radial-gradient(circle at 40% 40%, rgba(16, 185, 129, 0.2) 0%, transparent 50%)',
            ],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />

        {/* Bubble connections */}
        <svg className="absolute inset-0 w-full h-full pointer-events-none">
          {connections.map((connection, index) => {
            const fromBubble = bubbles.find(b => b.id === connection.from);
            const toBubble = bubbles.find(b => b.id === connection.to);
            
            if (!fromBubble || !toBubble) return null;

            const distance = Math.sqrt(
              Math.pow(toBubble.x - fromBubble.x, 2) + 
              Math.pow(toBubble.y - fromBubble.y, 2)
            );

            return (
              <motion.line
                key={`${connection.from}-${connection.to}`}
                x1={fromBubble.x}
                y1={fromBubble.y}
                x2={toBubble.x}
                y2={toBubble.y}
                stroke="url(#connectionGradient)"
                strokeWidth={Math.max(1, 5 - distance / 50)}
                opacity={Math.max(0.1, 1 - distance / 200)}
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ duration: 1, delay: index * 0.1 }}
              />
            );
          })}
          
          {/* Gradient definition */}
          <defs>
            <linearGradient id="connectionGradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#8B5CF6" stopOpacity="0.6" />
              <stop offset="100%" stopColor="#3B82F6" stopOpacity="0.3" />
            </linearGradient>
          </defs>
        </svg>
      </div>

      {/* Asset Bubbles */}
      {bubbles.map((bubble, index) => (
        <motion.div
          key={bubble.id}
          className="absolute pointer-events-auto cursor-pointer"
          style={{
            left: bubble.x - bubble.radius,
            top: bubble.y - bubble.radius,
            width: bubble.radius * 2,
            height: bubble.radius * 2,
          }}
          whileHover={{ scale: 1.1 }}
          onHoverStart={() => setActiveAsset(bubble.id)}
          onHoverEnd={() => setActiveAsset(null)}
          onClick={() => handleBubbleClick(bubble.id)}
        >
          {/* Main bubble */}
          <motion.div
            className="relative w-full h-full rounded-full flex items-center justify-center"
            style={{
              background: `linear-gradient(135deg, ${bubble.color}80, ${bubble.color}40)`,
              border: `2px solid ${bubble.color}`,
              boxShadow: `0 0 30px ${bubble.color}40`,
            }}
            animate={bubble.isActive ? {
              boxShadow: [
                `0 0 30px ${bubble.color}40`,
                `0 0 50px ${bubble.color}80`,
                `0 0 30px ${bubble.color}40`,
              ],
              scale: [1, 1.05, 1],
            } : {}}
            transition={{ duration: 1, repeat: bubble.isActive ? Infinity : 0 }}
          >
            {/* Inner glow */}
            <motion.div
              className="absolute inset-2 rounded-full"
              style={{
                background: `radial-gradient(circle, ${bubble.color}60, transparent)`,
              }}
              animate={{
                opacity: [0.3, 0.7, 0.3],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                delay: index * 0.5,
              }}
            />

            {/* Symbol */}
            <div className="relative z-10 text-center">
              <div className="text-white font-bold text-lg">{bubble.symbol}</div>
              <div className="text-white/80 text-xs">{bubble.percentage}%</div>
            </div>

            {/* Ripple effect */}
            <motion.div
              className="absolute inset-0 rounded-full border-2"
              style={{ borderColor: bubble.color }}
              animate={{
                scale: [1, 1.5, 2],
                opacity: [0.6, 0.3, 0],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: 'easeOut',
                delay: index * 0.3,
              }}
            />

            {/* Activity indicator */}
            {bubble.isActive && (
              <motion.div
                className="absolute -top-2 -right-2 w-4 h-4 bg-green-400 rounded-full"
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ duration: 0.5, repeat: Infinity }}
              />
            )}
          </motion.div>

          {/* Floating info panel */}
          {activeAsset === bubble.id && (
            <motion.div
              className="absolute -top-16 left-1/2 transform -translate-x-1/2 bg-gray-900/90 backdrop-blur-lg border border-gray-700 rounded-lg p-3 min-w-[120px] z-10"
              initial={{ opacity: 0, y: 10, scale: 0.8 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 10, scale: 0.8 }}
            >
              <div className="text-center">
                <div className="text-white font-semibold text-sm">{bubble.name}</div>
                <div className="text-gray-400 text-xs mb-1">${bubble.value.toLocaleString()}</div>
                <div className="flex items-center justify-center space-x-1">
                  <TrendingUp className="w-3 h-3 text-green-400" />
                  <span className="text-green-400 text-xs">+{(Math.random() * 10 + 2).toFixed(1)}%</span>
                </div>
              </div>
              {/* Arrow */}
              <div className="absolute top-full left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-gray-700" />
            </motion.div>
          )}
        </motion.div>
      ))}

      {/* Mouse cursor effect */}
      <motion.div
        className="absolute pointer-events-none z-20"
        style={{
          left: mouseX,
          top: mouseY,
          x: -10,
          y: -10,
        }}
      >
        <motion.div
          className="w-5 h-5 rounded-full bg-purple-400/60"
          animate={{
            scale: [1, 1.5, 1],
            opacity: [0.6, 0.8, 0.6],
          }}
          transition={{
            duration: 1,
            repeat: Infinity,
          }}
        />
      </motion.div>

      {/* Rebalancing indicator */}
      {isRebalancing && (
        <motion.div
          className="absolute top-6 left-1/2 transform -translate-x-1/2 bg-blue-500/20 backdrop-blur-lg border border-blue-500/30 rounded-full px-6 py-3"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
        >
          <div className="flex items-center space-x-2">
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
            >
              <Zap className="w-4 h-4 text-blue-400" />
            </motion.div>
            <span className="text-blue-400 text-sm font-medium">AI Rebalancing...</span>
          </div>
        </motion.div>
      )}

      {/* Status indicators */}
      <div className="absolute top-6 left-6 space-y-3">
        <motion.div
          className="bg-gray-900/80 backdrop-blur-lg border border-green-500/30 rounded-lg p-3"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.5 }}
        >
          <div className="flex items-center space-x-2 mb-2">
            <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
            <span className="text-green-400 text-xs font-medium">Portfolio Active</span>
          </div>
          <div className="text-white text-sm font-bold">$124,567.89</div>
          <div className="text-gray-400 text-xs">Total Value</div>
        </motion.div>

        <motion.div
          className="bg-gray-900/80 backdrop-blur-lg border border-purple-500/30 rounded-lg p-3"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.7 }}
        >
          <div className="flex items-center space-x-2 mb-2">
            <Shield className="w-4 h-4 text-purple-400" />
            <span className="text-purple-400 text-xs font-medium">Risk Level</span>
          </div>
          <div className="text-white text-sm font-bold">Low</div>
          <div className="text-gray-400 text-xs">4.2/10 Volatility</div>
        </motion.div>
      </div>

      {/* Performance metrics */}
      <motion.div
        className="absolute bottom-6 right-6 bg-gray-900/80 backdrop-blur-lg border border-gray-700 rounded-2xl p-4"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1 }}
      >
        <div className="grid grid-cols-3 gap-4 text-center">
          <div>
            <div className="text-green-400 font-bold">+12.4%</div>
            <div className="text-gray-400 text-xs">APY</div>
          </div>
          <div>
            <div className="text-blue-400 font-bold">99.9%</div>
            <div className="text-gray-400 text-xs">Uptime</div>
          </div>
          <div>
            <div className="text-purple-400 font-bold">24/7</div>
            <div className="text-gray-400 text-xs">Active</div>
          </div>
        </div>
      </motion.div>

      {/* Interaction hint */}
      <motion.div
        className="absolute bottom-6 left-6 text-gray-400 text-xs flex items-center space-x-1"
        animate={{ opacity: [0.5, 1, 0.5] }}
        transition={{ duration: 2, repeat: Infinity }}
      >
        <span>Move mouse • Click bubbles</span>
        <Droplets className="w-3 h-3" />
      </motion.div>
    </motion.div>
  );
}