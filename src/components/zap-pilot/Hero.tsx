'use client';

import { motion } from 'framer-motion';
import { ArrowRight, ShieldCheck, PenTool, Wallet } from 'lucide-react';
import { Button } from '@/components/ui/Button';

export function Hero() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
    },
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center px-4 sm:px-6 lg:px-8 pt-16">
      <div className="max-w-4xl mx-auto text-center">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {/* Main Headline */}
          <motion.h1
            variants={itemVariants}
            className="text-5xl sm:text-6xl lg:text-7xl font-bold leading-tight mb-6"
          >
            <span className="bg-gradient-to-r from-purple-400 via-pink-400 to-blue-400 bg-clip-text text-transparent">
              Zap Pilot
            </span>
          </motion.h1>

          {/* Subheadline */}
          <motion.p
            variants={itemVariants}
            className="text-xl sm:text-2xl text-gray-200 mb-8 leading-relaxed"
          >
            A <strong>sentiment-driven, self-custodial strategy engine</strong> that uses the Fear & Greed Index to auto-generate rebalancing routes — but <strong>every transaction is manually signed by you</strong>.
          </motion.p>
          
          <motion.p
             variants={itemVariants}
             className="text-lg text-gray-400 mb-10"
          >
             We never custody funds. We never auto-execute trades.
          </motion.p>

          {/* Bullet Points */}
          <motion.div 
            variants={itemVariants}
            className="grid gap-6 md:grid-cols-3 text-left mb-12"
          >
            <div className="bg-gray-800/50 p-4 rounded-xl border border-gray-700 backdrop-blur-sm">
                <div className="flex items-center mb-2 text-purple-400">
                    <ShieldCheck className="w-6 h-6 mr-2" />
                    <span className="font-semibold">Non-Custodial</span>
                </div>
                <p className="text-sm text-gray-300">This is NOT a fund. We never hold your assets.</p>
            </div>
            <div className="bg-gray-800/50 p-4 rounded-xl border border-gray-700 backdrop-blur-sm">
                <div className="flex items-center mb-2 text-blue-400">
                    <PenTool className="w-6 h-6 mr-2" />
                    <span className="font-semibold">Strategy Only</span>
                </div>
                <p className="text-sm text-gray-300">We ONLY generate strategy suggestions and transaction routes.</p>
            </div>
            <div className="bg-gray-800/50 p-4 rounded-xl border border-gray-700 backdrop-blur-sm">
                <div className="flex items-center mb-2 text-pink-400">
                    <Wallet className="w-6 h-6 mr-2" />
                    <span className="font-semibold">Manual Signing</span>
                </div>
                <p className="text-sm text-gray-300">All assets stay in your wallet. Every TX requires your signature.</p>
            </div>
          </motion.div>

          {/* CTA */}
          <motion.div
            variants={itemVariants}
            className="flex justify-center"
          >
            <Button size="lg" className="group">
              <span className="flex items-center">
                Start Your Pilot
                <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </span>
            </Button>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
