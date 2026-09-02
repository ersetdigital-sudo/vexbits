import type { Metadata } from "next";
import GamePageLayout from "@/components/GamePageLayout";
import { getGameFromDB } from "@/lib/db-games";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Top Up Magic Chess: Go Go Chess Coin Murah & Instan | VEXBITS",
  description: "Top up Magic Chess: Go Go Chess Coin termurah di VEXBITS. Harga mulai Rp3.000, proses otomatis, bayar via QRIS, e-wallet, VA bank, atau minimarket.",
  alternates: { canonical: "/game/magic-chess" },
  openGraph: {
    title: "Top Up Magic Chess: Go Go Chess Coin Murah | VEXBITS",
    description: "Top up Magic Chess termurah. Harga mulai Rp3.000, proses instan.",
    url: "https://www.vexbits.net/game/magic-chess",
    images: ["/og-image.png"],
  },
};

export default async function Page() {
  const game = await getGameFromDB("magic-chess");
  if (!game) return <div className="wrap py-20 text-center text-sm text-[var(--ink-soft)]">Game tidak ditemukan.</div>;
  return <GamePageLayout game={game} />;
}
