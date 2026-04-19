import { useEffect } from "react";
import { useLocation } from "react-router-dom";

/**
 * Flips <html data-route="presentation" | "app"> based on the current path so
 * CSS can scope fonts + tokens per route without either voice bleeding into
 * the other. The presentation uses Bebas/Archivo/JetBrains Mono;
 * the dashboard keeps PP Object Sans + Inter.
 */
export function useRouteTheme() {
  const { pathname } = useLocation();
  useEffect(() => {
    const isPresentation = pathname === "/" || pathname.startsWith("/proposal");
    const route = isPresentation ? "presentation" : "app";
    document.documentElement.dataset.route = route;
    return () => {
      // leave the last-known route set — harmless on unmount
    };
  }, [pathname]);
}
