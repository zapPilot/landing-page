export interface AllocationBreakdown {
  spot: number; // Crypto spot holdings %
  lp: number; // LP position %
  stable: number; // Stablecoin %
}

export interface AllocationBarProps {
  allocation: AllocationBreakdown;
  animated?: boolean;
  size?: 'sm' | 'md' | 'lg';
  showLabels?: boolean;
  className?: string;
}

export interface AllocationComparisonProps {
  before: AllocationBreakdown;
  after: AllocationBreakdown;
  timeframe?: string;
  gradient?: string;
}
