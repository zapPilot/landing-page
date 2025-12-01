'use client';

import React, { useState } from 'react';
import { Gauge } from './Gauge';
import { ContrarianOrbit } from './ContrarianOrbit';
import { AssetMixer } from './AssetMixer';
import { DynamicShield } from './DynamicShield';
import { cn } from '@/lib/utils';

type Variation = 'gauge' | 'orbit' | 'mixer' | 'shield';

export function SentimentClock() {
    const [activeRegimeId, setActiveRegimeId] = useState<string>('ef');
    const [variation, setVariation] = useState<Variation>('gauge');

    return (
        <div className="relative">
            {/* Variation Selector - Floating Top Right */}
            <div className="absolute top-4 right-4 z-50 flex space-x-2 bg-slate-900/80 p-1 rounded-lg backdrop-blur-sm border border-slate-800">
                {(['gauge', 'orbit', 'mixer', 'shield'] as Variation[]).map((v) => (
                    <button
                        key={v}
                        onClick={() => setVariation(v)}
                        className={cn(
                            "px-3 py-1 text-xs font-medium rounded-md transition-all uppercase tracking-wider",
                            variation === v
                                ? "bg-purple-600 text-white shadow-lg"
                                : "text-slate-400 hover:text-white hover:bg-slate-800"
                        )}
                    >
                        {v}
                    </button>
                ))}
            </div>

            {variation === 'gauge' && (
                <Gauge activeRegimeId={activeRegimeId} onRegimeChange={setActiveRegimeId} />
            )}

            {/* Placeholders for other variations */}
            {variation === 'orbit' && (
                <ContrarianOrbit activeRegimeId={activeRegimeId} onRegimeChange={setActiveRegimeId} />
            )}
            {variation === 'mixer' && (
                <AssetMixer activeRegimeId={activeRegimeId} onRegimeChange={setActiveRegimeId} />
            )}
            {variation === 'shield' && (
                <DynamicShield activeRegimeId={activeRegimeId} onRegimeChange={setActiveRegimeId} />
            )}
        </div>
    );
}
