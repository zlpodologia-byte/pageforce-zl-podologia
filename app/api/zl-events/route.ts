import { NextResponse } from "next/server";

const EVENT_NAMES = new Set([
  "wa_click",
  "service_select",
  "tab_select",
  "maps_click",
  "phone_click",
  "quiz_start",
  "quiz_progress",
  "quiz_complete",
  "quiz_cta_click",
  "scroll_biosafety",
  "scroll_team",
  "scroll_final_cta",
  "storyteller_view",
  "storyteller_card_view",
]);

const STRING_FIELDS = [
  "source",
  "service",
  "tab",
  "recommended_service",
  "zl_event_schema",
  "sent_at",
  "page_path",
  "session_id",
] as const;

const NUMBER_FIELDS = ["step", "card_index"] as const;

function cleanString(value: unknown) {
  if (typeof value !== "string") return undefined;
  const trimmed = value.trim();
  return trimmed ? trimmed.slice(0, 180) : undefined;
}

function cleanNumber(value: unknown) {
  return typeof value === "number" && Number.isFinite(value)
    ? value
    : undefined;
}

export async function POST(request: Request) {
  let body: unknown;

  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "invalid_json" }, { status: 400 });
  }

  if (!body || typeof body !== "object") {
    return NextResponse.json({ error: "invalid_payload" }, { status: 400 });
  }

  const input = body as Record<string, unknown>;
  const event = cleanString(input.event);

  if (!event || !EVENT_NAMES.has(event)) {
    return NextResponse.json({ error: "invalid_event" }, { status: 400 });
  }

  const logPayload: Record<string, string | number> = {
    event,
    received_at: new Date().toISOString(),
  };

  for (const key of STRING_FIELDS) {
    const value = cleanString(input[key]);
    if (value) {
      logPayload[key] = value;
    }
  }

  for (const key of NUMBER_FIELDS) {
    const value = cleanNumber(input[key]);
    if (value !== undefined) {
      logPayload[key] = value;
    }
  }

  console.info("[zl-event]", logPayload);

  return new Response(null, {
    status: 204,
    headers: {
      "Cache-Control": "no-store",
    },
  });
}
