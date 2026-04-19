import { useState } from "react";
import { ChevronDown } from "../../icons/Icon";
import { RCLogo } from "../../icons/RCLogo";
import { useVersion } from "../../version/useVersion";
import { SlackNotificationMock } from "./SlackNotificationMock";
import "./TopHeader.css";

function SearchIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
      <circle cx="6" cy="6" r="4" stroke="currentColor" strokeWidth="1.5" />
      <path d="M9.5 9.5L12.5 12.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  );
}

function HelpIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
      <circle cx="8" cy="8" r="6" stroke="currentColor" strokeWidth="1.4" />
      <path
        d="M6 6.4a2 2 0 014 0c0 1-1 1.4-1.7 1.8-.4.3-.5.6-.5 1.1"
        stroke="currentColor"
        strokeWidth="1.4"
        strokeLinecap="round"
      />
      <circle cx="8" cy="11.4" r="0.6" fill="currentColor" />
    </svg>
  );
}

function AccountIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
      <path
        d="M8 8a2.5 2.5 0 100-5 2.5 2.5 0 000 5z"
        stroke="currentColor"
        strokeWidth="1.4"
      />
      <path
        d="M3 14c0-2.5 2.2-4 5-4s5 1.5 5 4"
        stroke="currentColor"
        strokeWidth="1.4"
        strokeLinecap="round"
      />
    </svg>
  );
}

function BellIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
      <path
        d="M8 2.2c-2.3 0-4.1 1.8-4.1 4.1v1.4c0 .8-.2 1.5-.7 2.2L2.4 11h11.2l-.8-1.1c-.5-.7-.7-1.4-.7-2.2V6.3C12.1 4 10.3 2.2 8 2.2z"
        stroke="currentColor"
        strokeWidth="1.4"
        strokeLinejoin="round"
      />
      <path
        d="M6.4 12.6a1.8 1.8 0 003.2 0"
        stroke="currentColor"
        strokeWidth="1.4"
        strokeLinecap="round"
      />
    </svg>
  );
}

export function TopHeader() {
  const { version } = useVersion();
  const [slackOpen, setSlackOpen] = useState(false);
  const showBell = version === "C";

  return (
    <header className="top-header">
      <div className="top-header__left">
        <button className="rc-logo" aria-label="RevenueCat">
          <RCLogo className="rc-logo__mark" />
        </button>
        <button className="project-chip">
          <img
            src="/assets/dipsea-mark.svg"
            alt=""
            aria-hidden
            className="project-chip__mark"
          />
          <span className="project-chip__name">Dipsea</span>
          <span className="project-chip__caret">
            <ChevronDown />
          </span>
        </button>
      </div>

      <div className="top-header__right">
        <div className="top-search">
          <span className="top-search__icon">
            <SearchIcon />
          </span>
          <input className="top-search__input" placeholder="Search..." />
          <span className="top-search__kbd">⌘K</span>
        </div>
        {showBell && (
          <button
            className="hdr-bell"
            onClick={() => setSlackOpen(true)}
            aria-label="Open signal notifications preview"
            title="Signal notifications"
          >
            <BellIcon />
            <span className="hdr-bell__dot" aria-hidden />
          </button>
        )}
        <button className="hdr-menu-item">
          <HelpIcon />
          <span>Help</span>
        </button>
        <button className="hdr-menu-item">
          <AccountIcon />
          <span>Account</span>
        </button>
      </div>

      <SlackNotificationMock open={slackOpen} onClose={() => setSlackOpen(false)} />
    </header>
  );
}
