import type { Metadata } from "next";
import GamePageLayout from "@/components/GamePageLayout";
import { getGame } from "@/lib/games";

const g = getGame("genshin-impact")!;

export const metadata: Metadata = {
  title: "Top Up Genshin Impact Murah & Instan | VEXBITS",
  description: "Top up Genshin Impact (HoYoverse) harga termurah di VEXBITS. Proses otomatis 10 detik, bayar via QRIS, e-wallet, atau minimarket.",
};

export default function Page() {
  return <GamePageLayout game={g} />;
}
