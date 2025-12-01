'use client';

import { motion } from 'framer-motion';
import { Navbar } from '@/components/Navbar';
import { Hero } from '@/components/zap-pilot/Hero';
import { WhatWeAre } from '@/components/zap-pilot/WhatWeAre';
import { SentimentClock } from '@/components/zap-pilot/SentimentClock';
import { HowItWorks } from '@/components/zap-pilot/HowItWorks';
import { Philosophy } from '@/components/zap-pilot/Philosophy';
import { WhoIsThisFor } from '@/components/zap-pilot/WhoIsThisFor';
import { CTA } from '@/components/CTA';
import { Footer } from '@/components/Footer';

export default function ZapPilotPage() {
  return (
    <div className="min-h-screen bg-gray-950 text-white overflow-x-hidden font-sans selection:bg-purple-500/30">
      {/* Animated Background */}
      <div className="fixed inset-0 -z-10 pointer-events-none">
        <div className="absolute inset-0 bg-gradient-to-br from-gray-950 via-purple-950/20 to-blue-950/20" />
        <motion.div
          className="absolute top-20 left-10 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl"
          animate={{
            x: [0, 100, 0],
            y: [0, -50, 0],
            scale: [1, 1.2, 1],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />
        <motion.div
          className="absolute bottom-20 right-10 w-80 h-80 bg-blue-500/10 rounded-full blur-3xl"
          animate={{
            x: [0, -80, 0],
            y: [0, 60, 0],
            scale: [1, 0.8, 1],
          }}
          transition={{
            duration: 15,
            repeat: Infinity,
            ease: 'easeInOut',
            delay: 5,
          }}
        />
      </div>

      <Navbar />
      
      <main>
        <Hero />
        <WhatWeAre />
        <SentimentClock />
        <HowItWorks />
        <Philosophy />
        <WhoIsThisFor />
        <CTA />
      </main>

      <Footer />
    </div>
  );
}
