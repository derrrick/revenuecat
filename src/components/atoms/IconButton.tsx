import type { ButtonHTMLAttributes, ReactNode } from "react";
import "./IconButton.css";

type Props = ButtonHTMLAttributes<HTMLButtonElement> & {
  children: ReactNode;
  size?: number;
};

export function IconButton({ children, size = 24, className = "", ...rest }: Props) {
  return (
    <button
      className={`icon-btn ${className}`}
      style={{ width: size, height: size }}
      {...rest}
    >
      {children}
    </button>
  );
}
