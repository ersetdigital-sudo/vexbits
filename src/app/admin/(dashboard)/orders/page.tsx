import OrdersClient from "./OrdersClient";

export const dynamic = "force-dynamic";

type Order = {
  id: string;
  invoice: string;
  game_title: string;
  product_slug: string | null;
  account_id: string;
  zone_id: string | null;
  item: string;
  price: string;
  payment_method: string;
  wa_number: string;
  promo_code: string | null;
  status: string;
  notes: string | null;
  created_at: string;
  updated_at: string;
};

export default async function OrdersPage({
  searchParams,
}: {
  searchParams: Promise<{ status?: string }>;
}) {
  const params = await searchParams;
  let orders: Order[] = [];
  let error = null;

  try {
    const { supabaseAdmin } = await import("@/lib/supabase-admin");
    let query = supabaseAdmin.from("orders").select("*").order("created_at", { ascending: false });
    if (params.status && params.status !== "all") {
      query = query.eq("status", params.status);
    }
    const { data, error: dbErr } = await query;
    if (dbErr) throw dbErr;
    orders = (data ?? []) as Order[];
  } catch (e: unknown) {
    error = e instanceof Error ? e.message : "Gagal memuat data pesanan.";
  }

  return <OrdersClient orders={orders} currentStatus={params.status ?? "all"} error={error} />;
}
