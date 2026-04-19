import "./Timeline.css";

const PHASES = [
  {
    tag: "V1 MVP",
    weeks: "2–4 weeks",
    title: "Ship the Signal",
    body: "A persistent Signal Bar surfaces the one metric worth acting on. Matching Slack, email, and mobile notifications carry the same message everywhere a developer already is. Every alert deep-links straight to the chart where it happened. Healthy and gathering-data states cover the days the system has nothing urgent to say.",
  },
  {
    tag: "V2",
    weeks: "6–8 weeks out",
    title: "Close the loop",
    body: "A past-signals log keeps a record of every alert and how it was resolved. Preferences move into the user's hands — which channels, how sensitive. Recovery notifications fire when a metric returns to normal, so no one's left guessing whether the alert is still live. For teams running many projects, signals aggregate into a single, ranked view.",
  },
  {
    tag: "V3",
    weeks: "+8 weeks out",
    title: "Suggest the next action",
    body: "Each signal opens into suggested next moves — the common first steps for that kind of drift. A Trial CVR dip links straight to a source breakdown; a churn spike surfaces the segment driving it.",
    forwardLook: "Looking ahead to V4 — moving beyond suggested actions toward agentic actions and workflows.",
  },
] as const;

export function Timeline() {
  return (
    <section className="pres-section timeline">
      <div className="pres-section-label">
        <span className="idx">07 / Roadmap</span>
        <span className="ttl">V1 → V2 → V3</span>
      </div>

      <div className="timeline__head edge">
        <h2 className="timeline__title display">
          Future iterations and roadmap proposals.
        </h2>
        <p className="timeline__dek">
          A three-phase path forward. V1 delivers detection end-to-end. V2 closes the feedback
          loop. V3 turns each signal into a suggested next step — only after the diagnostic layer
          has proven itself.
        </p>
      </div>

      <ol className="timeline__track edge">
        {PHASES.map((p, i) => (
          <li className="phase" key={p.tag}>
            <div className="phase__marker">
              <span className="phase__num display">0{i + 1}</span>
              <span className="mono phase__tag">{p.tag}</span>
              <span className="mono phase__weeks">{p.weeks}</span>
            </div>
            <div className="phase__body">
              <h3 className="phase__title display">{p.title}</h3>
              <p>{p.body}</p>
              {"forwardLook" in p && p.forwardLook && (
                <aside className="phase__forward">
                  <span className="mono phase__forward-tag">Looking ahead · V4</span>
                  <p className="phase__forward-text">{p.forwardLook}</p>
                </aside>
              )}
            </div>
          </li>
        ))}
      </ol>
    </section>
  );
}
