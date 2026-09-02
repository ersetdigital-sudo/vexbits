import type { Metadata } from "next";
import GamePageLayout from "@/components/GamePageLayout";
import { getGameFromDB } from "@/lib/db-games";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Top Up Call of Duty Mobile (CODM) CP Murah & Instan | VEXBITS",
  description: "Top up Call of Duty Mobile (CODM) CP termurah di VEXBITS. Harga mulai Rp12.000, proses instan, bayar via QRIS, e-wallet, VA bank, atau minimarket.",
  alternates: { canonical: "/game/call-of-duty-mobile" },
  openGraph: {
    title: "Top Up Call of Duty Mobile CP Murah & Instan | VEXBITS",
    description: "Top up CODM CP termurah. Harga mulai Rp12.000, proses instan.",
    url: "https://www.vexbits.net/game/call-of-duty-mobile",
    images: ["/og-image.png"],
  },
};

export default async function Page() {
  const game = await getGameFromDB("call-of-duty-mobile");
  if (!game) return <div className="wrap py-20 text-center text-sm text-[var(--ink-soft)]">Game tidak ditemukan.</div>;
  return <GamePageLayout game={game} />;
}
