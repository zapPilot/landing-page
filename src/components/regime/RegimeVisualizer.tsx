'use client';

import { motion } from 'framer-motion';
import { type RegimeId, regimeOrder, getRegimeById } from '../variation-claude/shared/regimeData';
import { useState, useEffect } from 'react';
import { useMediaQuery } from '@/hooks/useMediaQuery';
import { RegimeArc } from './RegimeArc';
import { AllocationPanel } from './AllocationPanel';

interface RegimeVisualizerProps {
  autoPlayInterval?: number;
  startRegime?: RegimeId;
  showInteractivity?: boolean;
  className?: string;
}

export function RegimeVisualizer({
  autoPlayInterval = 5000,
  startRegime = 'n',
  showInteractivity: _showInteractivity = false,
  className = '',
}: RegimeVisualizerProps) {
  const [activeRegime, setActiveRegime] = useState<RegimeId>(startRegime);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const [animationDirection, setAnimationDirection] = useState<'forward' | 'backward'>('forward');
  const isMobile = useMediaQuery('(max-width: 1024px)');

  const activeRegimeData = getRegimeById(activeRegime);
  
  // Layout configuration
  const viewBoxWidth = isMobile ? 900 : 1600;
  const viewBoxHeight = isMobile ? 1000 : 600; // Reduced from 1200 to 1000 for mobile
  
  // Alignment constants
  // We want the top of the Arc (EF/EG nodes) to align with the top of the Panel
  const PANEL_Y = isMobile ? 620 : 60;
  const PANEL_HEIGHT = 480;
  
  // For the Arc to align, its top nodes (at y = centerY) need to be visually aligned with PANEL_Y
  // However, the nodes have a radius of ~80px (with glow), so the center should be lower
  // If Top of Node Visual = PANEL_Y
  // Then Center Y = PANEL_Y + Node Radius + some padding
  const ARC_CENTER_Y = isMobile ? 280 : PANEL_Y + 80 + 40; // 180ish

  const centerX = isMobile ? viewBoxWidth / 2 : 420;
  const centerY = ARC_CENTER_Y;
  const arcRadius = isMobile ? 240 : 240;

  // Calculate LP allocation
  const isYielding = activeRegime === 'n';
  const lpAllocation = isYielding ? 30 : 10;
  const spotAllocation = activeRegimeData.allocation.crypto - lpAllocation;

  // Handle regime click - pause autoplay and jump to clicked regime
  const handleRegimeClick = (regimeId: RegimeId) => {
    setIsAutoPlaying(false);
    setActiveRegime(regimeId);
    setAnimationDirection('forward'); // Reset to forward on manual interaction
  };

  // Auto-play logic with ping-pong animation
  useEffect(() => {
    if (!isAutoPlaying) return;

    const timer = setInterval(() => {
      setActiveRegime(current => {
        const currentIdx = regimeOrder.indexOf(current);
        let nextIdx: number;

        if (animationDirection === 'forward') {
          nextIdx = currentIdx + 1;

          // Reached extreme greed (eg) - reverse direction
          if (nextIdx >= regimeOrder.length) {
            setAnimationDirection('backward');
            nextIdx = regimeOrder.length - 2; // Move to 'g'
          }
        } else {
          nextIdx = currentIdx - 1;

          // Reached extreme fear (ef) - reverse direction
          if (nextIdx < 0) {
            setAnimationDirection('forward');
            nextIdx = 1; // Move to 'f'
          }
        }

        return regimeOrder[nextIdx];
      });
    }, autoPlayInterval);

    return () => clearInterval(timer);
  }, [autoPlayInterval, isAutoPlaying, animationDirection]);

  // Calculate positions in gentle 180° arc (centered for vertical layout)
  const calculatePosition = (index: number) => {
    const startAngle = 180; // Left side
    const angleStep = 180 / (getRegimeById('ef').id === 'ef' ? 4 : 4); // 5 regimes -> 4 steps
    const angle = (startAngle - index * angleStep) * (Math.PI / 180);

    return {
      x: centerX + arcRadius * Math.cos(angle),
      y: centerY + arcRadius * Math.sin(angle),
    };
  };

  const getViewBox = () => `0 0 ${viewBoxWidth} ${viewBoxHeight}`;

  const getPanelPosition = () => {
    return isMobile
      ? { x: 50, y: PANEL_Y, width: 800, height: PANEL_HEIGHT }
      : { x: 900, y: PANEL_Y, width: 600, height: PANEL_HEIGHT };
  };

  const panelPos = getPanelPosition();

  return (
    <section className={`relative py-20 ${className}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="relative"
        >
          {/* Interaction hint - auto-dismisses */}
          {isAutoPlaying && (
            <motion.div
              className="absolute top-4 left-1/2 -translate-x-1/2 z-20 px-4 py-2 bg-purple-600/90 backdrop-blur-sm rounded-full text-white text-sm font-medium shadow-lg"
              initial={{ opacity: 0, y: -10 }}
              animate={{
                opacity: [0, 1, 1, 0],
                y: [-10, 0, 0, -10]
              }}
              transition={{
                duration: 6,
                times: [0, 0.1, 0.9, 1],
                repeat: 2
              }}
            >
              👆 Click any regime to explore
            </motion.div>
          )}
          <div className="w-full">
            <svg viewBox={getViewBox()} className="w-full h-auto">
        <defs>
          {/* Gradients for liquid fills */}
          <linearGradient id="stableGradient" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#3B82F6" stopOpacity="0.8" />
            <stop offset="100%" stopColor="#2563EB" stopOpacity="0.9" />
          </linearGradient>

          <linearGradient id="cryptoGradient" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#F97316" stopOpacity="0.8" />
            <stop offset="100%" stopColor="#EA580C" stopOpacity="0.9" />
          </linearGradient>

          <linearGradient id="lpGradient" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#A855F7" stopOpacity="0.8" />
            <stop offset="100%" stopColor="#9333EA" stopOpacity="0.9" />
          </linearGradient>

          {/* Glow filter */}
          <filter id="pathwayGlow">
            <feGaussianBlur stdDeviation="5" result="coloredBlur" />
            <feMerge>
              <feMergeNode in="coloredBlur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

              <RegimeArc
                activeRegime={activeRegime}
                calculatePosition={calculatePosition}
                isMobile={isMobile}
                onRegimeClick={handleRegimeClick}
                isAutoPlaying={isAutoPlaying}
                animationDirection={animationDirection}
              />

              <AllocationPanel
                activeRegimeData={activeRegimeData}
                panelPosition={panelPos}
                lpAllocation={lpAllocation}
                spotAllocation={spotAllocation}
                isMobile={isMobile}
              />
            </svg>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
