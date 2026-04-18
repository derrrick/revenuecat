import type { SVGProps } from "react";

type P = SVGProps<SVGSVGElement>;

/*
  Icons match Figma spec:
    - 16×16 box
    - base paths have inset 6.25% sides + top, 12.5% bottom (for person-family)
    - stroke/fill uses currentColor so parents set color
    - default color in kpi/sidebar: #767676 (Light/Text/Secondary)
*/
const base = {
  width: 16,
  height: 16,
  viewBox: "0 0 16 16",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.5,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
};

/* Dashboard: 4 rounded tiles with varied heights */
export const Dashboard = (p: P) => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" {...p}>
    <rect x="1" y="1" width="6.25" height="8.25" rx="1.25" stroke="currentColor" strokeWidth="1.5" />
    <rect x="8.75" y="1" width="6.25" height="4.5" rx="1.25" stroke="currentColor" strokeWidth="1.5" />
    <rect x="8.75" y="7" width="6.25" height="8" rx="1.25" stroke="currentColor" strokeWidth="1.5" />
    <rect x="1" y="10.75" width="6.25" height="4.25" rx="1.25" stroke="currentColor" strokeWidth="1.5" />
  </svg>
);

export const BarChart = (p: P) => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" {...p}>
    <path d="M2 14.5V2" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    <path d="M2 14.5h12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    <rect x="4.25" y="8" width="2.5" height="5" rx="0.4" fill="currentColor" />
    <rect x="7.75" y="5" width="2.5" height="8" rx="0.4" fill="currentColor" />
    <rect x="11.25" y="2.5" width="2.5" height="10.5" rx="0.4" fill="currentColor" />
  </svg>
);

/* Person — Figma spec: inset 6.25% sides+top, 12.5% bottom
   which in a 16×16 box = x:1..15, y:1..14 (a little above baseline) */
/* Person — Figma spec: 16×16, base inset 6.25% sides+top, 12.5% bottom, #767676 */
export const UserIcon = (p: P) => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" {...p}>
    <circle cx="8" cy="5.5" r="2.75" stroke="currentColor" strokeWidth="1.5" />
    <path
      d="M2 14c0-2.75 2.4-4.25 6-4.25s6 1.5 6 4.25"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
    />
  </svg>
);

export const Tag = (p: P) => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" {...p}>
    <path
      d="M8.4 1.2H2.2a1 1 0 00-1 1v6.2a1 1 0 00.29.71l6.18 6.18a1 1 0 001.42 0l5.2-5.2a1 1 0 000-1.42L8.11 1.49a1 1 0 00-.71-.29z"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinejoin="round"
    />
    <circle cx="4.5" cy="4.5" r="1" fill="currentColor" />
  </svg>
);

export const Wallet = (p: P) => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" {...p}>
    <rect x="1.5" y="3.25" width="13" height="10" rx="1.5" stroke="currentColor" strokeWidth="1.5" />
    <path d="M1.5 6.75h13" stroke="currentColor" strokeWidth="1.5" />
    <circle cx="11" cy="10" r="0.9" fill="currentColor" />
  </svg>
);

export const Target = (p: P) => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" {...p}>
    <circle cx="8" cy="8" r="6.5" stroke="currentColor" strokeWidth="1.5" />
    <circle cx="8" cy="8" r="3.5" stroke="currentColor" strokeWidth="1.5" />
    <circle cx="8" cy="8" r="1.25" fill="currentColor" />
  </svg>
);

export const Flask = (p: P) => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" {...p}>
    <path d="M5.5 1.5h5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    <path
      d="M6.25 1.5v4.8L2.4 12.8a1 1 0 00.9 1.7h9.4a1 1 0 00.9-1.7L9.75 6.3V1.5"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinejoin="round"
    />
    <path d="M4.5 10.5h7" stroke="currentColor" strokeWidth="1.5" />
  </svg>
);

export const Globe = (p: P) => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" {...p}>
    <circle cx="8" cy="8" r="6.5" stroke="currentColor" strokeWidth="1.5" />
    <ellipse cx="8" cy="8" rx="3" ry="6.5" stroke="currentColor" strokeWidth="1.5" />
    <path d="M1.5 8h13" stroke="currentColor" strokeWidth="1.5" />
  </svg>
);

export const Headset = (p: P) => (
  <svg {...base} {...p}>
    <path d="M2 10V8a6 6 0 0112 0v2" />
    <rect x="1" y="10" width="3.5" height="4.5" rx="0.8" />
    <rect x="11.5" y="10" width="3.5" height="4.5" rx="0.8" />
  </svg>
);

export const Plug = (p: P) => (
  <svg {...base} {...p}>
    <path d="M6 1v3" />
    <path d="M10 1v3" />
    <rect x="4" y="4" width="8" height="4" rx="1" />
    <path d="M8 8v3a3 3 0 003 3" />
  </svg>
);

export const Key = (p: P) => (
  <svg {...base} {...p}>
    <circle cx="5" cy="11" r="2.5" />
    <path d="M7 9l6-6" />
    <path d="M11 5l2 2" />
  </svg>
);

export const Settings = (p: P) => (
  <svg {...base} {...p}>
    <circle cx="8" cy="8" r="2" />
    <path d="M8 1v2M8 13v2M15 8h-2M3 8H1M12.95 3.05l-1.41 1.41M4.46 11.54l-1.41 1.41M12.95 12.95l-1.41-1.41M4.46 4.46L3.05 3.05" />
  </svg>
);

export const Search = (p: P) => (
  <svg {...base} {...p}>
    <circle cx="7" cy="7" r="4.5" />
    <path d="M10.5 10.5L14 14" />
  </svg>
);

export const ChevronDown = (p: P) => (
  <svg {...base} {...p}>
    <path d="M4 6l4 4 4-4" />
  </svg>
);

export const ChevronRight = (p: P) => (
  <svg {...base} {...p}>
    <path d="M6 4l4 4-4 4" />
  </svg>
);

/* Hourglass — demo renders it as a solid-weighted glyph */
export const Hourglass = (p: P) => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" {...p}>
    <path
      d="M3.5 1.5h9M3.5 14.5h9"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
    />
    <path
      d="M4 1.5c0 3 4 4 4 6.5s-4 3.5-4 6.5h8c0-3-4-3.5-4-6.5s4-3.5 4-6.5H4z"
      fill="currentColor"
      fillOpacity="0.92"
    />
  </svg>
);

export const CalendarIcon = (p: P) => (
  <svg {...base} {...p}>
    <rect x="1" y="2.5" width="14" height="12" rx="1.5" />
    <path d="M4 1v3" />
    <path d="M12 1v3" />
    <path d="M1 6.5h14" />
  </svg>
);

export const Refresh = (p: P) => (
  <svg {...base} {...p}>
    <path d="M1.5 8a6.5 6.5 0 0111-4.5" />
    <path d="M14.5 8a6.5 6.5 0 01-11 4.5" />
    <path d="M12.5 1v2.5h-2.5" />
    <path d="M3.5 15v-2.5h2.5" />
  </svg>
);

export const DollarSign = (p: P) => (
  <svg {...base} {...p}>
    <path d="M8 1v14" />
    <path d="M11.5 4H6.5a2.2 2.2 0 000 4.4h3a2.2 2.2 0 010 4.4H5" />
  </svg>
);

export const Users = (p: P) => (
  <svg {...base} {...p}>
    <circle cx="6" cy="6" r="2.5" />
    <path d="M1.5 14c0-2.2 2-3.5 4.5-3.5s4.5 1.3 4.5 3.5" />
    <path d="M10.5 3.5a2.2 2.2 0 010 4" />
    <path d="M12 14c0-1.5-.6-2.6-1.8-3" />
  </svg>
);

export const UserPlus = (p: P) => (
  <svg {...base} {...p}>
    <circle cx="6" cy="5.5" r="2.5" />
    <path d="M1.5 14c0-2.5 2.2-4 4.5-4 1.3 0 2.5.4 3.3 1.2" />
    <path d="M12.5 4.5v4" />
    <path d="M10.5 6.5h4" />
  </svg>
);

export const Timelapse = (p: P) => (
  <svg {...base} {...p}>
    <circle cx="8" cy="8" r="6" />
    <path d="M8 2a6 6 0 014.24 10.24L8 8V2z" fill="currentColor" stroke="none" />
  </svg>
);

export const Info = (p: P) => (
  <svg {...base} {...p}>
    <circle cx="8" cy="8" r="6" />
    <path d="M8 7.5V11" />
    <circle cx="8" cy="5.25" r="0.5" fill="currentColor" stroke="none" />
  </svg>
);

export const Collapse = (p: P) => (
  <svg {...base} {...p}>
    <rect x="2" y="3" width="12" height="10" rx="1.5" />
    <path d="M10 3v10" />
    <path d="M6 6.5L7.5 8L6 9.5" />
  </svg>
);

export const Download = (p: P) => (
  <svg {...base} {...p}>
    <path d="M8 2v8" />
    <path d="M4.5 6.5L8 10l3.5-3.5" />
    <path d="M3 13h10" />
  </svg>
);

export const Share = (p: P) => (
  <svg {...base} {...p}>
    <circle cx="12" cy="3.5" r="1.8" />
    <circle cx="4" cy="8" r="1.8" />
    <circle cx="12" cy="12.5" r="1.8" />
    <path d="M5.5 7l5-2.5" />
    <path d="M5.5 9l5 2.5" />
  </svg>
);

export const Save = (p: P) => (
  <svg {...base} {...p}>
    <path d="M3 2h7.5L13 4.5V13a1 1 0 01-1 1H4a1 1 0 01-1-1V3a1 1 0 011-1z" />
    <rect x="5.5" y="8" width="5" height="5" />
    <path d="M5.5 2v3h4V2" />
  </svg>
);

export const CaretDown = (p: P) => (
  <svg {...base} {...p}>
    <path d="M3.5 6L8 10.5L12.5 6z" fill="currentColor" stroke="none" />
  </svg>
);
