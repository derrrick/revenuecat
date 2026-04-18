import { useState } from "react";
import type { ReactNode } from "react";
import { CaretDown } from "../../icons/Icon";
import "./ChartGroup.css";

type Props = {
  label: string;
  children: ReactNode;
  defaultOpen?: boolean;
};

export function ChartGroup({ label, children, defaultOpen = true }: Props) {
  const [open, setOpen] = useState(defaultOpen);
  return (
    <div className={`chart-group ${open ? "is-open" : ""}`}>
      <button
        className="chart-group__header"
        onClick={() => setOpen(!open)}
        type="button"
      >
        <span className="chart-group__chevron" aria-hidden>
          <CaretDown />
        </span>
        <span className="chart-group__label">{label}</span>
      </button>
      {open && <div className="chart-group__items">{children}</div>}
    </div>
  );
}
