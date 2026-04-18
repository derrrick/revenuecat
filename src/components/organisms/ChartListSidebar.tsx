import { useState } from "react";
import { Link, useParams } from "react-router-dom";
import { CatIcon } from "../../icons/CatIcon";
import { CHART_LIST } from "../../data/chartList";
import "./ChartListSidebar.css";

export function ChartListSidebar() {
  const params = useParams();
  const currentSlug = params.chart ?? "revenue";
  const [open, setOpen] = useState<Record<string, boolean>>(() =>
    Object.fromEntries(CHART_LIST.map((g) => [g.label, true]))
  );

  return (
    <div className="cl">
      <div className="cl__header">
        <div className="cl__title">Charts</div>
        <button className="cl__collapse" type="button" aria-label="Hide side menu">
          <CatIcon name="double-arrow-left" size={16} />
        </button>
      </div>

      <div className="cl__body">
        <div className="cl__search">
          <span className="cl__search-icon" aria-hidden>
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M7 1C10.3137 1 13 3.68629 13 7C13 8.2957 12.587 9.49384 11.8887 10.4746L14.707 13.293C15.0975 13.6835 15.0976 14.3165 14.707 14.707C14.3165 15.0976 13.6835 15.0975 13.293 14.707L10.4746 11.8887C9.49384 12.587 8.2957 13 7 13C3.68629 13 1 10.3137 1 7C1 3.68629 3.68629 1 7 1ZM7 3C4.79086 3 3 4.79086 3 7C3 9.20914 4.79086 11 7 11C9.20914 11 11 9.20914 11 7C11 4.79086 9.20914 3 7 3Z"
                fill="currentColor"
              />
            </svg>
          </span>
          <input
            className="cl__search-input"
            placeholder="Search charts..."
            type="text"
          />
        </div>

        {CHART_LIST.map((group) => (
          <div
            key={group.label}
            className={`cl-group ${open[group.label] ? "is-open" : ""}`}
          >
            <button
              className="cl-group__header"
              type="button"
              aria-expanded={open[group.label]}
              onClick={() => setOpen((s) => ({ ...s, [group.label]: !s[group.label] }))}
            >
              <span className="cl-group__caret">
                <CatIcon name="arrow-up" size={11} />
              </span>
              <span className="cl-group__label">{group.label}</span>
            </button>
            {open[group.label] && (
              <ul className="cl-group__list">
                {group.items.map((item) => {
                  const active = item.slug === currentSlug;
                  return (
                    <li key={item.slug}>
                      <Link
                        className={`cl-item ${active ? "is-active" : ""}`}
                        to={`/charts/${item.slug}`}
                        aria-current={active ? "page" : undefined}
                      >
                        <span
                          className={`cl-item__icon cl-item__icon--${group.tone}`}
                        >
                          <CatIcon name={item.icon} size={16} />
                        </span>
                        <p className="cl-item__label">
                          <span>{item.label}</span>
                        </p>
                      </Link>
                    </li>
                  );
                })}
              </ul>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
