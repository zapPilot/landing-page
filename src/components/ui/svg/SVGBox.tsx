interface SVGBoxProps {
  x: number;
  y: number;
  width: number;
  height: number;
  label: string;
  value: string | number;
  rx?: number;
  fill?: string;
  stroke?: string;
  strokeWidth?: number;
  labelColor?: string;
  valueColor?: string;
  labelFontSize?: number;
  valueFontSize?: number;
}

/**
 * Reusable SVG box with centered label and value
 * Used in flow visualizations to display asset percentages
 */
export function SVGBox({
  x,
  y,
  width,
  height,
  label,
  value,
  rx = 8,
  fill = '#1f2937',
  stroke = '#374151',
  strokeWidth = 2,
  labelColor = '#9ca3af',
  valueColor = '#d1d5db',
  labelFontSize = 12,
  valueFontSize = 14,
}: SVGBoxProps) {
  const centerX = x + width / 2;
  const centerY = y + height / 2;

  return (
    <g>
      <rect
        x={x}
        y={y}
        width={width}
        height={height}
        rx={rx}
        fill={fill}
        stroke={stroke}
        strokeWidth={strokeWidth}
      />
      <text
        x={centerX}
        y={centerY - 5}
        textAnchor="middle"
        fill={labelColor}
        fontSize={labelFontSize}
        fontWeight="600"
      >
        {label}
      </text>
      <text
        x={centerX}
        y={centerY + 10}
        textAnchor="middle"
        fill={valueColor}
        fontSize={valueFontSize}
        fontWeight="700"
      >
        {value}
      </text>
    </g>
  );
}
