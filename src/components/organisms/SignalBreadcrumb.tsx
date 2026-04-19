import { useNavigate, useSearchParams } from "react-router-dom";
import { RANKED_SIGNALS } from "../../data/signals";
import "./SignalBreadcrumb.css";

/**
 * "← Flagged by Signal" banner shown at the top of the Charts page when a
 * user deep-links in from the SignalBar. Severity color matches the SignalBar
 * so the visual thread between surfaces is preserved.
 */
export function SignalBreadcrumb() {
  const [params, setParams] = useSearchParams();
  const navigate = useNavigate();
  const signalId = params.get("signal");
  if (!signalId) return null;

  const signal = RANKED_SIGNALS.find((s) => s.id === signalId);
  if (!signal) return null;

  const close = () => {
    params.delete("signal");
    setParams(params, { replace: true });
  };

  const back = () => navigate("/overview");

  return (
    <div className={`sbc sbc--${signal.severity}`}>
      <span className="sbc__accent" />
      <div className="sbc__inner">
        <button className="sbc__back" onClick={back} type="button">
          ← Back to Overview
        </button>
        <span className="sbc__sep" aria-hidden>/</span>
        <span className="sbc__label">
          Flagged by <strong>Signal</strong> at {signal.firedAt}
        </span>
        <span className="sbc__pill">{formatPct(signal.pct)}</span>
        <div className="sbc__spacer" />
        <button className="sbc__close" onClick={close} aria-label="Dismiss signal context">
          ×
        </button>
      </div>
    </div>
  );
}

function formatPct(pct: number) {
  const sign = pct > 0 ? "+" : pct < 0 ? "−" : "";
  return `${sign}${Math.abs(pct).toFixed(1)}%`;
}
