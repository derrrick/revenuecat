import { useCallback, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { RANKED_SIGNALS, type Signal } from "../../data/signals";
import "./SignalBar.css";

type Mode = "signal" | "healthy" | "skeleton";

type Props = {
  emptyMode?: boolean;   // renders the "gathering data" skeleton state
};

/**
 * Option C — the Signal Bar.
 *
 * - Surfaces one ranked signal at a time (severity-coded).
 * - Dismiss cycles to the next-ranked signal; when empty, flips to the
 *   healthy state. A "reset" link reloads the stack so reviewers can cycle.
 * - Smooth 180ms fade + slide when signals swap — small, deliberate craft
 *   touch since the bar is the hero of this variant.
 */
export function SignalBar({ emptyMode }: Props) {
  const navigate = useNavigate();
  const [index, setIndex] = useState(0);
  const [leaving, setLeaving] = useState(false);

  const current: Signal | undefined = RANKED_SIGNALS[index];
  const mode: Mode = emptyMode
    ? "skeleton"
    : current
      ? "signal"
      : "healthy";

  const dismiss = useCallback(() => {
    setLeaving(true);
    window.setTimeout(() => {
      setIndex((i) => i + 1);
      setLeaving(false);
    }, 160);
  }, []);

  const reset = useCallback(() => {
    setLeaving(true);
    window.setTimeout(() => {
      setIndex(0);
      setLeaving(false);
    }, 160);
  }, []);

  const openChart = useCallback(() => {
    if (!current) return;
    navigate(`/charts/${current.chartSlug}?signal=${current.id}`);
  }, [current, navigate]);

  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (mode !== "signal") return;
      const target = e.target as HTMLElement | null;
      if (target && ["INPUT", "TEXTAREA", "SELECT"].includes(target.tagName)) return;
      if ((e.metaKey || e.ctrlKey) && e.key === "Enter") {
        e.preventDefault();
        openChart();
      }
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [mode, openChart]);

  if (mode === "skeleton") {
    return (
      <section className="sb sb--skeleton" aria-live="polite">
        <span className="sb__accent" />
        <div className="sb__inner">
          <span className="sb__skeleton-icon" />
          <div className="sb__skeleton-text">
            <span className="sb__skeleton-line sb__skeleton-line--title" />
            <span className="sb__skeleton-line sb__skeleton-line--sub" />
          </div>
          <span className="sb__skeleton-pill" />
        </div>
      </section>
    );
  }

  if (mode === "healthy") {
    return (
      <section
        className={`sb sb--healthy ${leaving ? "is-leaving" : "is-entering"}`}
        role="status"
      >
        <span className="sb__accent" />
        <div className="sb__inner">
          <span className="sb__icon sb__icon--healthy" aria-hidden>
            <CheckIcon />
          </span>
          <div className="sb__text">
            <p className="sb__headline">All metrics within normal range</p>
            <p className="sb__sentence">Nothing unusual vs your 30-day baseline over the last 7 days.</p>
          </div>
          <button className="sb__reset" onClick={reset} type="button">
            Reset demo signals
          </button>
        </div>
      </section>
    );
  }

  const sev = current!.severity;
  return (
    <section
      className={`sb sb--${sev} ${leaving ? "is-leaving" : "is-entering"}`}
      role="status"
      aria-live="polite"
      aria-label={`Signal: ${current!.metric}`}
    >
      <span className="sb__accent" />
      <div className="sb__inner">
        <span className={`sb__icon sb__icon--${sev}`} aria-hidden>
          <SeverityGlyph severity={sev} />
        </span>

        <div className="sb__text">
          <p className="sb__headline">
            <span className="sb__metric">{current!.metric}</span>
            <span className="sb__pct">{formatPct(current!.pct)}</span>
          </p>
          <p className="sb__sentence">{current!.sentence}</p>
        </div>

        <button className="sb__cta" onClick={openChart} type="button">
          <span>View in Charts</span>
          <span className="sb__cta-arrow" aria-hidden>→</span>
          <span className="sb__cta-kbd" aria-hidden>
            <kbd>⌘</kbd><kbd>↵</kbd>
          </span>
        </button>
        <button
          className="sb__dismiss"
          onClick={dismiss}
          aria-label="Dismiss signal"
          type="button"
        >
          <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
            <path
              d="M2.5 2.5L9.5 9.5M9.5 2.5L2.5 9.5"
              stroke="currentColor"
              strokeWidth="1.6"
              strokeLinecap="round"
            />
          </svg>
        </button>
      </div>
    </section>
  );
}

function formatPct(pct: number) {
  const sign = pct > 0 ? "+" : pct < 0 ? "−" : "";
  return `${sign}${Math.abs(pct).toFixed(1)}%`;
}


function SeverityGlyph({ severity }: { severity: Signal["severity"] }) {
  if (severity === "positive") {
    return (
      <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
        <path
          d="M3 9V6l2-1 2 2 2-4 2 2"
          stroke="currentColor"
          strokeWidth="1.6"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    );
  }
  // warning + critical both use an alert glyph, color comes from className
  return (
    <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
      <path
        d="M7 1.5L12.5 11.5H1.5L7 1.5Z"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinejoin="round"
      />
      <path d="M7 5.5V8" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
      <circle cx="7" cy="9.8" r="0.7" fill="currentColor" />
    </svg>
  );
}

function CheckIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
      <path
        d="M3 7.5L5.5 10L11 4"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
