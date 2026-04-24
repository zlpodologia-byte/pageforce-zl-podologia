import { NextResponse } from "next/server";
import {
  isZlWhatsappSource,
  ZL_WHATSAPP_NUMBER,
  type ZlWhatsappSource,
} from "@/components/zl-podologia/zlPodologiaContent";

const DEFAULT_MESSAGE =
  "Olá, quero agendar um horário na ZL Podologia em Fortaleza.";

const ATTRIBUTION_KEYS = [
  "utm_source",
  "utm_medium",
  "utm_campaign",
  "utm_content",
  "utm_term",
  "gclid",
  "fbclid",
] as const;

function readCleanText(url: URL) {
  const rawText = url.searchParams.get("text")?.trim();

  if (!rawText) {
    return DEFAULT_MESSAGE;
  }

  // WhatsApp accepts long text, but this endpoint should only carry a
  // concise patient-facing opening message, never internal attribution.
  return rawText.slice(0, 500);
}

function readSource(url: URL): ZlWhatsappSource {
  const source = url.searchParams.get("source");
  return isZlWhatsappSource(source) ? source : "cta_final";
}

function readRefererAttribution(request: Request) {
  const referer = request.headers.get("referer");
  if (!referer) {
    return {};
  }

  try {
    const refererUrl = new URL(referer);
    const attribution: Record<string, string> = {
      referer_path: `${refererUrl.pathname}${refererUrl.search}`,
    };

    for (const key of ATTRIBUTION_KEYS) {
      const value = refererUrl.searchParams.get(key);
      if (value) {
        attribution[key] = value;
      }
    }

    return attribution;
  } catch {
    return {};
  }
}

export async function GET(request: Request) {
  const url = new URL(request.url);
  const source = readSource(url);
  const text = readCleanText(url);

  const destination = new URL("https://api.whatsapp.com/send");
  destination.searchParams.set("phone", ZL_WHATSAPP_NUMBER);
  destination.searchParams.set("text", text);

  const logPayload = {
    event: "wa_redirect",
    source,
    ...readRefererAttribution(request),
    sent_at: new Date().toISOString(),
  };

  console.info("[zl-wa]", logPayload);

  const response = NextResponse.redirect(destination.toString(), 307);
  response.headers.set("Cache-Control", "no-store");
  return response;
}
