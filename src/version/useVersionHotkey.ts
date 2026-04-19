import { useEffect } from "react";
import { useVersion } from "./useVersion";

/**
 * Global Cmd/Ctrl+V handler. Only fires when the user is not typing into a
 * form field or contenteditable element, so real paste still works.
 *
 * Esc closes the picker when it is open.
 */
export function useVersionHotkey() {
  const { togglePicker, closePicker, pickerOpen } = useVersion();

  useEffect(() => {
    function onKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape" && pickerOpen) {
        e.preventDefault();
        closePicker();
        return;
      }

      const isPickerShortcut =
        (e.metaKey || e.ctrlKey) && !e.shiftKey && !e.altKey && e.key.toLowerCase() === "v";
      if (!isPickerShortcut) return;

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
      togglePicker();
    }

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [togglePicker, closePicker, pickerOpen]);
}
