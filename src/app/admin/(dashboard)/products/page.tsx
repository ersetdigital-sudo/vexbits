import ProductsClient from "./ProductsClient";

export const dynamic = "force-dynamic";

type Product = {
  id: string;
  slug: string;
  title: string;
  publisher: string;
  img: string;
  img_bg: string;
  account_mode: string;
  account_label: string;
  account_placeholder: string;
  zone_label: string | null;
  zone_placeholder: string | null;
  zone_options: string[] | null;
  account_hint: string | null;
  nominal_title: string;
  is_active: boolean;
  sort_order: number;
  product_nominals: { id: string; value: string; price: string; strike: string | null; is_active: boolean; sort_order: number }[];
};

export default async function ProductsPage() {
  let products: Product[] = [];
  let error = null;

  try {
    const { supabaseAdmin } = await import("@/lib/supabase-admin");
    const { data, error: dbErr } = await supabaseAdmin
      .from("products")
      .select("*, product_nominals(*)")
      .order("sort_order", { ascending: true });

    if (dbErr) throw dbErr;
    products = (data ?? []) as Product[];
  } catch (e: unknown) {
    error = e instanceof Error ? e.message : "Gagal memuat data produk dari database.";
  }

  return <ProductsClient products={products} error={error} />;
}
