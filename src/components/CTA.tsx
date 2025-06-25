'use client';

import { motion } from 'framer-motion';
import { ArrowRight, BookOpen, Github, MessageCircle } from 'lucide-react';
import { LINKS, openExternalLink } from '@/config/links';

export function CTA() {
  return (
    <section className="py-24 relative overflow-hidden">
      {/* Animated background */}
      <div className="absolute inset-0 bg-gradient-to-r from-purple-600 via-blue-600 to-purple-600 opacity-90" />
      <motion.div
        className="absolute inset-0"
        style={{
          background: 'linear-gradient(45deg, rgba(147, 51, 234, 0.1) 0%, rgba(59, 130, 246, 0.1) 50%, rgba(147, 51, 234, 0.1) 100%)',
          backgroundSize: '400% 400%',
        }}
        animate={{
          backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'],
        }}
        transition={{
          duration: 10,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      />
      
      {/* Floating orbs */}
      <motion.div
        className="absolute top-20 left-20 w-32 h-32 bg-white/10 rounded-full blur-xl"
        animate={{
          y: [0, -20, 0],
          scale: [1, 1.1, 1],
        }}
        transition={{
          duration: 6,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      />
      <motion.div
        className="absolute bottom-20 right-20 w-40 h-40 bg-white/10 rounded-full blur-xl"
        animate={{
          y: [0, 20, 0],
          scale: [1, 0.9, 1],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: 'easeInOut',
          delay: 2,
        }}
      />
      
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-6">
            Ready to Simplify
            <span className="block">DeFi?</span>
          </h2>
          
          <motion.p
            className="text-xl text-white/90 mb-12 max-w-3xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
          >
            Join thousands of users who&apos;ve already simplified their DeFi experience with intent-based execution
          </motion.p>

          {/* Main CTA Buttons */}
          <motion.div
            className="flex flex-col sm:flex-row gap-6 justify-center mb-16"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            viewport={{ once: true }}
          >
              <motion.button
                className="group bg-white text-purple-600 px-8 py-4 rounded-xl font-bold text-lg shadow-lg hover:shadow-xl transition-all duration-300"
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => openExternalLink(LINKS.app)}
              >
                <span className="flex items-center justify-center">
                  Launch Zap Pilot
                  <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </span>
              </motion.button>
            
            <motion.button
              className="group bg-white/10 backdrop-blur-lg text-white px-8 py-4 rounded-xl font-semibold text-lg border border-white/20 hover:bg-white/20 transition-all duration-300"
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => openExternalLink(LINKS.documentation)}
            >
              <span className="flex items-center justify-center">
                <BookOpen className="mr-2 w-5 h-5" />
                Read Documentation
              </span>
            </motion.button>
          </motion.div>

          {/* Additional Links */}
          <motion.div
            className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            viewport={{ once: true }}
          >
            <motion.div
              className="group bg-white/10 backdrop-blur-lg rounded-2xl p-6 border border-white/20 hover:bg-white/20 transition-all duration-300 cursor-pointer"
              whileHover={{ scale: 1.03, y: -5 }}
              onClick={() => openExternalLink(LINKS.social.github)}
            >
              <Github className="w-8 h-8 text-white mb-4 mx-auto group-hover:scale-110 transition-transform" />
              <h3 className="text-white font-semibold mb-2">Open Source</h3>
              <p className="text-white/80 text-sm">Explore our codebase and contribute to the future of DeFi</p>
            </motion.div>

            <motion.div
              className="group bg-white/10 backdrop-blur-lg rounded-2xl p-6 border border-white/20 hover:bg-white/20 transition-all duration-300 cursor-pointer"
              whileHover={{ scale: 1.03, y: -5 }}
              onClick={() => openExternalLink(LINKS.social.discord)}
            >
              <MessageCircle className="w-8 h-8 text-white mb-4 mx-auto group-hover:scale-110 transition-transform" />
              <h3 className="text-white font-semibold mb-2">Community</h3>
              <p className="text-white/80 text-sm">Join our Discord and connect with fellow DeFi enthusiasts</p>
            </motion.div>

            <motion.div
              className="group bg-white/10 backdrop-blur-lg rounded-2xl p-6 border border-white/20 hover:bg-white/20 transition-all duration-300 cursor-pointer"
              whileHover={{ scale: 1.03, y: -5 }}
              onClick={() => openExternalLink(LINKS.documentation)}
            >
              <BookOpen className="w-8 h-8 text-white mb-4 mx-auto group-hover:scale-110 transition-transform" />
              <h3 className="text-white font-semibold mb-2">Learn More</h3>
              <p className="text-white/80 text-sm">Deep dive into intent-based execution and DeFi strategies</p>
            </motion.div>
          </motion.div>

          {/* Stats Row */}
          <motion.div
            className="grid grid-cols-2 md:grid-cols-4 gap-8 mt-16 pt-16 border-t border-white/20"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
            viewport={{ once: true }}
          >
            {[
              { label: 'Total Value Locked', value: '$50M+' },
              { label: 'Active Users', value: '25K+' },
              { label: 'Supported Chains', value: '20+' },
              { label: 'Vault Strategies', value: '50+' },
            ].map((stat, index) => (
              <motion.div
                key={stat.label}
                className="text-center"
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6, delay: 0.8 + index * 0.1 }}
                viewport={{ once: true }}
              >
                <motion.div
                  className="text-3xl md:text-4xl font-bold text-white mb-2"
                  animate={{ opacity: [0.8, 1, 0.8] }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    delay: index * 0.5,
                  }}
                >
                  {stat.value}
                </motion.div>
                <div className="text-white/80 text-sm">{stat.label}</div>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}