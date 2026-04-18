import { Outlet } from "react-router-dom";
import { AlertBanner } from "./AlertBanner";
import { TopHeader } from "./TopHeader";
import { LeftSidebar } from "./LeftSidebar";
import "./AppShell.css";

export function AppShell() {
  return (
    <div className="shell">
      <AlertBanner />
      <TopHeader />
      <div className="shell__row">
        <LeftSidebar />
        <main className="shell__main">
          <div className="shell__paper">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
}
