import { useSearchParams } from "react-router-dom";
import { KPITile } from "../../components/molecules/KPITile";
import { SignalBar } from "../../components/organisms/SignalBar";
import { CatIcon } from "../../icons/CatIcon";
import { WOW_DELTAS } from "../../data/signals";
import "./variants.css";

/**
 * Option C — the Signal Layer. Signal Bar is the hero, inline WoW deltas are
 * the secondary enhancement. Supports ?empty=1 for the gathering-data
 * skeleton state so reviewers can inspect the empty shape without data
 * plumbing.
 */
export function OverviewVariantC() {
  const [params] = useSearchParams();
  const empty = params.get("empty") === "1";

  return (
    <>
      <SignalBar emptyMode={empty} />

      <section className="variant-kpis">
        <KPITile title="Active Trials" value="43" sublabel="In total" icon={<CatIcon name="hourglass" />} sparkline="trial" to="/charts/trials" delta={WOW_DELTAS.trials} skeleton={empty} />
        <KPITile title="Active Subscriptions" value="3,071" sublabel="In total" icon={<CatIcon name="calendar" />} sparkline="growth" to="/charts/actives" delta={WOW_DELTAS.subscriptions} skeleton={empty} />
        <KPITile title="MRR" value="$29,124" sublabel="Monthly Recurring Revenue" icon={<CatIcon name="autorenew" />} sparkline="steady" to="/charts/mrr" delta={WOW_DELTAS.mrr} skeleton={empty} />
        <KPITile title="Revenue" value="$36,359" sublabel="Last 28 days" icon={<CatIcon name="currency-usd" />} sparkline="volatile" to="/charts/revenue" delta={WOW_DELTAS.revenue} skeleton={empty} />
        <KPITile title="New Customers" value="7,400" sublabel="Last 28 days" icon={<CatIcon name="person" />} sparkline="flat-green" to="/charts/customers_new" delta={WOW_DELTAS.customers_new} skeleton={empty} />
        <KPITile title="Active Customers" value="18,407" sublabel="Last 28 days" icon={<CatIcon name="person" />} sparkline="flat-blue" delta={WOW_DELTAS.customers} skeleton={empty} />
      </section>
    </>
  );
}
