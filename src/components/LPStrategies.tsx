'use client';

import { motion } from 'framer-motion';
import { Droplets, TrendingUp, ShieldCheck } from 'lucide-react';
import { LPPoolBadge } from './LPPoolBadge';
import { SectionHeader, CardGrid, CardItem } from './layout';

export function LPStrategies() {
  const strategies = [
    {
      icon: Droplets,
      title: 'LP Pools in Greed Regime',
      description:
        'When greed rises (FGI 55-75), shift spot holdings into BTC-USDC and ETH-USDC liquidity pools. Earn trading fees while locking in gains with balanced exposure.',
      gradient: 'from-green-400 to-teal-500',
      pools: [
        { token1: 'BTC', token2: 'USDC' },
        { token1: 'ETH', token2: 'USDC' },
      ],
    },
    {
      icon: TrendingUp,
      title: 'Unwind LP in Fear Regime',
      description:
        'When fear emerges (FGI 26-45), gradually unwind LP positions back to spot. Use the USDC portion to DCA into BTC/ETH, preparing for potential Extreme Fear opportunities.',
      gradient: 'from-orange-400 to-red-500',
      pools: [
        { token1: 'BTC', token2: 'USDC' },
        { token1: 'ETH', token2: 'USDC' },
      ],
    },
    {
      icon: ShieldCheck,
      title: 'Why LP Pools?',
      description:
        'LP pools provide a middle ground: maintain crypto exposure while earning fees. In Greed regimes, they help lock gains without full exits. In Fear regimes, they provide dry powder for DCA.',
      gradient: 'from-purple-400 to-blue-400',
      pools: [],
    },
  ];

  return (
    <section className="py-24 relative bg-gray-900/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeader
          title="LP Pool Strategies"
          subtitle="Earn fees while maintaining crypto exposure during intermediate regimes"
        />

        <CardGrid columns={3}>
          {strategies.map((strategy, index) => (
            <CardItem key={strategy.title} index={index} className="group relative">
              {/* Hover gradient effect */}
              <div
                className={`absolute inset-0 bg-gradient-to-br ${strategy.gradient} opacity-0 group-hover:opacity-5 transition-opacity duration-500`}
              />

              <div className="relative z-10 flex-1 flex flex-col">
                {/* Icon */}
                <div
                  className={`inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-r ${strategy.gradient} text-white mb-6`}
                >
                  <strategy.icon className="w-8 h-8" />
                </div>

                {/* Title */}
                <h3 className="text-2xl font-bold text-white mb-4">{strategy.title}</h3>

                {/* Description */}
                <p className="text-gray-400 leading-relaxed mb-6 flex-1">{strategy.description}</p>

                {/* LP Pool Badges */}
                {strategy.pools.length > 0 && (
                  <div className="flex items-center justify-center gap-6 pt-4 border-t border-gray-700">
                    {strategy.pools.map(pool => (
                      <LPPoolBadge
                        key={`${pool.token1}-${pool.token2}`}
                        token1={pool.token1}
                        token2={pool.token2}
                        size="md"
                        showLabel={true}
                      />
                    ))}
                  </div>
                )}
              </div>
            </CardItem>
          ))}
        </CardGrid>

        {/* Bottom Note */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          viewport={{ once: true }}
          className="text-center mt-16 p-6 bg-purple-500/10 rounded-2xl border border-purple-500/20"
        >
          <p className="text-gray-300 text-lg">
            <span className="font-semibold text-white">Execution Pace:</span> LP transitions happen
            over <span className="text-purple-300">5 days at 1%/day</span> (5% total portfolio
            adjustment) in Greed and Fear regimes.
          </p>
        </motion.div>
      </div>
    </section>
  );
}
