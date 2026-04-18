import { TRANSACTIONS } from "../../data/transactions";
import { CatIcon } from "../../icons/CatIcon";
import "./RecentTransactionsTable.css";

const TYPE_CLASS: Record<string, string> = {
  Renewal: "rt-pill--renewal",
  "New Sub": "rt-pill--newsub",
  Trial: "rt-pill--trial",
};

export function RecentTransactionsTable() {
  return (
    <div className="rt-card">
      <div className="rt" role="table" data-testid="entity-list-table-transactions">
        <div className="rt__row rt__row--head" role="row">
          <div className="rt__cell rt__cell--id" role="columnheader">
            <span className="rt__head-stack">
              Customer ID
              <button
                className="rt__eye-btn"
                type="button"
                aria-label="show customer IDs"
              >
                <CatIcon name="eye" size={14} />
              </button>
            </span>
          </div>
          <div className="rt__cell" role="columnheader">Store</div>
          <div className="rt__cell" role="columnheader">Product</div>
          <div className="rt__cell" role="columnheader">Purchased</div>
          <div className="rt__cell" role="columnheader">Expires</div>
          <div className="rt__cell rt__cell--revenue" role="columnheader">
            <span className="rt__head-revenue">Revenue</span>
          </div>
          <div className="rt__cell" role="columnheader">Type</div>
        </div>

        {TRANSACTIONS.map((t) => (
          <div key={t.id} className="rt__row" role="row">
            <div className="rt__cell rt__cell--id" role="cell">
              <img
                src={`/country-flags/${t.country}.svg`}
                alt={t.countryLabel}
                aria-label={t.countryLabel}
                className="rt__flag"
              />
              <div className="rt__id-wrap">
                <a
                  href={`#/customers/${t.customerIdFull}`}
                  className="rt__id-link"
                >
                  <span className="rt__id-truncate">{t.customerId}</span>
                </a>
              </div>
              <div className="rt__spacer" />
              <button
                className="rt__copy-btn"
                type="button"
                aria-label="copy text"
                onClick={(e) => {
                  e.preventDefault();
                  navigator.clipboard?.writeText(t.customerIdFull);
                }}
              >
                <CatIcon name="copy" size={14} />
              </button>
            </div>
            <div className="rt__cell" role="cell">{t.store}</div>
            <div className="rt__cell" role="cell">
              <div className="rt__id-wrap">
                <span className="rt__mono-truncate">{t.product}</span>
              </div>
            </div>
            <div className="rt__cell" role="cell">
              <abbr
                title={t.purchasedTitle}
                aria-label={t.purchased}
                className="rt__abbr"
              >
                {t.purchased}
              </abbr>
            </div>
            <div className="rt__cell" role="cell">
              <abbr
                title={t.expiresTitle}
                aria-label={t.expires}
                className="rt__abbr"
              >
                {t.expires}
              </abbr>
            </div>
            <div className="rt__cell rt__cell--revenue" role="cell">
              {t.revenue === "—" ? (
                <span className="rt__revenue-dash">–</span>
              ) : (
                t.revenue
              )}
            </div>
            <div className="rt__cell" role="cell">
              <div className={`rt-pill ${TYPE_CLASS[t.type]}`}>
                <p className="rt-pill__text">{t.type}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
