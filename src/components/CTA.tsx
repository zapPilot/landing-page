'use client';

import { motion } from 'framer-motion';
import { ArrowRight, BookOpen } from 'lucide-react';
import { LINKS, openExternalLink } from '@/config/links';
import { MESSAGES } from '@/config/messages';
import { fadeInUpStaggered, scaleOnHover } from '@/lib/motion/animations';

export function CTA() {
  return (
    <section className="py-24 relative overflow-hidden">
      {/* Animated background */}
      <div className="absolute inset-0 bg-gradient-to-r from-purple-600 via-blue-600 to-purple-600 opacity-90" />
      <motion.div
        className="absolute inset-0"
        style={{
          background:
            'linear-gradient(45deg, rgba(147, 51, 234, 0.1) 0%, rgba(59, 130, 246, 0.1) 50%, rgba(147, 51, 234, 0.1) 100%)',
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
        <motion.div {...fadeInUpStaggered(0)} transition={{ duration: 0.8 }}>
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-6">
            {MESSAGES.cta.title}
            <span className="block">{MESSAGES.cta.titleSecondLine}</span>
          </h2>

          <motion.p
            className="text-xl text-white/90 mb-12 max-w-3xl mx-auto"
            {...fadeInUpStaggered(0.2)}
            transition={{ duration: 0.8 }}
          >
            {MESSAGES.cta.subtitle}
          </motion.p>

          {/* Main CTA Buttons */}
          <motion.div
            className="flex flex-col sm:flex-row gap-6 justify-center mb-16"
            {...fadeInUpStaggered(0.4)}
            transition={{ duration: 0.8 }}
          >
            <motion.button
              className="group bg-white text-purple-600 px-8 py-4 rounded-xl font-bold text-lg shadow-lg hover:shadow-xl transition-all duration-300"
              {...scaleOnHover}
              onClick={() => openExternalLink(LINKS.app)}
            >
              <span className="flex items-center justify-center">
                {MESSAGES.cta.ctaPrimary}
                <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </span>
            </motion.button>

            <motion.button
              className="group bg-white/10 backdrop-blur-lg text-white px-8 py-4 rounded-xl font-semibold text-lg border border-white/20 hover:bg-white/20 transition-all duration-300"
              {...scaleOnHover}
              onClick={() => openExternalLink(LINKS.documentation)}
            >
              <span className="flex items-center justify-center">
                <BookOpen className="mr-2 w-5 h-5" />
                {MESSAGES.cta.ctaSecondary}
              </span>
            </motion.button>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
