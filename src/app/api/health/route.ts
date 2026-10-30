import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";

// Runs as a serverless function on Vercel.
// (Reading cookies() already makes this route dynamic.)

/**
 * Health-check endpoint. Confirms the app is up and whether the
 * Supabase environment variables are wired. Also tries a lightweight
 * auth call to verify the client can reach Supabase.
 */
export async function GET() {
  const hasEnv =
    Boolean(process.env.NEXT_PUBLIC_SUPABASE_URL) &&
    Boolean(process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY);

  let supabaseReachable = false;
  let message = "Supabase env vars not set. Fill .env.local.";

  if (hasEnv) {
    try {
      const supabase = await createClient();
      const { error } = await supabase.auth.getSession();
      supabaseReachable = !error;
      message = error ? error.message : "Connected to Supabase.";
    } catch (e) {
      message = e instanceof Error ? e.message : "Unknown error";
    }
  }

  return NextResponse.json({
    status: "ok",
    timestamp: new Date().toISOString(),
    env: { supabaseConfigured: hasEnv },
    supabase: { reachable: supabaseReachable, message },
  });
}
