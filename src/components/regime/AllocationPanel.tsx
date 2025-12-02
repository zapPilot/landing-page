'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import type { AllocationPanelProps } from './types';

export function AllocationPanel({
  activeRegimeData,
  panelPosition,
  lpAllocation,
  spotAllocation,
  isMobile,
}: AllocationPanelProps) {
  const panelPos = panelPosition;

  return (
    <g>
      {/* Side panel background */}
      <rect
        x={panelPos.x}
        y={panelPos.y}
        width={panelPos.width}
        height={panelPos.height}
        rx="12"
        fill="#1e293b"
        stroke={activeRegimeData.fillColor}
        strokeWidth="2"
      />

      {/* Regime label */}
      <text
        x={panelPos.x + panelPos.width / 2}
        y={panelPos.y + 50}
        textAnchor="middle"
        style={{ fill: activeRegimeData.fillColor, fontSize: isMobile ? '20px' : '24px', fontWeight: 700 }}
      >
        {activeRegimeData.label}
      </text>
      <text
        x={panelPos.x + panelPos.width / 2}
        y={panelPos.y + 75}
        textAnchor="middle"
        style={{ fill: '#94a3b8', fontSize: isMobile ? '13px' : '15px' }}
      >
        {activeRegimeData.emotionalState}
      </text>

      {/* USDC Bar */}
      <g>
        <foreignObject
          x={panelPos.x + 30}
          y={panelPos.y + 100}
          width="40"
          height="40"
        >
          <Image src="/usdc.webp" alt="USDC" width={40} height={40} className="rounded-full" />
        </foreignObject>
        <text
          x={panelPos.x + 80}
          y={panelPos.y + 125}
          style={{ fill: '#e2e8f0', fontSize: isMobile ? '15px' : '17px', fontWeight: 600 }}
        >
          USDC
        </text>
        <rect
          x={panelPos.x + 30}
          y={panelPos.y + 145}
          width={panelPos.width - 60}
          height="18"
          rx="9"
          fill="#1f2937"
        />
        <motion.rect
          x={panelPos.x + 30}
          y={panelPos.y + 145}
          height="18"
          rx="9"
          fill="url(#stableGradient)"
          animate={{ width: (activeRegimeData.allocation.stable / 100) * (panelPos.width - 60) }}
          transition={{ duration: 0.8, ease: [0.4, 0, 0.2, 1] }}
        />
        <text
          x={panelPos.x + panelPos.width - 30}
          y={panelPos.y + 160}
          textAnchor="end"
          style={{ fill: '#3B82F6', fontSize: isMobile ? '15px' : '17px', fontWeight: 700 }}
        >
          {activeRegimeData.allocation.stable}%
        </text>
      </g>

      {/* LP Bar */}
      <g>
        <foreignObject
          x={panelPos.x + 30}
          y={panelPos.y + 185}
          width="50"
          height="40"
        >
          <div className="flex -space-x-2">
            <Image src="/btc.webp" alt="BTC" width={22} height={22} className="rounded-full" />
            <Image src="/eth.webp" alt="ETH" width={22} height={22} className="rounded-full" />
          </div>
        </foreignObject>
        <text
          x={panelPos.x + 90}
          y={panelPos.y + 210}
          style={{ fill: '#e2e8f0', fontSize: isMobile ? '15px' : '17px', fontWeight: 600 }}
        >
          LP Positions
        </text>
        <rect
          x={panelPos.x + 30}
          y={panelPos.y + 230}
          width={panelPos.width - 60}
          height="18"
          rx="9"
          fill="#1f2937"
        />
        <motion.rect
          x={panelPos.x + 30}
          y={panelPos.y + 230}
          height="18"
          rx="9"
          fill="url(#lpGradient)"
          animate={{ width: (lpAllocation / 100) * (panelPos.width - 60) }}
          transition={{ duration: 0.8, ease: [0.4, 0, 0.2, 1] }}
        />
        <text
          x={panelPos.x + panelPos.width - 30}
          y={panelPos.y + 245}
          textAnchor="end"
          style={{ fill: '#A855F7', fontSize: isMobile ? '15px' : '17px', fontWeight: 700 }}
        >
          {lpAllocation}%
        </text>
      </g>

      {/* Token Bar */}
      <g>
        <foreignObject
          x={panelPos.x + 30}
          y={panelPos.y + 270}
          width="50"
          height="40"
        >
          <div className="flex -space-x-2">
            <Image src="/btc.webp" alt="BTC" width={22} height={22} className="rounded-full" />
            <Image src="/eth.webp" alt="ETH" width={22} height={22} className="rounded-full" />
          </div>
        </foreignObject>
        <text
          x={panelPos.x + 90}
          y={panelPos.y + 295}
          style={{ fill: '#e2e8f0', fontSize: isMobile ? '15px' : '17px', fontWeight: 600 }}
        >
          Spot BTC/ETH
        </text>
        <rect
          x={panelPos.x + 30}
          y={panelPos.y + 315}
          width={panelPos.width - 60}
          height="18"
          rx="9"
          fill="#1f2937"
        />
        <motion.rect
          x={panelPos.x + 30}
          y={panelPos.y + 315}
          height="18"
          rx="9"
          fill="url(#cryptoGradient)"
          animate={{ width: (spotAllocation / 100) * (panelPos.width - 60) }}
          transition={{ duration: 0.8, ease: [0.4, 0, 0.2, 1] }}
        />
        <text
          x={panelPos.x + panelPos.width - 30}
          y={panelPos.y + 330}
          textAnchor="end"
          style={{ fill: '#F97316', fontSize: isMobile ? '15px' : '17px', fontWeight: 700 }}
        >
          {spotAllocation}%
        </text>
      </g>

      {/* Actions section */}
      <text
        x={panelPos.x + panelPos.width / 2}
        y={panelPos.y + 365}
        textAnchor="middle"
        style={{ fill: '#64748b', fontSize: isMobile ? '11px' : '12px', fontWeight: 600, letterSpacing: '0.05em' }}
      >
        ACTIONS
      </text>
      {activeRegimeData.actions.slice(0, 2).map((action, idx) => {
        const yPos = panelPos.y + 380 + idx * 35;
        const maxLength = isMobile ? 35 : 45;
        const displayText = action.length > maxLength ? action.slice(0, maxLength) + '...' : action;
        
        return (
          <g key={idx}>
            {/* Tag background with subtle gradient */}
            <rect
              x={panelPos.x + 30}
              y={yPos}
              width={panelPos.width - 60}
              height="28"
              rx="6"
              fill="#1e293b"
              stroke={activeRegimeData.fillColor}
              strokeWidth="1"
              opacity="0.6"
            />
            {/* Tag text */}
            <text
              x={panelPos.x + 40}
              y={yPos + 18}
              style={{ fill: '#e2e8f0', fontSize: isMobile ? '10px' : '11px', fontWeight: 500 }}
            >
              {displayText}
            </text>
          </g>
        );
      })}

      {/* Philosophy */}
      <text
        x={panelPos.x + panelPos.width / 2}
        y={panelPos.y + 455}
        textAnchor="middle"
        style={{ fill: activeRegimeData.fillColor, fontSize: isMobile ? '11px' : '12px', fontStyle: 'italic' }}
      >
        {activeRegimeData.philosophy}
      </text>

      {/* Total allocation
      <text
        x={panelPos.x + panelPos.width / 2}
        y={panelPos.y + 525}
        textAnchor="middle"
        style={{ fill: '#e2e8f0', fontSize: isMobile ? '20px' : '24px', fontWeight: 700 }}
      >
        {activeRegimeData.allocation.crypto}% / {activeRegimeData.allocation.stable}%
      </text>
      <text
        x={panelPos.x + panelPos.width / 2}
        y={panelPos.y + 550}
        textAnchor="middle"
        style={{ fill: '#64748b', fontSize: isMobile ? '10px' : '11px' }}
      >
        Crypto / Stable
      </text> */}
    </g>
  );
}
