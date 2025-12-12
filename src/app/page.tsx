'use client';

import { Navbar } from '@/components/Navbar';
import { Hero } from '@/components/Hero';
import { HowItWorks } from '@/components/HowItWorks';
import { RegimeVisualizer } from '@/components/regime';
import { Features } from '@/components/Features';
import { Protocols } from '@/components/Protocols';
import { UseCases } from '@/components/UseCases';
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
      <HowItWorks />
      <Features />
      <UseCases />
      <Protocols />
      <CTA />
      <Footer />
    </div>
  );
}
