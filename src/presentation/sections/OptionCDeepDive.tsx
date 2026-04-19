import { useState } from "react";
import { VariantCState } from "../components/VariantCState";
import { VariantCanvas } from "../components/VariantCanvas";
import { NotificationsMock, SuggestionsMock, TrendTooltipMock } from "../components/DeepDiveMocks";
import "./OptionCDeepDive.css";

type State = "signal" | "healthy";

const STATE_COPY: Record<State, { label: string; tag: string; title: string; body: string }> = {
  signal: {
    label: "Warning",
    tag: "Warning state",
    title: "Intercepts without interrupting.",
    body: "Trial CVR is down 4.5% — unusual for this period. One ranked signal, one sentence, one action link. Scanning replaces investigation.",
  },
  healthy: {
    label: "Healthy",
    tag: "Healthy state",
    title: "Peace of mind, all-clear.",
    body: "When nothing is wrong, the space reads as confidence — not threat. The Signal Bar never goes empty or ambiguous. Trust is built in both directions.",
  },
};

const MOBILE_MOCKS = [
  { key: "push",     label: "Push notification",     note: "Lock-screen alert. One metric, one number, one action.",        src: "/mocks/01.png" },
  { key: "expanded", label: "Expanded notification", note: "Long-press reveals the supporting sentence and a deep link.",  src: "/mocks/02.png" },
  { key: "app",      label: "Mobile dashboard",      note: "The warning state of the dashboard, on a phone.",              src: "/mocks/03.png" },
] as const;

export function OptionCDeepDive() {
  const [state, setState] = useState<State>("signal");
  const copy = STATE_COPY[state];

  return (
    <section className="pres-section deepdive" id="solution">
      <div className="pres-section-label">
        <span className="idx">03 / The selected direction</span>
        <span className="ttl">Signal Layer — statistical, proactive, one at a time</span>
      </div>

      <div className="deepdive__intro edge">
        <h2 className="deepdive__title display">
          One signal, ranked by how far it's drifted from its own normal.
        </h2>
        <div className="deepdive__intro-side">
          <p>
            Signal Layer reframes the problem from <em>"better dashboard visualization"</em> to
            <em> "proactive performance detection."</em> A persistent Signal Bar inside the
            dashboard, plus a push notification layer that operates outside it.
          </p>
          <p>
            Every metric learns its own rhythm. A 3% MRR decline that's clearly outside its
            normal range fires a signal. A 6% Trial CVR swing that's within how that metric
            usually behaves does not. That's what keeps the signal worth trusting.
          </p>
        </div>
      </div>

      <div className="deepdive__stage edge">
        <div className="deepdive__controls">
          <span className="mono deepdive__controls-label">State</span>
          <div className="deepdive__seg">
            {(Object.keys(STATE_COPY) as State[]).map((s) => (
              <button
                key={s}
                className={`deepdive__seg-btn ${state === s ? "is-active" : ""}`}
                onClick={() => setState(s)}
                type="button"
              >
                {STATE_COPY[s].label}
              </button>
            ))}
          </div>
        </div>

        <div className="deepdive__preview">
          <VariantCanvas key={state} width={1200} height={760} scale={0.62}>
            <VariantCState state={state} />
          </VariantCanvas>
        </div>

        <div className="deepdive__caption">
          <span className="mono deepdive__caption-tag">{copy.tag}</span>
          <h3 className="deepdive__caption-title display">{copy.title}</h3>
          <p>{copy.body}</p>
        </div>
      </div>

      {/* Dashboard-header focus */}
      <div className="deepdive__focus edge">
        <div className="deepdive__focus-copy">
          <span className="mono">Dashboard chrome</span>
          <h3 className="deepdive__focus-title display">
            The hierarchy begins with health signals.
          </h3>
          <p>
            The Signal Bar sits at the top of the dashboard chrome — the first thing a developer
            sees when they open the page. No panel to expand, no tab to click. The alert is the
            header.
          </p>
        </div>
        <div className="deepdive__focus-preview">
          <VariantCanvas width={1200} height={200} scale={0.78}>
            <VariantCState state="signal" />
          </VariantCanvas>
        </div>
      </div>

      {/* Push layer — Slack notifications */}
      <div className="deepdive__feature edge">
        <div className="deepdive__feature-copy">
          <span className="mono">Push layer</span>
          <h3 className="deepdive__feature-title display">
            The same signal, wherever you are.
          </h3>
          <p>
            When a metric drifts, the signal travels. A Slack message fires in the same minute —
            not in Friday's digest. When the metric recovers, a follow-up closes the loop. No
            one left wondering whether the alert is still live.
          </p>
          <ul className="deepdive__channels">
            <li>
              <span className="mono deepdive__channels-label">Slack</span>
              <span>Per-project channel routing with @mentions on critical signals.</span>
            </li>
            <li>
              <span className="mono deepdive__channels-label">Email</span>
              <span>Real-time alerts replace the old weekly digest; recovery follow-ups included.</span>
            </li>
            <li>
              <span className="mono deepdive__channels-label">Mobile push</span>
              <span>iOS and Android lock-screen alerts with a deep link into the flagged chart.</span>
            </li>
            <li>
              <span className="mono deepdive__channels-label">Webhooks</span>
              <span>Pipe every signal into PagerDuty, Opsgenie, or anything else on-call already uses.</span>
            </li>
          </ul>
        </div>
        <div className="deepdive__feature-preview">
          <NotificationsMock />
        </div>
      </div>

      {/* Proactive help — Charts-page conversion suggestions */}
      <div className="deepdive__feature deepdive__feature--reversed edge">
        <div className="deepdive__feature-copy">
          <span className="mono">Proactive help</span>
          <h3 className="deepdive__feature-title display">
            Detection opens a starting point, not a blank stare.
          </h3>
          <p>
            Clicking through to the chart doesn't leave the developer alone with a line graph.
            Three contextual suggestions appear beneath the chart, providing guidance and
            suggesting options to mitigate the issue.
          </p>
        </div>
        <div className="deepdive__feature-preview">
          <SuggestionsMock />
        </div>
      </div>

      {/* Tile-level pulse — WoW trend + tooltip */}
      <div className="deepdive__feature edge">
        <div className="deepdive__feature-copy">
          <span className="mono">Tile-level pulse</span>
          <h3 className="deepdive__feature-title display">
            Every tile carries its own week-over-week signal.
          </h3>
          <p>
            Each KPI gets a small week-over-week delta pill. Hovering reveals a one-sentence
            interpretation — not just the number, but how to read it against the 30-day baseline.
            Ambient awareness, not interrogation.
          </p>
        </div>
        <div className="deepdive__feature-preview">
          <TrendTooltipMock />
        </div>
      </div>

      {/* Mobile iOS mock placeholders */}
      <div className="deepdive__mobile edge">
        <div className="deepdive__mobile-head">
          <span className="mono">Mobile</span>
          <h3 className="deepdive__mobile-title display">
            Away from the desk, still in the loop.
          </h3>
          <p>
            The same signal travels to iOS. Lock screen, expanded, or on the mobile dashboard —
            the message and action stay consistent across surfaces.
          </p>
        </div>
        <div className="deepdive__mobile-grid">
          {MOBILE_MOCKS.map((m) => (
            <figure className="mobile-mock" key={m.key} data-kind={m.key}>
              <div className="mobile-mock__frame">
                <img src={m.src} alt={`${m.label} — iOS mock`} loading="lazy" />
              </div>
              <figcaption>
                <span className="mono mobile-mock__label">{m.label}</span>
                <p>{m.note}</p>
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}
