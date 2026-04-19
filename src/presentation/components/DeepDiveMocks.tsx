import "./DeepDiveMocks.css";

/**
 * Static, CSS-only recreations of three feature moments from the live prototype.
 * They live in the deep-dive section so reviewers can see the surfaces that
 * accompany the Signal Bar — even while the prototype itself is one click
 * away behind the "Live prototype" link.
 */

/* ------------------------------------------------------------------
   Push Layer — Slack signal notifications
------------------------------------------------------------------ */
export function NotificationsMock() {
  return (
    <div className="mock mock--notifications" role="img" aria-label="Slack signal notifications preview">
      <header className="mock__head">
        <span className="mock__eyebrow">Push layer</span>
        <h4 className="mock__kicker">Signal notifications</h4>
        <p className="mock__blurb">Sample Slack messages that fire when a metric drifts — and the recovery follow-up that closes the loop.</p>
      </header>

      <article className="slack-card slack-card--warning">
        <span className="slack-card__accent" />
        <div className="slack-card__row">
          <span className="slack-card__avatar">RC</span>
          <span className="slack-card__name">RevenueCat</span>
          <span className="slack-card__badge">APP</span>
          <span className="slack-card__meta">#revenuecat-alerts <span>·</span> 2:14 PM</span>
        </div>
        <p className="slack-card__title">Trial CVR dropped 4.5% in the last 48h</p>
        <p className="slack-card__body">This is well below Dipsea's 30-day baseline for Trial CVR. Driven primarily by the iOS App Store.</p>
        <button type="button" className="slack-card__cta slack-card__cta--solid">View in Dashboard</button>
      </article>

      <article className="slack-card slack-card--recovered">
        <span className="slack-card__accent" />
        <div className="slack-card__row">
          <span className="slack-card__avatar">RC</span>
          <span className="slack-card__name">RevenueCat</span>
          <span className="slack-card__badge">APP</span>
          <span className="slack-card__meta">#revenuecat-alerts <span>·</span> Just now</span>
        </div>
        <p className="slack-card__title">Trial CVR has recovered</p>
        <p className="slack-card__body">Dipsea's Trial CVR is back within its 30-day baseline. Alert is now closed.</p>
        <button type="button" className="slack-card__cta slack-card__cta--ghost">Review signal history</button>
      </article>
    </div>
  );
}

/* ------------------------------------------------------------------
   Proactive help — conversion suggestions on the Charts page
------------------------------------------------------------------ */
export function SuggestionsMock() {
  return (
    <div className="mock mock--suggestions" role="img" aria-label="Conversion suggestions preview">
      <header className="mock__chart-head">
        <h4 className="mock__chart-title">Active Trials <span className="mock__chart-info" aria-hidden="true">ⓘ</span></h4>
      </header>

      <div className="mock__chart">
        <svg viewBox="0 0 400 140" preserveAspectRatio="none" className="mock__chart-svg" aria-hidden="true">
          <rect x="285" y="0" width="115" height="140" fill="rgba(242, 84, 91, 0.12)" />
          <polyline
            fill="none"
            stroke="#E79462"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            points="0,80 18,72 36,74 54,68 72,62 90,58 108,56 126,50 144,48 162,44 180,46 198,48 216,52 234,56 252,60 270,66 288,88 306,92 324,94 342,96 360,98 378,99 400,100"
          />
          <circle cx="400" cy="100" r="3.5" fill="#E79462" />
        </svg>
        <div className="mock__chart-axis">
          <span>Mar 22</span><span>Mar 27</span><span>Apr 01</span><span>Apr 06</span><span>Apr 11</span><span>Apr 16</span>
        </div>
      </div>

      <div className="mock__suggestions-head">
        <h5>Conversion suggestions</h5>
        <p>Trial CVR is down 4.5%. A few things that often help.</p>
      </div>

      <ol className="mock__suggestions-list">
        <li>
          <span className="mock__sugg-num">1</span>
          <div>
            <p className="mock__sugg-title">Did you check CVR by source?</p>
            <p className="mock__sugg-sub">iOS App Store looks like the biggest contributor to the dip.</p>
          </div>
          <a className="mock__sugg-cta">Segment by source →</a>
        </li>
        <li>
          <span className="mock__sugg-num">2</span>
          <div>
            <p className="mock__sugg-title">Have you tried a shorter trial?</p>
            <p className="mock__sugg-sub">Moving the paywall earlier often lifts CVR by a point or two.</p>
          </div>
          <a className="mock__sugg-cta">Draft an A/B test →</a>
        </li>
        <li>
          <span className="mock__sugg-num">3</span>
          <div>
            <p className="mock__sugg-title">Consider pausing the weakest campaign.</p>
            <p className="mock__sugg-sub">If one campaign is dragging the metric, you can stop the bleed in a click.</p>
          </div>
          <a className="mock__sugg-cta">Review campaigns →</a>
        </li>
      </ol>
    </div>
  );
}

/* ------------------------------------------------------------------
   KPI tile — week-over-week trend pill + tooltip
------------------------------------------------------------------ */
export function TrendTooltipMock() {
  return (
    <div className="mock mock--trend" role="img" aria-label="KPI tile with week-over-week trend tooltip preview">
      <article className="kpi-card">
        <header className="kpi-card__head">
          <span className="kpi-card__title">Active Trials</span>
          <span className="kpi-card__pill">↓ −2.1%</span>
          <span className="kpi-card__icon" aria-hidden="true">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M6 2v6a6 6 0 0 0 12 0V2"/><path d="M6 22v-6a6 6 0 0 1 12 0v6"/><path d="M4 2h16"/><path d="M4 22h16"/></svg>
          </span>
        </header>
        <p className="kpi-card__value">43</p>
        <p className="kpi-card__sub">In total</p>
        <svg viewBox="0 0 300 60" preserveAspectRatio="none" className="kpi-card__spark" aria-hidden="true">
          <defs>
            <linearGradient id="spark-fill" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="rgba(231, 148, 98, 0.35)" />
              <stop offset="100%" stopColor="rgba(231, 148, 98, 0)" />
            </linearGradient>
          </defs>
          <path d="M0 40 L20 30 L40 36 L60 28 L80 34 L100 22 L120 28 L140 18 L160 26 L180 32 L200 22 L220 30 L240 26 L260 32 L280 28 L300 36 L300 60 L0 60 Z" fill="url(#spark-fill)" />
          <polyline fill="none" stroke="#E79462" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" points="0,40 20,30 40,36 60,28 80,34 100,22 120,28 140,18 160,26 180,32 200,22 220,30 240,26 260,32 280,28 300,36" />
        </svg>
      </article>

      <div className="kpi-tooltip" role="tooltip">
        <p>Active Trials down 2.1% WoW. Slightly below the 30-day average — watch in conjunction with the Trial CVR signal, which is showing a stronger anomaly.</p>
        <span className="kpi-tooltip__tail" aria-hidden="true" />
      </div>
    </div>
  );
}
