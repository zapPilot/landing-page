import { useState, useEffect, useCallback } from 'react';
import { type RegimeId, regimeOrder } from './regimeData';

interface UseAutoPlayOptions {
  enabled: boolean;
  intervalMs?: number;
}

export function useAutoPlay({ enabled, intervalMs = 6000 }: UseAutoPlayOptions) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState<1 | -1>(1);
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

  // Auto-play loop with ping-pong behavior
  useEffect(() => {
    if (!enabled || isPaused) return;

    const timer = setInterval(() => {
      setCurrentIndex((i) => {
        const next = i + direction;
        // Reached the end, bounce back
        if (next >= regimeOrder.length - 1) {
          setDirection(-1);
          return regimeOrder.length - 1;
        }
        // Reached the start, bounce forward
        if (next <= 0) {
          setDirection(1);
          return 0;
        }
        return next;
      });
    }, intervalMs);

    return () => clearInterval(timer);
  }, [enabled, isPaused, intervalMs, direction]);

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
