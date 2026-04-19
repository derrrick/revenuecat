import { createContext } from "react";

export type Version = "Baseline" | "A" | "B" | "C";

export type VersionCtxValue = {
  version: Version;
  setVersion: (v: Version) => void;
  pickerOpen: boolean;
  openPicker: () => void;
  closePicker: () => void;
  togglePicker: () => void;
};

export const VersionCtx = createContext<VersionCtxValue | null>(null);
