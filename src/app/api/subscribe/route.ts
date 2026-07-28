import { NextResponse } from "next/server";

/**
 * Dispatch (newsletter) sign-up.
 *
 * ASSUMPTION: no list provider is connected yet. This validates the address
 * and acknowledges it. Connect to Buttondown, Beehiiv, Mailchimp or similar
 * before launch, and add double opt-in to satisfy the privacy policy.
 */

const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

export async function POST(request: Request) {
  let email = "";

  try {
    const body = (await request.json()) as { email?: unknown };
    email = typeof body.email === "string" ? body.email.trim() : "";
  } catch {
    return NextResponse.json({ error: "Malformed request." }, { status: 400 });
  }

  if (!EMAIL.test(email)) {
    return NextResponse.json({ error: "Invalid address." }, { status: 422 });
  }

  console.info("[gelian] dispatch signup", {
    email,
    receivedAt: new Date().toISOString(),
  });

  return NextResponse.json({ ok: true }, { status: 200 });
}
