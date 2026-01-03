'use client';

import { CheckCircle } from 'lucide-react';
import { SubtitleChip, type SubtitlePart } from './SubtitleChip';
import { MESSAGES } from '@/config/messages';

export interface MaintainingAllocationProps {
  message?: string;
  subtitle?: SubtitlePart[] | string;
}

export function MaintainingAllocation({
  message = MESSAGES.allocation.maintaining.message,
  subtitle = MESSAGES.allocation.maintaining.subtitle,
}: MaintainingAllocationProps) {
  return (
    <div className="flex items-center justify-center gap-3 bg-gray-800/50 rounded-2xl p-6 border border-gray-700">
      <CheckCircle className="w-6 h-6 text-green-400" />
      <div className="space-y-2">
        <p className="text-white font-semibold text-lg">{message}</p>
        <SubtitleChip subtitle={subtitle} />
      </div>
    </div>
  );
}
