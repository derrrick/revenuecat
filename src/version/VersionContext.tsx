import {
  useCallback,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import { VersionCtx, type Version, type VersionCtxValue } from "./versionContextInternal";

const STORAGE_KEY = "signal-layer.version";
const DEFAULT: Version = "Baseline";

function readInitial(): Version {
  if (typeof window === "undefined") return DEFAULT;
  const stored = window.sessionStorage.getItem(STORAGE_KEY);
  return stored === "Baseline" || stored === "A" || stored === "B" || stored === "C"
    ? stored
    : DEFAULT;
}

export function VersionProvider({ children }: { children: ReactNode }) {
  const [version, setVersionState] = useState<Version>(readInitial);
  const [pickerOpen, setPickerOpen] = useState(false);

  const setVersion = useCallback((v: Version) => {
    setVersionState(v);
    try {
      window.sessionStorage.setItem(STORAGE_KEY, v);
    } catch {
      // ignore storage failures (private mode, etc.)
    }
  }, []);

  const value = useMemo<VersionCtxValue>(
    () => ({
      version,
      setVersion,
      pickerOpen,
      openPicker: () => setPickerOpen(true),
      closePicker: () => setPickerOpen(false),
      togglePicker: () => setPickerOpen((o) => !o),
    }),
    [version, setVersion, pickerOpen],
  );

  useEffect(() => {
    (window as unknown as { setVersion?: (v: Version) => void }).setVersion = setVersion;
  }, [setVersion]);

  return <VersionCtx.Provider value={value}>{children}</VersionCtx.Provider>;
}
