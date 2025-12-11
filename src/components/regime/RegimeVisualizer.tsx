'use client';

import { motion } from 'framer-motion';
import { type RegimeId } from '@/lib/regimeData';
import {
  getRegimeById,
  getActiveStrategy,
  getDirectionLabel,
  calculateRegimePosition,
} from '@/lib/regimeUtils';
import { useState, useEffect } from 'react';
import { useMediaQuery } from '@/hooks/useMediaQuery';
import { useReducedMotion } from '@/hooks/useReducedMotion';
import { useRegimeAutoPlay } from '@/hooks/useRegimeAutoPlay';
import { useRegimeLayout } from '@/hooks/useRegimeLayout';
import { ErrorBoundary } from '@/components/ErrorBoundary';
import { RegimeArc } from './RegimeArc';
import { AllocationPanel } from './AllocationPanel';
import { GlowFilter } from '@/components/ui';
import { REGIME_VISUALIZER_CONFIG } from '@/config/regimeVisualizerConfig';

interface RegimeVisualizerProps {
  autoPlayInterval?: number;
  startRegime?: RegimeId;
  className?: string;
}

export function RegimeVisualizer({
  autoPlayInterval,
  startRegime,
  className = '',
}: RegimeVisualizerProps) {
  const [isLoading, setIsLoading] = useState(true);
  const isMobile = useMediaQuery('(max-width: 1024px)');
  const prefersReducedMotion = useReducedMotion();

  // Extract auto-play logic to custom hook
  const { activeRegime, previousRegime, isAutoPlaying, animationDirection, handleRegimeClick } =
    useRegimeAutoPlay({
      startRegime,
      autoPlayInterval,
      prefersReducedMotion,
    });

  // Extract layout logic to custom hook
  const layout = useRegimeLayout(isMobile);

  const activeRegimeData = getRegimeById(activeRegime);
  const activeStrategy = getActiveStrategy(activeRegime, animationDirection, previousRegime);
  const directionLabel = getDirectionLabel(activeRegime, animationDirection);

  // Simulate loading state for smooth initial render
  useEffect(() => {
    const timer = setTimeout(
      () => setIsLoading(false),
      REGIME_VISUALIZER_CONFIG.animation.loadingDelay
    );
    return () => clearTimeout(timer);
  }, []);

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
              Zap Pilot analyzes the Fear & Greed Index to determine when to act — and when to hold
              steady.
            </p>
          </motion.div>

          {isLoading ? (
            // Loading skeleton
            <div className="relative w-full h-[600px] lg:h-[700px] flex items-center justify-center">
              <div className="text-center space-y-4">
                <motion.div
                  className="w-16 h-16 mx-auto rounded-full border-4 border-purple-500 border-t-transparent"
                  animate={{ rotate: 360 }}
                  transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
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
                    y: [-10, 0, 0, -10],
                  }}
                  transition={{
                    duration: REGIME_VISUALIZER_CONFIG.animation.interactionHint.duration,
                    times: [...REGIME_VISUALIZER_CONFIG.animation.interactionHint.times],
                    repeat: REGIME_VISUALIZER_CONFIG.animation.interactionHint.repeat,
                  }}
                >
                  👆 Explore each regime to see how we respond
                </motion.div>
              )}
              <div className="w-full">
                <svg viewBox={layout.viewBox} className="w-full h-auto">
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
                    <GlowFilter id="pathwayGlow" stdDeviation={5} />
                  </defs>

                  <RegimeArc
                    activeRegime={activeRegime}
                    calculatePosition={index => calculateRegimePosition(index, layout.arcGeometry)}
                    isMobile={isMobile}
                    onRegimeClick={handleRegimeClick}
                    isAutoPlaying={isAutoPlaying}
                    animationDirection={animationDirection}
                  />

                  <AllocationPanel
                    activeRegimeData={activeRegimeData}
                    panelPosition={layout.panelPosition}
                    isMobile={isMobile}
                    animationDirection={animationDirection}
                    activeStrategy={activeStrategy}
                    directionLabel={directionLabel}
                    isAutoPlaying={isAutoPlaying}
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
