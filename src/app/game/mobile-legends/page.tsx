import type { Metadata } from "next";
import GamePageLayout from "@/components/GamePageLayout";
import { getGame } from "@/lib/games";

const g = getGame("mobile-legends")!;

export const metadata: Metadata = {
  title: "Top Up Mobile Legends: Bang Bang Murah & Instan | VEXBITS",
  description: "Top up Mobile Legends: Bang Bang (Moonton) harga termurah di VEXBITS. Proses otomatis 10 detik, bayar via QRIS, e-wallet, atau minimarket.",
};

export default function Page() {
  return <GamePageLayout game={g} />;
}
