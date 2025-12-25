'use client';

import { motion, AnimatePresence } from 'framer-motion';
import type { AllocationPanelProps } from './types';
import { SharedAllocationPanel } from './SharedAllocationPanel';
import { hasAllocationChange } from '@/lib/allocationUtils';

export function AllocationPanel({
  activeRegimeData,
  panelPosition,
  isMobile: _isMobile,
  animationDirection,
  activeStrategy,
  directionLabel,
  isAutoPlaying = false,
}: AllocationPanelProps) {
  const panelPos = panelPosition;
  const hasChange = hasAllocationChange(
    activeStrategy.useCase?.allocationBefore,
    activeStrategy.useCase?.allocationAfter
  );

  return (
    <foreignObject x={panelPos.x} y={panelPos.y} width={panelPos.width} height={panelPos.height}>
      {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
      <div {...({ xmlns: 'http://www.w3.org/1999/xhtml' } as any)} className="h-full">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeRegimeData.id}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
            style={{ height: `${panelPos.height}px` }}
            className="h-full"
          >
            <SharedAllocationPanel
              regimeLabel={activeRegimeData.label}
              regimeColor={activeRegimeData.fillColor}
              philosophy={activeRegimeData.philosophy}
              author={activeRegimeData.author}
              strategyTitle={activeStrategy.title}
              strategySubtitle={activeStrategy.subtitle}
              directionLabel={directionLabel}
              animationDirection={animationDirection}
              isAutoPlaying={isAutoPlaying}
              allocationBefore={activeStrategy.useCase?.allocationBefore}
              allocationAfter={activeStrategy.useCase?.allocationAfter}
              protocols={activeRegimeData.protocols}
              isMaintaining={!hasChange}
            />
          </motion.div>
        </AnimatePresence>
      </div>
    </foreignObject>
  );
}
