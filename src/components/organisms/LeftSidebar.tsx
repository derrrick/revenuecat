import { SidebarItem } from "../molecules/SidebarItem";
import { SidebarGroup } from "../molecules/SidebarGroup";
import { CatIcon } from "../../icons/CatIcon";
import "./LeftSidebar.css";

export function LeftSidebar() {
  return (
    <nav className="sidebar" aria-label="Primary">
      <SidebarItem to="/overview" icon="dashboard" label="Overview" end />
      <SidebarGroup
        icon="chart-bar"
        label="Analytics"
        children={[
          { to: "/charts/revenue", label: "Charts" },
          { to: "/analytics/benchmarks", label: "Benchmarks" },
        ]}
      />
      <SidebarItem to="/customers" icon="person" label="Customers" />
      <SidebarGroup
        icon="tag"
        label="Product catalog"
        children={[
          { to: "/catalog/offerings", label: "Offerings" },
          { to: "/catalog/products", label: "Products" },
          { to: "/catalog/entitlements", label: "Entitlements" },
          { to: "/catalog/virtual-currencies", label: "Virtual currencies" },
        ]}
      />
      <SidebarItem to="/paywalls" icon="paywall" label="Paywalls" />
      <SidebarItem to="/targeting" icon="target" label="Targeting" />
      <SidebarItem to="/experiments" icon="experiment" label="Experiments" />
      <SidebarItem to="/web" icon="web-experience" label="Web" />
      <SidebarItem to="/ads" icon="ads" label="Ads" />
      <SidebarGroup
        icon="customer-center"
        label="Lifecycle"
        children={[
          { to: "/lifecycle/customer-center", label: "Customer Center" },
          { to: "/lifecycle/support", label: "Support" },
          { to: "/lifecycle/retention", label: "Retention" },
        ]}
      />

      {/* Everything below starts here — pinned to bottom via margin-top: auto */}
      <SidebarGroup
        className="sidebar__pin-start"
        icon="connections"
        label="Apps & providers"
        children={[
          { to: "/apps", label: "Configurations" },
          { to: "/api-keys", label: "API keys" },
        ]}
      />
      <SidebarItem to="/integrations" icon="integrations" label="Integrations" />
      <SidebarItem to="/project-settings" icon="settings" label="Project settings" />
      <button className="sidebar__collapse" type="button" aria-label="Collapse navigation">
        <CatIcon name="sidebar-in-out" size={16} />
      </button>
    </nav>
  );
}
