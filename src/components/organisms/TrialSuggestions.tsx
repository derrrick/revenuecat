import { CatIcon } from "../../icons/CatIcon";
import "./TrialSuggestions.css";

/**
 * V3 preview — prescriptive guidance layer. Rendered on the Active Trials
 * chart page when the reviewer is on Option C, between the chart and the
 * summary table. Acts as a live example of the "next evolution" mentioned
 * in section 08 of the design doc.
 *
 * Content is context-specific to Trial CVR being down 4.5% / 2.7σ below
 * baseline — each suggestion is a concrete, one-click-to-act next step.
 */

type Suggestion = {
  title: string;
  body: string;
  cta: string;
};

const SUGGESTIONS: Suggestion[] = [
  {
    title: "Did you check CVR by source?",
    body: "iOS App Store looks like the biggest contributor to the dip.",
    cta: "Segment by source",
  },
  {
    title: "Have you tried a shorter trial?",
    body: "Moving the paywall earlier often lifts CVR by a point or two.",
    cta: "Draft an A/B test",
  },
  {
    title: "Consider pausing the weakest campaign.",
    body: "If one campaign is dragging the metric, you can stop the bleed in a click.",
    cta: "Review campaigns",
  },
];

export function TrialSuggestions() {
  return (
    <section className="ts" aria-label="Suggested actions for Trial CVR recovery">
      <header className="ts__head">
        <div className="ts__head-left">
          <h3 className="ts__title">Conversion Suggestions</h3>
          <p className="ts__sub">
            Trial CVR is down 4.5%. A few things that often help.
          </p>
        </div>
        <button className="ts__dismiss" aria-label="Dismiss suggestions" type="button">
          <CatIcon name="close" size={14} />
        </button>
      </header>

      <ol className="ts__list">
        {SUGGESTIONS.map((s, i) => (
          <li key={s.title} className="ts__item">
            <span className="ts__num">{i + 1}</span>
            <div className="ts__body">
              <p className="ts__item-title">{s.title}</p>
              <p className="ts__item-text">{s.body}</p>
            </div>
            <button className="ts__cta" type="button">
              <span>{s.cta}</span>
              <span className="ts__cta-arrow" aria-hidden>→</span>
            </button>
          </li>
        ))}
      </ol>
    </section>
  );
}
