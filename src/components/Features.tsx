'use client';

import { motion } from 'framer-motion';
import { Brain, Shield, Calendar, LineChart } from 'lucide-react';
import { SectionHeader, CardGrid, CardItem } from './layout';
import { revealOnView } from '@/lib/motion/animations';

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
        'Rebalancing adapts to market intensity: 5 days (1%/day) for intermediate regimes, 10 days (2.5%/day) for extreme regimes. No panic selling, no FOMO buying — just systematic execution.',
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
        <SectionHeader
          title={
            <>
              Why
              <span className="ml-3">Zap Pilot?</span>
            </>
          }
          subtitle="Built for the future of DeFi, designed for today's users"
        />

        <CardGrid columns={2}>
          {features.map((feature, index) => (
            <CardItem
              key={feature.title}
              index={index}
              hoverScale={false}
              className="group relative"
            >
              {/* Animated background gradient */}
              <div
                className={`absolute inset-0 bg-gradient-to-br ${feature.gradient} opacity-0 group-hover:opacity-5 transition-opacity duration-500`}
              />

              {/* Animated border effect */}
              <motion.div
                className="absolute inset-0 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-700"
                style={{
                  background: `conic-gradient(from 0deg, transparent, rgba(147, 51, 234, 0.1), transparent)`,
                }}
                animate={{
                  rotate: [0, 360],
                }}
                transition={{
                  duration: 12,
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
            </CardItem>
          ))}
        </CardGrid>

        {/* Bottom CTA */}
        <motion.div {...revealOnView({ delay: 0.5, duration: 0.8 })} className="text-center mt-20">
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
