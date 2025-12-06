export interface UseCaseVariant {
  direction: 'from-left' | 'from-right';
  tabLabel: string;
  title: string;
  scenario: string;
  userIntent: string;
  zapAction: string;
  allocationStart: number; // DEPRECATED - calculate from breakdown
  allocationEnd: number; // DEPRECATED - calculate from breakdown
  allocationStartBreakdown: { spot: number; lp: number; stable: number };
  allocationEndBreakdown: { spot: number; lp: number; stable: number };
  showLP: boolean; // DEPRECATED - inferred from LP > 0
  lpDirection?: 'building' | 'unwinding';
}
