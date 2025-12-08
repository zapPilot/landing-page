import type { AllocationBreakdown, LpDirection } from '@/types/regime.types';

export interface UseCaseVariant {
  direction: 'from-left' | 'from-right';
  tabLabel: string;
  title: string;
  scenario: string;
  userIntent: string;
  zapAction: string;
  allocationStartBreakdown: AllocationBreakdown;
  allocationEndBreakdown: AllocationBreakdown;
  lpDirection?: LpDirection;
}
