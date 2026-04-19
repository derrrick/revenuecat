import { KPITile } from "../../components/molecules/KPITile";
import { CatIcon } from "../../icons/CatIcon";
import "./variants.css";

/**
 * Baseline — the dashboard as it exists today. No Signal Bar, no forecast,
 * no insights panel, no WoW deltas on cards. Reviewers start here so the
 * three proposed options read as deliberate additions against a known
 * reference point.
 */
export function OverviewVariantBaseline() {
  return (
    <section className="variant-kpis">
      <KPITile title="Active Trials" value="43" sublabel="In total" icon={<CatIcon name="hourglass" />} sparkline="trial" to="/charts/trials" />
      <KPITile title="Active Subscriptions" value="3,071" sublabel="In total" icon={<CatIcon name="calendar" />} sparkline="growth" to="/charts/actives" />
      <KPITile title="MRR" value="$29,124" sublabel="Monthly Recurring Revenue" icon={<CatIcon name="autorenew" />} sparkline="steady" to="/charts/mrr" />
      <KPITile title="Revenue" value="$36,359" sublabel="Last 28 days" icon={<CatIcon name="currency-usd" />} sparkline="volatile" to="/charts/revenue" />
      <KPITile title="New Customers" value="7,400" sublabel="Last 28 days" icon={<CatIcon name="person" />} sparkline="flat-green" to="/charts/customers_new" />
      <KPITile title="Active Customers" value="18,407" sublabel="Last 28 days" icon={<CatIcon name="person" />} sparkline="flat-blue" />
    </section>
  );
}
