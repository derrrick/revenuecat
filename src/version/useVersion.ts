import { useContext } from "react";
import { VersionCtx } from "./versionContextInternal";

export function useVersion() {
  const ctx = useContext(VersionCtx);
  if (!ctx) throw new Error("useVersion must be used inside VersionProvider");
  return ctx;
}
