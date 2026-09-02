import type { Metadata } from "next";
import GamePageLayout from "@/components/GamePageLayout";
import { getGameFromDB } from "@/lib/db-games";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Top Up Mobile Legends: Bang Bang (MLBB) Murah & Instan | VEXBITS",
  description: "Top up Mobile Legends: Bang Bang (MLBB) diamond termurah di VEXBITS. Harga mulai Rp1.500, proses otomatis 10 detik, bayar via QRIS, GoPay, OVO, DANA, ShopeePay, VA, atau minimarket.",
  alternates: { canonical: "/game/mobile-legends" },
  openGraph: {
    title: "Top Up Mobile Legends: Bang Bang Murah & Instan | VEXBITS",
    description: "Top up MLBB diamond termurah. Harga mulai Rp1.500, proses 10 detik.",
    url: "https://www.vexbits.net/game/mobile-legends",
    images: ["/og-image.png"],
  },
};

export default async function Page() {
  const game = await getGameFromDB("mobile-legends");
  if (!game) return <div className="wrap py-20 text-center text-sm text-[var(--ink-soft)]">Game tidak ditemukan.</div>;
  return <GamePageLayout game={game} />;
}
