import { REVENUE_NUM, REVENUE_DATES } from "../../data/revenue";
import "./StackedAreaChart.css";

type Props = {
  yTicks?: string[];
  xTickEvery?: number;
};

const Y_PX = { top: 16, bottom: 436 };
const PAD_LEFT = 48;
const PAD_RIGHT = 16;

export function StackedAreaChart({
  yTicks = ["$0", "$500", "$1k", "$1.5k", "$2k"],
  xTickEvery = 5,
}: Props) {
  const values = REVENUE_NUM;
  const N = values.length;
  const width = 932;
  const height = 500;
  const plotLeft = PAD_LEFT;
  const plotRight = width - PAD_RIGHT - 68;
  const plotTop = Y_PX.top;
  const plotBottom = Y_PX.bottom;

  const maxY = 2000;
  const xFor = (i: number) => plotLeft + (i / (N - 1)) * (plotRight - plotLeft);
  const yFor = (v: number) => plotBottom - (v / maxY) * (plotBottom - plotTop);

  // Main line (all but the trailing zero projection point)
  const mainIdx = values.slice(0, -1).map((_, i) => i);
  const mainLine = mainIdx
    .map((i) => `${i === 0 ? "M" : "L"} ${xFor(i).toFixed(2)} ${yFor(values[i]).toFixed(2)}`)
    .join(" ");
  const mainArea =
    mainLine +
    ` L ${xFor(N - 2).toFixed(2)} ${plotBottom} L ${xFor(0).toFixed(2)} ${plotBottom} Z`;

  // Projection dashed segment
  const projStart = { x: xFor(N - 2), y: yFor(values[N - 2]) };
  const projEnd = { x: xFor(N - 1), y: yFor(values[N - 1]) };
  const projArea = `M ${projStart.x.toFixed(2)} ${projStart.y.toFixed(2)} L ${projEnd.x.toFixed(
    2,
  )} ${projEnd.y.toFixed(2)} L ${projEnd.x.toFixed(2)} ${plotBottom} L ${projStart.x.toFixed(
    2,
  )} ${plotBottom} Z`;

  const gridLines = 10;
  const gridYs = Array.from({ length: gridLines + 1 }, (_, i) => plotTop + ((plotBottom - plotTop) / gridLines) * i);

  const xLabels = REVENUE_DATES
    .map((d, i) => ({ d, i }))
    .filter(({ i }) => i % xTickEvery === 0);

  return (
    <div className="sac">
      <svg width={width} height={height} className="sac__svg">
        <g transform={`translate(${plotLeft}, ${plotTop})`}>
          {/* Horizontal gridlines */}
          {gridYs.map((y, i) => (
            <line
              key={i}
              x1={0}
              x2={plotRight - plotLeft}
              y1={y - plotTop}
              y2={y - plotTop}
              stroke="var(--surface-secondary)"
              strokeWidth={1}
              strokeDasharray="1"
              shapeRendering="crispEdges"
            />
          ))}
          {/* Left y-axis line */}
          <line
            x1={0}
            x2={0}
            y1={0}
            y2={plotBottom - plotTop}
            stroke="var(--surface-secondary)"
            strokeWidth={1}
            shapeRendering="crispEdges"
          />
          {/* Bottom x-axis line */}
          <line
            x1={0}
            x2={plotRight - plotLeft}
            y1={plotBottom - plotTop}
            y2={plotBottom - plotTop}
            stroke="var(--surface-secondary)"
            strokeWidth={1}
            shapeRendering="crispEdges"
          />
        </g>

        {/* Y axis labels */}
        {yTicks.map((lbl, i) => {
          const y = plotBottom - (i / (yTicks.length - 1)) * (plotBottom - plotTop);
          return (
            <text
              key={lbl}
              x={plotLeft - 12}
              y={y + 4}
              className="sac__tick"
              textAnchor="end"
            >
              {lbl}
            </text>
          );
        })}

        {/* X axis labels */}
        {xLabels.map(({ d, i }) => (
          <text
            key={i}
            x={xFor(i)}
            y={plotBottom + 24}
            className="sac__tick"
            textAnchor="middle"
          >
            {d}
          </text>
        ))}

        {/* Main stacked area + line */}
        <path d={mainArea} fill="var(--rc-green-secondary)" opacity="0.55" />
        <path
          d={mainLine}
          fill="none"
          stroke="var(--rc-green-primary)"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />

        {/* Projection area (lighter) + dashed line */}
        <path d={projArea} fill="var(--rc-green-tertiary)" />
        <path
          d={`M ${projStart.x} ${projStart.y} L ${projEnd.x} ${projEnd.y}`}
          fill="none"
          stroke="var(--rc-green-primary)"
          strokeWidth="2"
          strokeDasharray="8 8"
          strokeLinecap="round"
        />

        {/* Today divider (vertical dashed line at second-to-last tick position) */}
        <line
          x1={xFor(N - 2)}
          x2={xFor(N - 2)}
          y1={plotTop}
          y2={plotBottom}
          stroke="var(--surface-secondary)"
          strokeWidth={1}
          strokeDasharray="4"
        />
      </svg>

      {/* Chart overlay buttons */}
      <div className="sac__overlay">
        <button className="sac__overlay-btn" aria-label="Save chart">
          <svg width="14" height="14" viewBox="0 0 16 16" fill="none">
            <use href="/icons/bookmark.svg#base" fill="currentColor" />
            <use href="/icons/bookmark.svg#details" fill="currentColor" />
          </svg>
        </button>
        <button className="sac__overlay-btn" aria-label="Add annotation">
          <svg width="14" height="14" viewBox="0 0 16 16" fill="none">
            <use href="/icons/plus.svg#base" fill="currentColor" />
            <use href="/icons/plus.svg#details" fill="currentColor" />
          </svg>
        </button>
      </div>
    </div>
  );
}
