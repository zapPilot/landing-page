'use client';

import { motion } from 'framer-motion';
import { type RegimeId, regimeOrder, getRegimeById } from '../variation-claude/shared/regimeData';
import { useState, useEffect } from 'react';
import { useMediaQuery } from '@/hooks/useMediaQuery';
import { useReducedMotion } from '@/hooks/useReducedMotion';
import { ErrorBoundary } from '@/components/ErrorBoundary';
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
  const [isLoading, setIsLoading] = useState(true);
  const isMobile = useMediaQuery('(max-width: 1024px)');
  const prefersReducedMotion = useReducedMotion();

  // Simulate loading state for smooth initial render
  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 300);
    return () => clearTimeout(timer);
  }, []);

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
    if (!isAutoPlaying || prefersReducedMotion) return;

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
  }, [autoPlayInterval, isAutoPlaying, animationDirection, prefersReducedMotion]);

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
    <ErrorBoundary
      fallback={
        <section className="relative py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="py-20 text-center bg-gray-900/20 rounded-2xl border border-gray-800">
              <p className="text-gray-300 mb-4">Unable to load regime visualizer</p>
              <p className="text-gray-500 text-sm">Please refresh the page or try again later.</p>
            </div>
          </div>
        </section>
      }
    >
      <section className={`relative py-20 ${className}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-6">
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-blue-400">
              Market Sentiment Drives Every Decision
            </span>
          </h2>
          <p className="text-xl sm:text-2xl text-gray-300 max-w-3xl mx-auto">
            Zap Pilot analyzes the Fear & Greed Index to determine when to act — and when to hold steady.
          </p>
        </motion.div>

        {isLoading ? (
          // Loading skeleton
          <div className="relative w-full h-[600px] lg:h-[700px] flex items-center justify-center">
            <div className="text-center space-y-4">
              <motion.div
                className="w-16 h-16 mx-auto rounded-full border-4 border-purple-500 border-t-transparent"
                animate={{ rotate: 360 }}
                transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
              />
              <p className="text-gray-300 text-sm">Loading regime visualizer...</p>
            </div>
          </div>
        ) : (
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
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
              👆 Explore each regime to see how we respond
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
        )}
      </div>
    </section>
    </ErrorBoundary>
  );
}
