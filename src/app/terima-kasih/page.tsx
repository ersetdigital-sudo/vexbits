import type { Metadata } from "next";
import TerimaKasihForm from "@/components/TerimaKasihForm";

export const metadata: Metadata = {
  title: "Pesanan Berhasil — VEXBITS",
  description: "Terima kasih! Pesanan top up kamu di VEXBITS sedang diproses.",
  robots: "noindex",
};

export default function TerimaKasihPage() {
  return (
    <>
      <header className="sticky top-0 z-50 bg-white/95 backdrop-blur border-b border-[var(--line)]">
        <div className="wrap flex items-center gap-4 h-20 md:h-24">
          <a href="/" className="shrink-0"><img src="/images/c525e6ef-5042-4cd9-a3e1-f0ac5160b8a3.png" alt="VEXBITS" className="h-16 md:h-20 w-auto max-w-[240px]" /></a>
          <a href="/#games" className="ml-auto inline-flex h-10 items-center px-4 rounded-xl text-sm font-bold text-[var(--blue)] hover:bg-[var(--blue-soft)]">Top Up Lagi</a>
        </div>
      </header>
      <main className="py-8 md:py-12">
        <div className="wrap max-w-2xl">
          <TerimaKasihForm />
        </div>
      </main>
      <footer className="mt-6 border-t border-[var(--line)] py-8">
        <div className="wrap flex flex-col sm:flex-row gap-3 sm:items-center sm:justify-between">
          <img src="/images/c525e6ef-5042-4cd9-a3e1-f0ac5160b8a3.png" alt="VEXBITS" className="h-14 md:h-16 w-auto max-w-[200px]" />
          <p className="text-xs text-[var(--ink-soft)]">© 2026 VEXBITS · vexbits.net · Nama dan logo game milik pemegang hak masing-masing.</p>
        </div>
      </footer>
    </>
  );
}
