import { KPITile } from "../../components/molecules/KPITile";
import { InsightsPulsePanel } from "../../components/organisms/InsightsPulsePanel";
import { CatIcon } from "../../icons/CatIcon";
import { WOW_DELTAS } from "../../data/signals";
import "./variants.css";

/**
 * Option A — the "trust the scan" variant. Inline WoW deltas on every card
 * plus an Insights Pulse panel below the grid. Panel starts collapsed by
 * design so the weakness the doc identifies ("panel will get collapsed")
 * is visible in the prototype.
 */
export function OverviewVariantA() {
  return (
    <>
      <section className="variant-kpis">
        <KPITile title="Active Trials" value="43" sublabel="In total" icon={<CatIcon name="hourglass" />} sparkline="trial" to="/charts/trials" delta={WOW_DELTAS.trials} />
        <KPITile title="Active Subscriptions" value="3,071" sublabel="In total" icon={<CatIcon name="calendar" />} sparkline="growth" to="/charts/actives" delta={WOW_DELTAS.subscriptions} />
        <KPITile title="MRR" value="$29,124" sublabel="Monthly Recurring Revenue" icon={<CatIcon name="autorenew" />} sparkline="steady" to="/charts/mrr" delta={WOW_DELTAS.mrr} />
        <KPITile title="Revenue" value="$36,359" sublabel="Last 28 days" icon={<CatIcon name="currency-usd" />} sparkline="volatile" to="/charts/revenue" delta={WOW_DELTAS.revenue} />
        <KPITile title="New Customers" value="7,400" sublabel="Last 28 days" icon={<CatIcon name="person" />} sparkline="flat-green" to="/charts/customers_new" delta={WOW_DELTAS.customers_new} />
        <KPITile title="Active Customers" value="18,407" sublabel="Last 28 days" icon={<CatIcon name="person" />} sparkline="flat-blue" delta={WOW_DELTAS.customers} />
      </section>

      <InsightsPulsePanel />
    </>
  );
}
