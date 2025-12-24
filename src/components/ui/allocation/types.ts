export interface AllocationBreakdown {
  spot: number; // Crypto spot holdings %
  lp: number; // LP position %
  stable: number; // Stablecoin %
}

export interface ProtocolInfo {
  stable: string[];
  lp: string[];
  strategyType?: 'lending' | 'perps';
}

export interface AllocationBarProps {
  allocation: AllocationBreakdown;
  protocols?: ProtocolInfo;
  animated?: boolean;
  size?: 'sm' | 'md' | 'lg';
  showLabels?: boolean;
  className?: string;
}

export interface AllocationComparisonProps {
  before: AllocationBreakdown;
  after: AllocationBreakdown;
  protocols?: ProtocolInfo;
  timeframe?: string;
  gradient?: string;
}
