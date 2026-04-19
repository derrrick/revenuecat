import { useEffect } from "react";
import { useVersion } from "../../version/useVersion";
import {
  DESIGN_DOC,
  VARIANT_DEEP_DIVES,
  type VariantDeepDive,
} from "../../data/designDoc";
import "./ContextBlade.css";

type Props = {
  open: boolean;
  onClose: () => void;
};

/**
 * Left-side blade that surfaces relevant design-doc context for whatever
 * variant / page the reviewer is currently looking at. Opens with ⌘←.
 * Auto-focuses the section that best matches the current context so the
 * reviewer lands on the prose that explains what they see — but the rest
 * of the doc is right there, in order, scrollable.
 */
export function ContextBlade({ open, onClose }: Props) {
  const { version } = useVersion();

  useEffect(() => {
    if (!open) return;
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") onClose();
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, onClose]);

  return (
    <>
      <div
        className={`cb-scrim ${open ? "is-open" : ""}`}
        onClick={onClose}
        aria-hidden={!open}
      />
      <aside
        className={`cb ${open ? "is-open" : ""}`}
        aria-label="Design doc context"
        aria-hidden={!open}
      >
        <header className="cb__head">
          <div className="cb__head-text">
            <p className="cb__eyebrow">Design doc</p>
            <h2 className="cb__title">Signal Layer</h2>
            <p className="cb__sub">RevenueCat dashboard — product design exercise</p>
          </div>
          <button className="cb__close" onClick={onClose} aria-label="Close" type="button">
            ×
          </button>
        </header>

        <div className="cb__body">
          {/* Variant-specific deep-dive + scorecard. */}
          <DeepDive variant={version} />

          {/* Shared design-doc sections, collapsed by default so the blade
              leads with the variant-specific narrative. Reviewers expand
              the sections they care to read. */}
          {DESIGN_DOC.map((section) => (
            <details key={section.id} className="cb-sec">
              <summary className="cb-sec__head">
                <span className="cb-sec__num">{section.num}</span>
                <h3 className="cb-sec__title">{section.title}</h3>
                <span className="cb-sec__chev" aria-hidden>
                  <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                    <path
                      d="M3 4.5L6 7.5L9 4.5"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </span>
              </summary>

              <div className="cb-sec__body">
                {section.lede && <p className="cb-sec__lede">{section.lede}</p>}
                {section.body?.map((p, i) => (
                  <p key={i} className="cb-sec__p">{p}</p>
                ))}
                {section.items && (
                  <ul className="cb-sec__items">
                    {section.items.map((item, i) =>
                      typeof item === "string" ? (
                        <li key={i} className="cb-item cb-item--plain">{item}</li>
                      ) : (
                        <li key={i} className="cb-item">
                          <span className={`cb-item__kind cb-item__kind--${kindSlug(item.kind)}`}>
                            {item.kind}
                          </span>
                          {item.title && <p className="cb-item__title">{item.title}</p>}
                          <p className="cb-item__body">{item.body}</p>
                        </li>
                      ),
                    )}
                  </ul>
                )}
              </div>
            </details>
          ))}
        </div>

        <footer className="cb__foot">
          <span>
            <kbd>⌘</kbd>
            <kbd>←</kbd> to toggle · Esc to close
          </span>
        </footer>
      </aside>
    </>
  );
}

function kindSlug(kind: string): string {
  return kind
    .toLowerCase()
    .replace(/—.*$/, "")
    .trim()
    .replace(/[^a-z0-9]+/g, "-");
}

// ---------- DeepDive block --------------------------------------------------

function DeepDive({ variant }: { variant: "Baseline" | "A" | "B" | "C" }) {
  const dd: VariantDeepDive = VARIANT_DEEP_DIVES[variant];
  return (
    <section className={`cb-dd cb-dd--${variant}`}>
      <div className="cb-dd__head">
        <span className="cb-dd__eyebrow">{dd.eyebrow}</span>
        <h3 className="cb-dd__title">{dd.title}</h3>
        <p className="cb-dd__tagline">{dd.tagline}</p>
      </div>

      <div className="cb-dd__block">
        <h4 className="cb-dd__block-title">The problem</h4>
        <p className="cb-dd__p">{dd.problem}</p>
      </div>

      <div className="cb-dd__block">
        <h4 className="cb-dd__block-title">What this version solves</h4>
        <ul className="cb-dd__solves">
          {dd.solves.map((s, i) => (
            <li key={i} className="cb-dd__solve">
              <span className="cb-dd__solve-num">{i + 1}</span>
              <span className="cb-dd__solve-body">{s}</span>
            </li>
          ))}
        </ul>
      </div>

      <div className={`cb-dd__next cb-dd__next--${variant}`}>
        <p className="cb-dd__next-title">{dd.nextStep.title}</p>
        <p className="cb-dd__next-body">{dd.nextStep.body}</p>
      </div>

      <div className="cb-dd__scorecard">
        <div className="cb-dd__sc-head">
          <h4 className="cb-dd__block-title">Scorecard</h4>
          <span className={`cb-dd__sc-overall cb-dd__sc-overall--${variant}`}>
            {dd.scorecard.overall}<span className="cb-dd__sc-denom">/10</span>
          </span>
        </div>
        <p className="cb-dd__sc-lede">
          Scored against the five criteria derived from the exercise's problem statement.
        </p>
        <ul className="cb-dd__sc-rows">
          {dd.scorecard.rows.map((row, i) => (
            <li key={i} className="cb-dd__sc-row">
              <div className="cb-dd__sc-row-head">
                <span className="cb-dd__sc-label">{row.label}</span>
                <span className={`cb-dd__sc-score cb-dd__sc-score--${tierFor(row.score)}`}>
                  {row.score}<span className="cb-dd__sc-denom">/10</span>
                </span>
              </div>
              <div className="cb-dd__sc-bar">
                <span
                  className={`cb-dd__sc-bar-fill cb-dd__sc-bar-fill--${tierFor(row.score)}`}
                  style={{ width: `${row.score * 10}%` }}
                />
              </div>
              <p className="cb-dd__sc-note">{row.note}</p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

function tierFor(score: number): "high" | "mid" | "low" {
  if (score >= 8) return "high";
  if (score >= 5) return "mid";
  return "low";
}
