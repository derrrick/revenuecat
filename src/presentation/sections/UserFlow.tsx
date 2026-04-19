import "./UserFlow.css";

const STEPS = [
  {
    n: "01",
    head: "Detect",
    body: "Trial CVR drifts outside its normal range. Slack fires in the same minute: \"Trial CVR is down 4.5% — unusual for this period.\" The developer doesn't have to be looking.",
    surface: "Slack, Email, Mobile",
  },
  {
    n: "02",
    head: "Scan",
    body: "Developer opens the dashboard. Signal Bar is the first thing they see. One ranked signal, one sentence, one action link. No scanning six cards to find what moved.",
    surface: "Overview",
  },
  {
    n: "03",
    head: "Investigate",
    body: "\"View in charts →\" lands them on the pre-filtered Chart view, scoped to the moment it happened. Suggested actions are offered to provide actionable next steps and ideas.",
    surface: "Charts",
  },
  {
    n: "04",
    head: "Resolve",
    body: "Reviewed or marked. Signal Bar moves to the next-ranked signal — or returns to healthy. A recovery notification fires when the metric is back in range.",
    surface: "Overview",
  },
];

export function UserFlow() {
  return (
    <section className="pres-section userflow">
      <div className="pres-section-label">
        <span className="idx">04 / User flow</span>
        <span className="ttl">Detect → scan → investigate → resolve</span>
      </div>

      <div className="userflow__intro edge">
        <h2 className="userflow__title display">
          Detect in minutes, not days.
        </h2>
        <p>
          The feedback loop collapses from seven days to the moment a metric drifts. Signals
          travel the path the developer already travels — they just arrive first.
        </p>
      </div>

      <ol className="userflow__track edge">
        {STEPS.map((s) => (
          <li className="userflow__step" key={s.n}>
            <div className="userflow__step-head">
              <span className="userflow__step-num display">{s.n}</span>
              <span className="mono userflow__step-surface">{s.surface}</span>
            </div>
            <h3 className="userflow__step-head-title display">{s.head}</h3>
            <p>{s.body}</p>
          </li>
        ))}
      </ol>
    </section>
  );
}
