import { NextResponse } from "next/server";

/**
 * Contact endpoint.
 *
 * ASSUMPTION: no mail provider or CRM is wired up yet, so this route
 * validates the payload and acknowledges it. Submissions are logged to the
 * server console and nothing is persisted.
 *
 * TO GO LIVE, replace the marked block with a real transport — Resend,
 * Postmark, SES or a CRM webhook — and add rate limiting (e.g. Upstash) plus
 * a spam check before deploying to a public domain.
 */

const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

type Payload = {
  name?: unknown;
  email?: unknown;
  organisation?: unknown;
  topic?: unknown;
  message?: unknown;
};

function asString(value: unknown): string {
  return typeof value === "string" ? value.trim() : "";
}

export async function POST(request: Request) {
  let body: Payload;

  try {
    body = (await request.json()) as Payload;
  } catch {
    return NextResponse.json({ error: "Malformed request." }, { status: 400 });
  }

  const name = asString(body.name);
  const email = asString(body.email);
  const topic = asString(body.topic);
  const message = asString(body.message);
  const organisation = asString(body.organisation);

  const errors: string[] = [];
  if (name.length < 2) errors.push("name");
  if (!EMAIL.test(email)) errors.push("email");
  if (!topic) errors.push("topic");
  if (message.length < 20 || message.length > 4000) errors.push("message");

  if (errors.length > 0) {
    return NextResponse.json(
      { error: "Validation failed.", fields: errors },
      { status: 422 },
    );
  }

  // --- Replace this block with a real transport ---------------------------
  console.info("[gelian] contact enquiry", {
    name,
    email,
    organisation: organisation || null,
    topic,
    length: message.length,
    receivedAt: new Date().toISOString(),
  });
  // ------------------------------------------------------------------------

  return NextResponse.json({ ok: true }, { status: 200 });
}
