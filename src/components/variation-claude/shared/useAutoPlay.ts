import { useState, useEffect, useCallback } from 'react';
import { type RegimeId, regimeOrder } from './regimeData';

interface UseAutoPlayOptions {
  enabled: boolean;
  intervalMs?: number;
}

export function useAutoPlay({ enabled, intervalMs = 6000 }: UseAutoPlayOptions) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [lastInteractionTime, setLastInteractionTime] = useState(0);

  const currentRegimeId = regimeOrder[currentIndex];

  const pause = useCallback(() => {
    setIsPaused(true);
    setLastInteractionTime(Date.now());
  }, []);

  const resume = useCallback(() => {
    setIsPaused(false);
  }, []);

  const goToRegime = useCallback((regimeId: RegimeId) => {
    const index = regimeOrder.indexOf(regimeId);
    if (index !== -1) {
      setCurrentIndex(index);
      pause();
    }
  }, [pause]);

  // Auto-play loop
  useEffect(() => {
    if (!enabled || isPaused) return;

    const timer = setInterval(() => {
      setCurrentIndex((i) => (i + 1) % regimeOrder.length);
    }, intervalMs);

    return () => clearInterval(timer);
  }, [enabled, isPaused, intervalMs]);

  // Auto-resume after inactivity
  useEffect(() => {
    if (!isPaused || !enabled) return;

    const resumeTimer = setTimeout(() => {
      const timeSinceInteraction = Date.now() - lastInteractionTime;
      if (timeSinceInteraction >= 3000) {
        resume();
      }
    }, 3000);

    return () => clearTimeout(resumeTimer);
  }, [isPaused, enabled, lastInteractionTime, resume]);

  return {
    currentRegimeId,
    currentIndex,
    isPaused,
    pause,
    resume,
    goToRegime,
  };
}
