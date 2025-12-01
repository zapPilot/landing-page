'use client';

import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Card } from '@/components/ui/Card';
import { SectionHeader } from '@/components/ui/SectionHeader';
import { REGIMES } from './shared';
import { cn } from '@/lib/utils';

interface GaugeProps {
    activeRegimeId: string;
    onRegimeChange: (id: string) => void;
}

export function ContrarianOrbit({ activeRegimeId, onRegimeChange }: GaugeProps) {
    const activeRegime = REGIMES.find(r => r.id === activeRegimeId) || REGIMES[0];

    // Determine "Our Strategy" color based on Market Sentiment
    // Market Fear (Red) -> We are Greedy (Green)
    // Market Greed (Green) -> We are Fearful (Red/Stable)
    const getStrategyColor = (id: string) => {
        switch (id) {
            case 'ef': return '#22c55e'; // Green (Buying)
            case 'f': return '#84cc16';  // Lime
            case 'n': return '#eab308';  // Yellow
            case 'g': return '#f97316';  // Orange
            case 'eg': return '#ef4444'; // Red (Selling)
            default: return '#eab308';
        }
    };

    const strategyColor = getStrategyColor(activeRegimeId);
    const isBuying = ['ef', 'f'].includes(activeRegimeId);
    const isSelling = ['g', 'eg'].includes(activeRegimeId);

    return (
        <section className="py-24 px-4 sm:px-6 lg:px-8 overflow-hidden">
            <div className="max-w-7xl mx-auto">
                <SectionHeader
                    title="The Contrarian"
                    highlight="Orbit"
                    subtitle="Be greedy when others are fearful."
                />

                <div className="grid lg:grid-cols-2 gap-12 items-center">
                    {/* Animation Area */}
                    <div className="relative flex items-center justify-center w-full max-w-md mx-auto aspect-square">

                        {/* Outer Ring: Market Sentiment */}
                        <div className="absolute inset-0 rounded-full border-4 border-slate-800/50 flex items-center justify-center">
                            {/* Segments */}
                            {REGIMES.map((r, i) => {
                                const angle = (i / REGIMES.length) * 360;
                                const isActive = r.id === activeRegimeId;
                                return (
                                    <motion.div
                                        key={r.id}
                                        className="absolute w-full h-full pointer-events-none"
                                        style={{ rotate: angle }}
                                    >
                                        <div
                                            className={cn(
                                                "absolute top-0 left-1/2 -translate-x-1/2 w-4 h-8 rounded-full transition-all duration-500",
                                                isActive ? "scale-150 shadow-[0_0_20px_currentColor]" : "opacity-30 scale-90"
                                            )}
                                            style={{ backgroundColor: r.fill, color: r.fill }}
                                        />
                                    </motion.div>
                                )
                            })}
                        </div>

                        {/* Particle Flow Layer */}
                        <div className="absolute inset-0 pointer-events-none">
                            {/* Simulated Particles */}
                            <AnimatePresence>
                                {isBuying && (
                                    <motion.div
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: 1 }}
                                        exit={{ opacity: 0 }}
                                        className="absolute inset-0"
                                    >
                                        {[...Array(12)].map((_, i) => (
                                            <motion.div
                                                key={`in-${i}`}
                                                className="absolute top-1/2 left-1/2 w-2 h-2 bg-green-400 rounded-full"
                                                animate={{
                                                    x: [Math.cos(i * 30 * Math.PI / 180) * 150, 0],
                                                    y: [Math.sin(i * 30 * Math.PI / 180) * 150, 0],
                                                    opacity: [0, 1, 0],
                                                    scale: [0.5, 1, 0]
                                                }}
                                                transition={{
                                                    duration: 2,
                                                    repeat: Infinity,
                                                    delay: i * 0.1,
                                                    ease: "easeIn"
                                                }}
                                            />
                                        ))}
                                    </motion.div>
                                )}
                                {isSelling && (
                                    <motion.div
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: 1 }}
                                        exit={{ opacity: 0 }}
                                        className="absolute inset-0"
                                    >
                                        {[...Array(12)].map((_, i) => (
                                            <motion.div
                                                key={`out-${i}`}
                                                className="absolute top-1/2 left-1/2 w-2 h-2 bg-red-400 rounded-full"
                                                animate={{
                                                    x: [0, Math.cos(i * 30 * Math.PI / 180) * 150],
                                                    y: [0, Math.sin(i * 30 * Math.PI / 180) * 150],
                                                    opacity: [1, 0],
                                                    scale: [1, 0.5]
                                                }}
                                                transition={{
                                                    duration: 2,
                                                    repeat: Infinity,
                                                    delay: i * 0.1,
                                                    ease: "easeOut"
                                                }}
                                            />
                                        ))}
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </div>

                        {/* Inner Core: Our Strategy */}
                        <motion.div
                            className="relative z-10 w-48 h-48 rounded-full flex items-center justify-center shadow-2xl border-4 border-slate-900"
                            animate={{
                                backgroundColor: strategyColor,
                                boxShadow: `0 0 50px ${strategyColor}40`
                            }}
                        >
                            <div className="text-center text-slate-900 font-bold">
                                <div className="text-xs uppercase tracking-widest opacity-70 mb-1">We Are</div>
                                <div className="text-2xl uppercase">
                                    {isBuying ? 'Greedy' : isSelling ? 'Fearful' : 'Neutral'}
                                </div>
                            </div>
                        </motion.div>

                        {/* Interactive Overlay for Selection */}
                        <div className="absolute inset-0 z-20">
                            {REGIMES.map((r, i) => {
                                const angle = (i / REGIMES.length) * 360; // 0 is top
                                // We need to place clickable areas around the circle
                                // This is a bit tricky with pure CSS, simpler to just use the existing buttons or a separate control
                                // For now, let's just replicate the buttons below or use a simple overlay
                                return null;
                            })}
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
                                <div className="text-lg font-mono text-green-400">
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
