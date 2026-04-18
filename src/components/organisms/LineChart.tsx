import "./LineChart.css";

type Props = {
  width?: number;
  height?: number;
};

export function LineChart({ width = 806, height = 367 }: Props) {
  const yLabels = ["500", "400", "300", "200", "100", "0"];
  const xLabels = ["Jul '23", "Aug '23", "Oct '23", "Nov '23"];

  const chartTop = 12;
  const chartBottom = 335;
  const chartLeft = 72;
  const chartRight = width;

  const plotWidth = chartRight - chartLeft;

  const chartY = (v: number) => chartTop + (500 - v) * (chartBottom - chartTop) / 500;
  const chartX = (i: number, total: number) => chartLeft + (i / (total - 1)) * plotWidth;

  const blue = [
    { x: 0, y: 320 },
    { x: 0.15, y: 300 },
    { x: 0.3, y: 260 },
    { x: 0.42, y: 200 },
    { x: 0.55, y: 225 },
    { x: 0.7, y: 225 },
    { x: 0.85, y: 245 },
    { x: 1, y: 260 },
  ].map((p) => ({
    x: chartLeft + p.x * plotWidth,
    y: chartBottom - (p.y / 500) * (chartBottom - chartTop),
  }));

  const orange = [
    { x: 0, y: 120 },
    { x: 0.15, y: 140 },
    { x: 0.3, y: 180 },
    { x: 0.42, y: 300 },
    { x: 0.55, y: 355 },
    { x: 0.7, y: 355 },
    { x: 0.85, y: 360 },
    { x: 1, y: 360 },
  ].map((p) => ({
    x: chartLeft + p.x * plotWidth,
    y: chartBottom - (p.y / 500) * (chartBottom - chartTop),
  }));

  const makePath = (pts: { x: number; y: number }[]) =>
    pts.map((p, i) => `${i === 0 ? "M" : "L"} ${p.x.toFixed(1)} ${p.y.toFixed(1)}`).join(" ");

  return (
    <div className="line-chart" style={{ width, height }}>
      <svg width={width} height={350} className="line-chart__svg">
        {/* Y axis labels */}
        {yLabels.map((lbl, i) => (
          <text
            key={lbl}
            x="0"
            y={chartY(500 - i * 100) + 4}
            className="line-chart__y-label"
          >
            {lbl}
          </text>
        ))}

        {/* Horizontal gridlines */}
        {yLabels.map((_, i) => (
          <line
            key={i}
            x1={chartLeft}
            x2={chartRight}
            y1={chartY(500 - i * 100)}
            y2={chartY(500 - i * 100)}
            stroke="var(--color-border-subtle)"
            strokeWidth="1"
          />
        ))}

        {/* Blue line (solid) */}
        <path
          d={makePath(blue)}
          fill="none"
          stroke="var(--color-chart-blue)"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />

        {/* Orange dashed line */}
        <path
          d={makePath(orange)}
          fill="none"
          stroke="var(--color-chart-orange)"
          strokeWidth="1.5"
          strokeDasharray="4 4"
          strokeLinecap="round"
          strokeLinejoin="round"
        />

        {/* End dots */}
        <circle
          cx={blue[0].x}
          cy={blue[0].y}
          r="3.5"
          fill="#fff"
          stroke="var(--color-chart-blue)"
          strokeWidth="2"
        />
        <circle
          cx={blue[blue.length - 1].x}
          cy={blue[blue.length - 1].y}
          r="3.5"
          fill="#fff"
          stroke="var(--color-chart-blue)"
          strokeWidth="2"
        />
        <circle
          cx={orange[0].x}
          cy={orange[0].y}
          r="3.5"
          fill="#fff"
          stroke="var(--color-chart-orange)"
          strokeWidth="2"
        />
        <circle
          cx={orange[orange.length - 1].x}
          cy={orange[orange.length - 1].y}
          r="3.5"
          fill="#fff"
          stroke="var(--color-chart-orange)"
          strokeWidth="2"
        />
      </svg>

      <div className="line-chart__x-axis">
        {xLabels.map((lbl, i) => {
          const isFirst = i === 0;
          const isLast = i === xLabels.length - 1;
          const x = chartX(i, xLabels.length);
          return (
            <span
              key={lbl}
              className="line-chart__x-label"
              style={{
                left: isLast ? undefined : x,
                right: isLast ? 0 : undefined,
                transform: !isFirst && !isLast ? "translateX(-50%)" : undefined,
              }}
            >
              {lbl}
            </span>
          );
        })}
      </div>
    </div>
  );
}
