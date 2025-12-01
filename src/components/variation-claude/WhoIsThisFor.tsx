'use client';

import { motion } from 'framer-motion';
import { TrendingUp, Shield, Brain, AlertCircle } from 'lucide-react';
import { SectionHeader, Card } from '@/components/ui';

const personas = [
  {
    icon: TrendingUp,
    title: 'Long-Term BTC/ETH Believers',
    description: 'You hold for years but want dynamic exposure without daily monitoring',
    painPoints: ['Stuck at 100% crypto during tops', 'Miss dips during panic'],
    gains: ['Forced discipline at emotional extremes', 'Automated rebalancing based on sentiment'],
  },
  {
    icon: Shield,
    title: 'Self-Custody Advocates',
    description: 'You refuse to trust CEXs but want sophisticated strategies',
    painPoints: ['Simple holding lacks nuance', 'DeFi protocols too risky'],
    gains: ['Robo-advisor discipline with total control', 'Never give up custody'],
  },
  {
    icon: Brain,
    title: 'Emotion-Prone Investors',
    description: 'You fear buying tops and panic-selling bottoms',
    painPoints: ['FOMO buying during euphoria', 'Capitulation during fear'],
    gains: ['Rules remove emotional decision-making', 'Contrarian at extremes'],
  },
];

const notForYou = [
  'You want short-term trading signals',
  'You expect guaranteed returns',
  'You prefer custodial convenience',
  'You trade altcoins/memecoins',
];

export default function WhoIsThisFor() {
  return (
    <section className="py-24 px-4 sm:px-6 lg:px-8 bg-gray-900/30">
      <div className="max-w-7xl mx-auto">
        <SectionHeader
          title="Who Is This "
          highlight="For?"
          subtitle="Designed for emotion-free, long-term crypto investors"
        />

        {/* Persona Cards */}
        <div className="grid md:grid-cols-3 gap-8 mb-16">
          {personas.map((persona, index) => (
            <Card key={index} variant="glass" delay={index * 0.15}>
              <div className="w-14 h-14 bg-gradient-to-br from-purple-500/20 to-blue-500/20 rounded-xl flex items-center justify-center mb-4">
                <persona.icon className="w-7 h-7 text-purple-400" />
              </div>

              <h3 className="text-xl font-semibold mb-3">{persona.title}</h3>
              <p className="text-sm text-gray-400 mb-6">{persona.description}</p>

              <div className="space-y-4">
                <div>
                  <h4 className="text-xs font-semibold text-red-400 mb-2">PAIN POINTS</h4>
                  <ul className="space-y-1">
                    {persona.painPoints.map((point, idx) => (
                      <li key={idx} className="text-sm text-gray-400 flex items-start gap-2">
                        <span className="text-red-400 mt-1">−</span>
                        <span>{point}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div>
                  <h4 className="text-xs font-semibold text-green-400 mb-2">GAINS</h4>
                  <ul className="space-y-1">
                    {persona.gains.map((gain, idx) => (
                      <li key={idx} className="text-sm text-gray-400 flex items-start gap-2">
                        <span className="text-green-400 mt-1">+</span>
                        <span>{gain}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </Card>
          ))}
        </div>

        {/* Not For You */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          viewport={{ once: true }}
          className="bg-gray-900/50 backdrop-blur-lg border border-orange-500/30 rounded-2xl p-8"
        >
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 bg-orange-500/20 rounded-xl flex items-center justify-center flex-shrink-0">
              <AlertCircle className="w-6 h-6 text-orange-400" />
            </div>

            <div className="flex-1">
              <h3 className="text-xl font-semibold mb-4 text-orange-300">Not For You If...</h3>
              <div className="grid sm:grid-cols-2 gap-3">
                {notForYou.map((item, index) => (
                  <div key={index} className="flex items-center gap-2">
                    <div className="w-1.5 h-1.5 bg-orange-400 rounded-full" />
                    <span className="text-sm text-gray-400">{item}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
