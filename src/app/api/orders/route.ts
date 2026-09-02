import { NextRequest, NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabase-admin";

// GET orders with optional status filter or search query
export async function GET(req: NextRequest) {
  const status = req.nextUrl.searchParams.get("status");
  const search = req.nextUrl.searchParams.get("q");

  let query = supabaseAdmin.from("orders").select("*").order("created_at", { ascending: false });

  if (status && status !== "all") {
    query = query.eq("status", status);
  }

  if (search) {
    const s = search.trim();
    query = query.or(`invoice.ilike.%${s}%,wa_number.ilike.%${s}%`);
  }

  const { data, error } = await query;
  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json(data ?? []);
}

// POST create new order
export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { game_title, product_slug, account_id, zone_id, item, price, payment_method, wa_number, promo_code } = body;

    if (!game_title || !account_id || !item || !price || !payment_method || !wa_number) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    // Generate invoice number
    const invoice = "VXB-" + String(Math.floor(100000 + Math.random() * 899999));

    const { data, error } = await supabaseAdmin
      .from("orders")
      .insert({
        invoice,
        game_title,
        product_slug: product_slug || null,
        account_id,
        zone_id: zone_id || null,
        item,
        price,
        payment_method,
        wa_number,
        promo_code: promo_code || null,
        status: "pending",
      })
      .select()
      .single();

    if (error) return NextResponse.json({ error: error.message }, { status: 500 });
    return NextResponse.json({ ok: true, order: data });
  } catch (e: unknown) {
    const message = e instanceof Error ? e.message : "Failed to create order";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
