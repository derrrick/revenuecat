import "./Tradeoffs.css";

const ITEMS = [
  {
    head: "Proactive, not prescriptive",
    body: "Signal Layer flags what happened and links to where — but stops short of prescribing a specific fix until the diagnostic layer has earned trust.",
    counter: "Conversion suggestions already open a proactive path beneath each flagged chart",
  },
  {
    head: "One signal at a time",
    body: "Ranking sacrifices completeness for clarity. Developers with large multi-project accounts may want a broader view, but V1 is deliberate about pointing to a single, most-worth-looking-at thing.",
    counter: "V2 adds a past-signals log",
  },
  {
    head: "Learned baselines, not fixed thresholds",
    body: "Each metric learns its own normal over thirty days before it can fire a signal. Fixed thresholds would ship faster, but they'd alert on noise within a week — and trust in the signal is the whole point.",
    counter: "A skeleton banner with editable preferences bridge the calibration window",
  },
  {
    head: "Additive, not a redesign",
    body: "Signal Layer sits on top of the existing Overview rather than replacing it. Lower cognitive cost for current users and a tighter engineering scope, at the cost of a flashier moment.",
    counter: "Once trust compounds, the page can change",
  },
];

export function Tradeoffs() {
  return (
    <section className="pres-section tradeoffs">
      <div className="pres-section-label">
        <span className="idx">05 / Trade-offs</span>
        <span className="ttl">What we chose, what we deferred</span>
      </div>

      <div className="tradeoffs__head edge">
        <h2 className="tradeoffs__title display">
          So, what were the trade-offs?
        </h2>
      </div>

      <div className="tradeoffs__grid edge">
        {ITEMS.map((item, i) => (
          <article className="tradeoff" key={item.head}>
            <span className="mono tradeoff__idx">{String(i + 1).padStart(2, "0")}</span>
            <h3 className="tradeoff__head display">{item.head}</h3>
            <p className="tradeoff__body">{item.body}</p>
            <div className="tradeoff__counter">
              <span className="mono">What follows</span>
              <p>{item.counter}</p>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
