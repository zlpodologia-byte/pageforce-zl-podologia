"use client";

import Script from "next/script";
import { useEffect, useRef } from "react";

/**
 * GA4 + eventos analytics da landing da ZL v7a.
 *
 * Carrega o GA4 quando `NEXT_PUBLIC_GA_ID` esta setado. Em dev, funciona
 * como stub que loga eventos no console (para conferencia em
 * DebugView). Em producao, encaminha pra `window.gtag`.
 *
 * Uso: `trackZlEvent("wa_click", { source: "hero_primary", service: "general" })`
 * em qualquer handler.
 *
 * Eventos canonicos (v7a):
 * - wa_click (source, service?)
 * - service_select (source, service)
 * - tab_select (service, tab)
 * - maps_click
 * - phone_click
 * - quiz_start
 * - quiz_progress (step)
 * - quiz_complete
 * - quiz_cta_click (recommended_service)
 * - scroll_biosafety
 * - scroll_team
 * - scroll_final_cta
 * - storyteller_view
 * - storyteller_card_view (card_index)
 */

export type ZlTrackEventName =
  | "wa_click"
  | "service_select"
  | "tab_select"
  | "maps_click"
  | "phone_click"
  | "quiz_start"
  | "quiz_progress"
  | "quiz_complete"
  | "quiz_cta_click"
  | "scroll_biosafety"
  | "scroll_team"
  | "scroll_final_cta"
  | "storyteller_view"
  | "storyteller_card_view";

interface ZlTrackEventParams {
  source?: string;
  service?: string;
  tab?: string;
  step?: number;
  card_index?: number;
  recommended_service?: string;
  [key: string]: string | number | boolean | undefined;
}

declare global {
  interface Window {
    // gtag is injected by the GA script when `NEXT_PUBLIC_GA_ID` is set.
    gtag?: (
      command: string,
      eventName: string,
      params?: Record<string, unknown>
    ) => void;
    dataLayer?: unknown[];
  }
}

/**
 * Track an event in GA4. In dev (no GA_ID), logs to console so the
 * developer can confirm the event fires from the handler wiring.
 */
export function trackZlEvent(
  name: ZlTrackEventName,
  params: ZlTrackEventParams = {}
): void {
  if (typeof window === "undefined") return;

  // Always push to dataLayer (works with GTM too).
  const payload = {
    event: name,
    ...params,
    zl_event_schema: "v7a",
    sent_at: new Date().toISOString(),
  };
  window.dataLayer = window.dataLayer ?? [];
  window.dataLayer.push(payload);

  // Gtag direct (GA4) when loaded.
  if (typeof window.gtag === "function") {
    window.gtag("event", name, params);
    return;
  }

  // Dev stub — console only so it's visible in QA.
  if (process.env.NODE_ENV !== "production") {
    // eslint-disable-next-line no-console
    console.info("[zl-analytics]", name, params);
  }
}

/**
 * Installs the GA4 global (when configured) plus a set of
 * IntersectionObservers for scroll-based events (scroll_biosafety,
 * scroll_team, scroll_final_cta, storyteller_view).
 *
 * Renders <Script> tags from next/script so they're deferred and do not
 * block first paint. Safe to render once per page (idempotent: the IOs
 * dedupe on element presence).
 */
export function ZlAnalytics() {
  const gaId = process.env.NEXT_PUBLIC_GA_ID ?? "";
  const observersRef = useRef<IntersectionObserver[]>([]);

  // Scroll observers — depth markers for key sections.
  useEffect(() => {
    if (typeof window === "undefined") return;

    const firedOnce = new Set<string>();
    const observers: IntersectionObserver[] = [];

    const bind = (selector: string, event: ZlTrackEventName) => {
      const node = document.querySelector(selector);
      if (!node) return;
      const io = new IntersectionObserver(
        (entries) => {
          for (const entry of entries) {
            if (entry.isIntersecting && !firedOnce.has(event)) {
              firedOnce.add(event);
              trackZlEvent(event);
              io.disconnect();
              break;
            }
          }
        },
        { threshold: 0.25 }
      );
      io.observe(node);
      observers.push(io);
    };

    bind("#biosseguranca", "scroll_biosafety");
    bind("#equipe", "scroll_team");
    bind("#fechar", "scroll_final_cta");
    bind("#storyteller-encravada", "storyteller_view");

    observersRef.current = observers;
    return () => {
      for (const o of observers) o.disconnect();
    };
  }, []);

  if (!gaId) {
    // No GA_ID configured — dev mode, we just rely on dataLayer + console.
    return null;
  }

  return (
    <>
      <Script
        src={`https://www.googletagmanager.com/gtag/js?id=${gaId}`}
        strategy="afterInteractive"
      />
      <Script id="zl-ga4-init" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          window.gtag = gtag;
          gtag('js', new Date());
          gtag('config', '${gaId}', {
            anonymize_ip: true,
            page_path: window.location.pathname,
          });
        `}
      </Script>
    </>
  );
}
