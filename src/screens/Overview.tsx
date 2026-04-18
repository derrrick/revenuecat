import { useState } from "react";
import { KPITile } from "../components/molecules/KPITile";
import { Toggle } from "../components/atoms/Toggle";
import { RecentTransactionsTable } from "../components/organisms/RecentTransactionsTable";
import { CatIcon } from "../icons/CatIcon";
import "./Overview.css";

export function Overview() {
  const [sandbox, setSandbox] = useState(false);

  return (
    <div className="ov">
      <header className="ov__header">
        <h2 className="ov__title">Overview</h2>
        <label className="ov__sandbox">
          <Toggle on={sandbox} onChange={setSandbox} size="sm" />
          <span className="ov__sandbox-label">Sandbox data</span>
        </label>
      </header>

      <section className="ov__kpis">
        <KPITile title="Active Trials" value="43" sublabel="In total" icon={<CatIcon name="hourglass" />} sparkline="trial" to="/charts/trials" />
        <KPITile title="Active Subscriptions" value="3,071" sublabel="In total" icon={<CatIcon name="calendar" />} sparkline="growth" to="/charts/actives" />
        <KPITile title="MRR" value="$29,124" sublabel="Monthly Recurring Revenue" icon={<CatIcon name="autorenew" />} sparkline="steady" to="/charts/mrr" />
        <KPITile title="Revenue" value="$36,359" sublabel="Last 28 days" icon={<CatIcon name="currency-usd" />} sparkline="volatile" to="/charts/revenue" />
        <KPITile title="New Customers" value="7,400" sublabel="Last 28 days" icon={<CatIcon name="person" />} sparkline="flat-green" to="/charts/customers_new" />
        <KPITile title="Active Customers" value="18,407" sublabel="Last 28 days" icon={<CatIcon name="person" />} sparkline="flat-blue" />
      </section>

      <section className="ov__rt">
        <h2 className="ov__rt-title">Recent transactions</h2>
        <RecentTransactionsTable />
      </section>
    </div>
  );
}
