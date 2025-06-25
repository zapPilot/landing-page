'use client';

import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import { TrendingUp, DollarSign, Users, Zap } from 'lucide-react';
import { getCachedDeFiMetrics, type DeFiMetrics } from '@/lib/api';

export function DeFiStats() {
  const [data, setData] = useState<DeFiMetrics>({
    totalValueLocked: '$87.2B',
    bitcoinPrice: '$43,250',
    ethereumPrice: '$2,650',
    defiMarketCap: '$156.8B'
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDeFiData = async () => {
      try {
        const metrics = await getCachedDeFiMetrics();
        setData(metrics);
        setLoading(false);
      } catch (error) {
        console.error('Failed to fetch DeFi data:', error);
        setLoading(false);
      }
    };

    fetchDeFiData();
    
    // Update data every 30 seconds
    const interval = setInterval(fetchDeFiData, 30000);
    return () => clearInterval(interval);
  }, []);

  const stats = [
    {
      icon: DollarSign,
      label: 'Total DeFi TVL',
      value: data.totalValueLocked,
      change: data.change24h?.tvl || '+5.2%',
      color: 'from-green-400 to-emerald-500'
    },
    {
      icon: TrendingUp,
      label: 'Bitcoin Price',
      value: data.bitcoinPrice,
      change: data.change24h?.btc || '+2.1%',
      color: 'from-orange-400 to-yellow-500'
    },
    {
      icon: Zap,
      label: 'Ethereum Price',
      value: data.ethereumPrice,
      change: data.change24h?.eth || '+3.8%',
      color: 'from-blue-400 to-purple-500'
    },
    {
      icon: Users,
      label: 'DeFi Market Cap',
      value: data.defiMarketCap,
      change: '+7.5%',
      color: 'from-purple-400 to-pink-500'
    }
  ];

  return (
    <section className="py-20 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl sm:text-4xl font-bold mb-4">
            Live DeFi
            <span className="bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent ml-3">
              Metrics
            </span>
          </h2>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            Real-time data from the decentralized finance ecosystem
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              whileHover={{ scale: 1.05, y: -5 }}
              className="relative group"
            >
              <div className="bg-gray-900/50 backdrop-blur-lg border border-gray-800 rounded-2xl p-6 hover:border-gray-700 transition-all duration-300">
                {/* Gradient overlay on hover */}
                <div className={`absolute inset-0 bg-gradient-to-r ${stat.color} opacity-0 group-hover:opacity-5 rounded-2xl transition-opacity duration-300`} />
                
                <div className="relative z-10">
                  <div className="flex items-center justify-between mb-4">
                    <div className={`w-12 h-12 rounded-xl bg-gradient-to-r ${stat.color} flex items-center justify-center`}>
                      <stat.icon className="w-6 h-6 text-white" />
                    </div>
                    {loading ? (
                      <div className="w-8 h-4 bg-gray-700 rounded animate-pulse" />
                    ) : (
                      <span className="text-green-400 text-sm font-medium">
                        {stat.change}
                      </span>
                    )}
                  </div>
                  
                  <div className="text-gray-400 text-sm mb-2">{stat.label}</div>
                  
                  {loading ? (
                    <div className="w-20 h-8 bg-gray-700 rounded animate-pulse" />
                  ) : (
                    <motion.div
                      className="text-2xl font-bold text-white"
                      key={stat.value} // Re-animate when value changes
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ duration: 0.5 }}
                    >
                      {stat.value}
                    </motion.div>
                  )}
                </div>
                
                {/* Animated border */}
                <motion.div
                  className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                  style={{
                    background: `linear-gradient(90deg, transparent, rgba(147, 51, 234, 0.1), transparent)`,
                  }}
                  animate={{
                    backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    ease: 'easeInOut',
                  }}
                />
              </div>
            </motion.div>
          ))}
        </div>

        {/* Live indicator */}
        <motion.div
          className="flex items-center justify-center mt-8 space-x-2"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
          viewport={{ once: true }}
        >
          <motion.div
            className="w-2 h-2 bg-green-500 rounded-full"
            animate={{ opacity: [1, 0.3, 1] }}
            transition={{ duration: 1.5, repeat: Infinity }}
          />
          <span className="text-gray-400 text-sm">Live data updates every 30 seconds</span>
        </motion.div>
      </div>
    </section>
  );
}