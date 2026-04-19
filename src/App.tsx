import { useCallback, useEffect, useRef, useState } from "react";
import { Routes, Route, Navigate, useLocation, useNavigate } from "react-router-dom";
import { Overview } from "./screens/Overview";
import { Revenue } from "./screens/Revenue";
import { AppShell } from "./components/organisms/AppShell";
import { ContextBlade } from "./components/organisms/ContextBlade";
import { VersionProvider } from "./version/VersionContext";
import { VersionPicker, VersionHint } from "./version/VersionPicker";
import { useVersionHotkey } from "./version/useVersionHotkey";
import { useVersion } from "./version/useVersion";
import { Presentation } from "./presentation/Presentation";

/** Opens the VersionPicker only on the initial hop from the presentation
 *  (via ?picker=open), strips the param through React Router's navigate
 *  so the cached location matches, and guards against StrictMode + any
 *  future remounts with a ref so it never fires twice. */
function PickerAutoOpen() {
  const { openPicker } = useVersion();
  const { pathname, search } = useLocation();
  const navigate = useNavigate();
  const firedRef = useRef(false);

  useEffect(() => {
    if (firedRef.current) return;
    const params = new URLSearchParams(search);
    if (params.get("picker") !== "open") return;

    firedRef.current = true;
    openPicker();
    params.delete("picker");
    const nextSearch = params.toString();
    navigate(pathname + (nextSearch ? `?${nextSearch}` : ""), { replace: true });
  }, [search, pathname, openPicker, navigate]);

  return null;
}

/** Preselects a dashboard variant when a process-reel card deep-links via
 *  ?v=baseline|a|b|c. Strips the param once applied so refreshes don't
 *  override a user's subsequent ⌘V choice. */
function VariantAutoSelect() {
  const { setVersion } = useVersion();
  const { pathname, search } = useLocation();
  const navigate = useNavigate();
  const firedRef = useRef(false);

  useEffect(() => {
    if (firedRef.current) return;
    const params = new URLSearchParams(search);
    const v = params.get("v");
    if (!v) return;

    const map: Record<string, "Baseline" | "A" | "B" | "C"> = {
      baseline: "Baseline",
      a: "A",
      b: "B",
      c: "C",
    };
    const resolved = map[v.toLowerCase()];
    if (!resolved) return;

    firedRef.current = true;
    setVersion(resolved);
    params.delete("v");
    const nextSearch = params.toString();
    navigate(pathname + (nextSearch ? `?${nextSearch}` : ""), { replace: true });
  }, [search, pathname, setVersion, navigate]);

  return null;
}

function AppRoutes() {
  useVersionHotkey();
  const { pathname } = useLocation();
  const isPresentation = pathname === "/" || pathname.startsWith("/proposal");
  const [bladeOpen, setBladeOpen] = useState(false);
  const closeBlade = useCallback(() => setBladeOpen(false), []);
  const toggleBlade = useCallback(() => setBladeOpen((o) => !o), []);

  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      const isShortcut =
        (e.metaKey || e.ctrlKey) &&
        !e.shiftKey &&
        !e.altKey &&
        e.key === "ArrowLeft";
      if (!isShortcut) return;

      const target = e.target as HTMLElement | null;
      if (target) {
        const tag = target.tagName;
        const editable =
          tag === "INPUT" ||
          tag === "TEXTAREA" ||
          tag === "SELECT" ||
          target.isContentEditable;
        if (editable) return;
      }

      e.preventDefault();
      toggleBlade();
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [toggleBlade]);

  return (
    <>
      <Routes>
        <Route path="/" element={<Presentation />} />
        <Route element={<AppShell />}>
          <Route path="/overview" element={<Overview />} />
          <Route path="/charts" element={<Navigate to="/charts/revenue" replace />} />
          <Route path="/charts/:chart" element={<Revenue />} />
        </Route>
      </Routes>
      {!isPresentation && (
        <>
          <PickerAutoOpen />
          <VariantAutoSelect />
          <VersionPicker />
          <VersionHint />
          <ContextBlade open={bladeOpen} onClose={closeBlade} />
        </>
      )}
    </>
  );
}

export default function App() {
  return (
    <VersionProvider>
      <AppRoutes />
    </VersionProvider>
  );
}
