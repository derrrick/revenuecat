import { NavLink } from "react-router-dom";
import "./ChartListItem.css";

type Props = {
  label: string;
  to: string;
};

export function ChartListItem({ label, to }: Props) {
  return (
    <NavLink
      to={to}
      className={({ isActive }) => `chart-item ${isActive ? "is-active" : ""}`}
    >
      <span className="chart-item__label">{label}</span>
    </NavLink>
  );
}
