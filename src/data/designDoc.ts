/**
 * Structured content for the design-doc blade. Each section maps to a
 * sibling in the written doc (01 Problem framing … 08 Iterations &
 * timeline). Content is stored here so the blade can render itself and
 * cross-link into specific sections based on what the reviewer is
 * currently looking at.
 */

export type DocSectionId =
  | "problem"
  | "assumptions"
  | "options"
  | "solution"
  | "flow"
  | "tradeoffs"
  | "validation"
  | "timeline";

export type DocSection = {
  id: DocSectionId;
  num: string;        // "01", "02", …
  title: string;
  /** Short summary shown as the section lede. */
  lede?: string;
  /** Paragraph blocks of body copy. */
  body?: string[];
  /** Optional bullet / step list. Either plain strings or {kind,title,body}. */
  items?: Array<
    | string
    | { kind: string; title?: string; body: string }
  >;
};

/* ------------- Variant deep-dives ---------------------------------------- */
/* Rendered at the top of the blade when the reviewer is viewing a specific
   variant. These are the "here's what you're looking at and why" sections —
   parallel to Section 04 in the main doc, but specific to each option. */

export type VariantDeepDive = {
  eyebrow: string;
  title: string;
  tagline: string;
  /** Problem this iteration is reacting to — one tight paragraph. */
  problem: string;
  /** What this iteration solves — exactly three bullets. */
  solves: [string, string, string];
  /** Why the story pushed to the next iteration (or, for C, why this is the one that shipped). */
  nextStep: { title: string; body: string };
  /** Scorecard vs. the five criteria derived from the official problem statement. */
  scorecard: {
    overall: number;             // 0–10
    rows: Array<{ label: string; score: number; note: string }>;
  };
};

/* The five criteria are derived directly from the exercise's problem
   statement (at-a-glance status / trend visibility / action clarity /
   dashboard-native / detection latency). Each variant is scored against
   the same rubric so reviewers can read a direct comparison. */
const CRITERIA = [
  "At-a-glance status",
  "Trend / change visibility",
  "Action clarity",
  "Dashboard-native",
  "Detection latency",
] as const;

export const VARIANT_DEEP_DIVES: Record<"Baseline" | "A" | "B" | "C", VariantDeepDive> = {
  Baseline: {
    eyebrow: "Reference point",
    title: "Baseline — the dashboard today",
    tagline: "The Overview as it ships today. The problem every iteration is reacting against.",
    problem:
      "Developers open the dashboard for a daily health check, but the current surface gives them a static snapshot — six KPI cards with point-in-time values. There's no velocity context, no ranking, nothing to tell them whether anything actually needs attention. The detection loop happens in the weekly email, seven days late, or not at all.",
    solves: [
      "Six KPI cards with current value, sublabel, and sparkline.",
      "A Recent transactions table below the grid.",
      "Consistent left-nav and top-nav across every page.",
    ],
    nextStep: {
      title: "Why I started iterating toward A",
      body:
        "The loop is broken, but the surface isn't. The first attempt to fix it should be the most conservative one — add information to the cards developers already know how to read. Before redesigning, try if restraint is enough.",
    },
    scorecard: {
      overall: 2,
      rows: [
        { label: CRITERIA[0], score: 6, note: "Values + sparklines still visible." },
        { label: CRITERIA[1], score: 1, note: "No deltas anywhere; trend is only in the sparkline shape." },
        { label: CRITERIA[2], score: 0, note: "Nothing ranks anything." },
        { label: CRITERIA[3], score: 10, note: "Yes, it's the dashboard." },
        { label: CRITERIA[4], score: 0, note: "Same as the email — must wait." },
      ],
    },
  },

  A: {
    eyebrow: "Option A",
    title: "Enhanced Overview cards",
    tagline: "Trust the scan. Velocity context on every card, anomaly summary below the grid.",
    problem:
      "Developers can see values but not momentum — a \"43 Active Trials\" card looks identical whether trials are climbing or quietly collapsing. Fix that without changing the mental model: keep the same scan pattern, add just enough context to feel the direction.",
    solves: [
      "Inline WoW delta badge on every KPI — green (+), red (−), or neutral — so direction is visible in a single scan.",
      "A collapsible \"Insights Pulse\" panel below the grid: \"3 insights · 1 critical.\" Detection without a new hero surface.",
      "Zero layout reshuffle. Same grid, same cards, same table — additive only.",
    ],
    nextStep: {
      title: "Why I pushed toward B",
      body:
        "Six deltas in parallel don't solve the ranking problem — developers still have to scan and triage. And the Insights Pulse panel will get collapsed, and once it does, detection is back to square one. A was the most restrained option. Time to try the opposite: a new, forward-looking surface.",
    },
    scorecard: {
      overall: 7,
      rows: [
        { label: CRITERIA[0], score: 9, note: "Six deltas + sparklines directly answer \"how are things.\"" },
        { label: CRITERIA[1], score: 9, note: "Inline WoW + sparkline = two axes of trend per metric." },
        { label: CRITERIA[2], score: 5, note: "Six equal-weight deltas; Insights Pulse panel will get collapsed." },
        { label: CRITERIA[3], score: 10, note: "Purely additive to existing cards." },
        { label: CRITERIA[4], score: 4, note: "Passive — you only see it if you open the dashboard." },
      ],
    },
  },

  B: {
    eyebrow: "Option B",
    title: "Predictive MRR forecast",
    tagline: "Look forward. Answer the \"am I on track?\" question directly, above the KPI grid.",
    problem:
      "Every number on the Baseline describes the past. The question most revenue-sensitive operators want to answer first thing in the morning is \"am I on track for the month?\" — and nothing on the dashboard tells them. B tries to answer that directly with a forecast module.",
    solves: [
      "Projection chart with actual + projected MRR lines and a ±8% confidence band, split by a \"today\" divider.",
      "End-of-month MRR estimate with delta vs today — the hero number most developers open the dashboard to check.",
      "Categorical churn risk + numeric forecast confidence (82%), so the model's certainty is a visible signal of its own.",
    ],
    nextStep: {
      title: "Why I pushed toward C",
      body:
        "A forecast is not an alert. The moment it's visibly wrong, trust collapses — and getting it reliable across RevenueCat's customer distribution is months of data-science scope, not weeks of design scope. Worse: a metric quietly collapsing in real time still lives outside this surface. The detection problem was still unsolved — so I kept going.",
    },
    scorecard: {
      overall: 4,
      rows: [
        { label: CRITERIA[0], score: 3, note: "Forecasts MRR only; the other 5 KPIs still have no context." },
        { label: CRITERIA[1], score: 4, note: "Trend is implicit in the projection line, not broken out per metric." },
        { label: CRITERIA[2], score: 4, note: "Churn risk is categorical, not pointing to a specific metric moving." },
        { label: CRITERIA[3], score: 10, note: "Module lives above the grid." },
        { label: CRITERIA[4], score: 2, note: "Forecast ≠ alert. A metric quietly collapsing is not surfaced here." },
      ],
    },
  },

  C: {
    eyebrow: "Option C — shipped",
    title: "Signal Layer",
    tagline: "Persistent, ranked, statistically-intelligent. One signal at a time, push-first.",
    problem:
      "A and B both circle the detection problem without hitting it directly. A thickens the card density; B predicts the future. Neither intercepts a developer the moment something goes wrong. C reframes the problem entirely — from \"better visualization\" to \"proactive performance detection.\"",
    solves: [
      "A persistent Signal Bar at the top surfaces one ranked anomaly at a time, severity-coded, with a z-score baseline — no false-positive spiral from flat thresholds.",
      "A Slack / email push layer fires the moment a threshold is crossed — detection works whether the dashboard is open or not.",
      "Deep-link from the Signal Bar lands on the pre-filtered Charts view with the anomalous range shaded, so the diagnostic loop is one click long.",
    ],
    nextStep: {
      title: "Why this is what ships",
      body:
        "It's the only option that fixes the actual loop. Reuses existing WoW delta infrastructure (so it's feasible in V1), solves both in-dashboard and off-dashboard detection, and the z-score baseline makes the alerts trustworthy. Baseline, A, and B are still in the prototype so reviewers can feel the difference — and see why the iteration landed here.",
    },
    scorecard: {
      overall: 9,
      rows: [
        { label: CRITERIA[0], score: 10, note: "Signal Bar summarizes in one line; KPI deltas give the full scan." },
        { label: CRITERIA[1], score: 9, note: "WoW deltas on cards + z-score context on Signal Bar." },
        { label: CRITERIA[2], score: 10, note: "Ranking is the whole point — one signal, one sentence, one link." },
        { label: CRITERIA[3], score: 9, note: "Signal Bar + deltas are native; Slack is a bonus, not a replacement." },
        { label: CRITERIA[4], score: 10, note: "Push-first — intercepts the developer the moment something breaks." },
      ],
    },
  },
};

export const DESIGN_DOC: DocSection[] = [
  {
    id: "problem",
    num: "01",
    title: "Problem framing",
    lede:
      "The core issue isn't a lack of data — it's a broken detection loop. Developers can see their numbers but they cannot feel their momentum.",
    body: [
      "Three surfaces exist in isolation: a static snapshot (Overview), a deep-dive tool requiring navigation intent (Charts), and a once-weekly digest with seven-day latency (email). None of these intercept a developer at the moment something goes wrong. By the time they notice a Trial CVR decline in Friday's email, it may have been trending down since Tuesday.",
      "The real problem: developers have no ambient awareness of performance velocity. Nothing tells them something is wrong unless they go looking — or wait a week.",
    ],
  },
  {
    id: "assumptions",
    num: "02",
    title: "Assumptions & hypotheses",
    items: [
      {
        kind: "assumption",
        body: "Most users open the dashboard as a daily health check, not to investigate a known issue. They are scanning, not searching.",
      },
      {
        kind: "assumption",
        body: "WoW delta calculations already exist in the weekly email pipeline and can be surfaced in the UI with minimal new backend work.",
      },
      {
        kind: "hypothesis",
        body: "A single, statistically-contextualized signal is more actionable than six simultaneous delta indicators — because ranking reduces decision paralysis.",
      },
      {
        kind: "hypothesis",
        body: "Flat percentage thresholds (e.g. \"alert if >5%\") will erode trust quickly. MRR and Trial CVR have different natural variance profiles and require per-metric baselines.",
      },
      {
        kind: "assumption",
        body: "Negative signals are inherently more urgent and actionable than positive ones. The system should weight alert priority toward risk, not celebration.",
      },
    ],
  },
  {
    id: "options",
    num: "03",
    title: "Solution options considered",
    items: [
      {
        kind: "Option A",
        title: "Enhanced Overview cards",
        body: "Add sparklines + WoW deltas inline to existing 6 cards. Bolt on a collapsible \"Insights Pulse\" panel below. ↓ Skip — Panel will get collapsed. Hardcoded thresholds will cry wolf. Doesn't solve detection latency.",
      },
      {
        kind: "Option B",
        title: "Predictive MRR forecast",
        body: "ML-driven projections surfaced as a new dashboard module. Forecasts end-of-month revenue and churn risk. ↓ Skip — High data science lift. Forecast errors destroy trust faster than silence. Wrong tool for the detection problem.",
      },
      {
        kind: "Option C — selected",
        title: "Signal Layer",
        body: "A statistically-intelligent, persistent Signal Bar at the top of the dashboard. One ranked signal at a time. Push-first detection via Slack/email. → Ship — Highest impact, uses existing data infrastructure, solves both in-dashboard and off-dashboard detection.",
      },
    ],
  },
  {
    id: "solution",
    num: "04",
    title: "Proposed solution: Signal Layer",
    body: [
      "Signal Layer reframes the problem from \"better dashboard visualization\" to \"proactive performance detection.\" It has two components working in concert: a persistent Signal Bar inside the dashboard, and a push notification layer that operates outside it.",
      "The Signal Bar lives at the top of every dashboard page — not buried below cards, not collapsible. It surfaces exactly one signal at a time: the metric showing the most statistically significant deviation from its 30-day rolling baseline. Developers dismiss it when reviewed; the next-ranked signal surfaces. On healthy days, it shows a positive confirmation state so the space doesn't feel like a threat.",
      "Each metric is evaluated against its own z-score baseline rather than a flat percentage threshold. A 3% MRR decline that is 2.5 standard deviations from normal fires. A 6% Trial CVR swing within historical variance does not. This eliminates the false-positive spiral that erodes trust in alert systems.",
      "The existing Overview cards receive inline WoW delta badges as a secondary enhancement — a lower-effort upgrade that provides velocity context without restructuring the page.",
    ],
  },
  {
    id: "flow",
    num: "05",
    title: "User flow",
    items: [
      {
        kind: "01",
        title: "Detection — off-dashboard",
        body: "Trial CVR crosses z-score threshold at 2:14pm. Slack notification fires immediately: \"Trial CVR dropped 4.5% in the last 48h — unusual for this period. View in dashboard →\"",
      },
      {
        kind: "02",
        title: "Scan — dashboard entry",
        body: "Developer opens the dashboard. Signal Bar is the first thing they see, severity-coded amber. One signal, one sentence, one action link. They don't need to scan 6 cards to find what's wrong.",
      },
      {
        kind: "03",
        title: "Investigate — deep link to Charts",
        body: "Developer clicks \"View Trial CVR →\". They land directly on the pre-filtered Chart view for Trial CVR, scoped to the anomalous date range. A dismissible banner at the top reads \"← Flagged by Signal at 2:14pm today\" so they retain context.",
      },
      {
        kind: "04",
        title: "Dismiss — signal resolved",
        body: "Developer reviews and either identifies the cause or marks the alert as reviewed. Signal Bar updates to the next-ranked signal, or returns to healthy state. Dismissed signals are logged in a \"Past signals\" view (V2).",
      },
    ],
  },
  {
    id: "tradeoffs",
    num: "06",
    title: "Trade-offs",
    items: [
      {
        kind: "Trade-off",
        title: "Proactive, not prescriptive",
        body: "Signal Layer flags what happened and links to where — but doesn't tell developers what to do. This defers prescriptive guidance (\"pause this campaign\") until the diagnostic layer has earned trust. V2 can close this gap.",
      },
      {
        kind: "Trade-off",
        title: "One signal at a time",
        body: "Ranking and surfacing one signal sacrifices completeness for clarity. Developers with large multi-project accounts may want a broader view. A \"Past signals\" log in V2 addresses this without complicating V1.",
      },
      {
        kind: "Trade-off",
        title: "z-score vs. flat thresholds",
        body: "Per-metric statistical baselines are more accurate but require 30 days of data to calibrate. Flat thresholds could ship faster. The calibration period is worth the wait — trust in the signal system is the product's core asset.",
      },
      {
        kind: "Trade-off",
        title: "Additive, not redesigned",
        body: "Signal Layer adds to the existing Overview rather than replacing it. This minimizes cognitive load for existing users and reduces front-end scope, at the cost of a more transformative redesign opportunity.",
      },
    ],
  },
  {
    id: "validation",
    num: "07",
    title: "Validation plan",
    items: [
      {
        kind: "Pre-build",
        title: "Before shipping",
        body: "Unmoderated usability test with 5–8 current RevenueCat customers using Figma prototype. Primary task: \"Your Trial CVR just dropped — find it using the dashboard.\" Measure time-to-identification vs. live dashboard baseline. Secondary: does the healthy-state Signal Bar create false confidence or appropriate calm?",
      },
      {
        kind: "Post-launch",
        title: "After shipping",
        body: "A/B test: control (current overview) vs. Signal Layer. Primary metric: time-to-investigation (overview → Charts, measured by session navigation events). Secondary: click-through rate on Signal Bar CTA; alert dismissal rate. Qualitative: thumbs up/down on each signal (\"Was this useful?\") logged per alert.",
      },
    ],
  },
  {
    id: "timeline",
    num: "08",
    title: "Iterations & timeline",
    items: [
      {
        kind: "V1 MVP",
        title: "5 weeks",
        body: "Signal Bar (persistent, severity-coded, dismissible) + inline WoW delta badges on cards + Slack/email push notification on threshold breach + deep-link to pre-filtered Charts view. z-score baseline against 30-day rolling data. Healthy state and skeleton/empty state included.",
      },
      {
        kind: "V2",
        title: "+6 weeks",
        body: "Past signals log with dismissal history. User-configurable notification preferences (threshold sensitivity, channels). \"Recovery\" signal when metric returns to normal range. Multi-project signal aggregation for enterprise accounts.",
      },
      {
        kind: "V3",
        title: "+8 weeks",
        body: "Prescriptive guidance layer: context-aware action suggestions linked to each signal type (e.g., Trial CVR drop → \"Compare conversion by platform\" shortcut). Predictive leading indicators once trust in diagnostic layer is established.",
      },
    ],
  },
];
