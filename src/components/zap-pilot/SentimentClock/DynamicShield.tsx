'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Card } from '@/components/ui/Card';
import { SectionHeader } from '@/components/ui/SectionHeader';
import { REGIMES } from './shared';
import { cn } from '@/lib/utils';

interface GaugeProps {
    activeRegimeId: string;
    onRegimeChange: (id: string) => void;
}

export function DynamicShield({ activeRegimeId, onRegimeChange }: GaugeProps) {
    const activeRegime = REGIMES.find(r => r.id === activeRegimeId) || REGIMES[0];

    // Logic:
    // Fear -> Attack Mode (Thrusters UP, Shield DOWN) -> Buying
    // Greed -> Defense Mode (Thrusters DOWN, Shield UP) -> Selling/Safety

    const isAttack = ['ef', 'f'].includes(activeRegimeId);
    const isDefense = ['g', 'eg'].includes(activeRegimeId);

    // Shield Size (Defense)
    const shieldScale = isDefense ? 1.2 : isAttack ? 0.6 : 0.9;
    const shieldOpacity = isDefense ? 0.8 : isAttack ? 0.2 : 0.5;
    const shieldColor = isDefense ? '#3b82f6' : '#94a3b8'; // Blue vs Slate

    // Thruster Size (Offense)
    const thrusterScale = isAttack ? 1.5 : isDefense ? 0 : 0.8;
    const thrusterColor = isAttack ? '#ef4444' : '#f59e0b'; // Red vs Orange

    return (
        <section className="py-24 px-4 sm:px-6 lg:px-8 overflow-hidden">
            <div className="max-w-7xl mx-auto">
                <SectionHeader
                    title="The Dynamic"
                    highlight="Shield"
                    subtitle="Adjusting exposure based on market risk."
                />

                <div className="grid lg:grid-cols-2 gap-12 items-center">
                    {/* Animation Area */}
                    <div className="relative flex items-center justify-center w-full max-w-md mx-auto aspect-square">

                        {/* Background Grid */}
                        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-slate-800/20 to-transparent rounded-full" />

                        {/* Thrusters (Behind) */}
                        <motion.div
                            className="absolute inset-0 flex items-center justify-center"
                            animate={{ rotate: 360 }}
                            transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                        >
                            {[0, 90, 180, 270].map((angle) => (
                                <motion.div
                                    key={angle}
                                    className="absolute w-4 h-32 origin-bottom rounded-t-full blur-sm"
                                    style={{ rotate: angle, bottom: '50%' }}
                                    animate={{
                                        scaleY: thrusterScale,
                                        backgroundColor: thrusterColor,
                                        opacity: thrusterScale > 0 ? 1 : 0
                                    }}
                                    transition={{ type: "spring", stiffness: 50 }}
                                />
                            ))}
                        </motion.div>

                        {/* Shield (Middle) */}
                        <motion.div
                            className="absolute w-48 h-48 rounded-full border-4 border-white/20 backdrop-blur-sm z-10"
                            animate={{
                                scale: shieldScale,
                                backgroundColor: `${shieldColor}40`, // 25% opacity
                                borderColor: shieldColor,
                                boxShadow: `0 0 30px ${shieldColor}60`
                            }}
                            transition={{ type: "spring", stiffness: 60 }}
                        >
                            {/* Shield Pulse Effect */}
                            <motion.div
                                className="absolute inset-0 rounded-full border-2"
                                style={{ borderColor: shieldColor }}
                                animate={{ scale: [1, 1.1, 1], opacity: [0.5, 0, 0.5] }}
                                transition={{ duration: 2, repeat: Infinity }}
                            />
                        </motion.div>

                        {/* Pilot Core (Front) */}
                        <div className="relative z-20 w-24 h-24 bg-slate-900 rounded-full border-4 border-slate-700 flex items-center justify-center shadow-xl">
                            <svg className="w-12 h-12 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                            </svg>
                        </div>

                        {/* Mode Label */}
                        <div className="absolute bottom-10 text-center z-30">
                            <div className="text-xs uppercase tracking-widest text-slate-500 mb-1">Current Mode</div>
                            <motion.div
                                key={activeRegimeId}
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                className={cn("text-2xl font-bold", isAttack ? "text-red-500" : isDefense ? "text-blue-500" : "text-yellow-500")}
                            >
                                {isAttack ? 'ATTACK' : isDefense ? 'DEFENSE' : 'CRUISE'}
                            </motion.div>
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
                                <div className="text-xs uppercase tracking-widest text-slate-500 mb-2">Strategy</div>
                                <div className="text-lg font-mono text-white">
                                    {isAttack ? "Maximize Exposure (Long BTC/ETH)" : isDefense ? "Maximize Safety (Stablecoins)" : "Balanced Exposure"}
                                </div>
                            </div>
                        </Card>
                    </div>
                </div>
            </div>
        </section>
    );
}
