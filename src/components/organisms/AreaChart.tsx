import "./AreaChart.css";

type Props = {
  width?: number;
  height?: number;
};

export function AreaChart({ width = 820, height = 280 }: Props) {
  const chartTop = 16;
  const chartBottom = height - 32;
  const chartLeft = 48;
  const chartRight = width - 8;
  const plotWidth = chartRight - chartLeft;
  const plotHeight = chartBottom - chartTop;

  const yLabels = ["$2k", "$1.5k", "$1k", "$500", "$0"];
  const xLabels = ["Jan 19 '26", "Feb 08 '26", "Feb 28 '26", "Mar 22 '26", "Apr 12 '26"];

  const rand = (seed: number) => {
    const x = Math.sin(seed) * 10000;
    return x - Math.floor(x);
  };

  const N = 90;
  const pts: { x: number; y: number }[] = [];
  for (let i = 0; i < N; i++) {
    const t = i / (N - 1);
    const base = 0.35 + t * 0.35;
    const noise = (rand(i * 3.7) - 0.5) * 0.35;
    const spike = i % 11 === 0 ? 0.12 : 0;
    const v = Math.max(0.05, Math.min(0.95, base + noise + spike));
    pts.push({
      x: chartLeft + t * plotWidth,
      y: chartBottom - v * plotHeight,
    });
  }

  const linePath = pts
    .map((p, i) => `${i === 0 ? "M" : "L"} ${p.x.toFixed(1)} ${p.y.toFixed(1)}`)
    .join(" ");
  const areaPath = `${linePath} L ${pts[pts.length - 1].x} ${chartBottom} L ${pts[0].x} ${chartBottom} Z`;

  return (
    <div className="area-chart" style={{ width }}>
      <svg width={width} height={height} className="area-chart__svg">
        <defs>
          <linearGradient id="areaGrad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#2BB673" stopOpacity="0.22" />
            <stop offset="100%" stopColor="#2BB673" stopOpacity="0.02" />
          </linearGradient>
        </defs>

        {yLabels.map((lbl, i) => {
          const y = chartTop + (i / (yLabels.length - 1)) * plotHeight;
          return (
            <g key={lbl}>
              <text x="0" y={y + 4} className="area-chart__y-label">
                {lbl}
              </text>
              <line
                x1={chartLeft}
                x2={chartRight}
                y1={y}
                y2={y}
                stroke="#F0F0F0"
                strokeWidth="1"
                strokeDasharray={i === yLabels.length - 1 ? "" : "2 3"}
              />
            </g>
          );
        })}

        <path d={areaPath} fill="url(#areaGrad)" />
        <path
          d={linePath}
          fill="none"
          stroke="#2BB673"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />

        {xLabels.map((lbl, i) => {
          const x = chartLeft + (i / (xLabels.length - 1)) * plotWidth;
          return (
            <text
              key={lbl}
              x={x}
              y={height - 6}
              textAnchor={i === 0 ? "start" : i === xLabels.length - 1 ? "end" : "middle"}
              className="area-chart__x-label"
            >
              {lbl}
            </text>
          );
        })}
      </svg>
    </div>
  );
}
