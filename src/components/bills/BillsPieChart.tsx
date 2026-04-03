interface Slice {
  label: string;
  value: number;
  color: string;
}

interface BillsPieChartProps {
  slices: Slice[];
  size?: number;
}

const SIZE = 220;
const CX = SIZE / 2;
const CY = SIZE / 2;
const R_OUTER = 88;
const R_INNER = 56; // donut hole radius
const GAP = 0.025;  // radians gap between slices

function polarToXY(angle: number, r: number) {
  return {
    x: CX + r * Math.cos(angle),
    y: CY + r * Math.sin(angle),
  };
}

function donutSlicePath(startAngle: number, endAngle: number): string {
  const gap = GAP / 2;
  const outerStart = polarToXY(startAngle + gap, R_OUTER);
  const outerEnd   = polarToXY(endAngle - gap,   R_OUTER);
  const innerEnd   = polarToXY(endAngle - gap,   R_INNER);
  const innerStart = polarToXY(startAngle + gap, R_INNER);
  const largeArc = endAngle - startAngle - GAP > Math.PI ? 1 : 0;

  return [
    `M ${outerStart.x} ${outerStart.y}`,
    `A ${R_OUTER} ${R_OUTER} 0 ${largeArc} 1 ${outerEnd.x} ${outerEnd.y}`,
    `L ${innerEnd.x} ${innerEnd.y}`,
    `A ${R_INNER} ${R_INNER} 0 ${largeArc} 0 ${innerStart.x} ${innerStart.y}`,
    "Z",
  ].join(" ");
}

export function BillsPieChart({ slices, size = SIZE }: BillsPieChartProps) {
  const total = slices.reduce((s, sl) => s + sl.value, 0);
  if (total === 0) return null;

  const startAngle = -Math.PI / 2; // start at 12 o'clock
  const rendered = slices.reduce<{ label: string; value: number; color: string; path: string }[]>(
    (acc, sl) => {
      const elapsed = acc.reduce((s, r) => s + (r.value / total) * 2 * Math.PI, 0);
      const sweep = (sl.value / total) * 2 * Math.PI;
      const path = donutSlicePath(startAngle + elapsed, startAngle + elapsed + sweep);
      return [...acc, { ...sl, path }];
    },
    []
  );

  const formattedTotal = total.toLocaleString("de-DE", { maximumFractionDigits: 0 });

  return (
    <svg viewBox={`0 0 ${SIZE} ${SIZE}`} width={size} height={size} className="shrink-0">
      {rendered.map((sl) => (
        <path
          key={sl.label}
          d={sl.path}
          fill={sl.color}
          fillOpacity={0.92}
          className="transition-opacity hover:opacity-100"
        />
      ))}
      {/* Center label */}
      <text
        x={CX}
        y={CY - 9}
        textAnchor="middle"
        fontSize={10}
        fill="oklch(0.5811 0.0399 269.57)"
        fontFamily="ui-sans-serif, system-ui, sans-serif"
        fontWeight="500"
        letterSpacing="0.04em"
      >
        TOTAL
      </text>
      <text
        x={CX}
        y={CY + 13}
        textAnchor="middle"
        fontSize={17}
        fontWeight="700"
        fill="oklch(0.9398 0.0100 267.36)"
        fontFamily="ui-sans-serif, system-ui, sans-serif"
      >
        €{formattedTotal}
      </text>
    </svg>
  );
}
