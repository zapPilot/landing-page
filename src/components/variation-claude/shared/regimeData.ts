export type RegimeId = 'ef' | 'f' | 'n' | 'g' | 'eg';

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
    philosophy: '"Be fearful when others are greedy"'
  },
];

export const regimeOrder: RegimeId[] = ['ef', 'f', 'n', 'g', 'eg'];

export function getRegimeIndex(id: RegimeId): number {
  return regimeOrder.indexOf(id);
}

export function getRegimeById(id: RegimeId): Regime {
  return regimes.find((r) => r.id === id) || regimes[0];
}

export function isAdjacentRegime(from: RegimeId, to: RegimeId): boolean {
  const fromIdx = getRegimeIndex(from);
  const toIdx = getRegimeIndex(to);
  return Math.abs(toIdx - fromIdx) === 1;
}
