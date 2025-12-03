'use client';

import { SectionHeader } from '@/components/ui/SectionHeader';
import { Card } from '@/components/ui/Card';
import { PieChart, Activity, Shield, Zap } from 'lucide-react';

export function WhatWeAre() {
  const features = [
    {
      icon: Shield,
      title: "Self-Custodial Robo-Advisor",
      description: "A sentiment-driven engine that behaves like a BTC/ETH mini-index. We calculate the strategy; you hold the keys."
    },
    {
      icon: Activity,
      title: "Sentiment-Driven Logic",
      description: "We use the Fear & Greed Index (0–100) to determine market regimes. No emotional market timing, just rule-based DCA and rebalancing."
    },
    {
      icon: Zap,
      title: "Strategy & Routes Only",
      description: "Zap Pilot generates the optimal transaction route. We never auto-execute. You manually review and sign every move."
    },
    {
      icon: PieChart,
      title: "Dynamic Allocation",
      description: "Baseline 50% Crypto / 50% Stable. Our algorithm tilts exposure ±20% based on sentiment regimes (Fear = Buy, Greed = Sell)."
    }
  ];

  return (
    <section className="py-24 px-4 sm:px-6 lg:px-8 bg-gray-900/30">
      <div className="max-w-7xl mx-auto">
        <SectionHeader 
          title="What is" 
          highlight="Zap Pilot?"
          subtitle="A self-custodial strategy engine for long-term BTC/ETH exposure."
        />

        <div className="grid md:grid-cols-2 gap-8 mb-16">
           <Card variant="feature" className="h-full">
              <h3 className="text-2xl font-bold mb-4 text-purple-300">Core Philosophy</h3>
              <ul className="space-y-4 text-gray-300">
                <li className="flex items-start">
                  <span className="mr-2 text-purple-500">•</span>
                  <span><strong>No price prediction.</strong> No technical analysis. No short-term trading.</span>
                </li>
                <li className="flex items-start">
                  <span className="mr-2 text-purple-500">•</span>
                  <span>Long-term <strong>BTC/ETH exposure</strong> combined with sentiment-driven stablecoin allocation.</span>
                </li>
                <li className="flex items-start">
                  <span className="mr-2 text-purple-500">•</span>
                  <span>"Be fearful when others are greedy, greedy when others are fearful" via <strong>rule-based DCA</strong>.</span>
                </li>
              </ul>
           </Card>
           <Card variant="feature" className="h-full">
              <h3 className="text-2xl font-bold mb-4 text-blue-300">Asset Scope</h3>
              <ul className="space-y-4 text-gray-300">
                <li className="flex items-start">
                  <span className="mr-2 text-blue-500">•</span>
                  <span><strong>BTC & ETH Only:</strong> Allocation determined by market-cap weighting.</span>
                </li>
                 <li className="flex items-start">
                  <span className="mr-2 text-blue-500">•</span>
                  <span><strong>Stablecoins:</strong> Used for defensive positioning and buying power.</span>
                </li>
                <li className="flex items-start">
                  <span className="mr-2 text-blue-500">•</span>
                  <span><strong>Tiny Index Fund:</strong> Effectively a 2-asset index fund on-chain, managed by you.</span>
                </li>
              </ul>
           </Card>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, index) => (
            <Card key={index} variant="glass" delay={index * 0.1} className="text-center">
              <div className="inline-flex p-3 rounded-xl bg-gray-800 mb-4 text-purple-400">
                <feature.icon className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-semibold mb-2 text-white">{feature.title}</h3>
              <p className="text-sm text-gray-400">{feature.description}</p>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
