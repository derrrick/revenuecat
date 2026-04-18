import type { ReactNode } from "react";
import { ChevronDown } from "../../icons/Icon";
import "./Select.css";

type Props = {
  label: string;
  leadingIcon?: ReactNode;
  swatch?: string;
  width?: number;
  onClick?: () => void;
};

export function Select({ label, leadingIcon, swatch, width, onClick }: Props) {
  return (
    <button
      className="select"
      style={width ? { width: `${width}px` } : undefined}
      onClick={onClick}
      type="button"
    >
      <span className="select__content">
        {swatch && (
          <span className="select__swatch" style={{ background: swatch }} />
        )}
        {leadingIcon && !swatch && (
          <span className="select__leading">{leadingIcon}</span>
        )}
        <span className="select__label">{label}</span>
      </span>
      <span className="select__chevron" aria-hidden>
        <ChevronDown />
      </span>
    </button>
  );
}
