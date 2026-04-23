"use client";

import { useEffect, useState } from "react";

const STORAGE_KEY = "zl-cookie-consent";

/**
 * Minimal LGPD-friendly cookie banner. Stores the user's choice in
 * localStorage; when `accepted`, we consider GA4 + analytics OK. When
 * `declined`, we keep the dataLayer push stub (for debugging) but suppress
 * any identified tracking.
 *
 * Keeps the UI quiet and reversible — no dark pattern, no ugly overlay.
 */
export function ZlCookieBanner() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;
    try {
      const stored = window.localStorage.getItem(STORAGE_KEY);
      if (!stored) {
        setVisible(true);
      }
    } catch {
      // localStorage disabled (Safari private) — skip silently.
    }
  }, []);

  const decide = (choice: "accepted" | "declined") => {
    try {
      window.localStorage.setItem(STORAGE_KEY, choice);
    } catch {
      // ignore
    }
    setVisible(false);
    // Propagate choice to gtag, if loaded.
    if (typeof window !== "undefined" && typeof window.gtag === "function") {
      window.gtag("consent", "update", {
        analytics_storage: choice === "accepted" ? "granted" : "denied",
      });
    }
  };

  if (!visible) return null;

  return (
    <div
      role="dialog"
      aria-live="polite"
      aria-label="Preferencias de cookies"
      className="pointer-events-auto fixed bottom-4 right-4 z-50 w-[min(92vw,22rem)] rounded-[1.1rem] border border-[#D2C3A6] bg-white/95 p-3.5 text-[0.82rem] leading-[1.5] text-[#5C4A38] shadow-[0_20px_52px_rgba(87,68,51,0.18)] backdrop-blur-sm sm:bottom-6 sm:right-6"
    >
      <p className="pr-1">
        A ZL usa cookies basicos (GA4) para entender como voce navega. Sem
        vender dados.
      </p>
      <div className="mt-2.5 flex items-center justify-end gap-2">
        <button
          type="button"
          onClick={() => decide("declined")}
          className="rounded-full border border-[#D2C3A6] bg-white px-3 py-1 text-[0.76rem] font-medium text-[#5C4A38] transition-colors hover:border-[#B89B77] hover:text-[#3A2E23]"
        >
          Recusar
        </button>
        <button
          type="button"
          onClick={() => decide("accepted")}
          className="rounded-full bg-[#3A2E23] px-3 py-1 text-[0.76rem] font-medium text-white transition-colors hover:bg-[#574433]"
        >
          Aceitar
        </button>
      </div>
    </div>
  );
}
