import { NextResponse } from "next/server";
import { getDb } from "@/lib/mongodb";

const rateLimitStore = new Map();
const RATE_LIMIT_WINDOW_MS = 60 * 60 * 1000;
const RATE_LIMIT_MAX = 8;

function getClientIp(request) {
  const fwd = request.headers.get("x-forwarded-for");
  if (fwd) return fwd.split(",")[0].trim();
  return "unknown";
}

function isRateLimited(ip) {
  const now = Date.now();
  const hits = (rateLimitStore.get(ip) || []).filter((t) => now - t < RATE_LIMIT_WINDOW_MS);
  hits.push(now);
  rateLimitStore.set(ip, hits);
  return hits.length > RATE_LIMIT_MAX;
}

function sanitize(value) {
  if (typeof value !== "string") return "";
  return value.replace(/<[^>]*>/g, "").trim().slice(0, 3000);
}

export async function POST(request) {
  try {
    const ip = getClientIp(request);
    if (isRateLimited(ip)) {
      return NextResponse.json({ ok: false, error: "Too many requests." }, { status: 429 });
    }

    const body = await request.json();
    const lead = {
      firstName: sanitize(body.firstName),
      lastName: sanitize(body.lastName),
      email: sanitize(body.email),
      company: sanitize(body.company),
      service: sanitize(body.service),
      message: sanitize(body.message),
      lang: sanitize(body.lang) || "ar",
      status: "new",
      createdAt: new Date(),
      ip,
    };

    if (!lead.firstName || !lead.lastName || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(lead.email) || !lead.message) {
      return NextResponse.json({ ok: false, error: "Invalid form data." }, { status: 400 });
    }

    const db = await getDb();
    const result = await db.collection("leads").insertOne(lead);

    // Email delivery is stubbed locally — wire a real provider (Resend/SendGrid/SMTP)
    // once API keys are available.
    console.log(
      `\n[stub email] → hello@nexacore.ai\nNew enquiry: ${lead.firstName} ${lead.lastName} <${lead.email}>\nService: ${lead.service}\nMessage: ${lead.message}\n`
    );

    return NextResponse.json({ ok: true, id: result.insertedId });
  } catch (err) {
    console.error("[contact] failed:", err);
    return NextResponse.json({ ok: false, error: "Server error." }, { status: 500 });
  }
}
