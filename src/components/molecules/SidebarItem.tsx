import { NavLink } from "react-router-dom";
import { CatIcon } from "../../icons/CatIcon";
import "./SidebarItem.css";

type Props = {
  icon: string;
  label: string;
  to: string;
  end?: boolean;
};

export function SidebarItem({ icon, label, to, end }: Props) {
  return (
    <NavLink
      to={to}
      end={end}
      className={({ isActive }) => `sidebar-item ${isActive ? "is-active" : ""}`}
    >
      <CatIcon name={icon} className="sidebar-item__icon" />
      <span className="sidebar-item__label">{label}</span>
    </NavLink>
  );
}
