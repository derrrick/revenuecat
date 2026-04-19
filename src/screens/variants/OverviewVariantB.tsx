import { KPITile } from "../../components/molecules/KPITile";
import { ForecastModule } from "../../components/organisms/ForecastModule";
import { CatIcon } from "../../icons/CatIcon";
import "./variants.css";

/**
 * Option B — the forecast variant. Projection module sits above the KPI grid
 * so it reads as the new primary surface on the Overview. The KPI grid stays
 * untouched below, deliberately — the argument of this option is "look
 * forward," not "recontextualize the past."
 */
export function OverviewVariantB() {
  return (
    <>
      <ForecastModule />

      <section className="variant-kpis">
        <KPITile title="Active Trials" value="43" sublabel="In total" icon={<CatIcon name="hourglass" />} sparkline="trial" to="/charts/trials" />
        <KPITile title="Active Subscriptions" value="3,071" sublabel="In total" icon={<CatIcon name="calendar" />} sparkline="growth" to="/charts/actives" />
        <KPITile title="MRR" value="$29,124" sublabel="Monthly Recurring Revenue" icon={<CatIcon name="autorenew" />} sparkline="steady" to="/charts/mrr" />
        <KPITile title="Revenue" value="$36,359" sublabel="Last 28 days" icon={<CatIcon name="currency-usd" />} sparkline="volatile" to="/charts/revenue" />
        <KPITile title="New Customers" value="7,400" sublabel="Last 28 days" icon={<CatIcon name="person" />} sparkline="flat-green" to="/charts/customers_new" />
        <KPITile title="Active Customers" value="18,407" sublabel="Last 28 days" icon={<CatIcon name="person" />} sparkline="flat-blue" />
      </section>
    </>
  );
}
