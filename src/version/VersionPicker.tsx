import { useEffect, useRef } from "react";
import { useVersion } from "./useVersion";
import { type Version } from "./versionContextInternal";
import { VARIANT_COPY } from "../data/signals";
import "./VersionPicker.css";

const ORDER: Version[] = ["Baseline", "A", "B", "C"];

export function VersionPicker() {
  const { version, setVersion, pickerOpen, closePicker } = useVersion();
  const firstCardRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (pickerOpen) firstCardRef.current?.focus();
  }, [pickerOpen]);

  if (!pickerOpen) return null;

  return (
    <div
      className="vp-scrim"
      role="dialog"
      aria-modal="true"
      aria-labelledby="vp-title"
      onClick={closePicker}
    >
      <div className="vp" onClick={(e) => e.stopPropagation()}>
        <header className="vp__head">
          <div className="vp__head-text">
            <p className="vp__eyebrow">Prototype</p>
            <h2 id="vp-title" className="vp__title">Choose a design option</h2>
            <p className="vp__sub">
              Baseline + three takes on the same brief. Press{" "}
              <kbd className="vp__kbd">⌘</kbd>
              <kbd className="vp__kbd">V</kbd> any time to switch.
            </p>
          </div>
          <button className="vp__close" onClick={closePicker} aria-label="Close">
            ×
          </button>
        </header>

        <div className="vp__grid">
          {ORDER.map((v, i) => {
            const copy = VARIANT_COPY[v];
            const active = v === version;
            return (
              <button
                key={v}
                ref={i === 0 ? firstCardRef : undefined}
                className={`vp-card ${active ? "is-active" : ""}`}
                onClick={() => {
                  setVersion(v);
                  closePicker();
                }}
                aria-pressed={active}
              >
                <PreviewThumb variant={v} />
                <div className="vp-card__meta">
                  <div className="vp-card__meta-row">
                    <span className="vp-card__title">{copy.title}</span>
                    {active && <span className="vp-card__check" aria-label="active">●</span>}
                  </div>
                  <span className="vp-card__tagline">{copy.tagline}</span>
                  <p className="vp-card__pitch">{copy.pitch}</p>
                </div>
              </button>
            );
          })}
        </div>

        <footer className="vp__foot">
          <span className="vp__hint">Esc to close</span>
        </footer>
      </div>
    </div>
  );
}

function PreviewThumb({ variant }: { variant: Version }) {
  // Stylized, deterministic thumbnails — NOT screenshots. They exist to
  // communicate the shape of each variant at a glance inside the picker.
  if (variant === "Baseline") {
    return (
      <div className="vp-thumb vp-thumb--baseline">
        <div className="vp-thumb__row">
          <span className="vp-thumb__tile" />
          <span className="vp-thumb__tile" />
          <span className="vp-thumb__tile" />
        </div>
        <div className="vp-thumb__row">
          <span className="vp-thumb__tile" />
          <span className="vp-thumb__tile" />
          <span className="vp-thumb__tile" />
        </div>
      </div>
    );
  }
  if (variant === "A") {
    return (
      <div className="vp-thumb vp-thumb--a">
        <div className="vp-thumb__row">
          <span className="vp-thumb__tile">
            <span className="vp-thumb__delta vp-thumb__delta--neg" />
          </span>
          <span className="vp-thumb__tile">
            <span className="vp-thumb__delta vp-thumb__delta--pos" />
          </span>
          <span className="vp-thumb__tile">
            <span className="vp-thumb__delta vp-thumb__delta--neu" />
          </span>
        </div>
        <div className="vp-thumb__row">
          <span className="vp-thumb__tile" />
          <span className="vp-thumb__tile" />
          <span className="vp-thumb__tile" />
        </div>
        <div className="vp-thumb__panel" />
      </div>
    );
  }
  if (variant === "B") {
    return (
      <div className="vp-thumb vp-thumb--b">
        <div className="vp-thumb__forecast">
          <svg viewBox="0 0 120 40" preserveAspectRatio="none" className="vp-thumb__chart">
            <path
              d="M0 30 C 20 28, 40 24, 60 18 C 75 14, 88 10, 100 7 L 120 6"
              fill="none"
              stroke="var(--rc-green-primary)"
              strokeWidth="1.6"
            />
            <path
              d="M60 18 C 75 14, 88 10, 100 7 L 120 6"
              fill="none"
              stroke="var(--rc-green-primary)"
              strokeWidth="1.6"
              strokeDasharray="3 3"
            />
          </svg>
          <div className="vp-thumb__stats">
            <span />
            <span />
          </div>
        </div>
        <div className="vp-thumb__row">
          <span className="vp-thumb__tile" />
          <span className="vp-thumb__tile" />
          <span className="vp-thumb__tile" />
        </div>
      </div>
    );
  }
  return (
    <div className="vp-thumb vp-thumb--c">
      <div className="vp-thumb__bar" />
      <div className="vp-thumb__row">
        <span className="vp-thumb__tile">
          <span className="vp-thumb__delta vp-thumb__delta--neg" />
        </span>
        <span className="vp-thumb__tile">
          <span className="vp-thumb__delta vp-thumb__delta--pos" />
        </span>
        <span className="vp-thumb__tile">
          <span className="vp-thumb__delta vp-thumb__delta--neu" />
        </span>
      </div>
      <div className="vp-thumb__row">
        <span className="vp-thumb__tile" />
        <span className="vp-thumb__tile" />
        <span className="vp-thumb__tile" />
      </div>
    </div>
  );
}

export function VersionHint() {
  const { openPicker, pickerOpen, version } = useVersion();
  if (pickerOpen) return null;
  return (
    <button
      className="vp-hint"
      onClick={openPicker}
      aria-label="Open prototype version picker"
    >
      <span className="vp-hint__dot" />
      <span className="vp-hint__label">
        {version === "Baseline" ? "Baseline" : `Option ${version}`}
      </span>
      <span className="vp-hint__kbd">
        <kbd>⌘</kbd>
        <kbd>V</kbd>
      </span>
    </button>
  );
}
