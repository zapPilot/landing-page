'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { SectionHeader } from '@/components/ui';
import { ANIMATIONS } from '@/lib/constants';

interface Regime {
  id: 'ef' | 'f' | 'n' | 'g' | 'eg';
  label: string;
  range: string;
  fearGreedIndex: [number, number];
  allocation: {
    crypto: number;
    stable: number;
  };
  color: string;
  bgColor: string;
  fillColor: string; // SVG fill color (hex)
  emotionalState: string;
  actions: string[];
  philosophy: string;
  whyThisWorks: string;
}

const regimes: Regime[] = [
  {
    id: 'ef',
    label: 'Extreme Fear',
    range: '0-25',
    fearGreedIndex: [0, 25],
    allocation: { crypto: 70, stable: 30 },
    color: 'text-red-500',
    bgColor: 'bg-red-500',
    fillColor: '#ef4444', // red-500
    emotionalState: 'Maximum Pessimism',
    actions: [
      'DCA into BTC/ETH using only your stables',
      'Prioritize debt repayment if LTV rises',
      'No new leverage during this cycle',
    ],
    philosophy: '"Be greedy when others are fearful"',
    whyThisWorks: 'Historical crypto bottoms occur during extreme fear. Value-buying without leverage minimizes risk while maximizing long-term upside.',
  },
  {
    id: 'f',
    label: 'Fear',
    range: '26-45',
    fearGreedIndex: [26, 45],
    allocation: { crypto: 60, stable: 40 },
    color: 'text-orange-500',
    bgColor: 'bg-orange-500',
    fillColor: '#f97316', // orange-500
    emotionalState: 'Elevated Caution',
    actions: [
      'Small probe entries with light DCA',
      'Partial BTC/ETH-USD LP positions',
      'Take profits if borrowing rates spike',
    ],
    philosophy: '"Prepare for second leg down"',
    whyThisWorks: 'Markets often retest lows. LP positions act as a midway zone—if market drops to Extreme Fear, you can unwind LP to buy spot.',
  },
  {
    id: 'n',
    label: 'Neutral',
    range: '46-54',
    fearGreedIndex: [46, 54],
    allocation: { crypto: 50, stable: 50 },
    color: 'text-yellow-500',
    bgColor: 'bg-yellow-500',
    fillColor: '#eab308', // yellow-500
    emotionalState: 'Balanced Sentiment',
    actions: [
      'Holiday mode—minimal activity',
      'Light rebalancing only if allocation drifts',
      'Maintain current positions',
    ],
    philosophy: '"Inactivity is a valid strategy"',
    whyThisWorks: 'When markets lack clear direction, the best move is often no move. Preserve capital and wait for clearer signals at extremes.',
  },
  {
    id: 'g',
    label: 'Greed',
    range: '55-75',
    fearGreedIndex: [55, 75],
    allocation: { crypto: 40, stable: 60 },
    color: 'text-lime-500',
    bgColor: 'bg-lime-500',
    fillColor: '#84cc16', // lime-500
    emotionalState: 'Rising Optimism',
    actions: [
      'Gradually shift spot BTC/ETH into LP positions',
      'DCA-sell if coming from Neutral',
      'Avoid new purchases unless from higher regime',
    ],
    philosophy: '"Glide from beta to stable"',
    whyThisWorks: 'Soft profit-taking via LP positions lets you lock gains while earning fees and retaining some upside exposure.',
  },
  {
    id: 'eg',
    label: 'Extreme Greed',
    range: '76-100',
    fearGreedIndex: [76, 100],
    allocation: { crypto: 30, stable: 70 },
    color: 'text-green-500',
    bgColor: 'bg-green-500',
    fillColor: '#22c55e', // green-500
    emotionalState: 'Peak Euphoria',
    actions: [
      'DCA-sell excess BTC/ETH into stables',
      'Retain small beta via token-USD LPs',
      'Move stables to conservative yields (perp vaults, stable pools)',
    ],
    philosophy: '"How much am I willing to lose?"',
    whyThisWorks: 'Market tops coincide with extreme greed. Shifting focus from gains to downside protection preserves wealth during inevitable corrections.',
  },
];

export default function SentimentClock() {
  const [activeRegime, setActiveRegime] = useState<Regime['id']>('ef');

  const active = regimes.find((r) => r.id === activeRegime) || regimes[0];

  // Calculate SVG path for each segment (72° each = 360°/5)
  const createSegmentPath = (index: number) => {
    const cx = 300; // center x
    const cy = 300; // center y
    const radius = 250;
    const startAngle = (index * 72 - 90) * (Math.PI / 180); // Start at top (-90°)
    const endAngle = ((index + 1) * 72 - 90) * (Math.PI / 180);

    const x1 = cx + radius * Math.cos(startAngle);
    const y1 = cy + radius * Math.sin(startAngle);
    const x2 = cx + radius * Math.cos(endAngle);
    const y2 = cy + radius * Math.sin(endAngle);

    return `M ${cx} ${cy} L ${x1} ${y1} A ${radius} ${radius} 0 0 1 ${x2} ${y2} Z`;
  };

  return (
    <section className="py-24 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <SectionHeader
          title="The Sentiment "
          highlight="Clock"
          subtitle="5 regimes based on market emotion—not price predictions"
        />

        <div className="grid lg:grid-cols-[55%_45%] gap-12 items-start">
          {/* Clock Visualization */}
          <motion.div
            initial={ANIMATIONS.fadeInUp.initial}
            whileInView={ANIMATIONS.fadeInUp.animate}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="flex justify-center"
          >
            <svg
              viewBox="0 0 600 600"
              className="w-full max-w-[600px] h-auto"
              role="img"
              aria-label="Interactive sentiment regime selector"
            >
              {regimes.map((regime, index) => (
                <g key={regime.id}>
                  <motion.path
                    d={createSegmentPath(index)}
                    className="cursor-pointer transition-all duration-300"
                    style={{
                      fill: regime.fillColor,
                      opacity: activeRegime === regime.id ? 1 : 0.4,
                    }}
                    onClick={() => setActiveRegime(regime.id)}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter') setActiveRegime(regime.id);
                    }}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: activeRegime === regime.id ? 1 : 0.4 }}
                    transition={{ duration: 0.3 }}
                    tabIndex={0}
                    role="button"
                    aria-label={`${regime.label} regime (${regime.range})`}
                  />

                  {/* Pulsing border on active */}
                  {activeRegime === regime.id && (
                    <motion.path
                      d={createSegmentPath(index)}
                      className="pointer-events-none"
                      style={{
                        fill: 'none',
                        stroke: regime.fillColor,
                      }}
                      strokeWidth="4"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: [0.3, 0.7, 0.3] }}
                      transition={{ duration: 2, repeat: Infinity }}
                    />
                  )}

                  {/* Label */}
                  <text
                    x={300 + 180 * Math.cos(((index * 72 + 36) - 90) * (Math.PI / 180))}
                    y={300 + 180 * Math.sin(((index * 72 + 36) - 90) * (Math.PI / 180))}
                    textAnchor="middle"
                    className="pointer-events-none select-none"
                    dominantBaseline="middle"
                    style={{ fill: 'white', fontSize: '14px', fontWeight: 600 }}
                  >
                    {regime.label}
                  </text>
                  <text
                    x={300 + 200 * Math.cos(((index * 72 + 36) - 90) * (Math.PI / 180))}
                    y={300 + 200 * Math.sin(((index * 72 + 36) - 90) * (Math.PI / 180))}
                    textAnchor="middle"
                    className="pointer-events-none select-none"
                    dominantBaseline="middle"
                    style={{ fill: '#9ca3af', fontSize: '12px' }}
                  >
                    {regime.range}
                  </text>
                </g>
              ))}

              {/* Center circle */}
              <circle cx="300" cy="300" r="80" style={{ fill: '#111827', stroke: '#374151' }} strokeWidth="2" />
              <text x="300" y="290" textAnchor="middle" style={{ fill: 'white', fontSize: '12px', fontWeight: 500 }}>
                Fear & Greed
              </text>
              <text x="300" y="315" textAnchor="middle" style={{ fill: 'white', fontSize: '24px', fontWeight: 700 }}>
                {active.fearGreedIndex[0]}-{active.fearGreedIndex[1]}
              </text>
            </svg>
          </motion.div>

          {/* Details Panel */}
          <AnimatePresence mode="wait">
            <motion.div
              key={activeRegime}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.4 }}
              className="bg-gray-900/50 backdrop-blur-lg border border-gray-800 rounded-2xl p-8"
            >
              <div className="flex items-center gap-3 mb-4">
                <div className={`w-4 h-4 rounded-full ${active.bgColor}`} />
                <h3 className="text-2xl font-bold">{active.label}</h3>
              </div>

              <div className="mb-6">
                <div className="flex items-baseline gap-2 mb-2">
                  <span className={`text-4xl font-bold ${active.color}`}>
                    {active.allocation.crypto}%
                  </span>
                  <span className="text-gray-400">crypto</span>
                  <span className="text-gray-600 mx-2">/</span>
                  <span className={`text-4xl font-bold ${active.color}`}>
                    {active.allocation.stable}%
                  </span>
                  <span className="text-gray-400">stable</span>
                </div>
                <p className="text-sm text-gray-500 italic">{active.author}</p>
              </div>

              <div className="mb-6">
                <p className={`text-lg italic ${active.color} mb-4`}>{active.philosophy}</p>
              </div>

              <div className="mb-6">
                <h4 className="text-sm font-semibold text-gray-400 mb-3">ACTIONS</h4>
                <ul className="space-y-2">
                  {active.actions.map((action, idx) => (
                    <li key={idx} className="flex items-start gap-2">
                      <span className={`mt-1 w-1.5 h-1.5 rounded-full ${active.bgColor} flex-shrink-0`} />
                      <span className="text-sm text-gray-300">{action}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="pt-6 border-t border-gray-800">
                <h4 className="text-sm font-semibold text-gray-400 mb-2">WHY THIS WORKS</h4>
                <p className="text-sm text-gray-400">{active.whyThisWorks}</p>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Keyboard hint */}
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 1 }}
          viewport={{ once: true }}
          className="text-center text-sm text-gray-600 mt-8"
        >
          Click segments to explore • Keyboard accessible with Tab and Enter
        </motion.p>
      </div>
    </section>
  );
}
