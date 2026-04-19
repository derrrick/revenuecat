import "./Problem.css";

export function Problem() {
  return (
    <section className="pres-section problem" id="problem">
      <div className="pres-section-label">
        <span className="idx">01 / Problem framing</span>
        <span className="ttl">The broken detection loop</span>
      </div>

      <div className="problem__body edge">
        <h2 className="problem__headline display">
          Developers can see their numbers, but they cannot feel their momentum.
        </h2>

        <div className="problem__column">
          <p className="mono problem__tag">Core problem</p>
          <p className="problem__p">
            The core issue isn't a lack of data — it's a broken detection loop. The current
            dashboard requires intentional investigation to surface a problem that should be
            announcing itself.
          </p>
          <p className="problem__p">
            Three surfaces exist in isolation: a static snapshot (Overview), a deep-dive tool
            requiring navigation intent (Charts), and a once-weekly digest with seven-day
            latency (email). None of these intercept a developer at the moment something goes
            wrong. By the time they notice a Trial CVR decline in Friday's email, it may have
            been trending down since Tuesday.
          </p>
          <p className="problem__emphasis">
            <span className="problem__emphasis-lede">The real problem:</span> developers have no
            ambient awareness of performance velocity. Nothing tells them something is wrong
            unless they go looking — or wait a week.
          </p>

          <p className="mono problem__tag problem__tag--second">Core assumption</p>
          <p className="problem__p">
            I'm assuming developers open the dashboard to glance at how things are going, not
            to go hunting for a specific problem. If that's wrong, the whole direction needs
            rethinking. I'm betting on the dashboard being used as a daily pulse-check.
          </p>

          <aside className="problem__keep">
            <span className="mono problem__keep-tag">Keep in mind</span>
            <p className="problem__keep-text">
              Full set of assumptions and hypotheses — one per variant — lives in the live
              prototype's design doc. Press <kbd>⌘</kbd><kbd>←</kbd> anywhere inside the app
              to open it.
            </p>
          </aside>
        </div>
      </div>
    </section>
  );
}
