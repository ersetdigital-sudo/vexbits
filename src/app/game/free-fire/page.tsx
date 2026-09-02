import type { Metadata } from "next";
import GamePageLayout from "@/components/GamePageLayout";
import { getGame } from "@/lib/games";

const g = getGame("free-fire")!;

export const metadata: Metadata = {
  title: "Top Up Free Fire Murah & Instan | VEXBITS",
  description: "Top up Free Fire (Garena) harga termurah di VEXBITS. Proses otomatis 10 detik, bayar via QRIS, e-wallet, atau minimarket.",
};

export default function Page() {
  return <GamePageLayout game={g} />;
}
