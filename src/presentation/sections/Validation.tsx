import "./Validation.css";

export function Validation() {
  return (
    <section className="pres-section validation">
      <div className="pres-section-label">
        <span className="idx">06 / Validation plan</span>
        <span className="ttl">How we'll know it worked</span>
      </div>

      <div className="validation__head edge">
        <h2 className="validation__title display">
          Proof beats belief.
        </h2>
      </div>

      <div className="validation__grid edge">
        <article className="validation__col">
          <header>
            <span className="mono">Before shipping</span>
            <h3 className="validation__subtitle display">Prototype test</h3>
          </header>
          <ul>
            <li>Unmoderated study with 5–8 current RevenueCat customers using a vibe coded prototype.</li>
            <li>Primary task: <em>"Your Trial CVR just dropped — find it using the dashboard."</em></li>
            <li>Measure time-to-identification against the live dashboard baseline.</li>
            <li>Secondary: does the healthy-state Signal Bar create false confidence or appropriate calm?</li>
          </ul>
        </article>
        <article className="validation__col">
          <header>
            <span className="mono">After shipping</span>
            <h3 className="validation__subtitle display">Live experiment</h3>
          </header>
          <ul>
            <li>A/B test: control (current overview) vs. Signal Layer.</li>
            <li>Primary: time-to-investigation, measured via session navigation events.</li>
            <li>Secondary: click-through on Signal Bar CTA; alert dismissal rate; false-positive thumbs down.</li>
            <li>Qualitative: per-alert "Was this useful?" logged and aggregated by metric.</li>
          </ul>
        </article>
      </div>
    </section>
  );
}
