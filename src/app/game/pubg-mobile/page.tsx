import type { Metadata } from "next";
import GamePageLayout from "@/components/GamePageLayout";
import { getGame } from "@/lib/games";

const g = getGame("pubg-mobile")!;

export const metadata: Metadata = {
  title: "Top Up PUBG Mobile Murah & Instan | VEXBITS",
  description: "Top up PUBG Mobile (Level Infinite) harga termurah di VEXBITS. Proses otomatis 10 detik, bayar via QRIS, e-wallet, atau minimarket.",
};

export default function Page() {
  return <GamePageLayout game={g} />;
}
