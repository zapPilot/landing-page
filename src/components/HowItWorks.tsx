'use client';

import { motion } from 'framer-motion';
import { Settings, Activity, Shield } from 'lucide-react';
import { SectionHeader } from './layout';

export function HowItWorks() {
  const steps = [
    {
      number: 1,
      icon: Settings,
      title: 'Define Strategy',
      description: 'Set your target allocations for each regime',
      color: 'from-purple-500 to-violet-600',
    },
    {
      number: 2,
      icon: Activity,
      title: 'Monitor Sentiment',
      description: 'Zap Pilot watches Fear & Greed Index 24/7',
      color: 'from-blue-500 to-cyan-600',
    },
    {
      number: 3,
      icon: Shield,
      title: 'Execute Gradually',
      description: 'Rebalancing happens over 5-10 days (regime-specific) in your wallet',
      color: 'from-green-500 to-emerald-600',
    },
  ];

  return (
    <section id="how-it-works" className="py-24 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeader
          title={
            <>
              How It
              <span className="ml-3">Works</span>
            </>
          }
          subtitle="Three simple steps to sentiment-driven rebalancing"
        />

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

                    <p className="text-gray-300 leading-relaxed">{step.description}</p>
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

                    <p className="text-gray-300">{step.description}</p>
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
      </div>
    </section>
  );
}
