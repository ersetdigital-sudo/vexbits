import type { Metadata } from "next";
import GamePageLayout from "@/components/GamePageLayout";
import { getGameFromDB } from "@/lib/db-games";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Top Up PUBG Mobile UC Murah & Instan | VEXBITS",
  description: "Top up PUBG Mobile UC termurah di VEXBITS. Harga mulai Rp13.000, proses otomatis 10 detik, bayar via QRIS, GoPay, OVO, DANA, ShopeePay, VA, atau minimarket.",
  alternates: { canonical: "/game/pubg-mobile" },
  openGraph: {
    title: "Top Up PUBG Mobile UC Murah & Instan | VEXBITS",
    description: "Top up PUBG Mobile UC termurah. Harga mulai Rp13.000, proses 10 detik.",
    url: "https://www.vexbits.net/game/pubg-mobile",
    images: ["/og-image.png"],
  },
};

export default async function Page() {
  const game = await getGameFromDB("pubg-mobile");
  if (!game) return <div className="wrap py-20 text-center text-sm text-[var(--ink-soft)]">Game tidak ditemukan.</div>;
  return <GamePageLayout game={game} />;
}
