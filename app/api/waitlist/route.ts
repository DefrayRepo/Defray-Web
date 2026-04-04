import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

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

  // ── Env vars ────────────────────────────────────────────────────────────────
  const supabaseUrl         = process.env.SUPABASE_URL;
  const supabaseAnonKey     = process.env.SUPABASE_ANON_KEY;
  const supabaseServiceKey  = process.env.SUPABASE_SERVICE_ROLE_KEY;

  if (!supabaseUrl || !supabaseAnonKey || !supabaseServiceKey) {
    console.error("Missing Supabase env vars");
    return NextResponse.json(
      { error: "Server configuration error." },
      { status: 500 }
    );
  }

  // ── Rate limit (Supabase — distributed, persists across all instances) ──────
  // Uses the service-role key so it can bypass RLS and call the SECURITY
  // DEFINER function. The anon key cannot call check_waitlist_rate_limit.
  const ip =
    request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ?? "unknown";

  // Window start = current minute, truncated (matches the Postgres function)
  const windowStart = new Date();
  windowStart.setSeconds(0, 0);

  const serviceClient = createClient(supabaseUrl, supabaseServiceKey);
  const { data: allowed, error: rpcError } = await serviceClient.rpc(
    "check_waitlist_rate_limit",
    { p_ip: ip, p_window_start: windowStart.toISOString(), p_limit: 3 }
  );

  if (rpcError) {
    // Log but don't hard-fail — degrade gracefully if the rate limit table
    // isn't applied yet (e.g. migration pending)
    console.error("Rate limit RPC error:", rpcError.message);
  } else if (allowed === false) {
    return NextResponse.json(
      { error: "Too many requests. Please wait a moment." },
      { status: 429 }
    );
  }

  // ── Supabase insert (anon key — RLS allows anon INSERT on waitlist) ─────────
  const anonClient = createClient(supabaseUrl, supabaseAnonKey);

  const { error: insertError } = await anonClient
    .from("waitlist")
    .insert({ email, source: "website" });

  if (insertError) {
    if (insertError.code === "23505") {
      // Unique constraint — already on waitlist, treat as success
      return NextResponse.json({ message: "Already on the list." }, { status: 409 });
    }
    console.error("Supabase waitlist insert error:", insertError.message);
    return NextResponse.json({ error: "Could not save email." }, { status: 500 });
  }

  return NextResponse.json({ message: "Added to waitlist." }, { status: 201 });
}
