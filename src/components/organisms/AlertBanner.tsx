import { useState } from "react";
import "./AlertBanner.css";

export function AlertBanner() {
  const [open, setOpen] = useState(true);
  if (!open) return null;
  return (
    <div className="alert-banner">
      <p className="alert-banner__text">
        Your app CatGPT is missing its In-App Purchase Key and/or bundle id. Please
        configure the App Bundle ID, P8 key file from App Store Connect, Key ID and
        Issuer ID in the affected app's settings page for uninterrupted service when
        using StoreKit 2.{" "}
        <a href="#" className="alert-banner__link">
          Learn more.
        </a>
      </p>
      <button
        className="alert-banner__close"
        aria-label="Dismiss"
        onClick={() => setOpen(false)}
      >
        <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
          <path
            d="M3 3l8 8M11 3l-8 8"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
          />
        </svg>
      </button>
    </div>
  );
}
