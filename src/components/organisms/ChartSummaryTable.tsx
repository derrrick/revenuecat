import type { ChartConfig } from "../../data/chartMeta";
import { CatIcon } from "../../icons/CatIcon";
import "./ChartSummaryTable.css";

type Props = {
  config: ChartConfig;
};

export function ChartSummaryTable({ config }: Props) {
  const { dates, series } = config;

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
        <table className="cst__labels">
          <thead>
            <tr>
              <th>
                <div className="cst__labels-head" />
              </th>
            </tr>
          </thead>
          <tbody>
            {series.map((s) => (
              <tr key={s.label}>
                <td>
                  <div className="cst__series">
                    {s.color === "transparent" ? (
                      <span className="cst__swatch cst__swatch--empty" />
                    ) : (
                      <span
                        className="cst__swatch"
                        style={{ background: s.color }}
                      />
                    )}
                    <span className="cst__series-label">{s.label}</span>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        <div className="cst__scroll">
          <table className="cst__data">
            <thead>
              <tr>
                {dates.map((d) => (
                  <th key={d}>{d}</th>
                ))}
                <th className="cst__avg-head">
                  <span>Row Average</span>
                  <CatIcon name="arrow-down" size={12} />
                </th>
              </tr>
            </thead>
            <tbody>
              {series.map((s) => (
                <tr key={s.label}>
                  {s.values.map((v, i) => (
                    <td
                      key={i}
                      className={isZero(v) ? "cst__cell cst__cell--zero" : "cst__cell"}
                    >
                      {v}
                    </td>
                  ))}
                  <td className="cst__cell">{s.average}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

function isZero(v: string): boolean {
  return v === "0" || v === "$0";
}
