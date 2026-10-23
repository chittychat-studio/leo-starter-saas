import { NextResponse, type NextRequest } from "next/server";
import { rateLimit } from "@/lib/rate-limit";
import { validateWaitlist } from "@/lib/validate";
import { saveSignup } from "@/lib/waitlist";

// File storage needs Node.js APIs, so this route never runs on the edge runtime.
export const runtime = "nodejs";
export const dynamic = "force-dynamic";

function clientKey(req: NextRequest): string {
  const forwarded = req.headers.get("x-forwarded-for");
  const ip = forwarded?.split(",")[0]?.trim() || req.headers.get("x-real-ip") || "local";
  return `waitlist:${ip}`;
}

export async function POST(req: NextRequest) {
  const limit = rateLimit(clientKey(req));
  if (!limit.ok) {
    return NextResponse.json(
      { ok: false, error: "Too many attempts. Please wait a few minutes and try again." },
      { status: 429, headers: { "Retry-After": String(limit.retryAfter) } },
    );
  }

  const type = req.headers.get("content-type") ?? "";
  if (!type.includes("application/json")) {
    return NextResponse.json({ ok: false, error: "Send JSON." }, { status: 415 });
  }

  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ ok: false, error: "The request body is not valid JSON." }, { status: 400 });
  }

  const result = validateWaitlist(body);
  if (!result.ok) {
    return NextResponse.json({ ok: false, error: result.error, field: result.field }, { status: 400 });
  }

  try {
    const status = await saveSignup({ ...result.value, createdAt: new Date().toISOString() });
    return NextResponse.json({ ok: true, status }, { status: status === "created" ? 201 : 200 });
  } catch (err) {
    // Log the reason on the server, show a calm message to the visitor.
    console.error("[waitlist] could not store signup:", err instanceof Error ? err.message : err);
    return NextResponse.json(
      { ok: false, error: "We could not save your signup right now. Please try again shortly." },
      { status: 503 },
    );
  }
}

export function GET() {
  return NextResponse.json({ ok: false, error: "Use POST." }, { status: 405, headers: { Allow: "POST" } });
}
