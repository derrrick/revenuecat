import "./Hero.css";

export function Hero() {
  return (
    <section className="hero">
      <div className="hero__kicker mono">
        <span>Product Design Exercise · 2026</span>
      </div>

      <h1 className="hero__title">
        <span className="line-wrap"><span className="line" style={{ animationDelay: "0.1s" }}>A product design</span></span>
        <span className="line-wrap"><span className="line" style={{ animationDelay: "0.2s" }}>exercise for</span></span>
        <span className="line-wrap"><span className="line" style={{ animationDelay: "0.3s" }}>RevenueCat.</span></span>
      </h1>

      <p className="hero__dek" style={{ animationDelay: "0.7s" }}>
        A conceptual direction for the dashboard — proposing <em>Signal Layer</em>, a proactive
        performance-detection system built on top of the existing Overview.
      </p>

      <div className="hero__meta mono">
        <div style={{ animationDelay: "0.85s" }}><span>Discipline</span>Staff Product Design</div>
        <div style={{ animationDelay: "0.93s" }}><span>Format</span>Conceptual direction + prototype</div>
        <div style={{ animationDelay: "1.01s" }}><span>Date</span>April 2026</div>
      </div>
    </section>
  );
}
