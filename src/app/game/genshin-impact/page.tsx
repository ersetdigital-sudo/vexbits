import type { Metadata } from "next";
import GamePageLayout from "@/components/GamePageLayout";
import { getGameFromDB } from "@/lib/db-games";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Top Up Genshin Impact Genesis Crystal Murah & Instan | VEXBITS",
  description: "Top up Genshin Impact Genesis Crystal termurah di VEXBITS. Harga mulai Rp16.000, proses instan, bayar via QRIS, e-wallet, VA bank, atau minimarket.",
  alternates: { canonical: "/game/genshin-impact" },
  openGraph: {
    title: "Top Up Genshin Impact Genesis Crystal Murah | VEXBITS",
    description: "Top up Genshin Impact termurah. Harga mulai Rp16.000, proses instan.",
    url: "https://www.vexbits.net/game/genshin-impact",
    images: ["/og-image.png"],
  },
};

export default async function Page() {
  const game = await getGameFromDB("genshin-impact");
  if (!game) return <div className="wrap py-20 text-center text-sm text-[var(--ink-soft)]">Game tidak ditemukan.</div>;
  return <GamePageLayout game={game} />;
}
