import { NextResponse } from "next/server";
import {
  formatContactEmailText,
  validateContactPayload,
} from "@/components/contact-form/contactForm.shared";

function createErrorResponse(error: string, status: number) {
  return NextResponse.json({ error }, { status });
}

export async function POST(req: Request) {
  let rawBody: unknown;

  try {
    rawBody = await req.json();
  } catch {
    return createErrorResponse("Invalid JSON body.", 400);
  }

  const { values, fieldErrors } = validateContactPayload(rawBody);

  if (values.hp) {
    return NextResponse.json({ ok: true });
  }

  if (Object.keys(fieldErrors).length > 0) {
    return NextResponse.json(
      { error: "Validation failed.", fields: fieldErrors },
      { status: 422 },
    );
  }

  if (!process.env.RESEND_API_KEY) {
    console.log("[contact]", {
      ...values,
      receivedAt: new Date().toISOString(),
    });

    return NextResponse.json({ ok: true });
  }

  try {
    const resendResponse = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${process.env.RESEND_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from: "Pageforce <hello@pageforce.studio>",
        to: "hello@pageforce.studio",
        reply_to: values.email,
        subject: `New Pageforce contact - ${values.name}`,
        text: formatContactEmailText(values),
      }),
    });

    if (!resendResponse.ok) {
      const resendError = await resendResponse.text();

      console.error("[contact:resend]", resendResponse.status, resendError);
      return createErrorResponse("Unable to deliver message.", 502);
    }

    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error("[contact:resend]", error);
    return createErrorResponse("Unable to deliver message.", 502);
  }
}
