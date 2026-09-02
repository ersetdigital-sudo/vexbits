"use client";

import { useState } from "react";
import { PAYMENTS, type GameData } from "@/lib/games";

export default function GameOrderForm({ game }: { game: GameData }) {
  const [nominal, setNominal] = useState(game.nominals[0].value);
  const [bayar, setBayar] = useState(PAYMENTS[0].value);
  const [userId, setUserId] = useState("");
  const [zoneId, setZoneId] = useState("");
  const [wa, setWa] = useState("");

  const akun = userId.trim() ? userId.trim() + (zoneId.trim() ? " (" + zoneId.trim() + ")" : "") : "-";
  const item = nominal;
  const total = game.nominals.find((n) => n.value === nominal)?.price ?? "0";

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const uid = userId.trim();
    const w = wa.trim();
    if (!uid || !w) {
      alert("Lengkapi ID akun dan nomor WhatsApp dulu ya.");
      return;
    }
    const q = new URLSearchParams({
      game: game.title,
      akun: uid + (zoneId.trim() ? " (" + zoneId.trim() + ")" : ""),
      item,
      total,
      bayar,
      wa: w,
    });
    window.location.href = "/terima-kasih?" + q.toString();
  }

  return (
    <form id="orderForm" onSubmit={handleSubmit} className="mt-5 grid lg:grid-cols-[1fr_360px] gap-5 items-start pb-4">
      <div className="space-y-5">
        {/* 1. Akun */}
        <section className="card p-5">
          <div className="flex items-center gap-3"><span className="step-num">1</span><h2 className="text-lg font-bold">Masukkan Data Akun</h2></div>
          <div className={`mt-4 grid ${game.accountMode === "single" ? "grid-cols-1" : "grid-cols-2"} gap-3`}>
            <div><label className="block text-sm font-semibold mb-1.5">{game.accountLabel}</label><input id="userId" className="field" inputMode="numeric" placeholder={game.accountPlaceholder} required value={userId} onChange={(e) => setUserId(e.target.value)} /></div>
            {game.accountMode === "userzone" && <div><label className="block text-sm font-semibold mb-1.5">{game.zoneLabel}</label><input id="zoneId" className="field" inputMode="numeric" placeholder={game.zonePlaceholder} value={zoneId} onChange={(e) => setZoneId(e.target.value)} /></div>}
            {game.accountMode === "select" && (
              <div><label className="block text-sm font-semibold mb-1.5">{game.zoneLabel}</label><select id="zoneId" className="field" value={zoneId} onChange={(e) => setZoneId(e.target.value)}>{game.zoneOptions?.map((o) => <option key={o}>{o}</option>)}</select></div>
            )}
          </div>
          <p className="mt-3 text-xs text-[var(--ink-soft)] bg-[var(--bg)] border border-[var(--line)] rounded-xl p-3">{game.accountHint}</p>
        </section>

        {/* 2. Nominal */}
        <section className="card p-5">
          <div className="flex items-center gap-3"><span className="step-num">2</span><h2 className="text-lg font-bold">{game.nominalTitle}</h2></div>
          <div className="mt-4 grid grid-cols-2 sm:grid-cols-3 gap-3">
            {game.nominals.map((n) => (
              <label className="opt" key={n.value}>
                <input type="radio" name="nominal" value={n.value} checked={nominal === n.value} onChange={() => setNominal(n.value)} />
                <div className="box">
                  <span className="tick">✓</span>
                  <p className="text-sm font-bold leading-tight pr-4">{n.value}</p>
                  {n.strike && <span className="block text-[11px] text-[var(--ink-soft)] line-through">{n.strike}</span>}
                  <p className="text-sm font-extrabold text-[var(--blue)] mt-1">Rp{n.price}</p>
                </div>
              </label>
            ))}
          </div>
        </section>

        {/* 3. Pembayaran */}
        <section className="card p-5">
          <div className="flex items-center gap-3"><span className="step-num">3</span><h2 className="text-lg font-bold">Metode Pembayaran</h2></div>
          <div className="mt-4 grid grid-cols-2 sm:grid-cols-3 gap-3">
            {PAYMENTS.map((p) => (
              <label className="opt" key={p.value}>
                <input type="radio" name="bayar" value={p.value} checked={bayar === p.value} onChange={() => setBayar(p.value)} />
                <div className="box"><span className="tick">✓</span><p className="text-sm font-bold leading-tight pr-4">{p.value}</p>{p.note && <p className="text-[11px] text-[var(--ink-soft)] mt-0.5">{p.note}</p>}</div>
              </label>
            ))}
          </div>
        </section>

        {/* 4. Kontak */}
        <section className="card p-5">
          <div className="flex items-center gap-3"><span className="step-num">4</span><h2 className="text-lg font-bold">Kontak &amp; Kode Promo</h2></div>
          <div className="mt-4 grid sm:grid-cols-2 gap-3">
            <div><label className="block text-sm font-semibold mb-1.5">Nomor WhatsApp</label><input id="wa" className="field" inputMode="tel" placeholder="08xxxxxxxxxx" required value={wa} onChange={(e) => setWa(e.target.value)} /></div>
            <div><label className="block text-sm font-semibold mb-1.5">Kode Promo <span className="text-[var(--ink-soft)] font-normal">(opsional)</span></label><input id="promo" className="field" placeholder="VEXNEW10" /></div>
          </div>
          <p className="mt-2 text-xs text-[var(--ink-soft)]">Struk dan status transaksi dikirim ke WhatsApp kamu.</p>
        </section>
      </div>

      {/* ringkasan */}
      <aside className="card p-5 lg:sticky lg:top-24">
        <h2 className="text-lg font-bold">Ringkasan Pesanan</h2>
        <dl className="mt-4 space-y-2.5 text-sm">
          <div className="flex justify-between gap-3"><dt className="text-[var(--ink-soft)]">Game</dt><dd className="font-semibold text-right">{game.title}</dd></div>
          <div className="flex justify-between gap-3"><dt className="text-[var(--ink-soft)]">Akun</dt><dd id="sumAkun" className="font-semibold text-right">{akun}</dd></div>
          <div className="flex justify-between gap-3"><dt className="text-[var(--ink-soft)]">Item</dt><dd id="sumItem" className="font-semibold text-right">{item}</dd></div>
          <div className="flex justify-between gap-3"><dt className="text-[var(--ink-soft)]">Pembayaran</dt><dd id="sumBayar" className="font-semibold text-right">{bayar}</dd></div>
        </dl>
        <div className="mt-4 pt-4 border-t border-[var(--line)] flex items-end justify-between">
          <span className="text-sm text-[var(--ink-soft)]">Total</span>
          <span id="sumTotal" className="text-2xl font-extrabold font-display text-[var(--blue)]">Rp{total}</span>
        </div>
        <button type="submit" className="mt-4 w-full h-12 rounded-xl bg-[var(--orange)] text-white font-bold hover:bg-[#F06C09] shadow-soft">Bayar Sekarang</button>
        <p className="mt-3 text-[11px] text-[var(--ink-soft)] text-center">Dengan melanjutkan kamu menyetujui Syarat &amp; Ketentuan VEXBITS.</p>
      </aside>
    </form>
  );
}
