'use client';

import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Card } from '@/components/ui/Card';
import { SectionHeader } from '@/components/ui/SectionHeader';
import { REGIMES } from './shared';
import { cn } from '@/lib/utils';

interface GaugeProps {
    activeRegimeId: string;
    onRegimeChange: (id: string) => void;
}

export function AssetMixer({ activeRegimeId, onRegimeChange }: GaugeProps) {
    const activeRegime = REGIMES.find(r => r.id === activeRegimeId) || REGIMES[0];

    // Logic for flow direction and tank levels
    const isBuying = ['ef', 'f'].includes(activeRegimeId); // Stable -> Token
    const isSelling = ['g', 'eg'].includes(activeRegimeId); // Token -> Stable
    const isNeutral = activeRegimeId === 'n'; // Token -> LP

    // Tank Levels (Simulated)
    const stableLevel = isBuying ? '30%' : isSelling ? '80%' : '50%';
    const tokenLevel = isBuying ? '70%' : isSelling ? '20%' : '50%';
    const lpLevel = isNeutral ? '60%' : '30%';

    return (
        <section className="py-24 px-4 sm:px-6 lg:px-8 overflow-hidden">
            <div className="max-w-7xl mx-auto">
                <SectionHeader
                    title="The Asset"
                    highlight="Mixer"
                    subtitle="Dynamic capital allocation based on market conditions."
                />

                <div className="grid lg:grid-cols-2 gap-12 items-center">
                    {/* Animation Area */}
                    <div className="relative w-full max-w-md mx-auto aspect-square bg-slate-900/50 rounded-xl border border-slate-800 p-8 flex flex-col justify-between">

                        {/* Tanks Container */}
                        <div className="flex justify-between items-end h-48 relative z-10">
                            {/* Stable Tank */}
                            <div className="w-20 h-full bg-slate-800 rounded-lg border-2 border-slate-600 relative overflow-hidden flex flex-col justify-end">
                                <motion.div
                                    className="w-full bg-blue-500/80"
                                    animate={{ height: stableLevel }}
                                    transition={{ duration: 1, type: "spring" }}
                                />
                                <div className="absolute bottom-2 w-full text-center text-xs font-bold text-white drop-shadow-md">STABLE</div>
                            </div>

                            {/* LP Tank (Middle, slightly lower) */}
                            <div className="w-20 h-32 bg-slate-800 rounded-lg border-2 border-slate-600 relative overflow-hidden flex flex-col justify-end mb-8">
                                <motion.div
                                    className="w-full bg-purple-500/80"
                                    animate={{ height: lpLevel }}
                                    transition={{ duration: 1, type: "spring" }}
                                />
                                <div className="absolute bottom-2 w-full text-center text-xs font-bold text-white drop-shadow-md">LP</div>
                            </div>

                            {/* Token Tank */}
                            <div className="w-20 h-full bg-slate-800 rounded-lg border-2 border-slate-600 relative overflow-hidden flex flex-col justify-end">
                                <motion.div
                                    className="w-full bg-orange-500/80"
                                    animate={{ height: tokenLevel }}
                                    transition={{ duration: 1, type: "spring" }}
                                />
                                <div className="absolute bottom-2 w-full text-center text-xs font-bold text-white drop-shadow-md">TOKEN</div>
                            </div>
                        </div>

                        {/* Pipes & Flow (SVG Overlay) */}
                        <svg className="absolute inset-0 w-full h-full pointer-events-none z-0">
                            <defs>
                                <linearGradient id="flowGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                                    <stop offset="0%" stopColor="#3b82f6" stopOpacity="0" />
                                    <stop offset="50%" stopColor="#ffffff" stopOpacity="1" />
                                    <stop offset="100%" stopColor="#3b82f6" stopOpacity="0" />
                                </linearGradient>
                            </defs>

                            {/* Pipe: Stable <-> Token */}
                            <path d="M 80 100 Q 200 50 320 100" stroke="#334155" strokeWidth="8" fill="none" />

                            {/* Pipe: Token -> LP */}
                            <path d="M 320 150 Q 200 200 200 250" stroke="#334155" strokeWidth="8" fill="none" />

                            {/* Active Flow Animations */}
                            <AnimatePresence>
                                {isBuying && (
                                    <motion.circle
                                        r="6"
                                        fill="#3b82f6"
                                        initial={{ offsetDistance: "0%" }}
                                        animate={{ offsetDistance: "100%" }}
                                        transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
                                        style={{ offsetPath: "path('M 80 100 Q 200 50 320 100')" }}
                                    />
                                )}
                                {isSelling && (
                                    <motion.circle
                                        r="6"
                                        fill="#f97316"
                                        initial={{ offsetDistance: "100%" }}
                                        animate={{ offsetDistance: "0%" }}
                                        transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
                                        style={{ offsetPath: "path('M 80 100 Q 200 50 320 100')" }}
                                    />
                                )}
                                {isNeutral && (
                                    <motion.circle
                                        r="6"
                                        fill="#a855f7"
                                        initial={{ offsetDistance: "0%" }}
                                        animate={{ offsetDistance: "100%" }}
                                        transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
                                        style={{ offsetPath: "path('M 320 150 Q 200 200 200 250')" }} // Token to LP
                                    />
                                )}
                            </AnimatePresence>
                        </svg>

                        {/* Status Text */}
                        <div className="text-center mt-4">
                            <div className="text-sm text-slate-400 uppercase tracking-widest">Current Strategy</div>
                            <div className={cn("text-2xl font-bold", activeRegime.color)}>
                                {isBuying ? 'ACCUMULATE' : isSelling ? 'DISTRIBUTE' : 'YIELD FARM'}
                            </div>
                        </div>

                    </div>

                    {/* Controls / Details */}
                    <div className="space-y-6">
                        <div className="flex flex-wrap gap-2 justify-center lg:justify-start">
                            {REGIMES.map(r => (
                                <button
                                    key={r.id}
                                    onClick={() => onRegimeChange(r.id)}
                                    className={cn(
                                        "px-4 py-2 rounded-full text-sm font-bold transition-all border",
                                        activeRegimeId === r.id
                                            ? "bg-slate-800 border-slate-600 text-white shadow-lg scale-105"
                                            : "bg-transparent border-slate-800 text-slate-500 hover:border-slate-600"
                                    )}
                                    style={{ borderColor: activeRegimeId === r.id ? r.fill : undefined }}
                                >
                                    {r.label}
                                </button>
                            ))}
                        </div>

                        <Card className="p-6 border-l-4" style={{ borderLeftColor: activeRegime.fill }}>
                            <h3 className="text-xl font-bold mb-2 text-white">Market is {activeRegime.label}</h3>
                            <p className="text-slate-400 mb-4">{activeRegime.philosophy}</p>
                            <div className="p-4 bg-slate-800/50 rounded-lg border border-slate-700">
                                <div className="text-xs uppercase tracking-widest text-slate-500 mb-2">Our Action</div>
                                <div className="text-lg font-mono text-blue-400">
                                    {activeRegime.actions[0]}
                                </div>
                            </div>
                        </Card>
                    </div>
                </div>
            </div>
        </section>
    );
}
