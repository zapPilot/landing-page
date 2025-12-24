import { transformRegimesToUseCases } from '../regimeTransformers';
import { getStrategyTabLabel } from '@/config/useCaseLabels';
import type { Regime } from '@/lib/regimeData';
import { TrendingDown, TrendingUp } from 'lucide-react';

// Mock the useCaseLabels module
jest.mock('@/config/useCaseLabels', () => ({
  getStrategyTabLabel: jest.fn((regimeId: string, direction: string) => {
    const labels: Record<string, Record<string, string>> = {
      ef: { default: 'Maximum Accumulation' },
      f: {
        'from-left': 'Recovery',
        'from-right': 'Decline',
      },
      n: { default: 'Hold' },
      g: {
        'from-left': 'Bull Run',
        'from-right': 'Correction',
      },
      eg: { default: 'Maximum Profit-Taking' },
    };
    return labels[regimeId]?.[direction] || null;
  }),
}));

describe('transformRegimesToUseCases', () => {
  const mockRegimes: Regime[] = [
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
      protocols: {
        stable: ['Morpho'],
        lp: ['GMX (GM)'],
        strategyType: 'lending',
      },
      strategies: {
        default: {
          title: 'Maximum Accumulation',
          useCase: {
            scenario: 'Bitcoin drops 33%',
            userIntent: 'DCA into BTC',
            zapAction: 'Accumulate',
            allocationBefore: { spot: 10, lp: 20, stable: 70 },
            allocationAfter: { spot: 70, lp: 0, stable: 30 },
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
      protocols: {
        stable: ['Morpho'],
        lp: ['GMX (GM)'],
        strategyType: 'lending',
      },
      strategies: {
        fromLeft: {
          title: 'Monitor Recovery',
          useCase: {
            scenario: 'Bitcoin stabilizes',
            userIntent: 'Hold positions',
            zapAction: 'Monitor',
            allocationBefore: { spot: 70, lp: 0, stable: 30 },
            allocationAfter: { spot: 70, lp: 0, stable: 30 },
          },
        },
        fromRight: {
          title: 'Unwind LP',
          useCase: {
            scenario: 'Bitcoin drops 8%',
            userIntent: 'Increase spot',
            zapAction: 'Shift to spot',
            allocationBefore: { spot: 0, lp: 30, stable: 70 },
            allocationAfter: { spot: 10, lp: 20, stable: 70 },
          },
        },
        default: {
          title: 'Cautious',
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
      protocols: {
        stable: ['Aster ALP', 'Hyperliquid HLP'],
        lp: ['GMX (GM)'],
        strategyType: 'perps',
      },
      strategies: {
        fromLeft: {
          title: 'Lock Gains',
          useCase: {
            scenario: 'FGI rises',
            userIntent: 'Lock gains',
            zapAction: 'Move to LP',
            allocationBefore: { spot: 70, lp: 0, stable: 30 },
            allocationAfter: { spot: 60, lp: 10, stable: 30 },
          },
        },
        default: {
          title: 'Soft Profit-Taking',
        },
      },
    },
  ];

  it('should transform valid regime data into tabbed use case format', () => {
    const result = transformRegimesToUseCases(mockRegimes);

    expect(result).toHaveLength(mockRegimes.length);
    expect(result[0]).toMatchObject({
      number: '01',
      regime: 'Extreme Fear',
      regimeBadge: 'bg-red-500/20 text-red-400 border-red-500/30',
      gradient: 'from-red-400 to-orange-500',
      variants: expect.any(Array),
    });
    expect(result[0].icon).toBe(TrendingDown);
  });

  it('should filter strategies without use case data', () => {
    const result = transformRegimesToUseCases(mockRegimes);

    // Fear regime has 2 strategies with use cases (fromLeft, fromRight)
    expect(result[1].variants).toHaveLength(2);

    // Greed regime has 1 strategy with use case (fromLeft only)
    expect(result[2].variants).toHaveLength(1);
  });

  it('should correctly calculate lpDirection for variants', () => {
    const result = transformRegimesToUseCases(mockRegimes);

    // Extreme Fear: LP decreases (20 -> 0)
    const efVariant = result[0].variants[0];
    expect(efVariant.lpDirection).toBe('unwinding');

    // Fear fromLeft: LP unchanged (0 -> 0)
    const fFromLeftVariant = result[1].variants[0];
    expect(fFromLeftVariant.lpDirection).toBeUndefined();

    // Fear fromRight: LP decreases (30 -> 20)
    const fFromRightVariant = result[1].variants[1];
    expect(fFromRightVariant.lpDirection).toBe('unwinding');

    // Greed fromLeft: LP increases (0 -> 10)
    const gVariant = result[2].variants[0];
    expect(gVariant.lpDirection).toBe('building');
  });

  it('should map all strategy directions correctly', () => {
    const result = transformRegimesToUseCases(mockRegimes);
    const allVariants = result.flatMap(r => r.variants);

    const directions = allVariants.map(v => v.direction);
    expect(directions).toContain('default');
    expect(directions).toContain('from-left');
    expect(directions).toContain('from-right');
  });

  it('should include all required variant fields', () => {
    const result = transformRegimesToUseCases(mockRegimes);
    const variant = result[0].variants[0];

    expect(variant).toHaveProperty('direction');
    expect(variant).toHaveProperty('tabLabel');
    expect(variant).toHaveProperty('title');
    expect(variant).toHaveProperty('scenario');
    expect(variant).toHaveProperty('userIntent');
    expect(variant).toHaveProperty('zapAction');
    expect(variant).toHaveProperty('allocationStartBreakdown');
    expect(variant).toHaveProperty('allocationEndBreakdown');
    expect(variant).toHaveProperty('lpDirection');
  });

  it('should throw error when tab label is missing', () => {
    jest.mocked(getStrategyTabLabel).mockReturnValueOnce(undefined);

    expect(() => transformRegimesToUseCases(mockRegimes)).toThrow(/Missing tab label/);
  });

  it('should handle regimes with only default strategy', () => {
    const singleStrategyRegime: Regime[] = [
      {
        id: 'n',
        label: 'Neutral',
        allocation: { crypto: 50, stable: 50 },
        fillColor: '#eab308',
        philosophy: '"Test"',
        author: 'Test Author',
        visual: {
          badge: 'test-badge',
          gradient: 'test-gradient',
          icon: TrendingUp,
        },
        protocols: {
          stable: ['Aster ALP', 'Hyperliquid HLP'],
          lp: ['GMX (GM)'],
          strategyType: 'perps',
        },
        strategies: {
          default: {
            title: 'Hold',
            useCase: {
              scenario: 'Market neutral',
              userIntent: 'Hold',
              zapAction: 'Do nothing',
              allocationBefore: { spot: 50, lp: 0, stable: 50 },
              allocationAfter: { spot: 50, lp: 0, stable: 50 },
            },
          },
        },
      },
    ];

    const result = transformRegimesToUseCases(singleStrategyRegime);
    expect(result).toHaveLength(1);
    expect(result[0].variants).toHaveLength(1);
    expect(result[0].variants[0].direction).toBe('default');
  });
});
