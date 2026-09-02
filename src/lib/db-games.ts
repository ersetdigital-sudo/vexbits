import { supabaseAdmin } from "./supabase-admin";
import type { GameData, Nominal } from "./games";

export async function getGamesFromDB(): Promise<GameData[]> {
  const { data: products } = await supabaseAdmin
    .from("products")
    .select("*, product_nominals(*)")
    .eq("is_active", true)
    .order("sort_order", { ascending: true });

  if (!products) return [];

  return products.map((p) => ({
    slug: p.slug,
    title: p.title,
    publisher: p.publisher,
    img: p.img,
    imgBg: p.img_bg,
    accountMode: p.account_mode,
    accountLabel: p.account_label,
    accountPlaceholder: p.account_placeholder,
    zoneLabel: p.zone_label ?? undefined,
    zonePlaceholder: p.zone_placeholder ?? undefined,
    zoneOptions: p.zone_options ?? undefined,
    accountHint: p.account_hint ?? "",
    nominalTitle: p.nominal_title,
    nominals: (p.product_nominals ?? [])
      .sort((a: Nominal & { sort_order: number }, b: Nominal & { sort_order: number }) => a.sort_order - b.sort_order)
      .map((n: Nominal & { sort_order: number }) => ({
        value: n.value,
        price: n.price,
        strike: n.strike ?? undefined,
      })),
  }));
}

export async function getGameFromDB(slug: string): Promise<GameData | null> {
  const games = await getGamesFromDB();
  return games.find((g) => g.slug === slug) ?? null;
}
