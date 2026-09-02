import type { Metadata } from "next";
import GamePageLayout from "@/components/GamePageLayout";
import { getGameFromDB } from "@/lib/db-games";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Top Up Free Fire (FF) Diamond Murah & Instan | VEXBITS",
  description: "Top up Free Fire (FF) diamond termurah di VEXBITS. Harga mulai Rp2.000, proses instan, bayar via QRIS, e-wallet, VA bank, atau tunai di Alfamart/Indomaret.",
  alternates: { canonical: "/game/free-fire" },
  openGraph: {
    title: "Top Up Free Fire Diamond Murah & Instan | VEXBITS",
    description: "Top up FF diamond termurah. Harga mulai Rp2.000, proses instan.",
    url: "https://www.vexbits.net/game/free-fire",
    images: ["/og-image.png"],
  },
};

export default async function Page() {
  const game = await getGameFromDB("free-fire");
  if (!game) return <div className="wrap py-20 text-center text-sm text-[var(--ink-soft)]">Game tidak ditemukan.</div>;
  return <GamePageLayout game={game} />;
}
