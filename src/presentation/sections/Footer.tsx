import "./Footer.css";

export function Footer() {
  return (
    <footer className="pres-footer">
      <div className="pres-footer__body edge">
        <span className="mono pres-footer__eyebrow">08 / Try it</span>

        <a className="pres-footer__cta" href="/overview?picker=open" aria-label="Open the live prototype">
          <span className="pres-footer__cta-label">Explore the live prototype</span>
          <span className="pres-footer__cta-arrow" aria-hidden>→</span>
        </a>

        <p className="pres-footer__note">
          Opens the working dashboard with Baseline, A, B, and C variants built.
          Press <kbd>⌘</kbd><kbd>V</kbd> inside the app to toggle between them. You can also use{" "}
          <kbd>⌘</kbd><kbd>←</kbd> to view my thought process.
        </p>
      </div>

      <div className="pres-footer__bottom edge">
        <span className="mono">Product design exercise · 2026</span>
        <span className="mono">For RevenueCat</span>
      </div>
    </footer>
  );
}
