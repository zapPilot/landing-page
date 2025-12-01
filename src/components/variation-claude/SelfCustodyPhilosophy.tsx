'use client';

import { motion } from 'framer-motion';
import { Lock, Shield, Gauge, CheckCircle, XCircle } from 'lucide-react';
import { SectionHeader, Card } from '@/components/ui';

const principles = [
  {
    icon: Lock,
    title: 'Total Self-Custody',
    description: 'Your keys, your crypto, always. We never touch, move, or control your assets.',
    color: 'text-green-400',
  },
  {
    icon: Shield,
    title: 'Manual Signing Only',
    description: 'Every transaction requires your approval. No exceptions, no automation.',
    color: 'text-blue-400',
  },
  {
    icon: Gauge,
    title: 'Debt Repayment Priority',
    description: 'When LTV rises, we prioritize safety over growth. Protect capital first.',
    color: 'text-purple-400',
  },
  {
    icon: CheckCircle,
    title: 'Stable-Only DCA',
    description: 'No borrowing to buy dips. Only use your existing stables during Extreme Fear.',
    color: 'text-yellow-400',
  },
];

const dontDo = [
  'Auto-execute trades (you sign every TX)',
  'Custody funds (non-custodial always)',
  'Recommend over-leverage (safety first)',
  'Predict prices (sentiment rules only)',
  'Use complex derivatives (BTC/ETH/stables only)',
];

export default function SelfCustodyPhilosophy() {
  return (
    <section className="py-24 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <SectionHeader
          title="Self-Custody & Risk "
          highlight="Philosophy"
          subtitle="Safety over profit. Control over convenience."
        />

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Principles Grid */}
          <div>
            <motion.h3
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="text-2xl font-bold mb-8"
            >
              Our Principles
            </motion.h3>

            <div className="grid sm:grid-cols-2 gap-6">
              {principles.map((principle, index) => (
                <Card key={index} variant="glass" delay={index * 0.1}>
                  <div className={`w-12 h-12 bg-gradient-to-br from-gray-800 to-gray-900 rounded-xl flex items-center justify-center mb-4`}>
                    <principle.icon className={`w-6 h-6 ${principle.color}`} />
                  </div>
                  <h4 className="font-semibold mb-2">{principle.title}</h4>
                  <p className="text-sm text-gray-400">{principle.description}</p>
                </Card>
              ))}
            </div>
          </div>

          {/* What We DON'T Do */}
          <div>
            <motion.h3
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }}
              className="text-2xl font-bold mb-8"
            >
              What We <span className="text-red-400">DON'T</span> Do
            </motion.h3>

            <Card variant="glass" className="h-full">
              <ul className="space-y-4">
                {dontDo.map((item, index) => (
                  <motion.li
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5, delay: 0.3 + index * 0.1 }}
                    viewport={{ once: true }}
                    className="flex items-start gap-3"
                  >
                    <XCircle className="w-5 h-5 text-red-400 flex-shrink-0 mt-0.5" />
                    <span className="text-gray-300">{item}</span>
                  </motion.li>
                ))}
              </ul>

              <div className="mt-8 pt-8 border-t border-gray-800">
                <div className="flex items-start gap-3 bg-green-500/10 border border-green-500/30 rounded-lg p-4">
                  <CheckCircle className="w-5 h-5 text-green-400 flex-shrink-0 mt-0.5" />
                  <p className="text-sm text-green-300">
                    <span className="font-semibold">What we DO:</span> Generate strategy suggestions
                    and transaction routes. You hold keys, you decide, you sign.
                  </p>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
}
