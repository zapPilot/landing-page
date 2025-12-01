'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { SectionHeader } from '@/components/ui/SectionHeader';
import { Card } from '@/components/ui/Card';
import { cn } from '@/lib/utils';

interface Regime {
  id: string;
  label: string;
  range: string;
  allocation: string;
  color: string;
  fill: string;
  activeFill: string;
  actions: string[];
  philosophy: string;
}

const REGIMES: Regime[] = [
  {
    id: 'ef',
    label: 'Extreme Fear',
    range: '0-25',
    allocation: '70% Crypto / 30% Stable',
    color: 'text-red-500',
    fill: '#ef4444', // red-500
    activeFill: '#dc2626', // red-600
    actions: [
      'DCA into BTC/ETH with stables',
      'Prioritize debt repayment if LTV rises',
      'No new leverage'
    ],
    philosophy: 'Value-buying BTC/ETH only. Rational greed during irrational fear.'
  },
  {
    id: 'f',
    label: 'Fear',
    range: '26-45',
    allocation: '60% Crypto / 40% Stable',
    color: 'text-orange-500',
    fill: '#f97316', // orange-500
    activeFill: '#ea580c', // orange-600
    actions: [
      'Small "probe entries" (light DCA)',
      'Partial LP deployment acting as "midway zone"',
      'Take profits on leverage if rates spike'
    ],
    philosophy: 'Half-step entries; prepare for possible "second leg down."'
  },
  {
    id: 'n',
    label: 'Neutral',
    range: '46-54',
    allocation: '50% Crypto / 50% Stable',
    color: 'text-yellow-500',
    fill: '#eab308', // yellow-500
    activeFill: '#ca8a04', // yellow-600
    actions: [
      '"Holiday mode": minimal activity',
      'Light rebalancing only',
      'Deleverage if borrowing rates hit threshold'
    ],
    philosophy: 'When the market is normal, inactivity is a valid strategy.'
  },
  {
    id: 'g',
    label: 'Greed',
    range: '55-75',
    allocation: '40% Crypto / 60% Stable',
    color: 'text-lime-500',
    fill: '#84cc16', // lime-500
    activeFill: '#65a30d', // lime-600
    actions: [
      'Shift spot BTC/ETH into BTC/ETH–USD LP',
      'Softly lock in gains',
      'Earn fees while retaining beta'
    ],
    philosophy: 'Not a full exit — a soft glide from "spot → LP → stables."'
  },
  {
    id: 'eg',
    label: 'Extreme Greed',
    range: '76-100',
    allocation: '30% Crypto / 70% Stable',
    color: 'text-green-500',
    fill: '#22c55e', // green-500
    activeFill: '#16a34a', // green-600
    actions: [
      'DCA-sell excess BTC/ETH into stables',
      'Move stables into conservative vaults',
      'Retain small "residual beta" only'
    ],
    philosophy: 'Shift from "how much more can I gain?" to "how much am I willing to lose?"'
  }
];

export function SentimentClock() {
  const [activeRegimeId, setActiveRegimeId] = useState<string>('ef');

  // SVG dimensions and layout constants
  const VIEWBOX_DIM = 400;
  const CLOCK_RADIUS = VIEWBOX_DIM / 2 - 20;
  const INNER_CIRCLE_RADIUS = CLOCK_RADIUS * 0.4;
  const CLOCK_CENTER_X = VIEWBOX_DIM / 2;
  const CLOCK_CENTER_Y = VIEWBOX_DIM / 2;

  // Helper function to convert polar coordinates to Cartesian for SVG
  const polarToCartesian = (centerX: number, centerY: number, radius: number, angleInDegrees: number) => {
    const angleInRadians = (angleInDegrees - 90) * Math.PI / 180.0;
    return {
      x: centerX + (radius * Math.cos(angleInRadians)),
      y: centerY + (radius * Math.sin(angleInRadians))
    };
  };

  // Function to generate an SVG path for a pie slice segment
  const getPieSlicePath = (
    cx: number, cy: number, radius: number,
    startAngleDegrees: number, endAngleDegrees: number
  ): string => {
    const start = polarToCartesian(cx, cy, radius, startAngleDegrees);
    const end = polarToCartesian(cx, cy, radius, endAngleDegrees);

    const largeArcFlag = endAngleDegrees - startAngleDegrees <= 180 ? 0 : 1;
    const sweepFlag = 1; // Clockwise arc

    return [
      `M ${cx} ${cy}`,
      `L ${start.x} ${start.y}`,
      `A ${radius} ${radius} 0 ${largeArcFlag} ${sweepFlag} ${end.x} ${end.y}`,
      `Z`
    ].join(' ');
  };

  const TOTAL_ARC_DEGREES = 260;
  const START_ANGLE = -130;
  const segmentAngle = TOTAL_ARC_DEGREES / REGIMES.length;
  const initialSegmentStartAngle = START_ANGLE;

  const activeRegime = REGIMES.find(r => r.id === activeRegimeId) || REGIMES[0];

  return (
    <section className="py-24 px-4 sm:px-6 lg:px-8 overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <SectionHeader
          title="The Sentiment"
          highlight="Clock"
          subtitle="A 5-phase strategy cycle based on market regime."
        />

        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Interactive Clock */}
          <div className="relative flex items-center justify-center w-full max-w-md mx-auto aspect-square">
            {/* Background Glow */}
            <div className="absolute inset-0 bg-purple-500/10 rounded-full blur-3xl -z-10" />

            <motion.svg
              viewBox={`0 0 ${VIEWBOX_DIM} ${VIEWBOX_DIM}`}
              className="w-full h-full drop-shadow-2xl"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
            >
              {REGIMES.map((regime, i) => {
                const startAngle = initialSegmentStartAngle + i * segmentAngle;
                const endAngle = startAngle + segmentAngle;
                const path = getPieSlicePath(CLOCK_CENTER_X, CLOCK_CENTER_Y, CLOCK_RADIUS, startAngle, endAngle);

                // Label position calculation (midpoint of arc)
                const midAngle = (startAngle + endAngle) / 2;
                const labelRadius = CLOCK_RADIUS * 0.7;
                const labelPos = polarToCartesian(CLOCK_CENTER_X, CLOCK_CENTER_Y, labelRadius, midAngle);

                const isActive = activeRegimeId === regime.id;

                return (
                  <motion.g
                    key={regime.id}
                    className="cursor-pointer"
                    onClick={() => setActiveRegimeId(regime.id)}
                    whileHover={{ scale: 1.02, zIndex: 10 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <motion.path
                      d={path}
                      fill={isActive ? regime.activeFill : regime.fill}
                      stroke="rgba(0,0,0,0.3)"
                      strokeWidth="2"
                      initial={false}
                      animate={{
                        fill: isActive ? regime.activeFill : regime.fill,
                        scale: isActive ? 1.05 : 1
                      }}
                      style={{ originX: '50%', originY: '50%' }} // Ensure scaling happens from center
                      transition={{ duration: 0.3 }}
                    />
                    <text
                      x={labelPos.x}
                      y={labelPos.y}
                      textAnchor="middle"
                      alignmentBaseline="middle"
                      fill="white"
                      className="text-xs sm:text-sm font-bold pointer-events-none drop-shadow-md uppercase tracking-wider"
                    >
                      {regime.label.split(' ')[0]} {/* Show shortened label on slice if needed, or full label */}
                    </text>
                  </motion.g>
                );
              })}

              {/* Inner circle mask/background for center content */}
              <circle
                cx={CLOCK_CENTER_X}
                cy={CLOCK_CENTER_Y}
                r={INNER_CIRCLE_RADIUS}
                fill="#0f172a" // slate-900 matches typical bg
                stroke="#1e293b" // slate-800
                strokeWidth="4"
              />

              {/* Needle Indicator */}
              <g transform={`translate(${CLOCK_CENTER_X}, ${CLOCK_CENTER_Y})`}>
                <motion.g
                  initial={false}
                  animate={{ rotate: initialSegmentStartAngle + (REGIMES.findIndex(r => r.id === activeRegimeId) * segmentAngle) + (segmentAngle / 2) }}
                  transition={{ type: "spring", stiffness: 60, damping: 12, mass: 0.8 }}
                >
                  {/* Invisible rect to force center pivot at 0,0 */}
                  <rect x="-130" y="-130" width="260" height="260" fill="none" />

                  {/* Needle Shape - pointing up (0 degrees) */}
                  <path
                    d="M 0 -10 L 0 -130"
                    stroke="white"
                    strokeWidth="4"
                    strokeLinecap="round"
                    className="drop-shadow-md"
                  />
                  <circle r="8" fill="white" />
                  <path
                    d="M -6 0 L 0 -120 L 6 0 Z"
                    fill="white"
                  />
                </motion.g>
              </g>
            </motion.svg>

            {/* Center Indicator Content (HTML Overlay) */}
            <div
              className="absolute flex flex-col items-center justify-center text-center p-4 pointer-events-none z-20"
              style={{
                width: `${(INNER_CIRCLE_RADIUS / VIEWBOX_DIM) * 100 * 2}%`,
                height: `${(INNER_CIRCLE_RADIUS / VIEWBOX_DIM) * 100 * 2}%`,
              }}
            >
              <AnimatePresence mode='wait'>
                <motion.div
                  key={activeRegimeId}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.2 }}
                  className="flex flex-col items-center"
                >
                  <span className={cn("text-2xl sm:text-3xl font-bold mb-1", activeRegime.color)}>
                    {activeRegime.range}
                  </span>
                  <span className="text-[10px] sm:text-xs text-gray-400 uppercase tracking-widest font-medium">
                    Index Score
                  </span>
                </motion.div>
              </AnimatePresence>
            </div>
          </div>

          {/* Details Panel */}
          <div className="min-h-[400px]">
            <AnimatePresence mode='wait'>
              <motion.div
                key={activeRegime.id}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3 }}
              >
                <Card variant="default" className="h-full border-l-4 relative overflow-hidden" style={{ borderLeftColor: activeRegime.fill }}>
                  {/* Background subtle gradient matching active color */}
                  <div
                    className="absolute top-0 right-0 w-64 h-64 opacity-5 rounded-full blur-3xl -mr-16 -mt-16 pointer-events-none"
                    style={{ backgroundColor: activeRegime.fill }}
                  />

                  <div className={activeRegime.color}>
                    <h3 className="text-3xl font-bold mb-2">{activeRegime.label}</h3>
                    <div className="text-lg font-mono mb-6 opacity-90 bg-gray-800/50 inline-block px-3 py-1 rounded-md border border-gray-700/50">
                      {activeRegime.allocation}
                    </div>
                  </div>

                  <div className="space-y-8 relative z-10">
                    <div>
                      <h4 className="text-gray-400 text-xs uppercase tracking-widest mb-3 font-bold flex items-center">
                        <span className="w-8 h-[1px] bg-gray-600 mr-2"></span>
                        Philosophy
                      </h4>
                      <p className="text-xl text-gray-200 italic leading-relaxed">"{activeRegime.philosophy}"</p>
                    </div>

                    <div>
                      <h4 className="text-gray-400 text-xs uppercase tracking-widest mb-3 font-bold flex items-center">
                        <span className="w-8 h-[1px] bg-gray-600 mr-2"></span>
                        Key Actions
                      </h4>
                      <ul className="space-y-3">
                        {activeRegime.actions.map((action, i) => (
                          <li key={i} className="flex items-start text-gray-300 group">
                            <span
                              className="mr-3 mt-2 w-1.5 h-1.5 rounded-full flex-shrink-0 transition-all group-hover:scale-150"
                              style={{ backgroundColor: activeRegime.fill }}
                            />
                            <span className="group-hover:text-white transition-colors">{action}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </Card>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
}
