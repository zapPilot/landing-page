/**
 * Data transformation utilities for regime use cases
 * Transforms raw regime data into tabbed use case format for UI consumption
 */

import type { LucideIcon } from 'lucide-react';
import type { Regime } from '@/lib/regimeData';
import type { UseCaseVariant } from '@/components/use-case/types';
import { getRegimeNumber, calculateLpDirection } from '@/types/regime.types';
import { getStrategyTabLabel } from '@/config/useCaseLabels';

export interface TabbedUseCaseData {
  number: string;
  icon: LucideIcon;
  regime: string;
  regimeBadge: string;
  gradient: string;
  variants: UseCaseVariant[];
  // Regime metadata grouped to reduce duplication
  regimeRef: {
    philosophy: string;
    author: string;
    fillColor: string;
  };
}

/**
 * Transform regime data into tabbed use case format
 * Filters strategies with use case data and maps them to variant objects
 *
 * @param regimes - Array of regime configurations
 * @returns Array of tabbed use case data ready for rendering
 * @throws Error if a tab label is missing for a regime/direction combination
 */
export function transformRegimesToUseCases(regimes: Regime[]): TabbedUseCaseData[] {
  return regimes.map(regime => {
    // Collect all strategies that have use case data
    const strategyVariants = [
      regime.strategies.fromLeft?.useCase && {
        strategy: regime.strategies.fromLeft,
        direction: 'from-left' as const,
      },
      regime.strategies.fromRight?.useCase && {
        strategy: regime.strategies.fromRight,
        direction: 'from-right' as const,
      },
      regime.strategies.default.useCase && {
        strategy: regime.strategies.default,
        direction: 'default' as const,
      },
    ].filter((item): item is NonNullable<typeof item> => Boolean(item));

    // Map strategies to variant format
    const variants = strategyVariants.map(item => {
      const { strategy, direction } = item;
      const useCase = strategy.useCase!; // Safe assertion after filter
      const tabLabel = getStrategyTabLabel(regime.id, direction);

      if (!tabLabel) {
        throw new Error(
          `Missing tab label for regime "${regime.id}", direction "${direction}". ` +
            `Add entry to STRATEGY_TAB_LABELS in useCaseLabels.ts`
        );
      }

      return {
        direction,
        tabLabel,
        title: strategy.title,
        subtitle: strategy.subtitle,
        scenario: useCase.scenario,
        userIntent: useCase.userIntent,
        zapAction: useCase.zapAction,
        allocationStartBreakdown: useCase.allocationBefore,
        allocationEndBreakdown: useCase.allocationAfter,
        lpDirection: calculateLpDirection(useCase.allocationBefore, useCase.allocationAfter),
        protocols: regime.protocols,
      };
    });

    return {
      number: getRegimeNumber(regime.id),
      icon: regime.visual.icon,
      regime: regime.label,
      regimeBadge: regime.visual.badge,
      gradient: regime.visual.gradient,
      variants,
      regimeRef: {
        philosophy: regime.philosophy,
        author: regime.author,
        fillColor: regime.fillColor,
      },
    };
  });
}
