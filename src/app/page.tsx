'use client';

import { Navbar } from '@/components/Navbar';
import { Hero } from '@/components/Hero';
import { RegimeVisualizer } from '@/components/regime';
import { Philosophy } from '@/components/Philosophy';
import { Features } from '@/components/Features';
import { Protocols } from '@/components/Protocols';
import { UseCases } from '@/components/UseCases';
import { HowItWorks } from '@/components/HowItWorks';
import { CTA } from '@/components/CTA';
import { Footer } from '@/components/Footer';
import { AnimatedBackground } from '@/components/AnimatedBackground';

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gray-950 text-white overflow-x-hidden">
      <AnimatedBackground />

      <Navbar />
      <Hero />
      <RegimeVisualizer />
      <UseCases />
      <Features />
      <Protocols />
      <HowItWorks />
      <Philosophy />
      <CTA />
      <Footer />
    </div>
  );
}
