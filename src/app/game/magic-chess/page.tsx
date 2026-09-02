import type { Metadata } from "next";
import GamePageLayout from "@/components/GamePageLayout";
import { getGame } from "@/lib/games";

const g = getGame("magic-chess")!;

export const metadata: Metadata = {
  title: "Top Up Magic Chess: Go Go Murah & Instan | VEXBITS",
  description: "Top up Magic Chess: Go Go (Moonton) harga termurah di VEXBITS. Proses otomatis 10 detik, bayar via QRIS, e-wallet, atau minimarket.",
};

export default function Page() {
  return <GamePageLayout game={g} />;
}
