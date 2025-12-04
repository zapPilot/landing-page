'use client';

import { motion } from 'framer-motion';
import { MESSAGES } from '@/config/messages';

export function Philosophy() {
  return (
    <section className="relative py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="relative p-8 rounded-2xl bg-gradient-to-r from-purple-900/20 to-blue-900/20 backdrop-blur-sm border border-purple-500/30"
        >
          {/* Main Philosophy */}
          <div className="text-center mb-4">
            <h3 className="text-3xl sm:text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-blue-400 mb-4">
              {MESSAGES.slogans.philosophy}
            </h3>
          </div>

          {/* Explanation */}
          <p className="text-center text-gray-400 text-lg max-w-2xl mx-auto">
            {MESSAGES.slogans.philosophyDescription}
          </p>
        </motion.div>
      </div>
    </section>
  );
}
