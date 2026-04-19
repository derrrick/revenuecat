import { useCallback, useEffect, useState } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { Overview } from "./screens/Overview";
import { Revenue } from "./screens/Revenue";
import { AppShell } from "./components/organisms/AppShell";
import { ContextBlade } from "./components/organisms/ContextBlade";
import { VersionProvider } from "./version/VersionContext";
import { VersionPicker, VersionHint } from "./version/VersionPicker";
import { useVersionHotkey } from "./version/useVersionHotkey";

function RootShell() {
  useVersionHotkey();
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
        <Route element={<AppShell />}>
          <Route path="/" element={<Navigate to="/overview" replace />} />
          <Route path="/overview" element={<Overview />} />
          <Route path="/charts" element={<Navigate to="/charts/revenue" replace />} />
          <Route path="/charts/:chart" element={<Revenue />} />
        </Route>
      </Routes>
      <VersionPicker />
      <VersionHint />
      <ContextBlade open={bladeOpen} onClose={closeBlade} />
    </>
  );
}

export default function App() {
  return (
    <VersionProvider>
      <RootShell />
    </VersionProvider>
  );
}
