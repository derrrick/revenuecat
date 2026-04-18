import { Routes, Route, Navigate } from "react-router-dom";
import { Overview } from "./screens/Overview";
import { Revenue } from "./screens/Revenue";
import { AppShell } from "./components/organisms/AppShell";

export default function App() {
  return (
    <Routes>
      <Route element={<AppShell />}>
        <Route path="/" element={<Navigate to="/overview" replace />} />
        <Route path="/overview" element={<Overview />} />
        <Route path="/charts" element={<Navigate to="/charts/revenue" replace />} />
        <Route path="/charts/:chart" element={<Revenue />} />
      </Route>
    </Routes>
  );
}
