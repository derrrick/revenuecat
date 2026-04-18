import { useState } from "react";
import { Link } from "react-router-dom";
import { ChartListSidebar } from "../components/organisms/ChartListSidebar";
import { StackedAreaChart } from "../components/organisms/StackedAreaChart";
import { ChartSummaryTable } from "../components/organisms/ChartSummaryTable";
import { CatIcon } from "../icons/CatIcon";
import "./Revenue.css";

type ChartBtnProps = {
  icon: string;
  label: string;
  trailing?: boolean;
  variant?: "text" | "filled";
  disabled?: boolean;
};

function ChartButton({ icon, label, trailing = true, variant = "text", disabled }: ChartBtnProps) {
  return (
    <button className={`rb rb--${variant}`} type="button" disabled={disabled}>
      <span className="rb__icon">
        <CatIcon name={icon} size={16} />
      </span>
      <span className="rb__label">{label}</span>
      {trailing && (
        <span className="rb__trailing">
          <CatIcon name="arrow-down" size={14} />
        </span>
      )}
    </button>
  );
}

function ActionButton({
  icon,
  children,
  primary,
  disabled,
}: {
  icon: string;
  children: string;
  primary?: boolean;
  disabled?: boolean;
}) {
  return (
    <button className={`ab ${primary ? "ab--primary" : ""}`} type="button" disabled={disabled}>
      <span className="ab__icon">
        <CatIcon name={icon} size={16} />
      </span>
      <span className="ab__label">{children}</span>
    </button>
  );
}

export function Revenue() {
  const [tab, setTab] = useState<"summary" | "annotations">("summary");

  return (
    <div className="rv">
      <ChartListSidebar />

      <section className="rv__right">
        <div className="rv__header">
          <nav className="rv__breadcrumb" aria-label="Breadcrumb">
            <ol>
              <li>
                <Link to="/overview">CatGPT</Link>
              </li>
              <li aria-hidden className="rv__bc-sep">/</li>
              <li>
                <Link to="/charts/revenue">Charts</Link>
              </li>
              <li aria-hidden className="rv__bc-sep">/</li>
              <li>
                <Link to="/charts/revenue" className="is-active">Revenue</Link>
              </li>
            </ol>
          </nav>
        </div>

        <div className="rv__body">
          <div className="rv__title-row">
            <div className="rv__title-group">
              <h2 className="rv__title">Revenue</h2>
              <button className="rv__info" aria-label="info" type="button">
                <CatIcon name="info" size={14} />
              </button>
            </div>
            <div className="rv__actions">
              <ActionButton icon="bookmark" disabled>Save chart</ActionButton>
              <ActionButton icon="share">Share</ActionButton>
              <ActionButton icon="file-download" primary>Export</ActionButton>
            </div>
          </div>

          <div className="rv__toolbar">
            <ChartButton icon="filter" label="Filter" />
            <ChartButton icon="chart-pie" label="Segment" />
            <ChartButton icon="currency-usd" label="Revenue" />
            <div className="rv__toolbar-spacer" />
            <ChartButton icon="chart-granularity" label="Daily" />
            <ChartButton icon="calendar" label="Last 28 days" />
            <ChartButton icon="chart-line-stacked" label="Stacked area" />
            <button
              className="rb rb--icon"
              type="button"
              aria-label="Toggle y-axis to start from zero"
            >
              <CatIcon name="chart-zero-y-axis-off" size={16} />
            </button>
          </div>

          <div className="rv__chart-wrap">
            <StackedAreaChart />
          </div>

          <div className="rv__tabs" role="tablist">
            <button
              role="tab"
              aria-selected={tab === "summary"}
              className={`rv__tab ${tab === "summary" ? "is-active" : ""}`}
              onClick={() => setTab("summary")}
            >
              Summary
            </button>
            <button
              role="tab"
              aria-selected={tab === "annotations"}
              className={`rv__tab ${tab === "annotations" ? "is-active" : ""}`}
              onClick={() => setTab("annotations")}
            >
              Annotations
            </button>
          </div>

          {tab === "summary" && <ChartSummaryTable />}
        </div>
      </section>
    </div>
  );
}
