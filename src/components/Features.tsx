'use client';

import { motion } from 'framer-motion';
import { Brain, Shield, Calendar, LineChart } from 'lucide-react';

export function Features() {
  const features = [
    {
      icon: Brain,
      title: 'Sentiment-Driven Intelligence',
      description:
        'Monitors the Fear & Greed Index 24/7 and only suggests rebalancing when market emotions reach extremes — helping you buy fear and sell greed.',
      gradient: 'from-purple-500 to-violet-600',
      delay: 0.1,
    },
    {
      icon: Shield,
      title: 'Self-Custodial. Always.',
      description:
        'Every token stays in your wallet. Zap Pilot generates optimized rebalancing routes — you sign every transaction. No custody, no compromise.',
      gradient: 'from-blue-500 to-cyan-600',
      delay: 0.2,
    },
    {
      icon: Calendar,
      title: 'Gradual, Disciplined Execution',
      description:
        'Rebalancing happens over 5-10 days with daily limits (1-3% of portfolio). No panic selling, no FOMO buying — just systematic allocation adjustments.',
      gradient: 'from-green-500 to-emerald-600',
      delay: 0.3,
    },
    {
      icon: LineChart,
      title: 'Transparent & Backtestable',
      description:
        'All parameters are visible and adjustable. Regime thresholds, allocation targets, execution pace — everything is designed to be backtested and optimized.',
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
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
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

                  <p className="text-gray-300 text-lg leading-relaxed group-hover:text-gray-300 transition-colors duration-300">
                    {feature.description}
                  </p>

                  {/* Learn more link */}
                  <motion.div
                    className="mt-6 inline-flex items-center text-purple-400 hover:text-purple-300 transition-colors duration-200 opacity-0 group-hover:opacity-100"
                    initial={{ x: -10 }}
                    whileHover={{ x: 0 }}
                  >
                    <a
                      className="text-sm font-medium mr-2"
                      href="https://docs.zap-pilot.org/docs/how-it-works"
                      target="_blank"
                    >
                      Learn more
                    </a>
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
          <motion.a
            href="https://docs.zap-pilot.org/docs/how-it-works"
            className="inline-block bg-gradient-to-r from-purple-600 to-blue-600 text-white px-8 py-4 rounded-xl font-semibold text-lg shadow-lg hover:shadow-purple-500/25 transition-all duration-300"
            whileHover={{ scale: 1.05, y: -2 }}
            whileTap={{ scale: 0.95 }}
            target="_blank"
          >
            Explore All Features
          </motion.a>
        </motion.div>
      </div>
    </section>
  );
}
