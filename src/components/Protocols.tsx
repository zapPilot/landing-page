'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import { ExternalLink } from 'lucide-react';
import { MESSAGES } from '@/config/messages';

export function Protocols() {
  return (
    <section className="py-24 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-20"
        >
          <h2 className="text-4xl sm:text-5xl font-bold mb-6">
            <span className="bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
              {MESSAGES.protocols.title}
            </span>
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            {MESSAGES.protocols.subtitle}
          </p>
        </motion.div>

        {/* Protocol Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {MESSAGES.protocols.items.map((protocol, index) => (
            <motion.a
              key={protocol.name}
              href={protocol.link}
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              whileHover={{ scale: 1.03, y: -5 }}
              className="group relative block"
            >
              <div className="bg-gray-900/50 backdrop-blur-lg border border-gray-800 rounded-3xl p-8 hover:border-gray-700 transition-all duration-300 relative overflow-hidden h-full">
                {/* Hover gradient effect */}
                <div className="absolute inset-0 bg-gradient-to-br from-purple-500/5 to-blue-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                <div className="relative z-10">
                  {/* Logo + Category Badge */}
                  <div className="flex items-start justify-between mb-6">
                    <div className="relative w-16 h-16 rounded-2xl overflow-hidden bg-gray-800 p-2">
                      <Image
                        src={protocol.logo}
                        alt={protocol.name}
                        width={64}
                        height={64}
                        className="object-contain"
                      />
                    </div>
                    <span className="px-3 py-1 rounded-full text-xs font-medium bg-purple-500/10 text-purple-300 border border-purple-500/20">
                      {protocol.category}
                    </span>
                  </div>

                  {/* Protocol Name */}
                  <h3 className="text-2xl font-bold mb-3 flex items-center gap-2 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-purple-400 group-hover:to-blue-400 transition-all duration-300">
                    {protocol.name}
                    <ExternalLink className="w-5 h-5 text-gray-500 group-hover:text-purple-400 transition-colors" />
                  </h3>

                  {/* Description */}
                  <p className="text-gray-400 leading-relaxed">
                    {protocol.description}
                  </p>
                </div>
              </div>
            </motion.a>
          ))}
        </div>
      </div>
    </section>
  );
}
