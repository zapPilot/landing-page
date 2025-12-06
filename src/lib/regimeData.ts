export type RegimeId = 'ef' | 'f' | 'n' | 'g' | 'eg';

export type AssetFlow =
  | 'hold'
  | 'dca-buy'
  | 'dca-sell'
  | 'lp-to-spot'
  | 'spot-to-lp'
  | 'monitor-leverage';

export interface RegimeStrategy {
  title: string;
  description: string;
  actions: string[];
  assetFlow: AssetFlow;
  lpTransformation?: {
    from: 'spot' | 'lp';
    to: 'spot' | 'lp';
    percentage: number;
    duration: string;
  };
  leverageAction?: string;
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
    strategies: {
      default: {
        title: 'Maximum Accumulation',
        description: 'Historical crypto bottoms occur during extreme fear',
        actions: [
          'DCA into BTC/ETH using only your stables',
          'Prioritize debt repayment if LTV rises',
          'No new leverage during this cycle',
        ],
        assetFlow: 'dca-buy',
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
    strategies: {
      fromLeft: {
        title: 'Monitor Market Recovery',
        description: 'Market recovering from extreme fear - hold steady',
        actions: [
          'Monitor positions without new trades',
          'Watch for confirmation of recovery',
          'Repay debt if borrowing rates spike',
        ],
        assetFlow: 'hold',
        leverageAction: 'Repay debt if LTV > 50%',
      },
      fromRight: {
        title: 'Unwind LP for Spot',
        description: 'Market declining from neutral - prepare for deeper fear',
        actions: [
          'Unwind 5% of LP positions into spot BTC/ETH',
          'DCA execution over 5 days (1%/day)',
          'Prepare for potential Extreme Fear buying opportunity',
        ],
        assetFlow: 'lp-to-spot',
        lpTransformation: {
          from: 'lp',
          to: 'spot',
          percentage: 5,
          duration: '5 days',
        },
      },
      default: {
        title: 'Cautious Positioning',
        description: 'Markets often retest lows',
        actions: [
          'Small probe entries with light DCA',
          'Partial BTC/ETH-USD LP positions',
          'Take profits if borrowing rates spike',
        ],
        assetFlow: 'hold',
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
    strategies: {
      default: {
        title: 'Holiday Mode',
        description: 'Markets lack clear direction - preserve capital',
        actions: [
          'Minimal trading activity',
          'Light rebalancing only if allocation drifts significantly',
          'Maintain current positions and wait for clearer signals',
        ],
        assetFlow: 'monitor-leverage',
        leverageAction: 'Only deleverage if borrowing rates spike above threshold',
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
    strategies: {
      fromLeft: {
        title: 'Lock Gains into LP',
        description: 'Market rising from neutral - take soft profits',
        actions: [
          'Shift 5% from spot BTC/ETH into crypto-USDC LP',
          'DCA execution over 5 days (1%/day)',
          'Earn trading fees while maintaining crypto exposure',
        ],
        assetFlow: 'spot-to-lp',
        lpTransformation: {
          from: 'spot',
          to: 'lp',
          percentage: 5,
          duration: '5 days',
        },
      },
      fromRight: {
        title: 'Take a Rest',
        description: 'Market correcting from extreme greed - bear market mode',
        actions: [
          'Holiday mode - avoid new positions',
          'Let existing positions ride',
          'Wait for clearer directional signals',
        ],
        assetFlow: 'hold',
        leverageAction: 'Monitor but avoid trading during correction',
      },
      default: {
        title: 'Soft Profit-Taking',
        description: 'Lock gains while retaining exposure',
        actions: [
          'Gradually shift spot BTC/ETH into LP positions',
          'DCA-sell if coming from Neutral',
          'Avoid new purchases unless from higher regime',
        ],
        assetFlow: 'spot-to-lp',
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
    strategies: {
      default: {
        title: 'Maximum Profit-Taking',
        description: 'Market tops coincide with extreme greed',
        actions: [
          'DCA-sell excess BTC/ETH into stables',
          'Retain small beta via token-USD LPs',
          'Move stables to conservative yields (perp vaults, stable pools)',
        ],
        assetFlow: 'dca-sell',
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

export function isAdjacentRegime(from: RegimeId, to: RegimeId): boolean {
  const fromIdx = getRegimeIndex(from);
  const toIdx = getRegimeIndex(to);
  return Math.abs(toIdx - fromIdx) === 1;
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
