'use client';

import { motion } from 'framer-motion';
import { TrendingUp, TrendingDown, DollarSign, Activity } from 'lucide-react';
import { useState, useEffect } from 'react';

export function PhoneMockup() {
  const [currentView, setCurrentView] = useState(0);

  // Portfolio data for animation
  const portfolioViews = [
    {
      title: 'Portfolio Overview',
      totalValue: '$124,567.89',
      change: '+$3,246.78',
      changePercent: '+2.68%',
      isPositive: true,
      metrics: [
        { label: 'APR', value: '12.4%', trend: 'up' },
        { label: 'Max Drawdown', value: '4.2%', trend: 'down' },
        { label: 'Sharpe Ratio', value: '1.87', trend: 'up' },
        { label: 'Risk Score', value: '6.3/10', trend: 'neutral' },
      ],
    },
    {
      title: 'Asset Allocation',
      totalValue: '$124,567.89',
      change: '+$1,234.56',
      changePercent: '+1.01%',
      isPositive: true,
      assets: [
        { name: 'BTC', allocation: 35, value: '$43,598.76', color: '#F7931A' },
        { name: 'ETH', allocation: 25, value: '$31,141.97', color: '#627EEA' },
        { name: 'Stablecoins', allocation: 20, value: '$24,913.58', color: '#26A17B' },
        { name: 'DeFi Tokens', allocation: 20, value: '$24,913.58', color: '#8B5CF6' },
      ],
    },
    {
      title: 'Strategy Performance',
      totalValue: '$124,567.89',
      change: '+$5,123.45',
      changePercent: '+4.29%',
      isPositive: true,
      strategies: [
        { name: 'BTC Vault', apy: '8.2%', tvl: '$43,598.76', status: 'active' },
        { name: 'ETH Staking', apy: '4.8%', tvl: '$31,141.97', status: 'active' },
        { name: 'Stable Yield', apy: '12.1%', tvl: '$24,913.58', status: 'active' },
        { name: 'Index500', apy: '15.6%', tvl: '$24,913.58', status: 'active' },
      ],
    },
  ];

  // Auto-cycle through views
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentView(prev => (prev + 1) % portfolioViews.length);
    }, 4000);
    return () => clearInterval(interval);
  }, [portfolioViews.length]);

  const currentData = portfolioViews[currentView];

  return (
    <motion.div
      className="relative"
      initial={{ opacity: 0, scale: 0.8, rotateY: -15 }}
      whileInView={{ opacity: 1, scale: 1, rotateY: 0 }}
      transition={{ duration: 1.2, ease: 'easeOut' }}
      viewport={{ once: true }}
    >
      {/* Phone Frame */}
      <div className="relative w-80 h-[600px] mx-auto">
        {/* Outer Frame */}
        <motion.div
          className="absolute inset-0 bg-gradient-to-b from-gray-800 to-gray-900 rounded-[3rem] p-2 shadow-2xl"
          whileHover={{
            scale: 1.02,
            rotateY: 5,
            rotateX: 2,
          }}
          transition={{ duration: 0.3 }}
          style={{
            perspective: '1000px',
            transformStyle: 'preserve-3d',
          }}
        >
          {/* Screen */}
          <div className="w-full h-full bg-gray-950 rounded-[2.5rem] overflow-hidden relative">
            {/* Status Bar */}
            <div className="flex justify-between items-center px-6 py-3 text-white text-sm">
              <span className="font-medium">9:41</span>
              <div className="flex items-center space-x-1">
                <div className="w-4 h-2 bg-white rounded-sm opacity-60" />
                <div className="w-4 h-2 bg-white rounded-sm opacity-80" />
                <div className="w-4 h-2 bg-white rounded-sm" />
              </div>
            </div>

            {/* App Content */}
            <div className="px-6 pb-6 h-full">
              {/* Header */}
              <motion.div
                key={currentView}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="mb-6"
              >
                <h3 className="text-white text-lg font-semibold mb-2">{currentData.title}</h3>
                <div className="text-3xl font-bold text-white mb-1">{currentData.totalValue}</div>
                <div
                  className={`flex items-center text-sm ${
                    currentData.isPositive ? 'text-green-400' : 'text-red-400'
                  }`}
                >
                  {currentData.isPositive ? (
                    <TrendingUp className="w-4 h-4 mr-1" />
                  ) : (
                    <TrendingDown className="w-4 h-4 mr-1" />
                  )}
                  {currentData.change} ({currentData.changePercent})
                </div>
              </motion.div>

              {/* Dynamic Content */}
              <motion.div
                key={`content-${currentView}`}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="flex-1"
              >
                {currentView === 0 && (
                  // Portfolio Metrics
                  <div className="space-y-4">
                    {currentData.metrics?.map((metric, index) => (
                      <motion.div
                        key={metric.label}
                        className="bg-gray-800/50 rounded-lg p-4 border border-gray-700"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.1 }}
                      >
                        <div className="flex justify-between items-center">
                          <span className="text-gray-400 text-sm">{metric.label}</span>
                          <div className="flex items-center">
                            <span className="text-white font-semibold mr-2">{metric.value}</span>
                            {metric.trend === 'up' && (
                              <TrendingUp className="w-4 h-4 text-green-400" />
                            )}
                            {metric.trend === 'down' && (
                              <TrendingDown className="w-4 h-4 text-red-400" />
                            )}
                            {metric.trend === 'neutral' && (
                              <Activity className="w-4 h-4 text-yellow-400" />
                            )}
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                )}

                {currentView === 1 && (
                  // Asset Allocation
                  <div className="space-y-4">
                    {currentData.assets?.map((asset, index) => (
                      <motion.div
                        key={asset.name}
                        className="bg-gray-800/50 rounded-lg p-4 border border-gray-700"
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.1 }}
                      >
                        <div className="flex justify-between items-center mb-2">
                          <div className="flex items-center">
                            <div
                              className="w-3 h-3 rounded-full mr-3"
                              style={{ backgroundColor: asset.color }}
                            />
                            <span className="text-white font-medium">{asset.name}</span>
                          </div>
                          <span className="text-gray-400 text-sm">{asset.allocation}%</span>
                        </div>
                        <div className="text-gray-300 text-sm">{asset.value}</div>
                        {/* Progress Bar */}
                        <div className="w-full bg-gray-700 rounded-full h-2 mt-2">
                          <motion.div
                            className="h-2 rounded-full"
                            style={{ backgroundColor: asset.color }}
                            initial={{ width: 0 }}
                            animate={{ width: `${asset.allocation}%` }}
                            transition={{ duration: 0.8, delay: index * 0.1 }}
                          />
                        </div>
                      </motion.div>
                    ))}
                  </div>
                )}

                {currentView === 2 && (
                  // Strategy Performance
                  <div className="space-y-3">
                    {currentData.strategies?.map((strategy, index) => (
                      <motion.div
                        key={strategy.name}
                        className="bg-gray-800/50 rounded-lg p-3 border border-gray-700"
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: index * 0.1 }}
                      >
                        <div className="flex justify-between items-center mb-1">
                          <span className="text-white text-sm font-medium">{strategy.name}</span>
                          <div className="flex items-center">
                            <span className="text-green-400 text-xs font-semibold mr-2">
                              {strategy.apy}
                            </span>
                            <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
                          </div>
                        </div>
                        <div className="text-gray-400 text-xs">{strategy.tvl}</div>
                      </motion.div>
                    ))}
                  </div>
                )}
              </motion.div>
            </div>

            {/* Navigation Dots */}
            <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 flex space-x-2">
              {portfolioViews.map((_, index) => (
                <motion.button
                  key={index}
                  className={`w-2 h-2 rounded-full transition-colors ${
                    index === currentView ? 'bg-purple-500' : 'bg-gray-600'
                  }`}
                  onClick={() => setCurrentView(index)}
                  whileHover={{ scale: 1.2 }}
                  whileTap={{ scale: 0.9 }}
                />
              ))}
            </div>
          </div>

          {/* Glow Effect */}
          <motion.div
            className="absolute inset-0 rounded-[3rem] bg-gradient-to-r from-purple-500/20 to-blue-500/20 blur-xl -z-10"
            animate={{
              opacity: [0.5, 0.8, 0.5],
              scale: [1, 1.05, 1],
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
          />
        </motion.div>

        {/* Floating Elements */}
        <motion.div
          className="absolute -top-4 -right-4 w-8 h-8 bg-green-500 rounded-full flex items-center justify-center"
          animate={{
            y: [0, -10, 0],
            rotate: [0, 180, 360],
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        >
          <DollarSign className="w-4 h-4 text-white" />
        </motion.div>

        <motion.div
          className="absolute -bottom-4 -left-4 w-6 h-6 bg-purple-500 rounded-full flex items-center justify-center"
          animate={{
            y: [0, 10, 0],
            rotate: [0, -180, -360],
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            ease: 'easeInOut',
            delay: 1,
          }}
        >
          <Activity className="w-3 h-3 text-white" />
        </motion.div>
      </div>
    </motion.div>
  );
}
