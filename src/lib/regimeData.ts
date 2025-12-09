import type { AllocationBreakdown } from '@/components/ui/allocation/types';
import type { LucideIcon } from 'lucide-react';
import { TrendingDown, TrendingUp, Pause } from 'lucide-react';

/**
 * Shared allocation states used across regime transitions.
 * Each state represents a unique portfolio composition in the flow.
 * Using shared objects ensures allocation consistency between connected regimes.
 */
export const ALLOCATION_STATES = {
  HEAVY_STABLE: { spot: 10, lp: 30, stable: 60 },
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
  range: string;
  fearGreedIndex: [number, number];
  allocation: {
    crypto: number;
    stable: number;
  };
  color: string;
  fillColor: string;
  author: string;
  actions: string[];
  philosophy: string;
  whyThisWorks: string;
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
  /**
   * Default LP allocation percentage for this regime
   * Neutral regime uses 30% for fee generation during sideways markets
   * Other regimes use 10% as base allocation
   */
  defaultLpAllocation: number;
}

export const regimes: Regime[] = [
  {
    id: 'ef',
    label: 'Extreme Fear',
    range: '0-25',
    fearGreedIndex: [0, 25],
    allocation: { crypto: 70, stable: 30 },
    color: 'text-red-500',
    fillColor: '#ef4444',
    author: 'Warren Buffett',
    actions: [
      'DCA into BTC/ETH using only your stables',
      'Prioritize debt repayment if LTV rises',
      'No new leverage during this cycle',
    ],
    philosophy: '"Be greedy when others are fearful"',
    whyThisWorks:
      'Historical crypto bottoms occur during extreme fear. Value-buying without leverage minimizes risk while maximizing long-term upside.',
    visual: {
      badge: 'bg-red-500/20 text-red-400 border-red-500/30',
      gradient: 'from-red-400 to-orange-500',
      icon: TrendingDown,
    },
    defaultLpAllocation: 10,
    strategies: {
      default: {
        title: 'Maximum Accumulation',
        useCase: {
          scenario: 'Bitcoin crashes from $60K to $40K. FGI drops to 15.',
          userIntent: 'I want to DCA into BTC/ETH without timing the bottom.',
          zapAction:
            'DCA from 30% → 70% crypto over 10 days (4%/day buy rate) using stable reserves.',
          allocationBefore: ALLOCATION_STATES.HEAVY_STABLE,
          allocationAfter: ALLOCATION_STATES.HEAVY_SPOT,
        },
      },
    },
  },
  {
    id: 'f',
    label: 'Fear',
    range: '26-45',
    fearGreedIndex: [26, 45],
    allocation: { crypto: 60, stable: 40 },
    color: 'text-orange-500',
    fillColor: '#f97316',
    author: 'Nathan Rothschild',
    actions: [
      'Small probe entries with light DCA',
      'Partial BTC/ETH-USD LP positions',
      'Take profits if borrowing rates spike',
    ],
    philosophy: '"Buy when there\'s blood in the streets"',
    whyThisWorks:
      'Markets often retest lows. LP positions act as a midway zone—if market drops to Extreme Fear, you can unwind LP to buy spot.',
    visual: {
      badge: 'bg-orange-500/20 text-orange-400 border-orange-500/30',
      gradient: 'from-orange-400 to-red-500',
      icon: TrendingDown,
    },
    defaultLpAllocation: 10,
    strategies: {
      fromLeft: {
        title: 'Monitor Market Recovery',
        useCase: {
          scenario: 'Bitcoin stabilizes at $45K after bouncing from $40K. FGI rises to 35.',
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
          scenario: 'Bitcoin drops to $55K. FGI falls to 35.',
          userIntent: 'I want to increase spot exposure as market fear grows.',
          zapAction:
            'Decomposes 10% LP → 5% crypto + 5% stable. Uses that 5% stable to DCA into spot over 5 days (1%/day).',
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
    range: '46-54',
    fearGreedIndex: [46, 54],
    allocation: { crypto: 50, stable: 50 },
    color: 'text-yellow-500',
    fillColor: '#eab308',
    author: 'Jesse Livermore',
    actions: [
      'Holiday mode—minimal activity',
      'Light rebalancing only if allocation drifts',
      'Maintain current positions',
    ],
    philosophy: '"It was always my sitting that made the big money"',
    whyThisWorks:
      'When markets lack clear direction, the best move is often no move. Preserve capital and wait for clearer signals at extremes.',
    visual: {
      badge: 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30',
      gradient: 'from-yellow-400 to-amber-500',
      icon: Pause,
    },
    defaultLpAllocation: 30,
    strategies: {
      default: {
        title: 'Holiday Mode',
        useCase: {
          scenario: 'FGI hovers between 46-54 for weeks.',
          userIntent: "I don't want to overtrade or pay fees.",
          zapAction: 'Zero rebalancing. Only monitors borrowing rate risk.',
          allocationBefore: ALLOCATION_STATES.HEAVY_SPOT,
          allocationAfter: ALLOCATION_STATES.HEAVY_SPOT,
        },
      },
    },
  },
  {
    id: 'g',
    label: 'Greed',
    range: '55-75',
    fearGreedIndex: [55, 75],
    allocation: { crypto: 40, stable: 60 },
    color: 'text-lime-500',
    fillColor: '#84cc16',
    author: 'Bernard Baruch',
    actions: [
      'Gradually shift spot BTC/ETH into LP positions',
      'DCA-sell if coming from Neutral',
      'Avoid new purchases unless from higher regime',
    ],
    philosophy: '"Nobody ever went broke taking a profit"',
    whyThisWorks:
      'Soft profit-taking via LP positions lets you lock gains while earning fees and retaining some upside exposure.',
    visual: {
      badge: 'bg-green-500/20 text-green-400 border-green-500/30',
      gradient: 'from-green-400 to-teal-500',
      icon: TrendingUp,
    },
    defaultLpAllocation: 10,
    strategies: {
      fromLeft: {
        title: 'Lock Gains into LP',
        useCase: {
          scenario: 'Bitcoin rallies to $75K. FGI hits 65.',
          userIntent: 'I want to lock in gains while keeping exposure and earning fees.',
          zapAction:
            'Sells 15% spot → USDC, then pairs 10% spot + 10% stable → 20% LP over 7 days (~1.4%/day).',
          allocationBefore: ALLOCATION_STATES.HEAVY_SPOT,
          allocationAfter: ALLOCATION_STATES.BALANCED_LP,
        },
      },
      fromRight: {
        title: 'Take a Rest',
        useCase: {
          scenario: 'Bitcoin corrects from $100K to $75K. FGI drops to 65.',
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
    range: '76-100',
    fearGreedIndex: [76, 100],
    allocation: { crypto: 30, stable: 70 },
    color: 'text-green-500',
    fillColor: '#22c55e',
    author: 'Warren Buffett',
    actions: [
      'DCA-sell excess BTC/ETH into stables',
      'Retain small beta via token-USD LPs',
      'Move stables to conservative yields (perp vaults, stable pools)',
    ],
    philosophy: '"Be fearful when others are greedy"',
    whyThisWorks:
      'Market tops coincide with extreme greed. Shifting focus from gains to downside protection preserves wealth during inevitable corrections.',
    visual: {
      badge: 'bg-emerald-500/20 text-emerald-400 border-emerald-500/30',
      gradient: 'from-emerald-400 to-green-500',
      icon: TrendingUp,
    },
    defaultLpAllocation: 10,
    strategies: {
      default: {
        title: 'Maximum Profit-Taking',
        useCase: {
          scenario: 'Bitcoin rallies to $100K. FGI hits 92.',
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
