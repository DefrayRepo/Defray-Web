import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

// Rate limiting via a simple in-memory map (per-deployment, not distributed)
// For production, replace with an upstash/redis rate limiter if needed
const recentIPs = new Map<string, number>();
const RATE_WINDOW_MS = 60_000; // 1 minute
const RATE_LIMIT = 3; // max 3 submissions per IP per minute

export async function POST(request: Request) {
  // ── Parse body ──────────────────────────────────────────────────────────────
  let email: string;
  try {
    const body = await request.json();
    email = (body.email ?? "").trim().toLowerCase();
  } catch {
    return NextResponse.json({ error: "Invalid request body." }, { status: 400 });
  }

  // ── Validate email ──────────────────────────────────────────────────────────
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!email || !emailRegex.test(email)) {
    return NextResponse.json({ error: "Invalid email address." }, { status: 400 });
  }

  if (email.length > 320) {
    return NextResponse.json({ error: "Email address too long." }, { status: 400 });
  }

  // ── Rate limit ──────────────────────────────────────────────────────────────
  const ip =
    request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ?? "unknown";
  const now = Date.now();
  const lastSeen = recentIPs.get(ip) ?? 0;
  const count = (recentIPs.get(`${ip}:count`) as unknown as number) ?? 0;

  if (now - lastSeen < RATE_WINDOW_MS && count >= RATE_LIMIT) {
    return NextResponse.json(
      { error: "Too many requests. Please wait a moment." },
      { status: 429 }
    );
  }

  recentIPs.set(ip, now);
  recentIPs.set(`${ip}:count` as string, (count + 1) as unknown as number);

  // Clean up old entries every 100 requests
  if (recentIPs.size > 1000) {
    for (const [key, val] of recentIPs) {
      if (typeof val === "number" && !key.includes(":count") && now - val > RATE_WINDOW_MS * 5) {
        recentIPs.delete(key);
        recentIPs.delete(`${key}:count`);
      }
    }
  }

  // ── Supabase insert ─────────────────────────────────────────────────────────
  const supabaseUrl = process.env.SUPABASE_URL;
  const supabaseAnonKey = process.env.SUPABASE_ANON_KEY;

  if (!supabaseUrl || !supabaseAnonKey) {
    console.error("Missing Supabase env vars");
    return NextResponse.json(
      { error: "Server configuration error." },
      { status: 500 }
    );
  }

  const supabase = createClient(supabaseUrl, supabaseAnonKey);

  const { error } = await supabase
    .from("waitlist")
    .insert({ email, source: "website" });

  if (error) {
    if (error.code === "23505") {
      // Unique constraint — already on waitlist
      return NextResponse.json({ message: "Already on the list." }, { status: 409 });
    }
    console.error("Supabase waitlist insert error:", error.message);
    return NextResponse.json({ error: "Could not save email." }, { status: 500 });
  }

  return NextResponse.json({ message: "Added to waitlist." }, { status: 201 });
}
