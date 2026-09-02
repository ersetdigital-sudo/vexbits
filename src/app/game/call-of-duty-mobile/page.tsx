import type { Metadata } from "next";
import GamePageLayout from "@/components/GamePageLayout";
import { getGame } from "@/lib/games";

const g = getGame("call-of-duty-mobile")!;

export const metadata: Metadata = {
  title: "Top Up Call of Duty Mobile Murah & Instan | VEXBITS",
  description: "Top up Call of Duty Mobile (Activision) harga termurah di VEXBITS. Proses otomatis 10 detik, bayar via QRIS, e-wallet, atau minimarket.",
};

export default function Page() {
  return <GamePageLayout game={g} />;
}
