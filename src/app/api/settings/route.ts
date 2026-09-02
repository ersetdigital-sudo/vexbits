import { NextRequest, NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabase-admin";

// GET all settings
export async function GET() {
  const { data, error } = await supabaseAdmin.from("settings").select("*");
  if (error) return NextResponse.json({ error: error.message }, { status: 500 });

  const settings: Record<string, unknown> = {};
  (data ?? []).forEach((row) => {
    settings[row.key] = row.value;
  });
  return NextResponse.json(settings);
}

// PUT upsert settings
export async function PUT(req: NextRequest) {
  const body = await req.json();
  const entries = Object.entries(body).map(([key, value]) => ({ key, value }));
  const { error } = await supabaseAdmin.from("settings").upsert(entries, { onConflict: "key" });
  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json({ ok: true });
}
