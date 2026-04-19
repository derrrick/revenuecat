import { REVENUE_DATES, REVENUE_NUM, REVENUE_SERIES, REVENUE_AVG, TX_SERIES, TX_AVG } from "./revenue";

/**
 * Per-chart configuration used by the Revenue/ChartPage screen to render
 * title, toolbar, chart, and summary table based on the route slug. Each
 * entry mirrors what the live RevenueCat dashboard shows for that metric.
 *
 * Adding a chart = add one entry here; no screen-level branching needed.
 */

export type ChartKind = "stacked-area" | "line";
export type GroupTone = "violet" | "green" | "blue" | "teal" | "orange" | "red";

export type ChartSeries = {
  label: string;
  color: string;       // CSS custom prop or hex
  /** Formatted cell strings for the summary table, 28 entries. */
  values: string[];
  /** Row-average string as displayed in the summary table. */
  average: string;
  /** Numeric values for plotting, 28 entries. Pass undefined to skip plotting. */
  plot?: number[];
};

export type ChartConfig = {
  slug: string;
  title: string;
  /** Label shown in the toolbar metric selector ("Revenue", "Active Trials", …). */
  metricLabel: string;
  /** Group tone — drives accent colors on chart + list sidebar. */
  tone: GroupTone;
  kind: ChartKind;
  dates: string[];
  yTicks: string[];
  maxY: number;
  /** Series rendered in the summary table. First entry is the primary plotted series. */
  series: ChartSeries[];
};

// ---------- Data: Trials -----------------------------------------------------
// Plausible 28-day series for Active Trials. Built to narratively match the
// Option C Signal "Trial CVR is down 4.5% — 2.7σ below baseline": slight
// rising trend early, then a visible dip over the last ~7 days.

const TRIALS_NUM: number[] = [
  48, 52, 50, 55, 57, 53, 58,
  60, 63, 61, 64, 66, 62, 65,
  63, 60, 58, 56, 54, 50, 47,
  45, 44, 46, 43, 42, 43, 43,
];

const TRIALS_SERIES_VALUES = TRIALS_NUM.map((v) => String(v));
const TRIALS_AVG = String(
  Math.round(TRIALS_NUM.reduce((a, b) => a + b, 0) / TRIALS_NUM.length),
);

const NEW_TRIALS_NUM: number[] = [
  9, 11, 8, 12, 13, 10, 14,
  13, 15, 12, 14, 16, 11, 13,
  12, 10, 9, 8, 8, 7, 6,
  6, 5, 7, 5, 4, 5, 5,
];
const NEW_TRIALS_VALUES = NEW_TRIALS_NUM.map((v) => String(v));
const NEW_TRIALS_AVG = String(
  Math.round(NEW_TRIALS_NUM.reduce((a, b) => a + b, 0) / NEW_TRIALS_NUM.length),
);

// ---------- Registry --------------------------------------------------------

const REVENUE: ChartConfig = {
  slug: "revenue",
  title: "Revenue",
  metricLabel: "Revenue",
  tone: "violet",
  kind: "stacked-area",
  dates: REVENUE_DATES,
  yTicks: ["$0", "$500", "$1k", "$1.5k", "$2k"],
  maxY: 2000,
  series: [
    {
      label: "Revenue",
      color: "var(--rc-green-primary)",
      values: REVENUE_SERIES,
      average: REVENUE_AVG,
      plot: REVENUE_NUM,
    },
    {
      label: "Transactions",
      color: "transparent",
      values: TX_SERIES,
      average: TX_AVG,
    },
  ],
};

const TRIALS: ChartConfig = {
  slug: "trials",
  title: "Active Trials",
  metricLabel: "Active Trials",
  tone: "orange",
  kind: "line",
  dates: REVENUE_DATES,
  yTicks: ["0", "20", "40", "60", "80"],
  maxY: 80,
  series: [
    {
      label: "Active Trials",
      color: "var(--rc-orange-primary)",
      values: TRIALS_SERIES_VALUES,
      average: TRIALS_AVG,
      plot: TRIALS_NUM,
    },
    {
      label: "New Trials",
      color: "transparent",
      values: NEW_TRIALS_VALUES,
      average: NEW_TRIALS_AVG,
    },
  ],
};

const REGISTRY: Record<string, ChartConfig> = {
  revenue: REVENUE,
  trials: TRIALS,
};

/**
 * Look up config by slug. Falls back to Revenue so charts we haven't built
 * out yet don't crash — sidebar link still works, chart just mirrors the
 * reference config.
 */
export function getChartConfig(slug: string | undefined): ChartConfig {
  if (!slug) return REVENUE;
  return REGISTRY[slug] ?? REVENUE;
}
