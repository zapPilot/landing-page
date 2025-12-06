import { LPFlowVisualization } from './LPFlowVisualization';
import type { AssetFlow } from '@/lib/regimeData';

interface FlowVariantDisplayProps {
  label: string;
  variant: 'sankey' | 'bars' | 'icons';
  assetFlow: AssetFlow;
  transformation: {
    from: 'spot' | 'lp';
    to: 'spot' | 'lp';
    percentage: number;
    duration: string;
  };
  regimeColor: string;
}

export function FlowVariantDisplay({
  label,
  variant,
  assetFlow,
  transformation,
  regimeColor,
}: FlowVariantDisplayProps) {
  return (
    <div className="space-y-2">
      <p className="text-xs text-gray-500 font-semibold">{label}</p>
      <LPFlowVisualization
        assetFlow={assetFlow}
        transformation={transformation}
        variant={variant}
        size="sm"
        regimeColor={regimeColor}
      />
    </div>
  );
}
