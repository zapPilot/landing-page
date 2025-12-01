'use client';

import { motion } from 'framer-motion';
import { Activity, Shield, TrendingUp, Eye } from 'lucide-react';
import { SectionHeader, Card } from '@/components/ui';
import { ANIMATIONS } from '@/lib/constants';

const comparisonData = [
  {
    aspect: 'Asset Custody',
    traditional: 'Custodial (they hold assets)',
    zapPilot: 'Self-custodial (you hold keys)',
  },
  {
    aspect: 'Trade Execution',
    traditional: 'Auto-executes trades',
    zapPilot: 'Manual signing required',
  },
  {
    aspect: 'Asset Types',
    traditional: 'Stocks/bonds/ETFs',
    zapPilot: 'BTC/ETH/stablecoins only',
  },
  {
    aspect: 'Strategy Basis',
    traditional: 'Price prediction models',
    zapPilot: 'Sentiment-based rules',
  },
];

const featureCards = [
  {
    icon: Activity,
    title: 'Sentiment-Driven Engine',
    description: '5 regimes based on Fear & Greed Index (0-100). Market emotion guides allocation, not price predictions.',
  },
  {
    icon: TrendingUp,
    title: 'BTC/ETH Mini-Index',
    description: 'Market-cap weighted allocation between Bitcoin and Ethereum. Simple, proven long-term beta exposure.',
  },
  {
    icon: Shield,
    title: 'Rules-Based Rebalancing',
    description: 'No predictions, just discipline. Contrarian at extremes: greedy when others fear, cautious when others are greedy.',
  },
  {
    icon: Eye,
    title: 'Total Transparency',
    description: 'Every transaction route shown with gas estimates. You see exactly what happens before you sign.',
  },
];

export default function WhatWeAre() {
  return (
    <section className="py-24 px-4 sm:px-6 lg:px-8 bg-gray-900/30">
      <div className="max-w-7xl mx-auto">
        <SectionHeader
          title="What "
          highlight="We Are"
          subtitle="A sentiment-driven strategy engine, not a trading bot"
        />

        {/* Comparison Table */}
        <motion.div
          initial={ANIMATIONS.fadeInUp.initial}
          whileInView={ANIMATIONS.fadeInUp.animate}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="mb-16"
        >
          <div className="bg-gray-900/50 backdrop-blur-lg border border-gray-800 rounded-2xl overflow-hidden">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-800">
                  <th className="text-left p-6 text-gray-400 font-medium">Feature</th>
                  <th className="text-left p-6 text-gray-400 font-medium">Traditional Robo-Advisor</th>
                  <th className="text-left p-6 text-green-400 font-medium">Zap Pilot</th>
                </tr>
              </thead>
              <tbody>
                {comparisonData.map((row, index) => (
                  <motion.tr
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    viewport={{ once: true }}
                    className="border-b border-gray-800/50 last:border-0"
                  >
                    <td className="p-6 font-medium text-white">{row.aspect}</td>
                    <td className="p-6 text-gray-400">{row.traditional}</td>
                    <td className="p-6 text-green-300">{row.zapPilot}</td>
                  </motion.tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="text-sm text-gray-500 text-center mt-4 italic">
            Static table design for quick scanning and clarity
          </p>
        </motion.div>

        {/* Feature Cards */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {featureCards.map((feature, index) => (
            <Card
              key={index}
              variant="glass"
              delay={index * 0.1}
              className="text-center"
            >
              <div className="w-14 h-14 bg-gradient-to-br from-purple-500/20 to-blue-500/20 rounded-xl flex items-center justify-center mx-auto mb-4">
                <feature.icon className="w-7 h-7 text-purple-400" />
              </div>
              <h3 className="text-lg font-semibold mb-2">{feature.title}</h3>
              <p className="text-sm text-gray-400">{feature.description}</p>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
