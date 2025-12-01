'use client';

import { motion } from 'framer-motion';
import { Activity, Lock, PenTool, XCircle, CheckCircle } from 'lucide-react';
import { Button } from '@/components/ui';
import { ANIMATIONS } from '@/lib/constants';

const keyFeatures = [
  {
    icon: Activity,
    title: 'Sentiment-Driven',
    description: 'Fear & Greed Index guides allocation targets—not price predictions',
  },
  {
    icon: Lock,
    title: 'Self-Custodial',
    description: 'Your keys, your crypto, always. We never touch your funds',
  },
  {
    icon: PenTool,
    title: 'Manual Signing',
    description: 'Review and approve each transaction. You decide, always',
  },
];

const disclaimers = [
  { text: 'NOT a fund', type: 'not' as const },
  { text: 'NOT custodial', type: 'not' as const },
  { text: 'NOT auto-execution', type: 'not' as const },
  { text: 'Strategy suggestions only', type: 'yes' as const },
];

export default function Hero() {
  return (
    <section className="relative pt-32 pb-24 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Headline */}
        <motion.div
          className="text-center mb-12"
          initial={ANIMATIONS.fadeInUp.initial}
          whileInView={ANIMATIONS.fadeInUp.animate}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <h1 className="text-4xl sm:text-5xl lg:text-7xl font-bold mb-6">
            <span className="bg-gradient-to-r from-purple-400 via-pink-400 to-blue-400 bg-clip-text text-transparent">
              Think Like a Fund.
            </span>
            <br />
            <span className="text-white">Execute Like an Individual.</span>
          </h1>
          <p className="text-xl sm:text-2xl text-gray-300 max-w-4xl mx-auto mb-8">
            Sentiment-driven strategy suggestions for BTC & ETH—but{' '}
            <span className="text-white font-semibold">every transaction requires your manual signature</span>.
          </p>

          {/* Disclaimers */}
          <div className="flex flex-wrap justify-center gap-3 mb-8">
            {disclaimers.map((disclaimer, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                viewport={{ once: true }}
                className={`
                  flex items-center gap-2 px-4 py-2 rounded-full border
                  ${
                    disclaimer.type === 'not'
                      ? 'border-red-500/50 bg-red-500/10 text-red-300'
                      : 'border-green-500/50 bg-green-500/10 text-green-300'
                  }
                `}
              >
                {disclaimer.type === 'not' ? (
                  <XCircle className="w-4 h-4" />
                ) : (
                  <CheckCircle className="w-4 h-4" />
                )}
                <span className="text-sm font-medium">{disclaimer.text}</span>
              </motion.div>
            ))}
          </div>

          {/* CTA */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            viewport={{ once: true }}
          >
            <Button
              variant="ghost"
              size="lg"
              onClick={() => {
                document.getElementById('how-it-works')?.scrollIntoView({ behavior: 'smooth' });
              }}
            >
              See How It Works
            </Button>
          </motion.div>
        </motion.div>

        {/* Key Features Grid */}
        <div className="grid md:grid-cols-3 gap-8 mt-16">
          {keyFeatures.map((feature, index) => (
            <motion.div
              key={index}
              initial={ANIMATIONS.fadeInUp.initial}
              whileInView={ANIMATIONS.fadeInUp.animate}
              transition={{ duration: 0.6, delay: index * 0.15 }}
              viewport={{ once: true }}
              className="bg-gray-900/50 backdrop-blur-lg border border-gray-800 rounded-2xl p-6 hover:border-gray-700 transition-colors"
            >
              <div className="w-12 h-12 bg-gradient-to-br from-purple-500/20 to-blue-500/20 rounded-xl flex items-center justify-center mb-4">
                <feature.icon className="w-6 h-6 text-purple-400" />
              </div>
              <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
              <p className="text-gray-400">{feature.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
