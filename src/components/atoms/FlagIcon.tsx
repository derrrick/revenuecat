import type { ReactElement } from "react";
import "./FlagIcon.css";

type Props = {
  code?: "gb" | "us" | "de" | "fr" | "jp";
  size?: number;
};

const FLAGS: Record<string, (w: number, h: number) => ReactElement> = {
  us: (w, h) => (
    <svg viewBox="0 0 14 10" width={w} height={h}>
      <rect width="14" height="10" fill="#B22234" />
      {[1, 3, 5, 7, 9].map((y) => (
        <rect key={y} y={y} width="14" height="1" fill="#fff" />
      ))}
      <rect width="6" height="5" fill="#3C3B6E" />
    </svg>
  ),
  gb: (w, h) => (
    <svg viewBox="0 0 14 10" width={w} height={h}>
      <rect width="14" height="10" fill="#012169" />
      <path d="M0 0 L14 10 M14 0 L0 10" stroke="#fff" strokeWidth="1.6" />
      <path d="M0 0 L14 10 M14 0 L0 10" stroke="#C8102E" strokeWidth="0.8" />
      <path d="M7 0 V10 M0 5 H14" stroke="#fff" strokeWidth="2.2" />
      <path d="M7 0 V10 M0 5 H14" stroke="#C8102E" strokeWidth="1.2" />
    </svg>
  ),
  de: (w, h) => (
    <svg viewBox="0 0 14 10" width={w} height={h}>
      <rect y="0" width="14" height="3.33" fill="#000" />
      <rect y="3.33" width="14" height="3.33" fill="#DD0000" />
      <rect y="6.66" width="14" height="3.34" fill="#FFCE00" />
    </svg>
  ),
  fr: (w, h) => (
    <svg viewBox="0 0 14 10" width={w} height={h}>
      <rect x="0" width="4.66" height="10" fill="#0055A4" />
      <rect x="4.66" width="4.66" height="10" fill="#fff" />
      <rect x="9.32" width="4.68" height="10" fill="#EF4135" />
    </svg>
  ),
  jp: (w, h) => (
    <svg viewBox="0 0 14 10" width={w} height={h}>
      <rect width="14" height="10" fill="#fff" />
      <circle cx="7" cy="5" r="2.6" fill="#BC002D" />
    </svg>
  ),
};

export function FlagIcon({ code = "us", size = 14 }: Props) {
  const h = Math.round(size * (10 / 14));
  const render = FLAGS[code];
  return (
    <span className="flag" style={{ width: size, height: h }} aria-label={code.toUpperCase()}>
      {render ? render(size, h) : null}
    </span>
  );
}
