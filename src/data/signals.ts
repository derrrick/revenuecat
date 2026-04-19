/**
 * Mock fixtures powering Options A, B, and C of the Signal Layer prototype.
 * All values are hand-picked; no computation happens at runtime. The shapes
 * are tuned to match what a real backend would eventually return so components
 * don't have to be rewritten when real data lands.
 */

export type Severity = "critical" | "warning" | "positive" | "neutral";
export type Direction = "up" | "down";

export type Delta = {
  pct: number;            // signed; e.g. -4.5 or +1.2
  direction: Direction;
  severity: Severity;
  /** Plain-English summary for the hover tooltip on the delta badge. */
  tooltip?: string;
};

export type KPIKey =
  | "trials"
  | "subscriptions"
  | "mrr"
  | "revenue"
  | "customers_new"
  | "customers";

/* ---------------- Week-over-week deltas (Variant A + C inline badges) --------- */

export const WOW_DELTAS: Record<KPIKey, Delta> = {
  trials: {
    pct: -2.1,
    direction: "down",
    severity: "warning",
    tooltip:
      "Active Trials down 2.1% WoW. Slightly below the 30-day average — watch in conjunction with the Trial CVR signal, which is showing a stronger anomaly.",
  },
  subscriptions: {
    pct: +0.3,
    direction: "up",
    severity: "neutral",
    tooltip:
      "Active Subscriptions essentially flat WoW (+0.3%). Well within normal weekly variance. No action suggested.",
  },
  mrr: {
    pct: +1.2,
    direction: "up",
    severity: "positive",
    tooltip:
      "MRR up 1.2% WoW. Tracking modestly ahead of the 30-day trend. No signal — normal healthy growth.",
  },
  revenue: {
    pct: -0.8,
    direction: "down",
    severity: "neutral",
    tooltip:
      "Revenue down 0.8% WoW. Within normal day-over-day volatility. Not statistically significant against the 30-day baseline.",
  },
  customers_new: {
    pct: +3.4,
    direction: "up",
    severity: "positive",
    tooltip:
      "New Customers up 3.4% WoW — strongest positive movement on the board. Likely driven by the recent App Store placement.",
  },
  customers: {
    pct: +0.1,
    direction: "up",
    severity: "neutral",
    tooltip:
      "Active Customers essentially unchanged (+0.1%). Churn and new acquisition roughly offsetting this week.",
  },
};

/* ---------------- Ranked signals (Variant C Signal Bar) ----------------------- */
/* Ordered by z-score magnitude, negative-weighted. Cycled through on dismiss.
   Deliberately mixes metrics from the Overview (MRR) with email-only metrics
   (Trial CVR, Initial CVR) so the prototype shows the Signal Layer's main
   argument: it surfaces anomalies you can't see on today's Overview. */

export type Signal = {
  id: string;
  metric: string;
  pct: number;
  direction: Direction;
  severity: Severity;
  sentence: string;
  zScore: number;
  chartSlug: string;           // maps into /charts/:chart
  firedAt: string;             // display-only timestamp
};

export const RANKED_SIGNALS: Signal[] = [
  {
    id: "s1",
    metric: "Your trial conversion is slipping",
    pct: -4.5,
    direction: "down",
    severity: "critical",
    sentence: "Trial conversion is down 4.5% — below its 30-day baseline.",
    zScore: 2.7,
    chartSlug: "trials",
    firedAt: "2:14 PM today",
  },
  {
    id: "s2",
    metric: "Initial CVR",
    pct: -2.9,
    direction: "down",
    severity: "warning",
    sentence: "Initial CVR dropped 2.9% over the last 48h on iOS.",
    zScore: 2.1,
    chartSlug: "trials",
    firedAt: "11:02 AM today",
  },
  {
    id: "s3",
    metric: "MRR growth",
    pct: +2.3,
    direction: "up",
    severity: "positive",
    sentence: "MRR growth is outpacing the 30-day baseline by 2.3%.",
    zScore: 1.9,
    chartSlug: "mrr",
    firedAt: "Yesterday, 6:40 PM",
  },
];

/* ---------------- Insights Pulse panel (Variant A) ---------------------------- */

export type Insight = {
  id: string;
  title: string;
  body: string;
  timestamp: string;
  severity: Severity;
  chartSlug: string;
};

export const INSIGHTS: Insight[] = [
  {
    id: "i1",
    title: "Trial CVR below 5% threshold",
    body: "Trial conversion rate has been under 5% for 2 consecutive days.",
    timestamp: "2h ago",
    severity: "critical",
    chartSlug: "trials",
  },
  {
    id: "i2",
    title: "New customers up 3.4% WoW",
    body: "Growth concentrated in US and UK App Stores.",
    timestamp: "6h ago",
    severity: "positive",
    chartSlug: "customers_new",
  },
  {
    id: "i3",
    title: "Revenue flat vs. last week",
    body: "-0.8% WoW; within normal weekly variance.",
    timestamp: "1d ago",
    severity: "neutral",
    chartSlug: "revenue",
  },
];

/* ---------------- Forecast module (Variant B) --------------------------------- */
/* 60 points of "actual" MRR history + 30 points of projection. Values are in
   whole dollars, tuned to sit naturally against the Overview's $29,124 MRR. */

const ACTUAL_MRR: number[] = [
  24100, 24280, 24320, 24510, 24480, 24640, 24710, 24890, 25020, 25110,
  25280, 25310, 25460, 25520, 25670, 25780, 25840, 25970, 26090, 26210,
  26340, 26410, 26480, 26620, 26710, 26830, 26910, 27020, 27180, 27250,
  27340, 27480, 27560, 27640, 27790, 27880, 28010, 28090, 28180, 28290,
  28360, 28470, 28540, 28620, 28710, 28790, 28860, 28940, 29000, 29060,
  29080, 29090, 29110, 29120, 29124, 29130, 29140, 29160, 29170, 29180,
];

const PROJECTED_MRR: number[] = [
  29240, 29340, 29450, 29560, 29680, 29790, 29910, 30020, 30130, 30240,
  30340, 30440, 30540, 30640, 30730, 30820, 30900, 30970, 31040, 31090,
  31130, 31160, 31180, 31190, 31195, 31198, 31200, 31200, 31200, 31200,
];

export const FORECAST = {
  actual: ACTUAL_MRR,
  projected: PROJECTED_MRR,
  confidenceBandPct: 8,
  endOfMonthMRR: 31200,
  endOfMonthMRRLabel: "$31.2K",
  churnRisk: "medium" as const,
  confidencePct: 82,
  actualStartDate: "Feb 18",
  forecastEndDate: "May 18",
  todayLabel: "Apr 18",
};

/* ---------------- Picker copy ------------------------------------------------- */
/* Used by the Cmd+V overlay so the three options read as three deliberate
   points of view, not three flavors of the same idea. */

export const VARIANT_COPY = {
  Baseline: {
    title: "Baseline",
    tagline: "Current RevenueCat dashboard",
    pitch: "The Overview as it ships today. Reference point for the three proposals.",
  },
  A: {
    title: "Option A",
    tagline: "Enhanced Overview Cards",
    pitch: "Trust the scan. Inline deltas + a pulse panel below the grid.",
  },
  B: {
    title: "Option B",
    tagline: "Predictive MRR Forecast",
    pitch: "Look forward. Projection chart + end-of-month confidence.",
  },
  C: {
    title: "Option C",
    tagline: "Signal Layer",
    pitch: "One signal, ranked. Push-first detection, statistical baselines.",
  },
} as const;
