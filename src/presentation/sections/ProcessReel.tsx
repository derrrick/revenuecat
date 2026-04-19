import { useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { gsap } from "gsap";
import { OverviewVariantBaseline } from "../../screens/variants/OverviewVariantBaseline";
import { OverviewVariantA } from "../../screens/variants/OverviewVariantA";
import { OverviewVariantB } from "../../screens/variants/OverviewVariantB";
import { OverviewVariantC } from "../../screens/variants/OverviewVariantC";
import { VariantCanvas } from "../components/VariantCanvas";
import "./ProcessReel.css";

const CARDS = [
  {
    idx: "00",
    name: "Baseline",
    href: "/overview?v=baseline",
    verdict: { label: "Provided", kind: "given" },
    accent: "var(--ink-muted)",
    headline: "Status Quo",
    body: "Six KPIs cards provide at-a-glance metrics, but are not easily digestive or proactive. The detection problem is invisible because nothing surfaces it.",
    tag: "Starting point",
    bodyExtra: "The dashboard today already has the data. What it doesn't have is a way to surface the one metric that's actually moving — which is where every exploration below begins.",
    component: <OverviewVariantBaseline />,
  },
  {
    idx: "A",
    name: "Option A",
    href: "/overview?v=a",
    verdict: { label: "Iteration 1", kind: "iteration" },
    accent: "var(--rc-red)",
    headline: "Insights pulse + diff pills",
    body: "WoW deltas inline on existing tiles, a collapsible Insights Pulse panel below. A familiar upgrade that tinkers at the edges.",
    tag: "Why it failed",
    bodyExtra: "I liked the pulse idea, but I think it is too de-emphasized. I ended up keeping the diff pills.",
    component: <OverviewVariantA />,
  },
  {
    idx: "B",
    name: "Option B",
    href: "/overview?v=b",
    verdict: { label: "Iteration 2", kind: "iteration" },
    accent: "var(--rc-blue)",
    headline: "Predictive forecast",
    body: "ML-driven end-of-month projections as a new module. Might be something here, but feels like it's adding complexity instead of reducing cognitive overhead could cause more confusion rather than providing clarity and peace of mind.",
    tag: "Why it failed",
    bodyExtra: "High data-science lift before any value lands. Forecast errors destroy trust faster than silence ever would. Wrong tool for the detection problem.",
    component: <OverviewVariantB />,
  },
  {
    idx: "C",
    name: "Option C",
    href: "/overview?v=c",
    verdict: { label: "Selected", kind: "selected" },
    accent: "var(--rc-green)",
    headline: "Signal Layer",
    body: "One statistically-significant signal at a time, at the top of the page, with a matching push notification when you're away. Ranking replaces noise.",
    tag: "Why it wins",
    bodyExtra: "One clear actionable metric, surfaced front and center. Uses data infrastructure that already exists. Solves both in-dashboard and off-dashboard detection. Trust compounds with every accurate signal.",
    component: <OverviewVariantC />,
  },
] as const;

export function ProcessReel() {
  const rootRef = useRef<HTMLElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const root = rootRef.current;
    const track = trackRef.current;
    if (!root || !track) return;

    // Desktop only — phones/tablets use native horizontal snap-scroll via CSS.
    const mq = window.matchMedia("(min-width: 901px)");
    if (!mq.matches) return;

    const ctx = gsap.context(() => {
      const scrollDistance = () => track.scrollWidth - window.innerWidth;
      const tween = gsap.to(track, {
        x: () => -scrollDistance(),
        ease: "none",
        scrollTrigger: {
          trigger: root,
          start: "top top",
          end: () => `+=${scrollDistance()}`,
          pin: true,
          scrub: 0.6,
          invalidateOnRefresh: true,
          anticipatePin: 1,
        },
      });
      return () => {
        tween.kill();
      };
    }, root);

    return () => ctx.revert();
  }, []);

  return (
    <section className="pres-section process" id="process" ref={rootRef}>
      <div className="pres-section-label">
        <span className="idx">02 / Process</span>
        <span className="ttl">The four paths considered</span>
      </div>

      <div className="process__head edge">
        <h3 className="process__headline display">My process</h3>
        <p className="process__dek">
          Three paths were explored before Signal Layer. Each is a real, running prototype —
          not a static mock. Scroll through to see why the chosen solution wasn't obvious.
        </p>
      </div>

      <div className="process__track" ref={trackRef}>
        {CARDS.map((card) => (
          <Link to={card.href} className="process__card" key={card.idx} aria-label={`Open ${card.name} in the live prototype`}>
            <header className="process__card-head">
              <div className="process__card-idx">
                <span className="process__card-dot" style={{ background: card.accent }} />
                <span className="mono">Option {card.idx}</span>
              </div>
              <span className={`process__verdict process__verdict--${card.verdict.kind}`}>
                {card.verdict.label}
              </span>
            </header>

            <h3 className="process__card-title display">{card.headline}</h3>

            <div className="process__card-preview">
              <VariantCanvas width={1200} height={620} scale={0.42}>
                {card.component}
              </VariantCanvas>
            </div>

            <div className="process__card-body">
              <p>{card.body}</p>
              {"bodyExtra" in card && card.bodyExtra && (
                <div className="process__card-extra">
                  <span className="mono process__card-tag">{card.tag}</span>
                  <p>{card.bodyExtra}</p>
                </div>
              )}
              <span className="process__card-cta mono">View in prototype</span>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
