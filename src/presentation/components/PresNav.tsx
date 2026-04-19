import { useEffect, useState } from "react";

export function PresNav() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    let cancelled = false;
    let raf = 0;
    let lastY = -1;

    function read() {
      if (cancelled) return;
      const y = window.scrollY;
      if (y !== lastY) {
        lastY = y;
        setScrolled(y > 40);
      }
    }

    function loop() {
      read();
      raf = requestAnimationFrame(loop);
    }
    raf = requestAnimationFrame(loop);
    const interval = window.setInterval(read, 150);
    window.addEventListener("scroll", read, { passive: true });

    return () => {
      cancelled = true;
      cancelAnimationFrame(raf);
      clearInterval(interval);
      window.removeEventListener("scroll", read);
    };
  }, []);

  return (
    <nav className={`pres-nav ${scrolled ? "is-scrolled" : ""}`}>
      <a href="/" className="pres-nav__brand">Product Design Exercise</a>
      <div className="pres-nav__links">
        <a href="#problem" className="pres-nav__link-secondary">Problem</a>
        <a href="#process" className="pres-nav__link-secondary">Process</a>
        <a href="#solution" className="pres-nav__link-secondary">Solution</a>
        <a href="/overview" className="pres-nav__link-primary">Live prototype ↗</a>
      </div>
      <div className="pres-nav__meta">
        <span>For RevenueCat · 2026</span>
      </div>
    </nav>
  );
}
