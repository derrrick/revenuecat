import type { Delta } from "../../data/signals";
import "./DeltaBadge.css";

type Props = {
  delta: Delta;
  size?: "sm" | "md";
};

/**
 * Signed WoW percentage pill. Arrow glyph reinforces direction for color-blind
 * users; severity class controls color. Kept small (no icon font) so it can
 * sit inside the KPITile header alongside the existing icon.
 */
export function DeltaBadge({ delta, size = "sm" }: Props) {
  const { pct, direction, severity } = delta;
  const sign = pct > 0 ? "+" : pct < 0 ? "−" : "";
  const abs = Math.abs(pct).toFixed(1);

  const badge = (
    <span
      className={`dbadge dbadge--${size} dbadge--${severity}`}
      aria-label={`${direction === "up" ? "Up" : "Down"} ${abs} percent week over week`}
      tabIndex={delta.tooltip ? 0 : -1}
    >
      <svg
        className="dbadge__arrow"
        width="9"
        height="9"
        viewBox="0 0 9 9"
        fill="none"
        aria-hidden
      >
        {direction === "up" ? (
          <path
            d="M4.5 7.5V1.5M4.5 1.5L1.5 4.5M4.5 1.5L7.5 4.5"
            stroke="currentColor"
            strokeWidth="1.4"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        ) : (
          <path
            d="M4.5 1.5V7.5M4.5 7.5L1.5 4.5M4.5 7.5L7.5 4.5"
            stroke="currentColor"
            strokeWidth="1.4"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        )}
      </svg>
      <span className="dbadge__pct">
        {sign}
        {abs}%
      </span>
    </span>
  );

  if (!delta.tooltip) return badge;

  return (
    <span className={`dbadge-wrap dbadge-wrap--${severity}`}>
      {badge}
      <span className="dbadge__tooltip" role="tooltip">
        {delta.tooltip}
      </span>
    </span>
  );
}
