'use client';

import { motion } from 'framer-motion';
import { TabbedUseCase } from './use-case';
import { SectionHeader } from './layout';
import { regimes } from '@/lib/regimeData';
import { getRegimeNumber, calculateLpDirection } from '@/types/regime.types';

export function UseCases() {
  // Map regimes to use cases with tabbed variants
  const tabbedUseCases = regimes.map((regime) => {
    // Collect all strategies that have use case data
    const strategyVariants = [
      regime.strategies.fromLeft?.useCase && {
        strategy: regime.strategies.fromLeft,
        direction: 'from-left' as const,
        tabLabel: regime.id === 'f' ? 'From Extreme Fear ↑' : 'From Neutral ↑',
      },
      regime.strategies.fromRight?.useCase && {
        strategy: regime.strategies.fromRight,
        direction: 'from-right' as const,
        tabLabel: regime.id === 'f' ? 'From Neutral ↓' : 'From Extreme Greed ↓',
      },
      regime.strategies.default.useCase && {
        strategy: regime.strategies.default,
        direction: 'from-left' as const,
        tabLabel:
          regime.id === 'ef'
            ? 'Market Bottom'
            : regime.id === 'n'
              ? 'Holiday Mode'
              : 'Market Peak',
      },
    ].filter(Boolean);

    // Map strategies to variant format
    const variants = strategyVariants.map((item) => {
      const { strategy, direction, tabLabel } = item!;
      const useCase = strategy.useCase!;

      return {
        direction,
        tabLabel,
        title: strategy.title,
        scenario: useCase.scenario,
        userIntent: useCase.userIntent,
        zapAction: useCase.zapAction,
        allocationStartBreakdown: useCase.allocationBefore,
        allocationEndBreakdown: useCase.allocationAfter,
        lpDirection: calculateLpDirection(useCase.allocationBefore, useCase.allocationAfter),
      };
    });

    return {
      number: getRegimeNumber(regime.id),
      icon: regime.visual.icon,
      regime: regime.label,
      regimeBadge: regime.visual.badge,
      gradient: regime.visual.gradient,
      variants,
    };
  });

  return (
    <section id="use-cases" className="py-24 bg-gray-900/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeader
          title={
            <>
              Use
              <span className="ml-3">Cases</span>
            </>
          }
          subtitle="Real scenarios where Zap Pilot keeps you disciplined"
        />

        <div className="space-y-12">
          {tabbedUseCases.map((useCase, index) => (
            <motion.div
              key={useCase.number}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: index * 0.2 }}
              viewport={{ once: true }}
            >
              <TabbedUseCase
                number={useCase.number}
                regime={useCase.regime}
                regimeBadge={useCase.regimeBadge}
                gradient={useCase.gradient}
                variants={useCase.variants}
                icon={useCase.icon}
              />
            </motion.div>
          ))}
        </div>

        {/* Bottom message */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          viewport={{ once: true }}
          className="text-center mt-20"
        >
          <p className="text-xl text-gray-300 mb-6">Let market sentiment guide your decisions.</p>
          <p className="text-2xl font-semibold bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
            Zap Pilot handles the gradual execution — entirely within your wallet.
          </p>
        </motion.div>
      </div>
    </section>
  );
}
