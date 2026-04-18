import type { ReactNode } from "react";
import { Link } from "react-router-dom";
import "./KPITile.css";

type SparkType = "trial" | "growth" | "steady" | "volatile" | "flat-blue" | "flat-green";

type Props = {
  title: string;
  value: string;
  sublabel: string;
  icon: ReactNode;
  sparkline: SparkType;
  to?: string;
};

export function KPITile({ title, value, sublabel, icon, sparkline, to }: Props) {
  const inner = (
    <div className="kpi__stack">
      <div className="kpi__head">
        <h2 className="kpi__title">{title}</h2>
        <span className="kpi__icon">{icon}</span>
      </div>
      <div className="kpi__mid">
        <h1 className="kpi__value">{value}</h1>
        <div className="kpi__sub">
          <p className="kpi__sub-text">{sublabel}</p>
          <div className="kpi__info" data-testid="last-updated-icon">
            <svg
              className="kpi__info-svg"
              focusable="false"
              aria-label="Updated just now"
              viewBox="0 0 16 16"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <use
                className="base"
                href="/icons/timelapse.svg#base"
                fill="var(--text-secondary)"
              />
              <use
                className="details"
                href="/icons/timelapse.svg#details"
                fill="var(--text-secondary)"
              />
            </svg>
          </div>
        </div>
      </div>
      <div className="kpi__spark">
        <Sparkline type={sparkline} />
      </div>
    </div>
  );

  if (to) {
    return (
      <Link to={to} className={`kpi kpi--${sparkline}`}>
        {inner}
      </Link>
    );
  }
  return <div className={`kpi kpi--${sparkline}`}>{inner}</div>;
}

const PATHS: Record<SparkType, { line: string; color: string }> = {
  trial: {
    line:
      "M 0 34 L 14 30 L 28 36 L 42 24 L 56 22 L 70 16 L 84 28 L 98 30 L 112 14 L 126 22 L 140 32 L 154 12 L 168 16 L 182 28 L 196 34 L 210 22 L 224 16 L 238 28 L 252 34 L 266 30 L 280 24 L 294 34 L 308 40 L 322 38 L 336 42 L 350 44 L 372 46",
    color: "var(--rc-orange-primary)",
  },
  growth: {
    line: "M 0 52 C 60 48, 120 40, 180 32 C 240 22, 300 16, 360 8 L 372 6",
    color: "var(--rc-green-primary)",
  },
  steady: {
    line: "M 0 46 C 60 42, 120 40, 180 36 C 240 30, 300 24, 360 18 L 372 17",
    color: "var(--rc-green-primary)",
  },
  volatile: {
    line:
      "M 0 42 L 14 44 L 28 24 L 42 34 L 56 14 L 70 28 L 84 10 L 98 22 L 112 6 L 126 28 L 140 18 L 154 30 L 168 14 L 182 26 L 196 16 L 210 8 L 224 22 L 238 12 L 252 30 L 266 14 L 280 22 L 294 20 L 308 32 L 322 16 L 336 28 L 350 12 L 372 22",
    color: "var(--rc-green-primary)",
  },
  "flat-green": {
    line: "M 0 48 C 90 46, 180 45, 270 45 L 372 44",
    color: "var(--rc-green-primary)",
  },
  "flat-blue": {
    line: "M 0 46 C 90 46, 180 45, 270 46 L 372 46",
    color: "var(--rc-blue-primary)",
  },
};

function Sparkline({ type }: { type: SparkType }) {
  const W = 372;
  const H = 60;
  const { line, color } = PATHS[type];
  const area = `${line} L ${W} ${H} L 0 ${H} Z`;

  return (
    <svg width="100%" height={H} viewBox={`0 0 ${W} ${H}`} preserveAspectRatio="none">
      <defs>
        <linearGradient id={`spgrad-${type}`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor={color} stopOpacity="0.18" />
          <stop offset="100%" stopColor={color} stopOpacity="0" />
        </linearGradient>
      </defs>
      <path d={area} fill={`url(#spgrad-${type})`} stroke="none" />
      <path d={line} fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}
