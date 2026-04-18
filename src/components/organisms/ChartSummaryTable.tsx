import {
  REVENUE_DATES,
  REVENUE_SERIES,
  REVENUE_AVG,
  TX_SERIES,
  TX_AVG,
} from "../../data/revenue";
import { CatIcon } from "../../icons/CatIcon";
import "./ChartSummaryTable.css";

export function ChartSummaryTable() {
  return (
    <div className="cst">
      <div className="cst__toolbar">
        <span className="cst__updated-icon">
          <CatIcon name="timelapse" size={16} />
        </span>
        <span className="cst__updated">
          Updated{" "}
          <abbr
            title="2026-04-18, 3:02 a.m. UTC"
            aria-label="18 hours ago"
            className="cst__abbr"
          >
            18 hours ago
          </abbr>
        </span>
      </div>

      <div className="cst__grid">
        {/* Left frozen column — series labels */}
        <table className="cst__labels">
          <thead>
            <tr>
              <th>
                <div className="cst__labels-head" />
              </th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>
                <div className="cst__series">
                  <span className="cst__swatch" style={{ background: "var(--rc-green-primary)" }} />
                  <span className="cst__series-label">Revenue</span>
                </div>
              </td>
            </tr>
            <tr>
              <td>
                <div className="cst__series">
                  <span className="cst__swatch cst__swatch--empty" />
                  <span className="cst__series-label">Transactions</span>
                </div>
              </td>
            </tr>
          </tbody>
        </table>

        {/* Right scrollable columns — dates + Row Average */}
        <div className="cst__scroll">
          <table className="cst__data">
            <thead>
              <tr>
                {REVENUE_DATES.map((d) => (
                  <th key={d}>{d}</th>
                ))}
                <th className="cst__avg-head">
                  <span>Row Average</span>
                  <CatIcon name="arrow-down" size={12} />
                </th>
              </tr>
            </thead>
            <tbody>
              <tr>
                {REVENUE_SERIES.map((v, i) => (
                  <td key={i} className={v === "$0" ? "cst__cell cst__cell--zero" : "cst__cell"}>
                    {v}
                  </td>
                ))}
                <td className="cst__cell">{REVENUE_AVG}</td>
              </tr>
              <tr>
                {TX_SERIES.map((v, i) => (
                  <td key={i} className={v === "0" ? "cst__cell cst__cell--zero" : "cst__cell"}>
                    {v}
                  </td>
                ))}
                <td className="cst__cell">{TX_AVG}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
