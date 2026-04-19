import { useState } from "react";
import { Link, useParams } from "react-router-dom";
import { ChartListSidebar } from "../components/organisms/ChartListSidebar";
import { TrendChart } from "../components/organisms/TrendChart";
import { ChartSummaryTable } from "../components/organisms/ChartSummaryTable";
import { SignalBreadcrumb } from "../components/organisms/SignalBreadcrumb";
import { TrialSuggestions } from "../components/organisms/TrialSuggestions";
import { CatIcon } from "../icons/CatIcon";
import { useVersion } from "../version/useVersion";
import { getChartConfig } from "../data/chartMeta";
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
  const { version } = useVersion();
  const { chart: chartSlug } = useParams();
  const config = getChartConfig(chartSlug);

  // Toolbar metric icon varies by chart — currency for revenue-family
  // metrics, hourglass for trials, person for customer metrics.
  const metricIcon = metricIconFor(config.slug);
  // Chart-kind label shown in the toolbar + chart-kind icon.
  const chartKindLabel = config.kind === "stacked-area" ? "Stacked area" : "Line";
  const chartKindIcon = config.kind === "stacked-area" ? "chart-line-stacked" : "chart-line";

  // Anomaly highlight range — only shown when arriving via Signal deep-link.
  // Matches the trailing 7-day dip in the trials data so the "flagged"
  // region lines up with the narrative.
  const highlightRange = version === "C" && chartSlug === "trials" ? [20, 27] as [number, number] : null;

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
                <Link to={`/charts/${config.slug}`} className="is-active">{config.title}</Link>
              </li>
            </ol>
          </nav>
        </div>

        <div className="rv__body">
          {version === "C" && <SignalBreadcrumb />}
          <div className="rv__title-row">
            <div className="rv__title-group">
              <h2 className="rv__title">{config.title}</h2>
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
            <ChartButton icon={metricIcon} label={config.metricLabel} />
            <div className="rv__toolbar-spacer" />
            <ChartButton icon="chart-granularity" label="Daily" />
            <ChartButton icon="calendar" label="Last 28 days" />
            <ChartButton icon={chartKindIcon} label={chartKindLabel} />
            <button
              className="rb rb--icon"
              type="button"
              aria-label="Toggle y-axis to start from zero"
            >
              <CatIcon name="chart-zero-y-axis-off" size={16} />
            </button>
          </div>

          <div className="rv__chart-wrap">
            <TrendChart config={config} highlightRange={highlightRange} />
          </div>

          {version === "C" && chartSlug === "trials" && <TrialSuggestions />}

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

          {tab === "summary" && <ChartSummaryTable config={config} />}
        </div>
      </section>
    </div>
  );
}

function metricIconFor(slug: string): string {
  if (slug === "trials") return "hourglass";
  if (slug === "customers_new" || slug.startsWith("customers")) return "person";
  if (slug === "actives" || slug === "subscriptions") return "calendar";
  return "currency-usd";
}
