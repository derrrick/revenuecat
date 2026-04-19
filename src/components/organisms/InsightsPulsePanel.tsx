import { useState } from "react";
import { Link } from "react-router-dom";
import { INSIGHTS, type Severity } from "../../data/signals";
import "./InsightsPulsePanel.css";

/**
 * Option A — collapsible panel rendered below the KPI grid.
 *
 * Intentionally designed so the weakness the doc calls out is visible: the
 * panel starts collapsed, so detection still requires intent. When expanded,
 * three insights stack with timestamps and a per-row deep link into Charts.
 */
export function InsightsPulsePanel() {
  const [open, setOpen] = useState(false);
  const criticalCount = INSIGHTS.filter((i) => i.severity === "critical").length;

  return (
    <section className={`ipp ${open ? "ipp--open" : ""}`}>
      <button
        className="ipp__head"
        onClick={() => setOpen((o) => !o)}
        aria-expanded={open}
      >
        <span className="ipp__head-left">
          <span className="ipp__icon" aria-hidden>
            <PulseIcon />
          </span>
          <span className="ipp__title">Insights Pulse</span>
          <span className="ipp__count">
            {INSIGHTS.length} insights
            {criticalCount > 0 && (
              <span className="ipp__count-critical"> · {criticalCount} critical</span>
            )}
          </span>
        </span>
        <span className="ipp__caret" aria-hidden>
          <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
            <path d="M2 3.5L5 6.5L8 3.5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </span>
      </button>

      {open && (
        <ul className="ipp__list">
          {INSIGHTS.map((insight) => (
            <li key={insight.id} className="ipp__row">
              <span className={`ipp__dot ipp__dot--${insight.severity}`} aria-hidden />
              <div className="ipp__row-body">
                <div className="ipp__row-top">
                  <span className="ipp__row-title">{insight.title}</span>
                  <span className={`ipp__sev-label ipp__sev-label--${insight.severity}`}>
                    {sevLabel(insight.severity)}
                  </span>
                </div>
                <p className="ipp__row-copy">{insight.body}</p>
              </div>
              <div className="ipp__row-right">
                <time className="ipp__ts">{insight.timestamp}</time>
                <Link className="ipp__link" to={`/charts/${insight.chartSlug}`}>
                  View →
                </Link>
              </div>
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}

function sevLabel(s: Severity) {
  switch (s) {
    case "critical": return "Critical";
    case "warning":  return "Warning";
    case "positive": return "Positive";
    default:         return "Info";
  }
}

function PulseIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
      <path
        d="M1 7h2.2l1.5-4 2.6 8 1.8-4H13"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
