/**
 * Custom hook for managing regime auto-play animation
 * Handles ping-pong animation between regime extremes with direction reversal
 */

import { useState, useEffect } from 'react';
import { type RegimeId, regimeOrder } from '@/lib/regimeData';
import { REGIME_VISUALIZER_CONFIG } from '@/config/regimeVisualizerConfig';

interface UseRegimeAutoPlayOptions {
  /** Initial regime to start from (default: 'n' for neutral) */
  startRegime?: RegimeId;
  /** Interval between transitions in milliseconds */
  autoPlayInterval?: number;
  /** Whether user prefers reduced motion */
  prefersReducedMotion?: boolean;
}

export function useRegimeAutoPlay({
  startRegime = 'n',
  autoPlayInterval = REGIME_VISUALIZER_CONFIG.animation.autoPlayInterval,
  prefersReducedMotion = false,
}: UseRegimeAutoPlayOptions = {}) {
  const [activeRegime, setActiveRegime] = useState<RegimeId>(startRegime);
  const [previousRegime, setPreviousRegime] = useState<RegimeId>(startRegime);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const [animationDirection, setAnimationDirection] = useState<'forward' | 'backward'>('forward');

  // Track previous regime for strategy selection
  useEffect(() => {
    setPreviousRegime(activeRegime);
  }, [activeRegime]);

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
            // Use regime ID from config instead of hardcoded index
            nextIdx = regimeOrder.indexOf(REGIME_VISUALIZER_CONFIG.autoPlay.reversalPoints.forward);
          }
        } else {
          nextIdx = currentIdx - 1;

          // Reached extreme fear (ef) - reverse direction
          if (nextIdx < 0) {
            setAnimationDirection('forward');
            // Use regime ID from config instead of hardcoded index
            nextIdx = regimeOrder.indexOf(
              REGIME_VISUALIZER_CONFIG.autoPlay.reversalPoints.backward
            );
          }
        }

        return regimeOrder[nextIdx];
      });
    }, autoPlayInterval);

    return () => clearInterval(timer);
  }, [autoPlayInterval, isAutoPlaying, animationDirection, prefersReducedMotion]);

  /**
   * Handle manual regime click - stops auto-play and jumps to clicked regime
   */
  const handleRegimeClick = (regimeId: RegimeId) => {
    setIsAutoPlaying(false);
    setActiveRegime(regimeId);
    setAnimationDirection('forward');
  };

  return {
    activeRegime,
    previousRegime,
    isAutoPlaying,
    animationDirection,
    setIsAutoPlaying,
    handleRegimeClick,
  };
}
