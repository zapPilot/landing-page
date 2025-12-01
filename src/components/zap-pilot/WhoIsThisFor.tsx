'use client';

import { SectionHeader } from '@/components/ui/SectionHeader';
import { Card } from '@/components/ui/Card';
import { Users, TrendingUp, BrainCircuit } from 'lucide-react';

export function WhoIsThisFor() {
  const audiences = [
    {
      icon: Users,
      title: "Long-Term Holders",
      description: "You believe in BTC & ETH for the next decade but don't want to stare at charts or micromanage your portfolio every day."
    },
    {
      icon: TrendingUp,
      title: "Emotion-Free Investors",
      description: "You're tired of FOMO-buying tops and panic-selling bottoms. You want a rules-based system that forces you to do the opposite."
    },
    {
      icon: BrainCircuit,
      title: "Smart Rebalancers",
      description: "You understand the power of 'selling high, buying low' but need a tool to execute it disciplinedly at emotional extremes."
    }
  ];

  return (
    <section className="py-24 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <SectionHeader 
          title="Who Is This" 
          highlight="For?"
          subtitle="Zap Pilot is built for investors who want to automate discipline."
        />

        <div className="grid md:grid-cols-3 gap-8">
          {audiences.map((item, index) => (
            <Card key={index} variant="default" className="text-center bg-gradient-to-b from-gray-800 to-gray-900 border-gray-700">
               <div className="inline-flex p-4 rounded-full bg-gray-800/80 mb-6 shadow-lg border border-gray-700">
                  <item.icon className="w-8 h-8 text-blue-400" />
               </div>
               <h3 className="text-xl font-bold text-white mb-4">{item.title}</h3>
               <p className="text-gray-400 leading-relaxed">
                 {item.description}
               </p>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
