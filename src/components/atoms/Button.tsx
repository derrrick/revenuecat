import type { ButtonHTMLAttributes, ReactNode } from "react";
import "./Button.css";

type Variant = "primary" | "secondary" | "ghost";

type Props = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: Variant;
  icon?: ReactNode;
  trailingIcon?: ReactNode;
};

export function Button({
  variant = "secondary",
  icon,
  trailingIcon,
  children,
  className = "",
  ...rest
}: Props) {
  return (
    <button className={`btn btn--${variant} ${className}`} {...rest}>
      {icon && <span className="btn__icon">{icon}</span>}
      {children && <span className="btn__label">{children}</span>}
      {trailingIcon && <span className="btn__icon">{trailingIcon}</span>}
    </button>
  );
}
