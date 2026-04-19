import { useEffect, useRef } from "react";
import "./SlackNotificationMock.css";

type Props = {
  open: boolean;
  onClose: () => void;
};

/**
 * Modal preview of the Slack/email push layer that lives off the dashboard.
 * Shows two message variants stacked — an active warning and a recovery
 * follow-up — to demonstrate the complete detection loop.
 */
export function SlackNotificationMock({ open, onClose }: Props) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") onClose();
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, onClose]);

  if (!open) return null;

  return (
    <div className="slm-scrim" onClick={onClose}>
      <div className="slm" onClick={(e) => e.stopPropagation()} ref={ref}>
        <header className="slm__head">
          <div>
            <p className="slm__eyebrow">Push layer</p>
            <h2 className="slm__title">Signal notifications</h2>
            <p className="slm__sub">
              Sample Slack messages that fire when a metric crosses its z-score threshold, and the
              recovery follow-up that closes the loop.
            </p>
          </div>
          <button className="slm__close" onClick={onClose} aria-label="Close">×</button>
        </header>

        <div className="slm__messages">
          <SlackMessage
            variant="warning"
            channel="#revenuecat-alerts"
            time="2:14 PM"
            title="Trial CVR dropped 4.5% in the last 48h"
            body="This is well below Dipsea's 30-day baseline for Trial CVR. Driven primarily by the iOS App Store."
            cta="View in Dashboard"
          />
          <SlackMessage
            variant="recovery"
            channel="#revenuecat-alerts"
            time="Just now"
            title="Trial CVR has recovered"
            body="Dipsea's Trial CVR is back within its 30-day baseline. Alert is now closed."
            cta="Review signal history"
          />
        </div>

        <footer className="slm__foot">
          <span>Esc to close</span>
          <span className="slm__hint">
            Notification channels and thresholds are configurable per-project in V2.
          </span>
        </footer>
      </div>
    </div>
  );
}

function SlackMessage({
  variant,
  channel,
  time,
  title,
  body,
  cta,
}: {
  variant: "warning" | "recovery";
  channel: string;
  time: string;
  title: string;
  body: string;
  cta: string;
}) {
  return (
    <article className={`slm-msg slm-msg--${variant}`}>
      <span className="slm-msg__accent" />
      <div className="slm-msg__body">
        <header className="slm-msg__head">
          <span className="slm-msg__bot">
            <span className="slm-msg__bot-mark">RC</span>
            <span className="slm-msg__bot-name">RevenueCat</span>
            <span className="slm-msg__bot-tag">APP</span>
          </span>
          <span className="slm-msg__meta">
            <span>{channel}</span>
            <span className="slm-msg__dot" aria-hidden>·</span>
            <span>{time}</span>
          </span>
        </header>
        <h3 className="slm-msg__title">{title}</h3>
        <p className="slm-msg__text">{body}</p>
        <div className="slm-msg__actions">
          <button className={`slm-msg__cta slm-msg__cta--${variant}`}>{cta}</button>
        </div>
      </div>
    </article>
  );
}
