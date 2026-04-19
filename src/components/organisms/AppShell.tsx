import { Outlet } from "react-router-dom";
import { TopHeader } from "./TopHeader";
import { LeftSidebar } from "./LeftSidebar";
import "./AppShell.css";

export function AppShell() {
  return (
    <div className="shell">
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
