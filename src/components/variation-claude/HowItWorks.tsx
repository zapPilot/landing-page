'use client';

import { motion } from 'framer-motion';
import { Wallet, Cpu, FileText, PenTool } from 'lucide-react';
import { SectionHeader, Card } from '@/components/ui';

const steps = [
  {
    icon: Wallet,
    title: 'Connect Self-Custodial Wallet',
    description: 'Link MetaMask, Rabby, or any Web3 wallet. We only READ balances.',
    emphasis: 'No deposit required',
  },
  {
    icon: Cpu,
    title: 'Strategy Engine Analyzes Sentiment',
    description: 'Our algorithm checks Fear & Greed Index and calculates optimal allocation.',
    emphasis: 'Rules-based, not predictive',
  },
  {
    icon: FileText,
    title: 'Review Transaction Route',
    description: 'You see the exact swap/LP/vault route with gas estimates and expected outcomes.',
    emphasis: 'Full transparency',
  },
  {
    icon: PenTool,
    title: 'Manually Sign Each Transaction',
    description: 'If you agree, sign in your wallet. If not, simply ignore it.',
    emphasis: 'You always decide',
  },
];

export default function HowItWorks() {
  return (
    <section id="how-it-works" className="py-24 px-4 sm:px-6 lg:px-8 bg-gray-900/30">
      <div className="max-w-7xl mx-auto">
        <SectionHeader
          title="How It "
          highlight="Works"
          subtitle="We suggest, you control—every step of the way"
        />

        <div className="relative">
          {/* Connecting line (desktop only) */}
          <div className="hidden lg:block absolute top-1/2 left-0 right-0 h-0.5 bg-gradient-to-r from-purple-500/20 via-blue-500/40 to-purple-500/20 -translate-y-1/2 z-0" />

          {/* Steps grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 relative z-10">
            {steps.map((step, index) => (
              <Card
                key={index}
                variant="glass"
                delay={index * 0.15}
                className="relative"
              >
                {/* Step number badge */}
                <div className="absolute -top-4 -left-4 w-10 h-10 bg-gradient-to-br from-purple-500 to-blue-600 rounded-full flex items-center justify-center font-bold text-white shadow-lg">
                  {index + 1}
                </div>

                <div className="w-14 h-14 bg-gradient-to-br from-purple-500/20 to-blue-500/20 rounded-xl flex items-center justify-center mb-4 mx-auto">
                  <step.icon className="w-7 h-7 text-purple-400" />
                </div>

                <h3 className="text-lg font-semibold mb-3 text-center">{step.title}</h3>
                <p className="text-sm text-gray-400 mb-4 text-center">{step.description}</p>

                <div className="bg-purple-500/10 border border-purple-500/30 rounded-lg px-3 py-2 text-center">
                  <span className="text-xs font-medium text-purple-300">{step.emphasis}</span>
                </div>
              </Card>
            ))}
          </div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.8 }}
          viewport={{ once: true }}
          className="mt-12 text-center"
        >
          <div className="inline-block bg-gray-900/50 backdrop-blur-lg border border-gray-800 rounded-xl px-6 py-4">
            <p className="text-gray-300">
              <span className="font-semibold text-white">Important:</span> We never auto-execute.{' '}
              <span className="text-purple-400">You</span> review,{' '}
              <span className="text-purple-400">you</span> decide,{' '}
              <span className="text-purple-400">you</span> sign.
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
