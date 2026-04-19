import type { ChartConfig } from "../../data/chartMeta";
import "./StackedAreaChart.css";

/**
 * Config-driven trend chart. Handles both stacked-area (Revenue style, with
 * projection tail) and line (Trials / most other metrics) via the `kind`
 * field on ChartConfig. Reuses StackedAreaChart CSS so it inherits the
 * same tick typography and overlay placement.
 */

type Props = {
  config: ChartConfig;
  xTickEvery?: number;
  /**
   * Optional anomaly band — used by Option C deep-link from SignalBar to
   * highlight the date range of interest. Expressed as [startIdx, endIdx]
   * into ChartConfig.dates (inclusive). Set null to skip.
   */
  highlightRange?: [number, number] | null;
};

const Y_PX = { top: 16, bottom: 360 };
const PAD_LEFT = 48;
const PAD_RIGHT = 16;
const OVERLAY_GUTTER = 68;

export function TrendChart({ config, xTickEvery = 5, highlightRange }: Props) {
  const { kind, yTicks, maxY, dates, series } = config;
  const primary = series[0];
  const values = primary.plot ?? [];
  const N = values.length;

  const width = 932;
  const height = 400;
  const plotLeft = PAD_LEFT;
  const plotRight = width - PAD_RIGHT - OVERLAY_GUTTER;
  const plotTop = Y_PX.top;
  const plotBottom = Y_PX.bottom;

  const xFor = (i: number) => plotLeft + (i / (N - 1)) * (plotRight - plotLeft);
  const yFor = (v: number) => plotBottom - (v / maxY) * (plotBottom - plotTop);

  const gridLines = 10;
  const gridYs = Array.from(
    { length: gridLines + 1 },
    (_, i) => plotTop + ((plotBottom - plotTop) / gridLines) * i,
  );

  const xLabels = dates
    .map((d, i) => ({ d, i }))
    .filter(({ i }) => i % xTickEvery === 0);

  // --- Stacked area (Revenue): draw area up to N-2, then dashed projection to N-1 ---
  const isStacked = kind === "stacked-area";

  const mainLine = (isStacked ? values.slice(0, -1) : values)
    .map((v, i) => `${i === 0 ? "M" : "L"} ${xFor(i).toFixed(2)} ${yFor(v).toFixed(2)}`)
    .join(" ");

  const endIdx = isStacked ? N - 2 : N - 1;
  const mainArea =
    mainLine +
    ` L ${xFor(endIdx).toFixed(2)} ${plotBottom} L ${xFor(0).toFixed(2)} ${plotBottom} Z`;

  const projStart = isStacked ? { x: xFor(N - 2), y: yFor(values[N - 2]) } : null;
  const projEnd = isStacked ? { x: xFor(N - 1), y: yFor(values[N - 1]) } : null;

  // Derive a lighter fill from the primary color. For the built-in RC tokens
  // we map to their "-secondary" counterpart; otherwise fall back to 20% opacity.
  const fillColor = deriveFill(primary.color);

  return (
    <div className="sac">
      <svg width={width} height={height} className="sac__svg" viewBox={`0 0 ${width} ${height}`}>
        <g transform={`translate(${plotLeft}, ${plotTop})`}>
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
          <line
            x1={0}
            x2={0}
            y1={0}
            y2={plotBottom - plotTop}
            stroke="var(--surface-secondary)"
            strokeWidth={1}
            shapeRendering="crispEdges"
          />
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

        {/* Anomaly highlight band — drawn beneath the data so it reads as
            background context, not foreground marker. */}
        {highlightRange && (
          <rect
            x={xFor(highlightRange[0])}
            y={plotTop}
            width={xFor(highlightRange[1]) - xFor(highlightRange[0])}
            height={plotBottom - plotTop}
            fill="var(--rc-orange-secondary, rgba(232, 139, 58, 0.12))"
            opacity={0.5}
          />
        )}

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

        {isStacked ? (
          <>
            <path d={mainArea} fill={fillColor} opacity="0.55" />
            <path
              d={mainLine}
              fill="none"
              stroke={primary.color}
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            {projStart && projEnd && (
              <>
                <path
                  d={`M ${projStart.x} ${projStart.y} L ${projEnd.x} ${projEnd.y} L ${projEnd.x} ${plotBottom} L ${projStart.x} ${plotBottom} Z`}
                  fill={fillColor}
                  opacity="0.28"
                />
                <path
                  d={`M ${projStart.x} ${projStart.y} L ${projEnd.x} ${projEnd.y}`}
                  fill="none"
                  stroke={primary.color}
                  strokeWidth="2"
                  strokeDasharray="8 8"
                  strokeLinecap="round"
                />
              </>
            )}
            <line
              x1={xFor(N - 2)}
              x2={xFor(N - 2)}
              y1={plotTop}
              y2={plotBottom}
              stroke="var(--surface-secondary)"
              strokeWidth={1}
              strokeDasharray="4"
            />
          </>
        ) : (
          <>
            <path
              d={mainLine}
              fill="none"
              stroke={primary.color}
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            {/* End dot + today's value marker */}
            <circle
              cx={xFor(N - 1)}
              cy={yFor(values[N - 1])}
              r="4"
              fill="#fff"
              stroke={primary.color}
              strokeWidth="2"
            />
          </>
        )}
      </svg>

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

function deriveFill(primary: string): string {
  if (primary.includes("--rc-green-primary")) return "var(--rc-green-secondary)";
  if (primary.includes("--rc-orange-primary")) return "var(--rc-orange-secondary)";
  if (primary.includes("--rc-blue-primary")) return "var(--rc-blue-secondary)";
  if (primary.includes("--rc-violet-primary")) return "var(--rc-violet-secondary)";
  return primary;
}
