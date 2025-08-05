'use client';

import { motion } from 'framer-motion';
import { Coins, TrendingUp, Target } from 'lucide-react';

export function UseCases() {
  const useCases = [
    {
      number: '01',
      icon: Coins,
      title: 'Zap into stablecoin yield vaults on L2s',
      description:
        'Automatically deploy funds across multiple L2 yield opportunities with optimal allocation and minimal gas fees.',
      gradient: 'from-green-400 to-emerald-500',
      imageAlt: 'Stablecoin vault visualization',
    },
    {
      number: '02',
      icon: TrendingUp,
      title: 'Deploy into a meme index for market sentiment plays',
      description:
        'Tap into market sentiment with diversified meme coin portfolios that automatically rebalance based on momentum.',
      gradient: 'from-purple-400 to-pink-500',
      imageAlt: 'Meme index visualization',
    },
    {
      number: '03',
      icon: Target,
      title: 'Invest in your own custom portfolio across chains',
      description:
        'Create personalized investment strategies that span multiple chains and protocols, all managed from one interface.',
      gradient: 'from-blue-400 to-cyan-500',
      imageAlt: 'Custom portfolio visualization',
    },
  ];

  return (
    <section id="use-cases" className="py-24 bg-gray-900/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-20"
        >
          <h2 className="text-4xl sm:text-5xl font-bold mb-6">
            Use
            <span className="bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent ml-3">
              Cases
            </span>
          </h2>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto">
            Real-world applications for every DeFi user
          </p>
        </motion.div>

        <div className="space-y-12">
          {useCases.map((useCase, index) => (
            <motion.div
              key={useCase.number}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: index * 0.2 }}
              viewport={{ once: true }}
              className="group relative"
            >
              <div className="bg-gray-900/50 backdrop-blur-lg border border-gray-800 rounded-3xl p-8 lg:p-12 hover:border-gray-700 transition-all duration-500 relative overflow-hidden">
                {/* Animated background */}
                <motion.div
                  className={`absolute inset-0 bg-gradient-to-r ${useCase.gradient} opacity-0 group-hover:opacity-5 transition-opacity duration-500 pointer-events-none`}
                  initial={false}
                  whileHover={{ opacity: 0.05 }}
                />

                <div className="grid lg:grid-cols-2 gap-12 items-center">
                  {/* Content */}
                  <div className={index % 2 === 1 ? 'lg:order-2' : ''}>
                    {/* Number badge */}
                    <motion.div
                      className={`inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-r ${useCase.gradient} text-white font-bold text-xl mb-6`}
                      whileHover={{ scale: 1.1, rotate: 5 }}
                      transition={{ type: 'spring', stiffness: 300 }}
                    >
                      {useCase.number}
                    </motion.div>

                    <h3 className="text-3xl lg:text-4xl font-bold text-white mb-6 leading-tight">
                      {useCase.title}
                    </h3>

                    <p className="text-gray-400 text-lg leading-relaxed mb-8">
                      {useCase.description}
                    </p>

                    <motion.a
                      href="http://app.zap-pilot.org/"
                      className={`inline-flex items-center px-6 py-3 rounded-xl bg-gradient-to-r ${useCase.gradient} text-white font-semibold hover:shadow-lg transition-all duration-300`}
                      whileHover={{ scale: 1.05, y: -2 }}
                      whileTap={{ scale: 0.95 }}
                      target="_blank"
                    >
                      <useCase.icon className="w-5 h-5 mr-2" />
                      Try This Strategy
                    </motion.a>
                  </div>

                  {/* Visual */}
                  <div className={`relative ${index % 2 === 1 ? 'lg:order-1' : ''}`}>
                    <motion.div
                      className="relative bg-gray-800/50 rounded-2xl p-8 border border-gray-700"
                      whileHover={{ scale: 1.02, rotateY: 5 }}
                      transition={{ type: 'spring', stiffness: 200 }}
                    >
                      {/* Mock interface based on use case */}
                      {index === 0 && (
                        <div className="space-y-4">
                          <div className="flex items-center justify-between">
                            <span className="text-gray-400">Stablecoin Yield</span>
                            <span className="text-green-400 font-semibold">+12.5% APY</span>
                          </div>
                          <div className="grid grid-cols-3 gap-3">
                            {['USDC', 'USDT', 'DAI'].map(token => (
                              <div key={token} className="bg-gray-700 rounded-lg p-3 text-center">
                                <div className="text-white font-semibold">{token}</div>
                                <div className="text-gray-400 text-sm">{33.3}%</div>
                              </div>
                            ))}
                          </div>
                          <motion.div
                            className="h-2 bg-gray-700 rounded-full overflow-hidden"
                            initial={{ width: 0 }}
                            whileInView={{ width: '100%' }}
                            transition={{ delay: 1, duration: 1.5 }}
                          >
                            <motion.div
                              className={`h-full bg-gradient-to-r ${useCase.gradient}`}
                              initial={{ scaleX: 0 }}
                              whileInView={{ scaleX: 1 }}
                              transition={{ delay: 1.5, duration: 1 }}
                            />
                          </motion.div>
                        </div>
                      )}

                      {index === 1 && (
                        <div className="space-y-4">
                          <div className="flex items-center justify-between">
                            <span className="text-gray-400">Meme Index Portfolio</span>
                            <span className="text-purple-400 font-semibold">+156% YTD</span>
                          </div>
                          <div className="space-y-2">
                            {[
                              { name: 'DOGE', percentage: 25, color: 'bg-yellow-500' },
                              { name: 'SHIB', percentage: 20, color: 'bg-orange-500' },
                              { name: 'PEPE', percentage: 15, color: 'bg-green-500' },
                              { name: 'FLOKI', percentage: 40, color: 'bg-purple-500' },
                            ].map(token => (
                              <div key={token.name} className="flex items-center space-x-3">
                                <div className={`w-3 h-3 rounded-full ${token.color}`} />
                                <span className="text-white flex-1">{token.name}</span>
                                <span className="text-gray-400">{token.percentage}%</span>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}

                      {index === 2 && (
                        <div className="space-y-4">
                          <div className="flex items-center justify-between">
                            <span className="text-gray-400">Custom Strategy</span>
                            <span className="text-blue-400 font-semibold">Multi-Chain</span>
                          </div>
                          <div className="grid grid-cols-2 gap-3">
                            {['Ethereum', 'Polygon', 'Arbitrum', 'Optimism'].map(chain => (
                              <div key={chain} className="bg-gray-700 rounded-lg p-2 text-center">
                                <div className="text-white text-sm">{chain}</div>
                                <div className="text-blue-400 text-xs">Active</div>
                              </div>
                            ))}
                          </div>
                          <div className="text-center">
                            <div className="text-2xl font-bold text-white">$45,230</div>
                            <div className="text-gray-400 text-sm">Total Portfolio Value</div>
                          </div>
                        </div>
                      )}

                      {/* Floating elements */}
                      <motion.div
                        className={`absolute -top-2 -right-2 w-6 h-6 rounded-full bg-gradient-to-r ${useCase.gradient}`}
                        animate={{
                          scale: [1, 1.2, 1],
                          opacity: [0.5, 1, 0.5],
                        }}
                        transition={{
                          duration: 2,
                          repeat: Infinity,
                          ease: 'easeInOut',
                        }}
                      />
                    </motion.div>

                    {/* Decorative gradient orbs */}
                    <div
                      className={`absolute -top-8 -left-8 w-32 h-32 bg-gradient-to-r ${useCase.gradient} rounded-full blur-3xl opacity-20`}
                    />
                    <div
                      className={`absolute -bottom-8 -right-8 w-24 h-24 bg-gradient-to-l ${useCase.gradient} rounded-full blur-2xl opacity-30`}
                    />
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Bottom message */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          viewport={{ once: true }}
          className="text-center mt-20"
        >
          <p className="text-xl text-gray-300 mb-6">
            Forget about managing chains, swaps, or smart contracts.
          </p>
          <p className="text-2xl font-semibold bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
            Just define your intent — and Zap Pilot takes care of the rest.
          </p>
        </motion.div>
      </div>
    </section>
  );
}
