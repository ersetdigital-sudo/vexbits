"use client";

import { useState, useEffect, useCallback } from "react";

type Order = {
  id: string;
  invoice: string;
  game_title: string;
  item: string;
  account_id: string;
  zone_id: string | null;
  payment_method: string;
  price: string;
  wa_number: string;
  status: string;
  created_at: string;
};

const STATUS_MAP: Record<string, { label: string; cls: string; action: string; href: string }> = {
  pending:    { label: "Menunggu Pembayaran", cls: "bg-[#FFF1E6] text-[var(--orange)]", action: "Lanjutkan Pembayaran", href: "#" },
  processing: { label: "Diproses", cls: "bg-[var(--blue-soft)] text-[var(--blue)]", action: "Hubungi CS", href: "https://wa.me/6281234567890" },
  completed:  { label: "Berhasil", cls: "bg-[#E6FAF7] text-[var(--teal)]", action: "Top Up Lagi", href: "/#games" },
  failed:     { label: "Gagal", cls: "bg-[#FEE9EE] text-[#E11D48]", action: "Ulangi Pesanan", href: "/#games" },
  cancelled:  { label: "Dibatalkan", cls: "bg-[#F3F4F6] text-[var(--ink-soft)]", action: "Top Up Lagi", href: "/#games" },
  refunded:   { label: "Dikembalikan", cls: "bg-[var(--blue-soft)] text-[var(--blue)]", action: "Top Up Lagi", href: "/#games" },
};

function steps(status: string) {
  if (status === "failed") return [["Pesanan dibuat","done"],["Pembayaran diterima","done"],["Pengiriman item gagal","fail"],["Dana dikembalikan ke saldo VEXBITS","done"]];
  if (status === "pending") return [["Pesanan dibuat","done"],["Menunggu pembayaran","active"],["Item dikirim ke akun game",""],["Selesai",""]];
  if (status === "processing") return [["Pesanan dibuat","done"],["Pembayaran diterima","done"],["Item sedang dikirim","active"],["Selesai",""]];
  return [["Pesanan dibuat","done"],["Pembayaran diterima","done"],["Item dikirim ke akun game","done"],["Selesai","done"]];
}

function formatDate(iso: string) {
  const d = new Date(iso);
  return d.toLocaleDateString("id-ID", { day: "numeric", month: "short", year: "numeric", hour: "2-digit", minute: "2-digit" });
}

export default function CekTransaksiForm() {
  const [query, setQuery] = useState("");
  const [hit, setHit] = useState<Order | null>(null);
  const [empty, setEmpty] = useState(false);
  const [loading, setLoading] = useState(false);

  const cari = useCallback(async (qRaw: string) => {
    const q = qRaw.trim();
    if (!q) { setHit(null); setEmpty(false); return; }
    setLoading(true);
    try {
      const res = await fetch("/api/orders?q=" + encodeURIComponent(q));
      const data: Order[] = await res.json();
      if (data.length > 0) {
        setHit(data[0]);
        setEmpty(false);
      } else {
        setHit(null);
        setEmpty(true);
      }
    } catch {
      setHit(null);
      setEmpty(true);
    } finally {
      setLoading(false);
    }
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

  const st = hit ? STATUS_MAP[hit.status] ?? { label: hit.status, cls: "bg-gray-100 text-gray-600", action: "Hubungi CS", href: "#" } : null;
  const akun = hit ? hit.zone_id ? `${hit.account_id} (${hit.zone_id})` : hit.account_id : "-";

  return (
    <>
      <form id="cekForm" onSubmit={handleSubmit} className="mt-5 card p-4 md:p-5 flex flex-col sm:flex-row gap-3">
        <input className="field flex-1" placeholder="VXB-482913 atau 08xxxxxxxxxx" autoComplete="off" value={query} onChange={(e) => setQuery(e.target.value)} />
        <button disabled={loading} className="h-12 px-6 rounded-xl bg-[var(--orange)] text-white font-bold hover:bg-[#F06C09] shadow-soft shrink-0 disabled:opacity-50">{loading ? "Mencari..." : "Cek Sekarang"}</button>
      </form>

      {/* EMPTY STATE (before search) */}
      {!hit && !empty && !loading && (
        <section className="mt-10">
          <div className="card p-8 md:p-12 text-center">
            <div className="w-16 h-16 mx-auto rounded-2xl bg-[var(--bg)] text-[var(--ink-soft)] grid place-items-center">
              <svg className="w-8 h-8" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><circle cx="11" cy="11" r="7"></circle><path d="m20 20-3.2-3.2"></path><path d="M11 8v6M8 11h6"></path></svg>
            </div>
            <h2 className="mt-5 text-lg font-bold text-[var(--ink)]">Cek Status Transaksi</h2>
            <p className="mt-2 text-sm text-[var(--ink-soft)] max-w-sm mx-auto">Masukkan nomor invoice (VXB-xxxxxx) atau nomor WhatsApp yang dipakai saat order, lalu klik <strong>Cek Sekarang</strong>.</p>
          </div>
        </section>
      )}

      {/* LOADING */}
      {loading && (
        <section className="mt-6">
          <div className="card p-8 text-center">
            <div className="w-10 h-10 mx-auto border-3 border-[var(--blue)] border-t-transparent rounded-full animate-spin"></div>
            <p className="mt-3 text-sm text-[var(--ink-soft)]">Mencari transaksi...</p>
          </div>
        </section>
      )}

      {/* HASIL */}
      {hit && st && !loading && (
        <section className="mt-6">
          <div className="card overflow-hidden shadow-soft">
            <div className="p-5 border-b border-[var(--line)] flex flex-wrap items-center justify-between gap-3">
              <div>
                <p className="text-xs text-[var(--ink-soft)]">No. Invoice</p>
                <p className="text-lg font-extrabold font-display tracking-wide">{hit.invoice}</p>
              </div>
              <span className={`badge px-3 py-1.5 rounded-lg ${st.cls}`}>{st.label}</span>
            </div>
            <div className="p-5 grid md:grid-cols-2 gap-6">
              <dl className="space-y-3 text-sm">
                <div className="flex justify-between gap-3"><dt className="text-[var(--ink-soft)]">Game</dt><dd className="font-semibold text-right">{hit.game_title}</dd></div>
                <div className="flex justify-between gap-3"><dt className="text-[var(--ink-soft)]">Item</dt><dd className="font-semibold text-right">{hit.item}</dd></div>
                <div className="flex justify-between gap-3"><dt className="text-[var(--ink-soft)]">Akun Tujuan</dt><dd className="font-semibold text-right font-mono">{akun}</dd></div>
                <div className="flex justify-between gap-3"><dt className="text-[var(--ink-soft)]">Metode Bayar</dt><dd className="font-semibold text-right">{hit.payment_method}</dd></div>
                <div className="flex justify-between gap-3"><dt className="text-[var(--ink-soft)]">Waktu Order</dt><dd className="font-semibold text-right">{formatDate(hit.created_at)}</dd></div>
                <div className="flex items-end justify-between gap-3 pt-3 border-t border-[var(--line)]"><dt className="text-[var(--ink-soft)]">Total</dt><dd className="text-xl font-extrabold font-display text-[var(--blue)]">Rp{hit.price}</dd></div>
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
              <a href={`/terima-kasih?inv=${hit.invoice}&game=${encodeURIComponent(hit.game_title)}&akun=${encodeURIComponent(akun)}&item=${encodeURIComponent(hit.item)}&total=${hit.price}&bayar=${encodeURIComponent(hit.payment_method)}&wa=${hit.wa_number}`} className="h-11 px-5 rounded-xl bg-[var(--orange)] text-white font-bold grid place-items-center hover:bg-[#F06C09]">{st.action}</a>
              <a href="https://wa.me/6281234567890" className="h-11 px-5 rounded-xl border border-[var(--line)] bg-white font-bold grid place-items-center hover:border-[var(--blue)] hover:text-[var(--blue)]">Hubungi CS</a>
            </div>
          </div>
        </section>
      )}

      {empty && !loading && (
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
