'use client';

import { motion } from 'framer-motion';
import { TrendingDown, TrendingUp, Pause } from 'lucide-react';
import { TabbedUseCase } from './UseCaseTabs';
import { SectionHeader } from './layout';

export function UseCases() {
  // Use cases with tabbed variants for Fear and Greed
  const tabbedUseCases = [
    // 01: Extreme Fear (single variant)
    {
      number: '01',
      icon: TrendingDown,
      regime: 'Extreme Fear',
      regimeBadge: 'bg-red-500/20 text-red-400 border-red-500/30',
      gradient: 'from-red-400 to-orange-500',
      variants: [
        {
          direction: 'from-left' as const,
          tabLabel: 'Market Bottom',
          title: 'Market Crash: Buy When Others Panic',
          scenario: 'Bitcoin crashes from $60K to $40K. Fear & Greed Index drops to 15.',
          userIntent: 'I want to DCA into BTC/ETH but without timing the exact bottom.',
          zapAction:
            'Shifts from 30% crypto → 70% crypto over 10 days (2.5%/day = 25% total adjustment) using your stable reserves to DCA into spot BTC/ETH.',
          allocationStart: 30,
          allocationEnd: 70,
          allocationStartBreakdown: { spot: 30, lp: 0, stable: 70 },
          allocationEndBreakdown: { spot: 70, lp: 0, stable: 30 },
          showLP: false,
        },
      ],
    },
    // 02: Fear (two variants - tabbed)
    {
      number: '02',
      icon: TrendingDown,
      regime: 'Fear',
      regimeBadge: 'bg-orange-500/20 text-orange-400 border-orange-500/30',
      gradient: 'from-orange-400 to-red-500',
      variants: [
        {
          direction: 'from-right' as const,
          tabLabel: 'From Neutral ↓',
          title: 'Market Cooling: Unwind LP for Spot',
          scenario: 'Bitcoin drops to $55K. Fear & Greed Index falls to 35.',
          userIntent: 'I want to increase spot exposure before market possibly drops further.',
          zapAction:
            'Unwinds 5% of portfolio from crypto-USDC LP → DCA into spot BTC/ETH over 5 days (1%/day), preparing for potential Extreme Fear.',
          allocationStart: 50,
          allocationEnd: 60,
          allocationStartBreakdown: { spot: 40, lp: 10, stable: 50 },
          allocationEndBreakdown: { spot: 55, lp: 5, stable: 40 },
          showLP: true,
          lpDirection: 'unwinding' as const,
        },
        {
          direction: 'from-left' as const,
          tabLabel: 'From Extreme Fear ↑',
          title: 'Recovery Watch: Monitor and Hold',
          scenario:
            'Bitcoin stabilizes at $45K after bouncing from $40K. Fear & Greed Index rises to 35.',
          userIntent: 'I want to hold my positions without overtrading during early recovery.',
          zapAction:
            'Maintains current allocation with zero rebalancing. Only acts if borrowing rates spike, automatically deleveraging to protect capital.',
          allocationStart: 60,
          allocationEnd: 60,
          allocationStartBreakdown: { spot: 50, lp: 10, stable: 40 },
          allocationEndBreakdown: { spot: 50, lp: 10, stable: 40 },
          showLP: false,
        },
      ],
    },
    // 03: Neutral (single variant)
    {
      number: '03',
      icon: Pause,
      regime: 'Neutral',
      regimeBadge: 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30',
      gradient: 'from-yellow-400 to-amber-500',
      variants: [
        {
          direction: 'from-left' as const,
          tabLabel: 'Holiday Mode',
          title: 'Sideways Market: Maintain Balance',
          scenario: 'Fear & Greed Index hovers between 46-54 for weeks.',
          userIntent: "I don't want to overtrade or pay unnecessary fees.",
          zapAction:
            'Maintains your 50/50 allocation with zero active rebalancing. Only monitors risk: if borrowing rates spike above threshold, automatically deleverages to protect capital.',
          allocationStart: 50,
          allocationEnd: 50,
          allocationStartBreakdown: { spot: 40, lp: 10, stable: 50 },
          allocationEndBreakdown: { spot: 40, lp: 10, stable: 50 },
          showLP: false,
        },
      ],
    },
    // 04: Greed (two variants - tabbed)
    {
      number: '04',
      icon: TrendingUp,
      regime: 'Greed',
      regimeBadge: 'bg-green-500/20 text-green-400 border-green-500/30',
      gradient: 'from-green-400 to-teal-500',
      variants: [
        {
          direction: 'from-left' as const,
          tabLabel: 'From Neutral ↑',
          title: 'Rising Market: Lock Gains into LP',
          scenario: 'Bitcoin rallies to $75K. Fear & Greed Index hits 65.',
          userIntent:
            'I want to lock in some gains while keeping crypto exposure and earning fees.',
          zapAction:
            'Shifts 5% of portfolio from spot BTC/ETH → crypto-USDC LP over 5 days (1%/day), earning trading fees while maintaining exposure.',
          allocationStart: 50,
          allocationEnd: 40,
          allocationStartBreakdown: { spot: 40, lp: 10, stable: 50 },
          allocationEndBreakdown: { spot: 25, lp: 15, stable: 60 },
          showLP: true,
          lpDirection: 'building' as const,
        },
        {
          direction: 'from-right' as const,
          tabLabel: 'From Extreme Greed ↓',
          title: 'Correction Time: Take a Rest',
          scenario: 'Bitcoin corrects from $100K to $75K. Fear & Greed Index drops to 65.',
          userIntent: 'I want to avoid catching falling knives during a correction.',
          zapAction:
            'Holiday mode - maintains current positions without new trades. Lets the correction play out while preserving capital. Bear market mentality.',
          allocationStart: 40,
          allocationEnd: 40,
          allocationStartBreakdown: { spot: 25, lp: 15, stable: 60 },
          allocationEndBreakdown: { spot: 25, lp: 15, stable: 60 },
          showLP: false,
        },
      ],
    },
    // 05: Extreme Greed (single variant)
    {
      number: '05',
      icon: TrendingUp,
      regime: 'Extreme Greed',
      regimeBadge: 'bg-emerald-500/20 text-emerald-400 border-emerald-500/30',
      gradient: 'from-emerald-400 to-green-500',
      variants: [
        {
          direction: 'from-left' as const,
          tabLabel: 'Market Peak',
          title: 'Bull Market Peak: Take Profits Gradually',
          scenario: 'Bitcoin rallies to $100K. Fear & Greed Index hits 92.',
          userIntent: 'I want to take profits but avoid selling too early.',
          zapAction:
            'Shifts from 70% crypto → 30% crypto over 10 days (2.5%/day = 25% total adjustment), locking in gains to stablecoins or low-risk pools.',
          allocationStart: 70,
          allocationEnd: 30,
          allocationStartBreakdown: { spot: 60, lp: 10, stable: 30 },
          allocationEndBreakdown: { spot: 20, lp: 10, stable: 70 },
          showLP: false,
        },
      ],
    },
  ];

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
