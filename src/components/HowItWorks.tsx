'use client';

import { motion } from 'framer-motion';
import { Settings, Activity, Shield } from 'lucide-react';
import { LINKS, openExternalLink } from '@/config/links';

export function HowItWorks() {
  const steps = [
    {
      number: 1,
      icon: Settings,
      title: 'Define Your Strategy',
      description:
        'Set your target allocations for each regime and risk parameters. All thresholds are transparent and adjustable.',
      color: 'from-purple-500 to-violet-600',
      details: [
        'Choose extreme regime allocations (e.g., 70% crypto in fear, 30% in greed)',
        'Set execution pace (5-10 days, 1-3% daily limits)',
        'Select your core assets (BTC, ETH, USDC)',
      ],
    },
    {
      number: 2,
      icon: Activity,
      title: 'Real-Time Regime Detection',
      description:
        'Zap Pilot monitors the Fear & Greed Index 24/7, identifying when markets enter extreme regimes — and when to hold steady.',
      color: 'from-blue-500 to-cyan-600',
      details: ['Continuous sentiment monitoring', 'Extreme regime alerts (Extreme Fear/Greed)', 'Carry-over during neutral conditions'],
    },
    {
      number: 3,
      icon: Shield,
      title: 'Gradual Execution, Full Custody',
      description:
        'When rebalancing is needed, Zap Pilot generates optimized multi-chain routes. You review and sign each transaction — funds never leave your wallet.',
      color: 'from-green-500 to-emerald-600',
      details: ['5-10 day execution window', 'Daily progress updates', 'Full transaction transparency'],
    },
  ];

  return (
    <section id="how-it-works" className="py-24 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-20"
        >
          <h2 className="text-4xl sm:text-5xl font-bold mb-6">
            How It
            <span className="bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent ml-3">
              Works
            </span>
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Three simple steps to sentiment-driven rebalancing
          </p>
        </motion.div>

        {/* Desktop Layout */}
        <div className="hidden lg:block">
          <div className="relative">
            {/* Connection Lines */}
            <div className="absolute top-1/2 left-0 right-0 h-0.5 bg-gradient-to-r from-purple-500 via-blue-500 to-green-500 transform -translate-y-1/2 z-0" />

            {/* Steps */}
            <div className="relative z-10 grid grid-cols-3 gap-8">
              {steps.map((step, index) => (
                <motion.div
                  key={step.number}
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: index * 0.2 }}
                  viewport={{ once: true }}
                  className="text-center group"
                >
                  {/* Step Number Circle */}
                  <motion.div
                    className={`relative mx-auto w-24 h-24 rounded-full bg-gradient-to-r ${step.color} flex items-center justify-center text-white text-2xl font-bold mb-8 group-hover:scale-110 transition-transform duration-300`}
                    whileHover={{ rotate: 5 }}
                  >
                    {step.number}

                    {/* Pulsing ring */}
                    <motion.div
                      className={`absolute inset-0 rounded-full bg-gradient-to-r ${step.color} opacity-30`}
                      animate={{
                        scale: [1, 1.2, 1],
                        opacity: [0.3, 0, 0.3],
                      }}
                      transition={{
                        duration: 2,
                        repeat: Infinity,
                        ease: 'easeInOut',
                        delay: index * 0.5,
                      }}
                    />
                  </motion.div>

                  {/* Content */}
                  <div className="bg-gray-900/50 backdrop-blur-lg border border-gray-800 rounded-2xl p-8 group-hover:border-gray-700 transition-all duration-300">
                    <motion.div
                      className={`w-16 h-16 mx-auto rounded-xl bg-gradient-to-r ${step.color} flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}
                      whileHover={{ rotate: -5 }}
                    >
                      <step.icon className="w-8 h-8 text-white" />
                    </motion.div>

                    <h3 className="text-2xl font-bold text-white mb-4">{step.title}</h3>

                    <p className="text-gray-300 mb-6 leading-relaxed">{step.description}</p>

                    {/* Details */}
                    <div className="space-y-3">
                      {step.details.map((detail, detailIndex) => (
                        <motion.div
                          key={detailIndex}
                          initial={{ opacity: 0, x: -20 }}
                          whileInView={{ opacity: 1, x: 0 }}
                          transition={{ delay: index * 0.2 + detailIndex * 0.1 }}
                          viewport={{ once: true }}
                          className="flex items-center text-gray-300 text-sm"
                        >
                          <div
                            className={`w-2 h-2 rounded-full bg-gradient-to-r ${step.color} mr-3`}
                          />
                          {detail}
                        </motion.div>
                      ))}
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>

        {/* Mobile Layout */}
        <div className="lg:hidden space-y-12">
          {steps.map((step, index) => (
            <motion.div
              key={step.number}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: index * 0.2 }}
              viewport={{ once: true }}
              className="relative"
            >
              <div className="flex items-start space-x-6">
                {/* Step Number */}
                <motion.div
                  className={`flex-shrink-0 w-16 h-16 rounded-full bg-gradient-to-r ${step.color} flex items-center justify-center text-white text-xl font-bold`}
                  whileHover={{ scale: 1.1, rotate: 5 }}
                >
                  {step.number}
                </motion.div>

                {/* Content */}
                <div className="flex-1">
                  <div className="bg-gray-900/50 backdrop-blur-lg border border-gray-800 rounded-2xl p-6">
                    <div className="flex items-center mb-4">
                      <div
                        className={`w-12 h-12 rounded-lg bg-gradient-to-r ${step.color} flex items-center justify-center mr-4`}
                      >
                        <step.icon className="w-6 h-6 text-white" />
                      </div>
                      <h3 className="text-xl font-bold text-white">{step.title}</h3>
                    </div>

                    <p className="text-gray-300 mb-4">{step.description}</p>

                    {/* Details */}
                    <div className="space-y-2">
                      {step.details.map((detail, detailIndex) => (
                        <div key={detailIndex} className="flex items-center text-gray-300 text-sm">
                          <div
                            className={`w-1.5 h-1.5 rounded-full bg-gradient-to-r ${step.color} mr-3`}
                          />
                          {detail}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {/* Connection line for mobile */}
              {index < steps.length - 1 && (
                <div className="flex justify-start ml-8 mt-6 mb-6">
                  <div className="w-0.5 h-12 bg-gradient-to-b from-gray-600 to-gray-800" />
                </div>
              )}
            </motion.div>
          ))}
        </div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          viewport={{ once: true }}
          className="text-center mt-20"
        >
          <div className="bg-gray-900/50 backdrop-blur-lg border border-gray-800 rounded-3xl p-8 max-w-2xl mx-auto">
            <h3 className="text-2xl font-bold text-white mb-4">
              Ready to Let Sentiment Guide Your Portfolio?
            </h3>
            <p className="text-gray-300 mb-6">
              Join disciplined investors who let market extremes — not emotions — drive their rebalancing decisions
            </p>
            <motion.button
              className="bg-gradient-to-r from-purple-600 to-blue-600 text-white px-8 py-4 rounded-xl font-semibold text-lg shadow-lg hover:shadow-purple-500/25 transition-all duration-300"
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => openExternalLink(LINKS.app)}
            >
              Get Started Now
            </motion.button>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
