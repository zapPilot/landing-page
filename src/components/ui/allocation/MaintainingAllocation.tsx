'use client';

import { CheckCircle } from 'lucide-react';

interface MaintainingAllocationProps {
  message?: string;
  subtitle?: string;
}

export function MaintainingAllocation({
  message = 'Maintaining current allocation',
  subtitle = 'Zero rebalancing — Holiday Mode',
}: MaintainingAllocationProps) {
  return (
    <div className="flex items-center justify-center gap-3 bg-gray-800/50 rounded-2xl p-6 border border-gray-700">
      <CheckCircle className="w-6 h-6 text-green-400" />
      <div>
        <p className="text-white font-semibold text-lg">{message}</p>
        <p className="text-gray-400 text-sm">{subtitle}</p>
      </div>
    </div>
  );
}
