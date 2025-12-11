import {
  regimes,
  regimeOrder,
  type RegimeId,
  type Regime,
  type RegimeStrategy,
} from './regimeData';
import { REGIME_VISUALIZER_CONFIG } from '@/config/regimeVisualizerConfig';

export function getRegimeIndex(id: RegimeId): number {
  return regimeOrder.indexOf(id);
}

export function getRegimeById(id: RegimeId): Regime {
  return regimes.find(r => r.id === id) || regimes[0];
}

export function getActiveStrategy(
  regimeId: RegimeId,
  animationDirection: 'forward' | 'backward',
  previousRegimeId?: RegimeId
): RegimeStrategy {
  const regime = getRegimeById(regimeId);

  // Extreme regimes and neutral only have default strategy
  if (regimeId === 'ef' || regimeId === 'n' || regimeId === 'eg') {
    return regime.strategies.default;
  }

  // For Fear/Greed, determine direction context based on previous regime
  if (previousRegimeId) {
    const prevIdx = getRegimeIndex(previousRegimeId);
    const currIdx = getRegimeIndex(regimeId);

    // Coming from left (lower index = recovery/bull)
    if (prevIdx < currIdx && regime.strategies.fromLeft) {
      return regime.strategies.fromLeft;
    }

    // Coming from right (higher index = decline/bear)
    if (prevIdx > currIdx && regime.strategies.fromRight) {
      return regime.strategies.fromRight;
    }
  }

  // Fallback based on animation direction
  if (animationDirection === 'forward' && regime.strategies.fromLeft) {
    return regime.strategies.fromLeft;
  }
  if (animationDirection === 'backward' && regime.strategies.fromRight) {
    return regime.strategies.fromRight;
  }

  return regime.strategies.default;
}

export function getDirectionLabel(
  regimeId: RegimeId,
  animationDirection: 'forward' | 'backward'
): string | null {
  // No direction badge for single-strategy regimes
  if (regimeId === 'ef' || regimeId === 'n' || regimeId === 'eg') {
    return null;
  }

  if (regimeId === 'f') {
    return animationDirection === 'forward'
      ? 'From Extreme Fear (recovery)'
      : 'From Neutral (decline)';
  }

  if (regimeId === 'g') {
    return animationDirection === 'forward'
      ? 'From Neutral (bull run)'
      : 'From Extreme Greed (correction)';
  }

  return null;
}

interface ArcGeometry {
  centerX: number;
  centerY: number;
  radius: number;
}

/**
 * Calculate the position of a regime node on the arc
 * @param index The index of the regime in the order
 * @param arcGeometry The arc geometry parameters
 * @returns The x and y coordinates of the regime node
 */
export function calculateRegimePosition(
  index: number,
  arcGeometry: ArcGeometry
): { x: number; y: number } {
  const { arcAngleStart, arcAngleRange } = REGIME_VISUALIZER_CONFIG.layout.constants;
  const angleStep = arcAngleRange / (regimeOrder.length - 1);
  const angle = (arcAngleStart - index * angleStep) * (Math.PI / 180);

  return {
    x: arcGeometry.centerX + arcGeometry.radius * Math.cos(angle),
    y: arcGeometry.centerY + arcGeometry.radius * Math.sin(angle),
  };
}
