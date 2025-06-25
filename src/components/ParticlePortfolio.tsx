'use client';

import { motion, useAnimation } from 'framer-motion';
import { useRef, useState, useEffect, useCallback } from 'react';
import { TrendingUp, Brain, Zap, Activity } from 'lucide-react';

interface Particle {
  id: number;
  x: number;
  y: number;
  targetX: number;
  targetY: number;
  vx: number;
  vy: number;
  color: string;
  size: number;
  life: number;
  formation: string;
}

interface Formation {
  name: string;
  particles: { x: number; y: number; color: string }[];
  data: any;
}

export function ParticlePortfolio() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationRef = useRef<number>();
  const [particles, setParticles] = useState<Particle[]>([]);
  const [currentFormation, setCurrentFormation] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);

  // Portfolio formations
  const formations: Formation[] = [
    {
      name: 'Portfolio Distribution',
      data: { title: 'Asset Allocation', value: '$124,567', metric: 'Total Value' },
      particles: [
        // BTC cluster (35%)
        ...Array.from({ length: 35 }, (_, i) => ({
          x: 200 + Math.cos(i * 0.3) * 60 + Math.random() * 20,
          y: 150 + Math.sin(i * 0.3) * 60 + Math.random() * 20,
          color: '#F7931A'
        })),
        // ETH cluster (25%)
        ...Array.from({ length: 25 }, (_, i) => ({
          x: 400 + Math.cos(i * 0.4) * 50 + Math.random() * 15,
          y: 150 + Math.sin(i * 0.4) * 50 + Math.random() * 15,
          color: '#627EEA'
        })),
        // Stable cluster (25%)
        ...Array.from({ length: 25 }, (_, i) => ({
          x: 200 + Math.cos(i * 0.4) * 45 + Math.random() * 15,
          y: 350 + Math.sin(i * 0.4) * 45 + Math.random() * 15,
          color: '#26A17B'
        })),
        // DeFi cluster (15%)
        ...Array.from({ length: 15 }, (_, i) => ({
          x: 400 + Math.cos(i * 0.5) * 35 + Math.random() * 10,
          y: 350 + Math.sin(i * 0.5) * 35 + Math.random() * 10,
          color: '#8B5CF6'
        })),
      ]
    },
    {
      name: 'Performance Chart',
      data: { title: 'YTD Returns', value: '+18.7%', metric: 'Performance' },
      particles: Array.from({ length: 100 }, (_, i) => {
        const progress = i / 99;
        const baseY = 400 - progress * 200 - Math.sin(progress * Math.PI * 4) * 50;
        return {
          x: 100 + progress * 400,
          y: baseY + Math.random() * 20 - 10,
          color: baseY < 300 ? '#10B981' : '#F59E0B'
        };
      })
    },
    {
      name: 'Risk Analysis',
      data: { title: 'Risk Score', value: '4.2/10', metric: 'Low Volatility' },
      particles: Array.from({ length: 80 }, (_, i) => {
        const angle = (i / 80) * Math.PI * 2;
        const radius = 50 + Math.random() * 100;
        const riskLevel = radius / 150;
        return {
          x: 300 + Math.cos(angle) * radius,
          y: 250 + Math.sin(angle) * radius * 0.6,
          color: riskLevel < 0.5 ? '#10B981' : riskLevel < 0.8 ? '#F59E0B' : '#EF4444'
        };
      })
    },
    {
      name: 'AI Optimization',
      data: { title: 'AI Efficiency', value: '94%', metric: 'Optimization' },
      particles: Array.from({ length: 120 }, (_, i) => {
        const layer = Math.floor(i / 30);
        const angleOffset = layer * Math.PI / 4;
        const angle = (i % 30) / 30 * Math.PI * 2 + angleOffset;
        const radius = 30 + layer * 25;
        return {
          x: 300 + Math.cos(angle) * radius,
          y: 250 + Math.sin(angle) * radius,
          color: ['#8B5CF6', '#3B82F6', '#10B981', '#F59E0B'][layer]
        };
      })
    }
  ];

  // Initialize particles
  useEffect(() => {
    const initialParticles: Particle[] = [];
    const formation = formations[0];
    
    formation.particles.forEach((pos, i) => {
      initialParticles.push({
        id: i,
        x: Math.random() * 600,
        y: Math.random() * 500,
        targetX: pos.x,
        targetY: pos.y,
        vx: 0,
        vy: 0,
        color: pos.color,
        size: 2 + Math.random() * 2,
        life: 1,
        formation: formation.name,
      });
    });

    setParticles(initialParticles);
  }, []);

  // Animation loop
  const animate = useCallback(() => {
    setParticles(prevParticles => {
      return prevParticles.map(particle => {
        // Calculate force toward target
        const dx = particle.targetX - particle.x;
        const dy = particle.targetY - particle.y;
        const distance = Math.sqrt(dx * dx + dy * dy);
        
        // Apply forces
        const force = 0.02;
        const damping = 0.9;
        
        if (distance > 1) {
          particle.vx += (dx / distance) * force;
          particle.vy += (dy / distance) * force;
        }
        
        // Add some noise for organic movement
        particle.vx += (Math.random() - 0.5) * 0.01;
        particle.vy += (Math.random() - 0.5) * 0.01;
        
        // Apply damping
        particle.vx *= damping;
        particle.vy *= damping;
        
        // Update position
        particle.x += particle.vx;
        particle.y += particle.vy;
        
        // Update life for fade effects
        if (isTransitioning) {
          particle.life = Math.max(0, particle.life - 0.02);
        } else {
          particle.life = Math.min(1, particle.life + 0.05);
        }
        
        return particle;
      });
    });

    animationRef.current = requestAnimationFrame(animate);
  }, [isTransitioning]);

  useEffect(() => {
    animationRef.current = requestAnimationFrame(animate);
    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [animate]);

  // Formation transition
  useEffect(() => {
    const interval = setInterval(() => {
      setIsTransitioning(true);
      
      setTimeout(() => {
        const nextFormation = (currentFormation + 1) % formations.length;
        const formation = formations[nextFormation];
        
        setParticles(prevParticles => {
          return prevParticles.map((particle, i) => {
            const newTarget = formation.particles[i % formation.particles.length];
            return {
              ...particle,
              targetX: newTarget.x,
              targetY: newTarget.y,
              color: newTarget.color,
              formation: formation.name,
            };
          });
        });
        
        setCurrentFormation(nextFormation);
        setIsTransitioning(false);
      }, 1000);
    }, 6000);

    return () => clearInterval(interval);
  }, [currentFormation]);

  // Canvas rendering
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const render = () => {
      // Clear canvas with trail effect
      ctx.fillStyle = 'rgba(17, 24, 39, 0.1)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Draw connections between nearby particles
      particles.forEach((particle, i) => {
        particles.slice(i + 1).forEach(other => {
          const dx = other.x - particle.x;
          const dy = other.y - particle.y;
          const distance = Math.sqrt(dx * dx + dy * dy);

          if (distance < 80 && particle.color === other.color) {
            const opacity = (80 - distance) / 80 * particle.life * other.life * 0.3;
            ctx.strokeStyle = `${particle.color}${Math.floor(opacity * 255).toString(16).padStart(2, '0')}`;
            ctx.lineWidth = 1;
            ctx.beginPath();
            ctx.moveTo(particle.x, particle.y);
            ctx.lineTo(other.x, other.y);
            ctx.stroke();
          }
        });
      });

      // Draw particles
      particles.forEach(particle => {
        const alpha = particle.life;
        ctx.fillStyle = `${particle.color}${Math.floor(alpha * 255).toString(16).padStart(2, '0')}`;
        ctx.beginPath();
        ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
        ctx.fill();

        // Add glow effect
        const glowSize = particle.size * 3;
        const glowAlpha = alpha * 0.3;
        ctx.fillStyle = `${particle.color}${Math.floor(glowAlpha * 255).toString(16).padStart(2, '0')}`;
        ctx.beginPath();
        ctx.arc(particle.x, particle.y, glowSize, 0, Math.PI * 2);
        ctx.fill();
      });

      requestAnimationFrame(render);
    };

    render();
  }, [particles]);

  // Handle mouse interaction
  const handleMouseMove = (event: React.MouseEvent) => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const rect = canvas.getBoundingClientRect();
    const mouseX = event.clientX - rect.left;
    const mouseY = event.clientY - rect.top;

    setParticles(prev => prev.map(particle => {
      const dx = mouseX - particle.x;
      const dy = mouseY - particle.y;
      const distance = Math.sqrt(dx * dx + dy * dy);

      if (distance < 100) {
        const force = (100 - distance) * 0.0005;
        const angle = Math.atan2(dy, dx);
        return {
          ...particle,
          vx: particle.vx + Math.cos(angle) * force,
          vy: particle.vy + Math.sin(angle) * force,
        };
      }
      return particle;
    }));
  };

  const currentData = formations[currentFormation].data;

  return (
    <motion.div
      className="relative w-full h-[600px] bg-gradient-to-br from-gray-950 via-purple-950/20 to-blue-950/20 rounded-2xl overflow-hidden"
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 1 }}
    >
      {/* Canvas for particle rendering */}
      <canvas
        ref={canvasRef}
        width={600}
        height={500}
        className="absolute inset-0 w-full h-full cursor-none"
        onMouseMove={handleMouseMove}
        style={{ 
          background: 'transparent',
          imageRendering: 'auto'
        }}
      />

      {/* Formation info */}
      <motion.div
        key={currentFormation}
        className="absolute top-6 left-6 bg-gray-900/90 backdrop-blur-lg border border-purple-500/30 rounded-2xl p-6 min-w-[280px]"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-white font-semibold">{formations[currentFormation].name}</h3>
          {isTransitioning ? (
            <motion.div
              className="flex items-center space-x-1"
              animate={{ opacity: [0.5, 1, 0.5] }}
              transition={{ duration: 1, repeat: Infinity }}
            >
              <Brain className="w-4 h-4 text-purple-400" />
              <span className="text-purple-400 text-xs">Morphing...</span>
            </motion.div>
          ) : (
            <div className="flex items-center space-x-1">
              <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
              <span className="text-green-400 text-xs">Active</span>
            </div>
          )}
        </div>

        <div className="space-y-3">
          <div>
            <div className="text-gray-400 text-sm">{currentData.title}</div>
            <div className="text-2xl font-bold text-white">{currentData.value}</div>
          </div>
          <div className="text-gray-500 text-xs">{currentData.metric}</div>
        </div>

        {/* Formation progress */}
        <div className="mt-4">
          <div className="flex justify-between text-xs text-gray-400 mb-1">
            <span>Formation Progress</span>
            <span>{isTransitioning ? '...' : '100%'}</span>
          </div>
          <div className="w-full bg-gray-700 rounded-full h-1">
            <motion.div
              className="h-1 bg-gradient-to-r from-purple-500 to-blue-500 rounded-full"
              animate={{
                width: isTransitioning ? '0%' : '100%',
              }}
              transition={{ duration: isTransitioning ? 0.5 : 2 }}
            />
          </div>
        </div>
      </motion.div>

      {/* Formation indicators */}
      <div className="absolute top-6 right-6 flex space-x-2">
        {formations.map((_, index) => (
          <motion.div
            key={index}
            className={`w-3 h-3 rounded-full border-2 ${
              index === currentFormation
                ? 'bg-purple-500 border-purple-400'
                : 'bg-transparent border-gray-600'
            }`}
            whileHover={{ scale: 1.2 }}
            animate={index === currentFormation ? {
              boxShadow: ['0 0 0 0 rgba(139, 92, 246, 0.7)', '0 0 0 10px rgba(139, 92, 246, 0)'],
            } : {}}
            transition={{ duration: 1, repeat: index === currentFormation ? Infinity : 0 }}
          />
        ))}
      </div>

      {/* Performance metrics */}
      <motion.div
        className="absolute bottom-6 right-6 space-y-3"
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 1 }}
      >
        {[
          { icon: TrendingUp, label: 'Performance', value: '+18.7%', color: 'text-green-400' },
          { icon: Activity, label: 'Particles', value: particles.length.toString(), color: 'text-blue-400' },
          { icon: Zap, label: 'Efficiency', value: '94%', color: 'text-purple-400' },
        ].map((metric, index) => (
          <motion.div
            key={metric.label}
            className="bg-gray-900/80 backdrop-blur-lg border border-gray-700/50 rounded-lg p-3 min-w-[120px]"
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

      {/* Particle count */}
      <motion.div
        className="absolute bottom-6 left-6 bg-gray-900/80 backdrop-blur-lg border border-gray-700 rounded-lg p-3"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.4 }}
      >
        <div className="text-center">
          <div className="text-white font-bold">{particles.filter(p => p.life > 0.5).length}</div>
          <div className="text-gray-400 text-xs">Active Particles</div>
        </div>
      </motion.div>

      {/* Interaction hint */}
      <motion.div
        className="absolute bottom-6 left-1/2 transform -translate-x-1/2 text-gray-400 text-xs flex items-center space-x-1"
        animate={{ opacity: [0.5, 1, 0.5] }}
        transition={{ duration: 2, repeat: Infinity }}
      >
        <span>Move mouse to influence particles</span>
        <Activity className="w-3 h-3" />
      </motion.div>
    </motion.div>
  );
}