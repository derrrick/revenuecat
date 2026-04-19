import type { ReactNode } from "react";
import { FORECAST } from "../../data/signals";
import "./ForecastModule.css";

/**
 * Option B — projected MRR module. Renders a compact SVG line chart with a
 * solid historical segment, a dashed projection tail, and a shaded
 * confidence band, next to three end-of-month forecast stats.
 *
 * No external chart lib — matches the existing StackedAreaChart idiom.
 */
export function ForecastModule() {
  const { actual, projected, confidenceBandPct, endOfMonthMRRLabel, churnRisk, confidencePct } = FORECAST;
  const all = [...actual, ...projected];
  const values = all;
  const N = values.length;
  const maxY = Math.max(...values) * (1 + confidenceBandPct / 100);
  const minY = Math.min(...values) * (1 - confidenceBandPct / 100);

  const W = 640;
  const H = 190;
  const padL = 36;
  const padR = 12;
  const padT = 14;
  const padB = 28;

  const xFor = (i: number) => padL + (i / (N - 1)) * (W - padL - padR);
  const yFor = (v: number) => padT + (1 - (v - minY) / (maxY - minY)) * (H - padT - padB);

  const actualLine = actual
    .map((v, i) => `${i === 0 ? "M" : "L"} ${xFor(i).toFixed(2)} ${yFor(v).toFixed(2)}`)
    .join(" ");

  const projStartIdx = actual.length - 1;
  const projectedLine = projected
    .map((v, i) => {
      const idx = projStartIdx + 1 + i;
      return `${i === 0 ? "M" : "L"} ${xFor(idx).toFixed(2)} ${yFor(v).toFixed(2)}`;
    });
  const seamPrefix = `M ${xFor(projStartIdx).toFixed(2)} ${yFor(actual[projStartIdx]).toFixed(2)} `;
  const projectedPath = seamPrefix + projectedLine.map((s) => s.replace(/^M /, "L ")).join(" ");

  // Confidence band — widens over the projection horizon.
  const bandTop: string[] = [];
  const bandBottom: string[] = [];
  projected.forEach((v, i) => {
    const idx = projStartIdx + 1 + i;
    const widen = (i + 1) / projected.length; // 0 → 1
    const delta = v * (confidenceBandPct / 100) * widen;
    bandTop.push(`${idx === projStartIdx + 1 ? "M" : "L"} ${xFor(idx).toFixed(2)} ${yFor(v + delta).toFixed(2)}`);
    bandBottom.push(`L ${xFor(idx).toFixed(2)} ${yFor(v - delta).toFixed(2)}`);
  });
  const bandPath = [
    `M ${xFor(projStartIdx).toFixed(2)} ${yFor(actual[projStartIdx]).toFixed(2)}`,
    ...bandTop.map((s) => s.replace(/^M /, "L ")),
    ...bandBottom.reverse(),
    "Z",
  ].join(" ");

  const todayX = xFor(projStartIdx);

  const yTicks = [minY, (minY + maxY) / 2, maxY];

  return (
    <section className="fc">
      <header className="fc__head">
        <div className="fc__head-left">
          <span className="fc__eyebrow">Forecast</span>
          <h3 className="fc__title">MRR projection · next 30 days</h3>
        </div>
        <div className="fc__head-right">
          <span className="fc__legend-item">
            <span className="fc__swatch fc__swatch--actual" /> Actual
          </span>
          <span className="fc__legend-item">
            <span className="fc__swatch fc__swatch--projected" /> Projected
          </span>
          <span className="fc__legend-item">
            <span className="fc__swatch fc__swatch--band" /> ±{confidenceBandPct}% band
          </span>
        </div>
      </header>

      <div className="fc__body">
        <div className="fc__chart">
          <svg viewBox={`0 0 ${W} ${H}`} width="100%" height={H} preserveAspectRatio="none">
            {/* Gridlines */}
            {yTicks.map((v, i) => (
              <line
                key={i}
                x1={padL}
                x2={W - padR}
                y1={yFor(v)}
                y2={yFor(v)}
                stroke="var(--surface-secondary)"
                strokeWidth={1}
                strokeDasharray={i === 0 || i === yTicks.length - 1 ? "0" : "2 3"}
                shapeRendering="crispEdges"
              />
            ))}
            {yTicks.map((v, i) => (
              <text
                key={`t-${i}`}
                x={padL - 6}
                y={yFor(v) + 4}
                textAnchor="end"
                className="fc__tick"
              >
                ${Math.round(v / 1000)}K
              </text>
            ))}

            {/* Confidence band */}
            <path d={bandPath} fill="var(--rc-blue-tertiary)" opacity="0.55" />

            {/* Actual line */}
            <path
              d={actualLine}
              fill="none"
              stroke="var(--rc-blue-primary)"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />

            {/* Projected dashed line */}
            <path
              d={projectedPath}
              fill="none"
              stroke="var(--rc-blue-primary)"
              strokeWidth="2"
              strokeDasharray="5 5"
              strokeLinecap="round"
            />

            {/* Today divider */}
            <line
              x1={todayX}
              x2={todayX}
              y1={padT}
              y2={H - padB}
              stroke="var(--text-muted)"
              strokeWidth={1}
              strokeDasharray="3 3"
            />
            <text x={todayX + 4} y={padT + 10} className="fc__today-label">
              Today
            </text>

            {/* End-of-period marker */}
            <circle
              cx={xFor(N - 1)}
              cy={yFor(projected[projected.length - 1])}
              r={3.5}
              fill="var(--rc-blue-primary)"
            />

            {/* X axis labels */}
            <text x={padL} y={H - 8} className="fc__tick">{FORECAST.actualStartDate}</text>
            <text x={todayX} y={H - 8} textAnchor="middle" className="fc__tick">{FORECAST.todayLabel}</text>
            <text x={W - padR} y={H - 8} textAnchor="end" className="fc__tick">{FORECAST.forecastEndDate}</text>
          </svg>
        </div>

        <div className="fc__stats">
          <Stat
            label="Projected end-of-month MRR"
            value={endOfMonthMRRLabel}
            sub={<span className="fc__stat-sub-positive">+7.1% vs. today</span>}
          />
          <Stat
            label="Churn risk"
            value="Medium"
            sub={<ChurnMeter risk={churnRisk} />}
          />
          <Stat
            label="Forecast confidence"
            value={`${confidencePct}%`}
            sub={<ConfidenceMeter pct={confidencePct} />}
          />
        </div>
      </div>
    </section>
  );
}

function Stat({
  label,
  value,
  sub,
}: {
  label: string;
  value: string;
  sub: ReactNode;
}) {
  return (
    <div className="fc__stat">
      <span className="fc__stat-label">{label}</span>
      <span className="fc__stat-value">{value}</span>
      <span className="fc__stat-sub">{sub}</span>
    </div>
  );
}

function ChurnMeter({ risk }: { risk: "low" | "medium" | "high" }) {
  const map = { low: 1, medium: 2, high: 3 };
  const active = map[risk];
  return (
    <span className="fc__meter" aria-label={`Churn risk ${risk}`}>
      {[1, 2, 3].map((i) => (
        <span
          key={i}
          className={`fc__meter-seg fc__meter-seg--${risk} ${i <= active ? "is-on" : ""}`}
        />
      ))}
      <span className="fc__meter-text">{risk}</span>
    </span>
  );
}

function ConfidenceMeter({ pct }: { pct: number }) {
  return (
    <span className="fc__confidence">
      <span className="fc__confidence-track">
        <span className="fc__confidence-fill" style={{ width: `${pct}%` }} />
      </span>
    </span>
  );
}
