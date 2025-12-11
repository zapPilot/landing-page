'use client';

import type { UseCaseVariant } from './types';

interface UseCaseContentProps {
  number: string;
  regime: string;
  gradient: string;
  variant: UseCaseVariant;
}

export function UseCaseContent({ number, regime, gradient, variant }: UseCaseContentProps) {
  return (
    <div>
      {/* Clean kicker line: Number • Regime */}
      <div className="mb-8">
        <span
          className={`text-sm font-semibold uppercase tracking-widest bg-gradient-to-r ${gradient} bg-clip-text text-transparent`}
        >
          {number} • {regime}
        </span>
      </div>

      {/* Scenario - Primary content */}
      <div className="mb-8">
        <p className="text-white text-xl lg:text-2xl font-bold leading-relaxed mb-6">
          {variant.scenario}
        </p>
      </div>

      {/* User Intent */}
      <div className="mb-6">
        <p className="text-gray-400 text-xs font-medium uppercase tracking-wide mb-2">Your Goal:</p>
        <p className="text-gray-300 text-lg italic">&ldquo;{variant.userIntent}&rdquo;</p>
      </div>

      {/* Zap Action */}
      <div>
        <p className="text-gray-400 text-xs font-medium uppercase tracking-wide mb-2">
          Zap Pilot Action:
        </p>
        <p className="text-white text-lg font-medium">{variant.zapAction}</p>
      </div>
    </div>
  );
}
