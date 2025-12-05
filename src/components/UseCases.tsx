'use client';

import { motion } from 'framer-motion';
import { TrendingDown, TrendingUp, Pause } from 'lucide-react';
import { LPPoolBadge } from './LPPoolBadge';

export function UseCases() {
  const useCases = [
    {
      number: '01',
      icon: TrendingDown,
      regime: 'Extreme Fear',
      regimeBadge: 'bg-red-500/20 text-red-400 border-red-500/30',
      title: 'Market Crash: Buy When Others Panic',
      scenario: 'Bitcoin crashes from $60K to $40K. Fear & Greed Index drops to 15.',
      userIntent: 'I want to DCA into BTC/ETH but without timing the exact bottom.',
      zapAction:
        'Shifts from 30% crypto → 70% crypto over 10 days (2.5%/day = 25% total adjustment) using your stable reserves to DCA into spot BTC/ETH.',
      gradient: 'from-red-400 to-orange-500',
      allocationStart: 30,
      allocationEnd: 70,
      showLP: false,
    },
    {
      number: '02',
      icon: TrendingDown,
      regime: 'Fear',
      regimeBadge: 'bg-orange-500/20 text-orange-400 border-orange-500/30',
      title: 'Market Cooling: Unwind LP for Spot',
      scenario: 'Bitcoin drops to $55K. Fear & Greed Index falls to 35.',
      userIntent: 'I want to increase spot exposure before market possibly drops further.',
      zapAction:
        'Unwinds 5% of portfolio from crypto-USDC LP → DCA into spot BTC/ETH over 5 days (1%/day), preparing for potential Extreme Fear.',
      gradient: 'from-orange-400 to-red-500',
      allocationStart: 50,
      allocationEnd: 60,
      showLP: true,
      lpDirection: 'unwinding', // LP → Spot
    },
    {
      number: '03',
      icon: Pause,
      regime: 'Neutral',
      regimeBadge: 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30',
      title: 'Sideways Market: Maintain Balance',
      scenario: 'Fear & Greed Index hovers between 46-54 for weeks.',
      userIntent: "I don't want to overtrade or pay unnecessary fees.",
      zapAction:
        'Maintains your 50/50 allocation with zero active rebalancing. Only monitors risk: if borrowing rates spike above threshold, automatically deleverages to protect capital.',
      gradient: 'from-yellow-400 to-amber-500',
      allocationStart: 50,
      allocationEnd: 50,
      showLP: false,
    },
    {
      number: '04',
      icon: TrendingUp,
      regime: 'Greed',
      regimeBadge: 'bg-green-500/20 text-green-400 border-green-500/30',
      title: 'Rising Market: Lock Gains into LP',
      scenario: 'Bitcoin rallies to $75K. Fear & Greed Index hits 65.',
      userIntent: 'I want to lock in some gains while keeping crypto exposure and earning fees.',
      zapAction:
        'Shifts 5% of portfolio from spot BTC/ETH → crypto-USDC LP over 5 days (1%/day), earning trading fees while maintaining exposure.',
      gradient: 'from-green-400 to-teal-500',
      allocationStart: 50,
      allocationEnd: 40,
      showLP: true,
      lpDirection: 'building', // Spot → LP
    },
    {
      number: '05',
      icon: TrendingUp,
      regime: 'Extreme Greed',
      regimeBadge: 'bg-emerald-500/20 text-emerald-400 border-emerald-500/30',
      title: 'Bull Market Peak: Take Profits Gradually',
      scenario: 'Bitcoin rallies to $100K. Fear & Greed Index hits 92.',
      userIntent: 'I want to take profits but avoid selling too early.',
      zapAction:
        'Shifts from 70% crypto → 30% crypto over 10 days (2.5%/day = 25% total adjustment), locking in gains to stablecoins or low-risk pools.',
      gradient: 'from-emerald-400 to-green-500',
      allocationStart: 70,
      allocationEnd: 30,
      showLP: false,
    },
  ];

  return (
    <section id="use-cases" className="py-24 bg-gray-900/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-20"
        >
          <h2 className="text-4xl sm:text-5xl font-bold mb-6">
            Use
            <span className="bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent ml-3">
              Cases
            </span>
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Real scenarios where Zap Pilot keeps you disciplined
          </p>
        </motion.div>

        <div className="space-y-12">
          {useCases.map((useCase, index) => (
            <motion.div
              key={useCase.number}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: index * 0.2 }}
              viewport={{ once: true }}
              className="group relative"
            >
              <div className="bg-gray-900/50 backdrop-blur-lg border border-gray-800 rounded-3xl p-8 lg:p-12 hover:border-gray-700 transition-all duration-500 relative overflow-hidden">
                {/* Animated background */}
                <motion.div
                  className={`absolute inset-0 bg-gradient-to-r ${useCase.gradient} opacity-0 group-hover:opacity-5 transition-opacity duration-500 pointer-events-none`}
                  initial={false}
                  whileHover={{ opacity: 0.05 }}
                />

                <div className="grid lg:grid-cols-2 gap-12 items-center">
                  {/* Content */}
                  <div className={index % 2 === 1 ? 'lg:order-2' : ''}>
                    {/* Number badge */}
                    <motion.div
                      className={`inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-r ${useCase.gradient} text-white font-bold text-xl mb-6`}
                      whileHover={{ scale: 1.1, rotate: 5 }}
                      transition={{ type: 'spring', stiffness: 300 }}
                    >
                      {useCase.number}
                    </motion.div>

                    {/* Regime Badge */}
                    <div
                      className={`inline-block px-4 py-2 rounded-full border ${useCase.regimeBadge} font-semibold text-sm mb-4`}
                    >
                      {useCase.regime}
                    </div>

                    <h3 className="text-3xl lg:text-4xl font-bold text-white mb-6 leading-tight">
                      {useCase.title}
                    </h3>

                    {/* Scenario */}
                    <div className="mb-4">
                      <p className="text-gray-400 text-sm font-semibold mb-1">Scenario:</p>
                      <p className="text-gray-300 text-lg">{useCase.scenario}</p>
                    </div>

                    {/* User Intent */}
                    <div className="mb-4">
                      <p className="text-gray-400 text-sm font-semibold mb-1">Your Goal:</p>
                      <p className="text-gray-300 text-lg italic">&ldquo;{useCase.userIntent}&rdquo;</p>
                    </div>

                    {/* Zap Action */}
                    <div className="mb-8">
                      <p className="text-gray-400 text-sm font-semibold mb-1">Zap Pilot Action:</p>
                      <p className="text-white text-lg font-medium">{useCase.zapAction}</p>
                    </div>

                    <motion.a
                      href="http://app.zap-pilot.org/"
                      className={`inline-flex items-center px-6 py-3 rounded-xl bg-gradient-to-r ${useCase.gradient} text-white font-semibold hover:shadow-lg transition-all duration-300`}
                      whileHover={{ scale: 1.05, y: -2 }}
                      whileTap={{ scale: 0.95 }}
                      target="_blank"
                    >
                      <useCase.icon className="w-5 h-5 mr-2" />
                      Explore Strategy
                    </motion.a>
                  </div>

                  {/* Visual - Allocation Chart */}
                  <div className={`relative ${index % 2 === 1 ? 'lg:order-1' : ''}`}>
                    <motion.div
                      className="relative bg-gray-800/50 rounded-2xl p-8 border border-gray-700"
                      whileHover={{ scale: 1.02 }}
                      transition={{ type: 'spring', stiffness: 200 }}
                    >
                      {/* Allocation Visualization */}
                      <div className="space-y-6">
                        <div className="text-center">
                          <div className="text-sm text-gray-400 mb-2">Portfolio Allocation</div>
                          <div className="text-3xl font-bold text-white mb-6">
                            {useCase.allocationStart}% → {useCase.allocationEnd}% Crypto
                          </div>
                        </div>

                        {/* Before State */}
                        <div>
                          <div className="text-sm text-gray-400 mb-2">Before</div>
                          <div className="h-8 bg-gray-700 rounded-lg overflow-hidden flex">
                            <div
                              className={`bg-gradient-to-r ${useCase.gradient} flex items-center justify-center text-white text-sm font-semibold`}
                              style={{ width: `${useCase.allocationStart}%` }}
                            >
                              {useCase.allocationStart}%
                            </div>
                            <div className="flex-1 bg-gray-600 flex items-center justify-center text-white text-sm font-semibold">
                              {100 - useCase.allocationStart}% Stable
                            </div>
                          </div>
                        </div>

                        {/* Arrow */}
                        <div className="text-center">
                          <div className="text-2xl text-gray-500">↓</div>
                          <div className="text-xs text-gray-400">Over 5-10 days</div>
                        </div>

                        {/* After State */}
                        <div>
                          <div className="text-sm text-gray-400 mb-2">After</div>
                          <div className="h-8 bg-gray-700 rounded-lg overflow-hidden flex">
                            <div
                              className={`bg-gradient-to-r ${useCase.gradient} flex items-center justify-center text-white text-sm font-semibold`}
                              style={{ width: `${useCase.allocationEnd}%` }}
                            >
                              {useCase.allocationEnd}%
                            </div>
                            <div className="flex-1 bg-gray-600 flex items-center justify-center text-white text-sm font-semibold">
                              {100 - useCase.allocationEnd}% Stable
                            </div>
                          </div>
                        </div>

                        {/* Execution Details */}
                        <div className="pt-4 border-t border-gray-700">
                          <div className="grid grid-cols-2 gap-4 text-center">
                            <div>
                              <div className="text-xs text-gray-400">Daily Limit</div>
                              <div className="text-sm text-white font-semibold">1-3%</div>
                            </div>
                            <div>
                              <div className="text-xs text-gray-400">Duration</div>
                              <div className="text-sm text-white font-semibold">5-10 days</div>
                            </div>
                          </div>
                        </div>

                        {/* LP Pool Badges for Greed/Fear */}
                        {useCase.showLP && (
                          <div className="pt-4 border-t border-gray-700">
                            <div className="text-xs text-gray-400 text-center mb-3">
                              {useCase.lpDirection === 'building' ? 'Shifting to LP' : 'Unwinding LP'}
                            </div>
                            <div className="flex items-center justify-center gap-4">
                              <LPPoolBadge token1="BTC" token2="USDC" size="sm" showLabel={false} />
                              <LPPoolBadge token1="ETH" token2="USDC" size="sm" showLabel={false} />
                            </div>
                          </div>
                        )}
                      </div>

                      {/* Floating elements */}
                      <motion.div
                        className={`absolute -top-2 -right-2 w-6 h-6 rounded-full bg-gradient-to-r ${useCase.gradient}`}
                        animate={{
                          scale: [1, 1.2, 1],
                          opacity: [0.5, 1, 0.5],
                        }}
                        transition={{
                          duration: 2,
                          repeat: Infinity,
                          ease: 'easeInOut',
                        }}
                      />
                    </motion.div>

                    {/* Decorative gradient orbs */}
                    <div
                      className={`absolute -top-8 -left-8 w-32 h-32 bg-gradient-to-r ${useCase.gradient} rounded-full blur-3xl opacity-20`}
                    />
                    <div
                      className={`absolute -bottom-8 -right-8 w-24 h-24 bg-gradient-to-l ${useCase.gradient} rounded-full blur-2xl opacity-30`}
                    />
                  </div>
                </div>
              </div>
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
          <p className="text-xl text-gray-300 mb-6">
            Let market sentiment guide your decisions.
          </p>
          <p className="text-2xl font-semibold bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
            Zap Pilot handles the gradual execution — entirely within your wallet.
          </p>
        </motion.div>
      </div>
    </section>
  );
}
