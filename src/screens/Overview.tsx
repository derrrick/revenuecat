import { useState } from "react";
import { Toggle } from "../components/atoms/Toggle";
import { RecentTransactionsTable } from "../components/organisms/RecentTransactionsTable";
import { useVersion } from "../version/useVersion";
import { VARIANT_COPY } from "../data/signals";
import { OverviewVariantA } from "./variants/OverviewVariantA";
import { OverviewVariantB } from "./variants/OverviewVariantB";
import { OverviewVariantC } from "./variants/OverviewVariantC";
import { OverviewVariantBaseline } from "./variants/OverviewVariantBaseline";
import "./Overview.css";

export function Overview() {
  const [sandbox, setSandbox] = useState(false);
  const { version, openPicker } = useVersion();

  const variantCopy = VARIANT_COPY[version];

  return (
    <div className="ov">
      <header className="ov__header">
        <div className="ov__title-group">
          <h2 className="ov__title">Overview</h2>
          <button
            type="button"
            className="ov__variant-chip"
            onClick={openPicker}
            title="Switch prototype version (⌘V)"
          >
            <span className={`ov__variant-chip-dot ov__variant-chip-dot--${version}`} />
            <span className="ov__variant-chip-label">
              {variantCopy.title} <span>· {variantCopy.tagline}</span>
            </span>
            <span className="ov__variant-chip-kbd">⌘V</span>
          </button>
        </div>
        <label className="ov__sandbox">
          <Toggle on={sandbox} onChange={setSandbox} size="sm" />
          <span className="ov__sandbox-label">Sandbox data</span>
        </label>
      </header>

      {version === "Baseline" && <OverviewVariantBaseline />}
      {version === "A" && <OverviewVariantA />}
      {version === "B" && <OverviewVariantB />}
      {version === "C" && <OverviewVariantC />}

      <section className="ov__rt">
        <h2 className="ov__rt-title">Recent transactions</h2>
        <RecentTransactionsTable />
      </section>
    </div>
  );
}
