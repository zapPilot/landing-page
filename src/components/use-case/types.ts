import type { AllocationBreakdown, LpDirection } from '@/types/regime.types';
import type { StrategyDirection } from '@/config/useCaseLabels';
import type { ProtocolInfo } from '@/components/ui/allocation/types';

export interface UseCaseVariant {
  direction: StrategyDirection; // 'from-left' | 'from-right' | 'default'
  tabLabel: string;
  title: string;
  scenario: string;
  userIntent: string;
  zapAction: string;
  allocationStartBreakdown: AllocationBreakdown;
  allocationEndBreakdown: AllocationBreakdown;
  lpDirection?: LpDirection;
  protocols: ProtocolInfo;
}
