'use client';

import { motion } from 'framer-motion';
import { ArrowRightLeft, Shield, Network, TrendingUp } from 'lucide-react';

export function Features() {
  const features = [
    {
      icon: ArrowRightLeft,
      title: 'Intent-Centric Execution',
      description:
        'You tell us what you want — we do the rest. Zap into predefined strategies or build your own. One click, one pipeline, no headache.',
      gradient: 'from-purple-500 to-violet-600',
      delay: 0.1,
    },
    {
      icon: Shield,
      title: 'Non-Custodial by Design',
      description:
        'We never touch your funds. All zaps are executed directly from your own Account Abstraction (AA) wallet, giving you full control and ownership.',
      gradient: 'from-blue-500 to-cyan-600',
      delay: 0.2,
    },
    {
      icon: Network,
      title: 'Cross-Chain by Default',
      description:
        'No more juggling bridges, swaps, or interfaces. Zap Pilot seamlessly handles swaps, bridges, and protocol interactions — behind the scenes.',
      gradient: 'from-green-500 to-emerald-600',
      delay: 0.3,
    },
    {
      icon: TrendingUp,
      title: 'From Vaults to Indices to Memes',
      description:
        'Choose a passive yield strategy, a curated meme portfolio, or create your own. Zap Pilot supports any investment &quot;intent&quot; that can be codified.',
      gradient: 'from-orange-500 to-red-600',
      delay: 0.4,
    },
  ];

  return (
    <section id="features" className="py-24 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-20"
        >
          <h2 className="text-4xl sm:text-5xl font-bold mb-6">
            Why
            <span className="bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent ml-3">
              Zap Pilot?
            </span>
          </h2>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto">
            Built for the future of DeFi, designed for today&apos;s users
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {features.map(feature => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: feature.delay }}
              viewport={{ once: true }}
              whileHover={{ scale: 1.03, y: -5 }}
              className="group relative"
            >
              <div className="bg-gray-900/50 backdrop-blur-lg border border-gray-800 rounded-3xl p-8 hover:border-gray-700 transition-all duration-300 relative overflow-hidden">
                {/* Animated background gradient */}
                <div
                  className={`absolute inset-0 bg-gradient-to-br ${feature.gradient} opacity-0 group-hover:opacity-5 transition-opacity duration-500`}
                />

                {/* Animated border effect */}
                <motion.div
                  className="absolute inset-0 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                  style={{
                    background: `conic-gradient(from 0deg, transparent, rgba(147, 51, 234, 0.1), transparent)`,
                  }}
                  animate={{
                    rotate: [0, 360],
                  }}
                  transition={{
                    duration: 4,
                    repeat: Infinity,
                    ease: 'linear',
                  }}
                />

                <div className="relative z-10">
                  {/* Icon */}
                  <motion.div
                    className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${feature.gradient} flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}
                    whileHover={{ rotate: 5 }}
                  >
                    <feature.icon className="w-8 h-8 text-white" />
                  </motion.div>

                  {/* Content */}
                  <h3 className="text-2xl font-bold text-white mb-4 group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:from-purple-400 group-hover:to-blue-400 group-hover:bg-clip-text transition-all duration-300">
                    {feature.title}
                  </h3>

                  <p className="text-gray-400 text-lg leading-relaxed group-hover:text-gray-300 transition-colors duration-300">
                    {feature.description}
                  </p>

                  {/* Learn more link */}
                  <motion.div
                    className="mt-6 inline-flex items-center text-purple-400 hover:text-purple-300 transition-colors duration-200 opacity-0 group-hover:opacity-100"
                    initial={{ x: -10 }}
                    whileHover={{ x: 0 }}
                  >
                    <span className="text-sm font-medium mr-2">Learn more</span>
                    <motion.div
                      animate={{ x: [0, 5, 0] }}
                      transition={{ duration: 1.5, repeat: Infinity }}
                    >
                      →
                    </motion.div>
                  </motion.div>
                </div>

                {/* Decorative elements */}
                <div className="absolute -top-4 -right-4 w-24 h-24 bg-gradient-to-br from-purple-500/10 to-blue-500/10 rounded-full blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                <div className="absolute -bottom-4 -left-4 w-32 h-32 bg-gradient-to-tr from-pink-500/10 to-purple-500/10 rounded-full blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
              </div>
            </motion.div>
          ))}
        </div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          viewport={{ once: true }}
          className="text-center mt-20"
        >
          <motion.button
            className="bg-gradient-to-r from-purple-600 to-blue-600 text-white px-8 py-4 rounded-xl font-semibold text-lg shadow-lg hover:shadow-purple-500/25 transition-all duration-300"
            whileHover={{ scale: 1.05, y: -2 }}
            whileTap={{ scale: 0.95 }}
          >
            Explore All Features
          </motion.button>
        </motion.div>
      </div>
    </section>
  );
}
