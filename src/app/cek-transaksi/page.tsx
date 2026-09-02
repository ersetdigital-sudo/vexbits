import type { Metadata } from "next";
import GameHeader from "@/components/GameHeader";
import CekTransaksiForm from "@/components/CekTransaksiForm";

export const metadata: Metadata = {
  title: "Cek Transaksi — VEXBITS",
  description: "Cek status pesanan top up game kamu di VEXBITS lewat nomor invoice atau nomor WhatsApp, lengkap dengan riwayat transaksi.",
};

export default function CekTransaksiPage() {
  return (
    <>
      <GameHeader />
      <main className="py-6 md:py-10">
        <div className="wrap max-w-3xl">
          <h1 className="text-2xl md:text-3xl font-extrabold">Cek Status Transaksi</h1>
          <p className="mt-2 text-sm md:text-base text-[var(--ink-soft)]">Masukkan nomor invoice (contoh: VXB-482913) atau nomor WhatsApp yang kamu pakai saat order.</p>
          <CekTransaksiForm />
        </div>
      </main>
      <footer className="mt-10 border-t border-[var(--line)] py-8">
        <div className="wrap flex flex-col sm:flex-row gap-3 sm:items-center sm:justify-between">
          <img src="/images/c525e6ef-5042-4cd9-a3e1-f0ac5160b8a3.png" alt="VEXBITS" className="h-14 md:h-16 w-auto max-w-[200px]" />
          <p className="text-xs text-[var(--ink-soft)]">© 2026 VEXBITS · vexbits.net · Nama dan logo game milik pemegang hak masing-masing.</p>
        </div>
      </footer>
    </>
  );
}
