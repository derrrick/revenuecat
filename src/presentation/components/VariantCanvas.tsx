import { useLayoutEffect, useRef, useState, type ReactNode } from "react";
import "./VariantCanvas.css";

type Props = {
  children: ReactNode;
  /** Native render width of the variant in px. Defaults to 1200 (dashboard content width). */
  width?: number;
  /** Native render height in px. Controls how much of the variant is visible before clipping. */
  height?: number;
  /** CSS scale applied to fit the canvas into its card on desktop. Auto-downscales
   *  further on narrow viewports so the canvas never exceeds its container width. */
  scale?: number;
};

/**
 * Renders a dashboard variant (e.g. <OverviewVariantC />) inside a simulated
 * white Paper frame scoped to the dashboard's design tokens. Variants stay
 * 100% untouched; we just wrap them so their PP Object Sans / --surface-*
 * tokens cascade correctly when embedded inside the presentation layer.
 *
 * On mobile, the canvas measures its parent's available width and shrinks
 * the scale dynamically so the dashboard preview always fits.
 */
export function VariantCanvas({
  children,
  width = 1200,
  height = 640,
  scale = 0.38,
}: Props) {
  const wrapRef = useRef<HTMLDivElement>(null);
  const [effectiveScale, setEffectiveScale] = useState(scale);

  useLayoutEffect(() => {
    const el = wrapRef.current;
    if (!el) return;

    function recompute() {
      if (!el) return;
      const parent = el.parentElement;
      if (!parent) return;
      const available = parent.clientWidth;
      if (available <= 0) return;
      const maxScale = available / width;
      setEffectiveScale(Math.min(scale, maxScale));
    }

    recompute();
    const ro = new ResizeObserver(recompute);
    if (el.parentElement) ro.observe(el.parentElement);
    return () => ro.disconnect();
  }, [scale, width]);

  return (
    <div
      ref={wrapRef}
      className="variant-canvas"
      style={{
        width: `${width * effectiveScale}px`,
        height: `${height * effectiveScale}px`,
      }}
      data-scope="app"
    >
      <div
        className="variant-canvas__inner"
        style={{
          width: `${width}px`,
          height: `${height}px`,
          transform: `scale(${effectiveScale})`,
        }}
      >
        <div className="variant-canvas__paper">{children}</div>
      </div>
    </div>
  );
}
