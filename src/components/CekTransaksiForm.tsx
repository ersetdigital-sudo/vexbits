"use client";

import { useState, useEffect, useCallback } from "react";

type Transaksi = {
  inv: string;
  game: string;
  item: string;
  akun: string;
  bayar: string;
  total: string;
  waktu: string;
  wa: string;
  status: "Berhasil" | "Diproses" | "Menunggu Pembayaran" | "Gagal";
};

const STYLE: Record<string, { cls: string; action: string; href: string }> = {
  "Berhasil":            { cls: "bg-[#E6FAF7] text-[var(--teal)]", action: "Top Up Lagi", href: "/#games" },
  "Diproses":            { cls: "bg-[var(--blue-soft)] text-[var(--blue)]", action: "Hubungi CS", href: "https://wa.me/6281234567890" },
  "Menunggu Pembayaran": { cls: "bg-[#FFF1E6] text-[var(--orange)]", action: "Lanjutkan Pembayaran", href: "#" },
  "Gagal":               { cls: "bg-[#FEE9EE] text-[#E11D48]", action: "Ulangi Pesanan", href: "/#games" },
};

const DATA: Transaksi[] = [
  { inv:"VXB-482913", game:"Mobile Legends: Bang Bang", item:"170 Diamond", akun:"128374651 (2143)", bayar:"QRIS", total:"45.500", waktu:"2 Sep 2026, 19:42", wa:"081234567890", status:"Berhasil" },
  { inv:"VXB-482911", game:"Free Fire", item:"355 Diamond", akun:"942817365", bayar:"DANA", total:"48.000", waktu:"2 Sep 2026, 17:05", wa:"081234567890", status:"Berhasil" },
  { inv:"VXB-482910", game:"Genshin Impact", item:"980 + 110 Crystal", akun:"812993745 (Asia)", bayar:"BCA Virtual Account", total:"249.000", waktu:"2 Sep 2026, 16:20", wa:"081234567890", status:"Diproses" },
  { inv:"VXB-482908", game:"Call of Duty Mobile", item:"880 CP", akun:"7761209384", bayar:"ShopeePay", total:"125.000", waktu:"1 Sep 2026, 21:33", wa:"081234567890", status:"Menunggu Pembayaran" },
  { inv:"VXB-482907", game:"PUBG Mobile", item:"325 UC", akun:"5518273649", bayar:"Indomaret", total:"64.000", waktu:"1 Sep 2026, 14:11", wa:"081298761234", status:"Gagal" },
  { inv:"VXB-482903", game:"Magic Chess: Go Go", item:"120 Chess Coin", akun:"128374651 (2143)", bayar:"GoPay", total:"32.000", waktu:"31 Agu 2026, 20:07", wa:"081234567890", status:"Berhasil" },
];

function steps(status: string) {
  if (status === "Gagal") return [["Pesanan dibuat","done"],["Pembayaran diterima","done"],["Pengiriman item gagal","fail"],["Dana dikembalikan ke saldo VEXBITS","done"]];
  if (status === "Menunggu Pembayaran") return [["Pesanan dibuat","done"],["Menunggu pembayaran","active"],["Item dikirim ke akun game",""],["Selesai",""]];
  if (status === "Diproses") return [["Pesanan dibuat","done"],["Pembayaran diterima","done"],["Item sedang dikirim","active"],["Selesai",""]];
  return [["Pesanan dibuat","done"],["Pembayaran diterima","done"],["Item dikirim ke akun game","done"],["Selesai","done"]];
}

export default function CekTransaksiForm() {
  const [query, setQuery] = useState("");
  const [hit, setHit] = useState<Transaksi | null>(null);
  const [empty, setEmpty] = useState(false);

  const cari = useCallback((qRaw: string) => {
    const q = qRaw.trim().toLowerCase().replace(/\s|-/g, "");
    if (!q) { setHit(null); setEmpty(false); return; }
    const found = DATA.find((t) =>
      t.inv.toLowerCase().replace(/-/g, "") === q || t.wa.replace(/\D/g, "") === q.replace(/\D/g, "")
    );
    setHit(found ?? null);
    setEmpty(!found);
  }, []);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const pre = new URLSearchParams(window.location.search).get("inv");
      if (pre) { setQuery(pre); cari(pre); }
    }
  }, [cari]);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    cari(query);
  }

  function demoClick(q: string) {
    setQuery(q);
    cari(q);
  }

  const st = hit ? STYLE[hit.status] : null;

  return (
    <>
      <form id="cekForm" onSubmit={handleSubmit} className="mt-5 card p-4 md:p-5 flex flex-col sm:flex-row gap-3">
        <input className="field flex-1" placeholder="VXB-482913 atau 08xxxxxxxxxx" autoComplete="off" value={query} onChange={(e) => setQuery(e.target.value)} />
        <button className="h-12 px-6 rounded-xl bg-[var(--orange)] text-white font-bold hover:bg-[#F06C09] shadow-soft shrink-0">Cek Sekarang</button>
      </form>
      <p className="mt-2 text-xs text-[var(--ink-soft)]">Contoh untuk dicoba: <button onClick={() => demoClick("VXB-482913")} className="font-bold text-[var(--blue)] hover:underline">VXB-482913</button> · <button onClick={() => demoClick("VXB-482910")} className="font-bold text-[var(--blue)] hover:underline">VXB-482910</button> · <button onClick={() => demoClick("VXB-482907")} className="font-bold text-[var(--blue)] hover:underline">VXB-482907</button></p>

      {/* EMPTY STATE (before search) */}
      {!hit && !empty && (
        <section className="mt-10">
          <div className="card p-8 md:p-12 text-center">
            <div className="w-16 h-16 mx-auto rounded-2xl bg-[var(--bg)] text-[var(--ink-soft)] grid place-items-center">
              <svg className="w-8 h-8" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><circle cx="11" cy="11" r="7"></circle><path d="m20 20-3.2-3.2"></path><path d="M11 8v6M8 11h6"></path></svg>
            </div>
            <h2 className="mt-5 text-lg font-bold text-[var(--ink)]">Cek Status Transaksi</h2>
            <p className="mt-2 text-sm text-[var(--ink-soft)] max-w-sm mx-auto">Masukkan nomor invoice (VXB-xxxxxx) atau nomor WhatsApp yang dipakai saat order, lalu klik <strong>Cek Sekarang</strong>.</p>
            <div className="mt-5 flex flex-wrap justify-center gap-2">
              <button onClick={() => demoClick("VXB-482913")} className="h-9 px-4 rounded-full border border-[var(--line)] bg-white text-sm font-bold text-[var(--ink-soft)] hover:border-[var(--blue)] hover:text-[var(--blue)] transition-all">VXB-482913</button>
              <button onClick={() => demoClick("VXB-482910")} className="h-9 px-4 rounded-full border border-[var(--line)] bg-white text-sm font-bold text-[var(--ink-soft)] hover:border-[var(--blue)] hover:text-[var(--blue)] transition-all">VXB-482910</button>
              <button onClick={() => demoClick("VXB-482907")} className="h-9 px-4 rounded-full border border-[var(--line)] bg-white text-sm font-bold text-[var(--ink-soft)] hover:border-[var(--blue)] hover:text-[var(--blue)] transition-all">VXB-482907</button>
            </div>
          </div>
        </section>
      )}

      {/* HASIL */}
      {hit && (
        <section className="mt-6">
          <div className="card overflow-hidden shadow-soft">
            <div className="p-5 border-b border-[var(--line)] flex flex-wrap items-center justify-between gap-3">
              <div>
                <p className="text-xs text-[var(--ink-soft)]">No. Invoice</p>
                <p className="text-lg font-extrabold font-display tracking-wide">{hit.inv}</p>
              </div>
              <span className={`badge px-3 py-1.5 rounded-lg ${st!.cls}`}>{hit.status}</span>
            </div>
            <div className="p-5 grid md:grid-cols-2 gap-6">
              <dl className="space-y-3 text-sm">
                <div className="flex justify-between gap-3"><dt className="text-[var(--ink-soft)]">Game</dt><dd className="font-semibold text-right">{hit.game}</dd></div>
                <div className="flex justify-between gap-3"><dt className="text-[var(--ink-soft)]">Item</dt><dd className="font-semibold text-right">{hit.item}</dd></div>
                <div className="flex justify-between gap-3"><dt className="text-[var(--ink-soft)]">Akun Tujuan</dt><dd className="font-semibold text-right">{hit.akun}</dd></div>
                <div className="flex justify-between gap-3"><dt className="text-[var(--ink-soft)]">Metode Bayar</dt><dd className="font-semibold text-right">{hit.bayar}</dd></div>
                <div className="flex justify-between gap-3"><dt className="text-[var(--ink-soft)]">Waktu Order</dt><dd className="font-semibold text-right">{hit.waktu}</dd></div>
                <div className="flex items-end justify-between gap-3 pt-3 border-t border-[var(--line)]"><dt className="text-[var(--ink-soft)]">Total</dt><dd className="text-xl font-extrabold font-display text-[var(--blue)]">Rp{hit.total}</dd></div>
              </dl>
              <div>
                <p className="text-sm font-bold mb-3">Lacak Pesanan</p>
                <ul className="track text-sm">
                  {steps(hit.status).map(([label, state], i) => (
                    <li key={i} className={state as string}>
                      <span className="dot text-[11px]">{state === "fail" ? "✕" : state === "done" ? "✓" : ""}</span>
                      {state === "" ? <span className="text-[var(--ink-soft)]">{label}</span> : <span className="font-semibold">{label}</span>}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
            <div className="px-5 pb-5 flex flex-col sm:flex-row gap-3">
              <a href={st!.href} className="h-11 px-5 rounded-xl bg-[var(--orange)] text-white font-bold grid place-items-center hover:bg-[#F06C09]">{st!.action}</a>
              <a href="https://wa.me/6281234567890" className="h-11 px-5 rounded-xl border border-[var(--line)] bg-white font-bold grid place-items-center hover:border-[var(--blue)] hover:text-[var(--blue)]">Hubungi CS</a>
            </div>
          </div>
        </section>
      )}

      {empty && (
        <section className="mt-6">
          <div className="card p-6 text-center">
            <div className="w-14 h-14 mx-auto rounded-2xl bg-[#FFF1E6] text-[var(--orange)] grid place-items-center">
              <svg className="w-7 h-7" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="11" cy="11" r="7"></circle><path d="m20 20-3.2-3.2"></path></svg>
            </div>
            <h2 className="mt-4 text-lg font-bold">Transaksi tidak ditemukan</h2>
            <p className="mt-1 text-sm text-[var(--ink-soft)]">Periksa lagi nomor invoice atau nomor WhatsApp kamu. Kalau masih belum ketemu, tim CS siap bantu 24 jam.</p>
            <a href="https://wa.me/6281234567890" className="mt-4 inline-flex h-11 items-center px-5 rounded-xl bg-[#0F1B33] text-white text-sm font-bold">Chat CS WhatsApp</a>
          </div>
        </section>
      )}
    </>
  );
}
