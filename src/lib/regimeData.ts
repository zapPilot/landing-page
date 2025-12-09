import type { AllocationBreakdown } from '@/components/ui/allocation/types';
import type { LucideIcon } from 'lucide-react';
import { TrendingDown, TrendingUp, Pause } from 'lucide-react';

/**
 * Shared allocation states used across regime transitions.
 * Each state represents a unique portfolio composition in the flow.
 * Using shared objects ensures allocation consistency between connected regimes.
 */
export const ALLOCATION_STATES = {
  HEAVY_STABLE: { spot: 10, lp: 20, stable: 70 },
  HEAVY_SPOT: { spot: 70, lp: 0, stable: 30 },
  PROFIT_TAKEN: { spot: 0, lp: 30, stable: 70 },
  BALANCED_LP: { spot: 60, lp: 10, stable: 30 },
} as const;

export type RegimeId = 'ef' | 'f' | 'n' | 'g' | 'eg';

export interface RegimeStrategy {
  title: string;
  useCase?: {
    scenario: string;
    userIntent: string;
    zapAction: string;
    allocationBefore: AllocationBreakdown;
    allocationAfter: AllocationBreakdown;
  };
}

export interface Regime {
  id: RegimeId;
  label: string;
  allocation: {
    crypto: number;
    stable: number;
  };
  fillColor: string;
  philosophy: string;
  /** Author of the philosophy quote */
  author: string;
  strategies: {
    fromLeft?: RegimeStrategy;
    fromRight?: RegimeStrategy;
    default: RegimeStrategy;
  };
  // Visual configuration for UI components
  visual: {
    /** Tailwind badge classes for regime badge styling */
    badge: string;
    /** Tailwind gradient classes for visual elements */
    gradient: string;
    /** Lucide icon component for regime representation */
    icon: LucideIcon;
  };
}

export const regimes: Regime[] = [
  {
    id: 'ef',
    label: 'Extreme Fear',
    allocation: { crypto: 70, stable: 30 },
    fillColor: '#ef4444',
    philosophy: '"Be greedy when others are fearful"',
    author: 'Warren Buffett',
    visual: {
      badge: 'bg-red-500/20 text-red-400 border-red-500/30',
      gradient: 'from-red-400 to-orange-500',
      icon: TrendingDown,
    },
    strategies: {
      default: {
        title: 'Maximum Accumulation',
        useCase: {
          scenario: 'Bitcoin drops 33% from recent highs. FGI drops to 15.',
          userIntent: 'I want to DCA into BTC/ETH without timing the bottom.',
          zapAction:
            'DCA from 10% crypto, 20% LP → 70% crypto over 10 days (4%/day buy rate) using stable reserves.',
          allocationBefore: ALLOCATION_STATES.HEAVY_STABLE,
          allocationAfter: ALLOCATION_STATES.HEAVY_SPOT,
        },
      },
    },
  },
  {
    id: 'f',
    label: 'Fear',
    allocation: { crypto: 60, stable: 40 },
    fillColor: '#f97316',
    philosophy: '"Buy when there\'s blood in the streets"',
    author: 'Nathan Rothschild',
    visual: {
      badge: 'bg-orange-500/20 text-orange-400 border-orange-500/30',
      gradient: 'from-orange-400 to-red-500',
      icon: TrendingDown,
    },
    strategies: {
      fromLeft: {
        title: 'Monitor Market Recovery',
        useCase: {
          scenario: 'Bitcoin stabilizes after bouncing 12% from recent lows. FGI rises to 35.',
          userIntent: 'I want to hold my positions during early recovery.',
          zapAction:
            'Maintains current allocation with zero rebalancing. Only monitors for risk spikes.',
          allocationBefore: ALLOCATION_STATES.HEAVY_SPOT,
          allocationAfter: ALLOCATION_STATES.HEAVY_SPOT,
        },
      },
      fromRight: {
        title: 'Unwind LP for Spot',
        useCase: {
          scenario: 'Bitcoin drops 8% from recent peak. FGI falls to 35.',
          userIntent: 'I want to increase spot exposure as market fear grows.',
          zapAction:
            'Decomposes 10% LP → 5% crypto + 5% stable. Uses that 5% stable to complete DCA into spot over 5 days (1%/day).',
          allocationBefore: ALLOCATION_STATES.PROFIT_TAKEN,
          allocationAfter: ALLOCATION_STATES.HEAVY_STABLE,
        },
      },
      default: {
        title: 'Cautious Positioning',
      },
    },
  },
  {
    id: 'n',
    label: 'Neutral',
    allocation: { crypto: 50, stable: 50 },
    fillColor: '#eab308',
    philosophy: '"It was always my sitting that made the big money"',
    author: 'Jesse Livermore',
    visual: {
      badge: 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30',
      gradient: 'from-yellow-400 to-amber-500',
      icon: Pause,
    },
    strategies: {
      default: {
        title: 'Holiday Mode',
        useCase: {
          scenario: 'FGI hovers between 46-54 for weeks.',
          userIntent: "I don't want to overtrade or pay fees.",
          zapAction:
            'Zero rebalancing. Only monitors borrowing rate risk. Repays debt or removes leverage if threshold exceeded.',
          allocationBefore: ALLOCATION_STATES.HEAVY_SPOT,
          allocationAfter: ALLOCATION_STATES.HEAVY_SPOT,
        },
      },
    },
  },
  {
    id: 'g',
    label: 'Greed',
    allocation: { crypto: 40, stable: 60 },
    fillColor: '#84cc16',
    philosophy: '"Nobody ever went broke taking a profit"',
    author: 'Bernard Baruch',
    visual: {
      badge: 'bg-green-500/20 text-green-400 border-green-500/30',
      gradient: 'from-green-400 to-teal-500',
      icon: TrendingUp,
    },
    strategies: {
      fromLeft: {
        title: 'Lock Gains into LP',
        useCase: {
          scenario: 'FGI rises to 65 during a bull run.',
          userIntent: 'I want to lock in gains while keeping exposure and earning fees.',
          zapAction:
            'Sells 5% spot → USDC, then pairs 5% spot + 5% stable → 10% LP over 7 days (~1.4%/day).',
          allocationBefore: ALLOCATION_STATES.HEAVY_SPOT,
          allocationAfter: ALLOCATION_STATES.BALANCED_LP,
        },
      },
      fromRight: {
        title: 'Take a Rest',
        useCase: {
          scenario: 'Bitcoin corrects 25% from peak. FGI drops to 65.',
          userIntent: 'I want to avoid catching falling knives.',
          zapAction: 'Maintains current positions without new trades. Already de-risked.',
          allocationBefore: ALLOCATION_STATES.PROFIT_TAKEN,
          allocationAfter: ALLOCATION_STATES.PROFIT_TAKEN,
        },
      },
      default: {
        title: 'Soft Profit-Taking',
      },
    },
  },
  {
    id: 'eg',
    label: 'Extreme Greed',
    allocation: { crypto: 30, stable: 70 },
    fillColor: '#22c55e',
    philosophy: '"Be fearful when others are greedy"',
    author: 'Warren Buffett',
    visual: {
      badge: 'bg-emerald-500/20 text-emerald-400 border-emerald-500/30',
      gradient: 'from-emerald-400 to-green-500',
      icon: TrendingUp,
    },
    strategies: {
      default: {
        title: 'Maximum Profit-Taking',
        useCase: {
          scenario: 'Bitcoin rallies 67% from recent lows. FGI hits 92.',
          userIntent: 'I want to take profits but keep some exposure.',
          zapAction:
            'Sells 50% spot → stable. Uses remaining 10% spot + 10% stable → 20% LP. Over 10 days (2.5%/day sell rate).',
          allocationBefore: ALLOCATION_STATES.BALANCED_LP,
          allocationAfter: ALLOCATION_STATES.PROFIT_TAKEN,
        },
      },
    },
  },
];

export const regimeOrder: RegimeId[] = ['ef', 'f', 'n', 'g', 'eg'];

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
