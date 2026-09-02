import { NextRequest, NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabase-admin";

// PATCH update nominal
export async function PATCH(req: NextRequest, { params }: { params: Promise<{ nid: string }> }) {
  const { nid } = await params;
  const body = await req.json();
  const { error } = await supabaseAdmin.from("product_nominals").update(body).eq("id", nid);
  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json({ ok: true });
}

// DELETE nominal
export async function DELETE(_req: NextRequest, { params }: { params: Promise<{ nid: string }> }) {
  const { nid } = await params;
  const { error } = await supabaseAdmin.from("product_nominals").delete().eq("id", nid);
  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json({ ok: true });
}
