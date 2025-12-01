'use client';

import { SectionHeader } from '@/components/ui/SectionHeader';
import { ShieldCheck, Lock, TrendingDown, AlertTriangle, CheckCircle2 } from 'lucide-react';

export function Philosophy() {
  const principles = [
    {
      icon: Lock,
      title: "Total Self-Custody",
      content: "We never have access to your funds. You connect, you sign, you stay in control. No deposit contracts, no pooled assets."
    },
    {
      icon: ShieldCheck,
      title: "Debt Repayment Priority",
      content: "If your LTV rises near risk limits during Extreme Fear, our engine prioritizes debt repayment over buying. Survival > Profit."
    },
    {
      icon: TrendingDown,
      title: "No Over-Leverage",
      content: "We strictly advise against opening new leverage during Extreme Fear. We help you deleverage when rates spike."
    },
    {
      icon: AlertTriangle,
      title: "Stable-Only DCA",
      content: "During Extreme Fear, we suggest DCAing into BTC/ETH using only your own stables. No borrowing to catch a falling knife."
    }
  ];

  return (
    <section className="py-24 px-4 sm:px-6 lg:px-8 bg-gray-900/30">
      <div className="max-w-7xl mx-auto">
        <SectionHeader 
          title="Risk" 
          highlight="Philosophy"
          subtitle="Rational rules designed to protect capital during volatility."
        />

        <div className="grid md:grid-cols-2 gap-12 items-start">
          {/* Left Column: Core Principles Grid */}
          <div className="grid sm:grid-cols-2 gap-6">
            {principles.map((item, index) => (
              <div key={index} className="bg-gray-800/40 p-6 rounded-2xl border border-gray-700/50 hover:border-purple-500/30 transition-colors">
                <div className="inline-flex p-3 rounded-lg bg-gray-800 mb-4 text-purple-400">
                  <item.icon className="w-6 h-6" />
                </div>
                <h3 className="text-lg font-bold text-white mb-2">{item.title}</h3>
                <p className="text-sm text-gray-400 leading-relaxed">
                  {item.content}
                </p>
              </div>
            ))}
          </div>

          {/* Right Column: The "No" List */}
          <div className="bg-gray-800/20 p-8 rounded-3xl border border-gray-800">
            <h3 className="text-2xl font-bold text-white mb-6">What We <span className="text-red-400">Don't</span> Do</h3>
            
            <div className="space-y-6">
              <div className="flex items-start">
                <div className="w-6 h-6 rounded-full bg-red-500/10 flex items-center justify-center mt-1 mr-4 flex-shrink-0">
                  <span className="text-red-500 font-bold text-sm">✕</span>
                </div>
                <div>
                  <h4 className="font-semibold text-gray-200">No Auto-Trading</h4>
                  <p className="text-sm text-gray-400 mt-1">We cannot move your funds without your explicit signature for each transaction.</p>
                </div>
              </div>

              <div className="flex items-start">
                <div className="w-6 h-6 rounded-full bg-red-500/10 flex items-center justify-center mt-1 mr-4 flex-shrink-0">
                  <span className="text-red-500 font-bold text-sm">✕</span>
                </div>
                <div>
                  <h4 className="font-semibold text-gray-200">No Hidden Custody</h4>
                  <p className="text-sm text-gray-400 mt-1">Zap Pilot is not a fund. It's a calculator that outputs transaction data for you to sign.</p>
                </div>
              </div>

              <div className="flex items-start">
                <div className="w-6 h-6 rounded-full bg-red-500/10 flex items-center justify-center mt-1 mr-4 flex-shrink-0">
                  <span className="text-red-500 font-bold text-sm">✕</span>
                </div>
                <div>
                  <h4 className="font-semibold text-gray-200">No Black Box Strategy</h4>
                  <p className="text-sm text-gray-400 mt-1">The Sentiment Clock rules are transparent. You know exactly why a rebalance is suggested.</p>
                </div>
              </div>
            </div>

            <div className="mt-8 pt-8 border-t border-gray-700">
               <div className="flex items-center">
                  <CheckCircle2 className="w-5 h-5 text-green-500 mr-2" />
                  <span className="text-green-400 font-medium">Audited Smart Contracts (Coming Soon)</span>
               </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
