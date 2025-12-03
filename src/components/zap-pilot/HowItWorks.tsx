'use client';

import { SectionHeader } from '@/components/ui/SectionHeader';
import { Card } from '@/components/ui/Card';
import { Wallet, Sliders, Cpu, PenTool } from 'lucide-react';

export function HowItWorks() {
  const steps = [
    {
      icon: Wallet,
      title: 'Connect Wallet',
      description: 'Connect your self-custodial wallet (MetaMask, Rabbi, etc.). We simply read your balances.'
    },
    {
      icon: Sliders,
      title: 'Choose Strategy',
      description: 'Select the Sentiment Clock strategy with standard tilt (0.2). Define your risk tolerance.'
    },
    {
      icon: Cpu,
      title: 'Generate Route',
      description: 'Zap Pilot analyzes the current Fear & Greed Index and calculates the optimal rebalancing path.'
    },
    {
      icon: PenTool,
      title: 'Review & Sign',
      description: 'You get a transaction route. Review the details. If you like it, sign it. If not, ignore it.'
    }
  ];

  return (
    <section className="py-24 px-4 sm:px-6 lg:px-8 bg-black">
      <div className="max-w-7xl mx-auto">
        <SectionHeader 
          title="How It" 
          highlight="Works"
          subtitle="Four simple steps to automated strategy with manual control."
        />

        <div className="grid md:grid-cols-4 gap-8 relative">
          {/* Connecting Line (Desktop) */}
          <div className="hidden md:block absolute top-12 left-0 w-full h-0.5 bg-gradient-to-r from-purple-900 via-blue-900 to-purple-900 -z-10" />

          {steps.map((step, index) => (
            <div key={index} className="relative group">
              {/* Step Number Badge */}
              <div className="w-8 h-8 rounded-full bg-gray-800 border border-gray-700 flex items-center justify-center text-sm font-bold text-gray-400 absolute -top-4 left-1/2 -translate-x-1/2 z-10 group-hover:bg-purple-600 group-hover:text-white transition-colors">
                {index + 1}
              </div>

              <Card variant="glass" className="h-full pt-12 text-center hover:border-purple-500/50 transition-colors">
                <div className="inline-flex p-4 rounded-full bg-gray-800/50 mb-6 group-hover:scale-110 transition-transform duration-300">
                  <step.icon className="w-8 h-8 text-purple-400" />
                </div>
                <h3 className="text-xl font-bold mb-3 text-white">{step.title}</h3>
                <p className="text-gray-400 leading-relaxed">
                  {step.description}
                </p>
              </Card>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
