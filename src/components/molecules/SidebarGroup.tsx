import { useState } from "react";
import { NavLink, useLocation } from "react-router-dom";
import { CatIcon } from "../../icons/CatIcon";
import "./SidebarGroup.css";

type Child = { to: string; label: string };
type Props = {
  icon: string;
  label: string;
  children?: Child[];
  defaultOpen?: boolean;
  className?: string;
};

export function SidebarGroup({
  icon,
  label,
  children = [],
  defaultOpen = false,
  className = "",
}: Props) {
  const loc = useLocation();
  const anyChildActive = children.some((c) => loc.pathname.startsWith(c.to));
  const [open, setOpen] = useState(defaultOpen || anyChildActive);

  return (
    <div className={`sidebar-group ${open ? "is-open" : ""} ${className}`}>
      <button
        className="sidebar-group__header"
        onClick={() => setOpen(!open)}
        type="button"
        aria-expanded={open}
      >
        <CatIcon name={icon} className="sidebar-group__icon" />
        <span className="sidebar-group__label">
          {label}
          <span className="sidebar-group__caret" aria-hidden>
            <CatIcon name="arrow-up" size={16} />
          </span>
        </span>
      </button>
      {open && children.length > 0 && (
        <div className="sidebar-group__children">
          {children.map((c) => (
            <NavLink
              key={c.to}
              to={c.to}
              className={({ isActive }) => `sidebar-sub ${isActive ? "is-active" : ""}`}
            >
              <span className="sidebar-sub__label">{c.label}</span>
            </NavLink>
          ))}
        </div>
      )}
    </div>
  );
}
