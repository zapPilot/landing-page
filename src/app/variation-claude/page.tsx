'use client';

import { motion } from 'framer-motion';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { CTA } from '@/components/CTA';
import Hero from '@/components/variation-claude/Hero';
import WhatWeAre from '@/components/variation-claude/WhatWeAre';
import SentimentClockVariations from '@/components/variation-claude/SentimentClockVariations';
import HowItWorks from '@/components/variation-claude/HowItWorks';
import SelfCustodyPhilosophy from '@/components/variation-claude/SelfCustodyPhilosophy';
import WhoIsThisFor from '@/components/variation-claude/WhoIsThisFor';
import FAQ from '@/components/variation-claude/FAQ';

export default function VariationClaudePage() {
  return (
    <main className="min-h-screen bg-gray-950 text-white overflow-hidden">
      {/* Animated background blobs */}
      <div className="fixed inset-0 -z-10">
        <motion.div
          className="absolute top-1/4 left-1/4 w-96 h-96 bg-purple-500/30 rounded-full blur-3xl"
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.4, 0.3],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />
        <motion.div
          className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-blue-500/30 rounded-full blur-3xl"
          animate={{
            scale: [1.2, 1, 1.2],
            opacity: [0.3, 0.4, 0.3],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />
      </div>

      <Navbar />
      <Hero />
      <WhatWeAre />
      <SentimentClockVariations />
      <HowItWorks />
      <SelfCustodyPhilosophy />
      <WhoIsThisFor />
      <FAQ />
      <CTA />
      <Footer />
    </main>
  );
}
