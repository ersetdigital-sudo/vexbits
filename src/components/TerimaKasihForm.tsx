"use client";

import { useState, useEffect } from "react";

const PAYMENT_CONFIG: Record<string, { color: string; bg: string; label: string }> = {
  "QRIS": { color: "#003087", bg: "#E8EDF5", label: "QRIS" },
  "GoPay": { color: "#00AA13", bg: "#E6F9ED", label: "GoPay" },
  "OVO": { color: "#4C3494", bg: "#EDE8F5", label: "OVO" },
  "DANA": { color: "#108EE9", bg: "#E6F3FB", label: "DANA" },
  "ShopeePay": { color: "#EE4D2D", bg: "#FDEEE9", label: "ShopeePay" },
  "BCA Virtual Account": { color: "#0060A9", bg: "#E6EFF8", label: "BCA VA" },
  "BRI Virtual Account": { color: "#DC1E2E", bg: "#FCE8E9", label: "BRI VA" },
  "Mandiri VA": { color: "#003D71", bg: "#E6EBF0", label: "Mandiri VA" },
  "Alfamart": { color: "#E31837", bg: "#FCE8EB", label: "Alfamart" },
  "Indomaret": { color: "#007B5B", bg: "#E6F5F0", label: "Indomaret" },
};

export default function TerimaKasihForm() {
  const [inv, setInv] = useState("VXB-000000");
  const [copied, setCopied] = useState(false);
  const [secondsLeft, setSecondsLeft] = useState(15 * 60);
  const [details, setDetails] = useState({ game: "", akun: "", item: "", bayar: "", total: "0", wa: "" });
  const [showCheck, setShowCheck] = useState(false);

  useEffect(() => {
    const q = new URLSearchParams(window.location.search);
    setDetails({
      game: q.get("game") || "Mobile Legends: Bang Bang",
      akun: q.get("akun") || "-",
      item: q.get("item") || "-",
      bayar: q.get("bayar") || "QRIS",
      total: q.get("total") || "0",
      wa: q.get("wa") ? q.get("wa")!.replace(/^(\d{4})\d+(\d{3})$/, "$1****$2") : "-",
    });
    setInv("VXB-" + String(Math.floor(100000 + Math.random() * 899999)));
    setTimeout(() => setShowCheck(true), 100);

    let left = 15 * 60;
    const iv = setInterval(() => {
      if (left <= 0) { clearInterval(iv); return; }
      left--;
      setSecondsLeft(left);
    }, 1000);
    return () => clearInterval(iv);
  }, []);

  function copyInv() {
    navigator.clipboard?.writeText(inv);
    setCopied(true);
    setTimeout(() => setCopied(false), 1600);
  }

  const mins = Math.floor(secondsLeft / 60);
  const secs = secondsLeft % 60;
  const timerStr = mins + ":" + (secs < 10 ? "0" : "") + secs;
  const progress = (secondsLeft / (15 * 60)) * 100;
  const isUrgent = secondsLeft < 5 * 60;
  const pm = PAYMENT_CONFIG[details.bayar] || { color: "#6B7280", bg: "#F3F4F6", label: details.bayar };

  return (
    <>
      {/* ========== SUCCESS HEADER ========== */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-[#0F1B33] via-[#1a2d4d] to-[#0F1B33] p-6 md:p-10 text-center text-white shadow-xl">
        {/* Decorative circles */}
        <div className="absolute top-0 left-0 w-32 h-32 bg-white/5 rounded-full -translate-x-1/2 -translate-y-1/2"></div>
        <div className="absolute bottom-0 right-0 w-40 h-40 bg-white/5 rounded-full translate-x-1/3 translate-y-1/3"></div>
        
        {/* Animated Check */}
        <div className={`relative w-20 h-20 md:w-24 md:h-24 mx-auto rounded-full bg-gradient-to-br from-[#10B981] to-[#059669] grid place-items-center shadow-lg shadow-green-500/30 transition-all duration-500 ${showCheck ? "scale-100 opacity-100" : "scale-50 opacity-0"}`}>
          <svg className="w-10 h-10 md:w-12 md:h-12 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
            <path d="M5 13l4 4L19 7" className={`transition-all duration-700 delay-300 ${showCheck ? "stroke-dashoffset-0" : "stroke-dashoffset-50"}`} style={{ strokeDasharray: 50, strokeDashoffset: showCheck ? 0 : 50 }}></path>
          </svg>
        </div>

        <h1 className="mt-5 text-2xl md:text-3xl font-extrabold tracking-tight">Pesanan Berhasil Dibuat!</h1>
        <p className="mt-2 text-sm md:text-base text-white/70 max-w-sm mx-auto">Selesaikan pembayaran sebelum waktu habis. Item otomatis masuk ~10 detik setelah bayar.</p>

        {/* Invoice Chip */}
        <div className="mt-5 inline-flex items-center gap-2 px-4 py-2.5 rounded-2xl bg-white/10 backdrop-blur-sm border border-white/20">
          <span className="text-xs text-white/60 font-medium">Invoice</span>
          <span className="font-mono font-bold text-base md:text-lg tracking-wider">{inv}</span>
          <button onClick={copyInv} className="ml-1 h-7 px-3 rounded-lg bg-white/15 hover:bg-white/25 text-xs font-bold transition-all">
            {copied ? "✓" : "Salin"}
          </button>
        </div>
      </div>

      {/* ========== PAYMENT + COUNTDOWN (Main CTA) ========== */}
      <div className="relative mt-5 rounded-3xl bg-white border border-[var(--line)] shadow-lg overflow-hidden">
        {/* Countdown Bar */}
        <div className="relative h-1.5 bg-gray-100">
          <div
            className={`absolute inset-y-0 left-0 transition-all duration-1000 ease-linear ${isUrgent ? "bg-gradient-to-r from-red-500 to-red-400" : "bg-gradient-to-r from-[var(--blue)] to-[#3B82F6]"}`}
            style={{ width: `${progress}%` }}
          ></div>
        </div>

        <div className="p-5 md:p-8">
          {/* Payment Method Badge */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 md:w-14 md:h-14 rounded-2xl flex items-center justify-center font-extrabold text-lg md:text-xl text-white shadow-md" style={{ background: pm.color }}>
                {details.bayar === "QRIS" ? (
                  <svg className="w-7 h-7 md:w-8 md:h-8" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M3 3h4v4H3V3zm0 7h4v4H3v-4zm0 7h4v4H3v-4zm7-14h4v4h-4V3zm0 7h4v4h-4v-4zm7-7h4v4h-4V3zm0 7h4v4h-4v-4zm-7 7h4v4h-4v-4zm7 0h4v4h-4v-4zm0-7h4v4h-4v-4z"/>
                  </svg>
                ) : pm.label.substring(0, 2)}
              </div>
              <div>
                <p className="text-xs text-[var(--ink-soft)] font-medium uppercase tracking-wider">Metode Pembayaran</p>
                <p className="font-bold text-[var(--ink)] text-base md:text-lg">{pm.label}</p>
              </div>
            </div>
            {/* Countdown Pill */}
            <div className={`flex items-center gap-2 px-3 py-2 rounded-xl ${isUrgent ? "bg-red-50 border border-red-200" : "bg-[var(--bg)] border border-[var(--line)]"}`}>
              <div className={`w-2 h-2 rounded-full ${isUrgent ? "bg-red-500 animate-pulse" : "bg-[var(--orange)]"}`}></div>
              <span className={`text-xs font-semibold ${isUrgent ? "text-red-600" : "text-[var(--ink-soft)]"}`}>Sisa waktu</span>
              <span className={`font-mono font-bold text-sm md:text-base ${isUrgent ? "text-red-600" : "text-[var(--ink)]"}`}>{timerStr}</span>
            </div>
          </div>

          {/* QRIS Instructions (if QRIS) */}
          {details.bayar === "QRIS" && (
            <div className="mt-5 p-4 rounded-2xl bg-gradient-to-br from-[#f0f4ff] to-[#e8edf5] border border-[#C7D6FF]">
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-lg bg-[var(--blue)] text-white grid place-items-center shrink-0 mt-0.5">
                  <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10"/><path d="M12 16v-4M12 8h.01"/></svg>
                </div>
                <div>
                  <p className="text-sm font-bold text-[var(--blue)]">Cara Bayar QRIS</p>
                  <p className="mt-1 text-xs text-[var(--ink-soft)] leading-relaxed">Buka e-wallet / mobile banking &rarr; pilih &quot;Bayar&quot; atau &quot;Scan QR&quot; &rarr; scan QR setelah klik Bayar Sekarang &rarr; konfirmasi.</p>
                </div>
              </div>
            </div>
          )}

          {/* Total Bayar - PROMINENT */}
          <div className="mt-6 py-5 px-4 rounded-2xl bg-gradient-to-r from-[var(--blue)] to-[#1e40af] text-white text-center">
            <p className="text-xs text-white/70 font-medium uppercase tracking-wider mb-1">Total yang harus dibayar</p>
            <p className="text-3xl md:text-4xl font-extrabold font-display tracking-tight">Rp{details.total}</p>
          </div>

          {/* CTA Buttons */}
          <div className="mt-5 grid grid-cols-2 gap-3">
            <button className="h-13 md:h-14 rounded-2xl bg-[var(--orange)] text-white font-bold text-base md:text-lg grid place-items-center hover:bg-[#F06C09] shadow-lg shadow-orange-500/25 active:scale-[0.98] transition-all">
              Bayar Sekarang
            </button>
            <a href="/cek-transaksi" className="h-13 md:h-14 rounded-2xl border-2 border-[var(--line)] bg-white text-[var(--ink)] font-bold text-base md:text-lg grid place-items-center hover:border-[var(--blue)] hover:text-[var(--blue)] active:scale-[0.98] transition-all">
              Cek Status
            </a>
          </div>
        </div>
      </div>

      {/* ========== DETAIL PESANAN (Receipt Style) ========== */}
      <div className="mt-5 rounded-3xl bg-white border border-[var(--line)] shadow-md overflow-hidden">
        {/* Receipt Header */}
        <div className="px-5 md:px-6 py-4 bg-[var(--bg)] border-b border-[var(--line)]">
          <div className="flex items-center justify-between">
            <h2 className="font-bold text-[var(--ink)] flex items-center gap-2">
              <svg className="w-5 h-5 text-[var(--ink-soft)]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"/></svg>
              Ringkasan Pesanan
            </h2>
            <span className="text-xs font-semibold text-[var(--ink-soft)] bg-white px-2.5 py-1 rounded-lg border border-[var(--line)]">{inv}</span>
          </div>
        </div>
        {/* Receipt Body */}
        <div className="p-5 md:p-6 space-y-0">
          {[
            { label: "Game", value: details.game },
            { label: "Akun Tujuan", value: details.akun, mono: true },
            { label: "Item", value: details.item, bold: true },
            { label: "Metode Bayar", value: pm.label, color: pm.color },
            { label: "Notifikasi", value: details.wa },
          ].map((row, i, arr) => (
            <div key={i} className={`flex justify-between items-start gap-4 py-3 ${i < arr.length - 1 ? "border-b border-dashed border-[var(--line)]" : ""}`}>
              <span className="text-sm text-[var(--ink-soft)] shrink-0">{row.label}</span>
              <span className={`text-sm text-right ${row.bold ? "font-extrabold text-[var(--blue)]" : "font-semibold text-[var(--ink)]"} ${row.mono ? "font-mono" : ""}`}>
                {row.value}
              </span>
            </div>
          ))}
          {/* Total */}
          <div className="flex justify-between items-center gap-4 pt-4 mt-2 border-t-2 border-[var(--ink)]">
            <span className="text-sm font-bold text-[var(--ink)]">TOTAL BAYAR</span>
            <span className="text-xl font-extrabold font-display text-[var(--blue)]">Rp{details.total}</span>
          </div>
        </div>
        {/* Receipt Dashed Bottom */}
        <div className="relative h-5 bg-[var(--bg)] border-t border-dashed border-[var(--line)]">
          <div className="absolute -left-3 top-1/2 -translate-y-1/2 w-6 h-6 bg-[var(--bg)] rounded-full border border-[var(--line)]"></div>
          <div className="absolute -right-3 top-1/2 -translate-y-1/2 w-6 h-6 bg-[var(--bg)] rounded-full border border-[var(--line)]"></div>
        </div>
      </div>

      {/* ========== NEXT STEPS (Timeline) ========== */}
      <div className="mt-5 rounded-3xl bg-white border border-[var(--line)] shadow-md overflow-hidden">
        <div className="px-5 md:px-6 py-4 border-b border-[var(--line)]">
          <h2 className="font-bold text-[var(--ink)] flex items-center gap-2">
            <svg className="w-5 h-5 text-[var(--ink-soft)]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z"/></svg>
            Selanjutnya Apa?
          </h2>
        </div>
        <div className="p-5 md:p-6">
          {/* Timeline */}
          <div className="relative">
            {/* Vertical Line */}
            <div className="absolute left-[19px] md:left-[23px] top-0 bottom-0 w-0.5 bg-gradient-to-b from-[var(--teal)] via-[var(--blue)] to-[var(--orange)]"></div>

            {/* Step 1 */}
            <div className="relative flex gap-4 md:gap-5 pb-6">
              <div className="relative z-10 w-10 h-10 md:w-12 md:h-12 rounded-full bg-gradient-to-br from-[var(--teal)] to-[#0B9E8F] text-white grid place-items-center font-bold text-sm md:text-base shadow-md shadow-teal-500/20 shrink-0">
                1
              </div>
              <div className="pt-1 md:pt-2">
                <p className="font-bold text-[var(--ink)] text-sm md:text-base">Selesaikan pembayaran</p>
                <p className="text-xs md:text-sm text-[var(--ink-soft)] mt-1 leading-relaxed">Bayar sesuai metode yang kamu pilih sebelum batas waktu habis.</p>
              </div>
            </div>

            {/* Step 2 */}
            <div className="relative flex gap-4 md:gap-5 pb-6">
              <div className="relative z-10 w-10 h-10 md:w-12 md:h-12 rounded-full bg-gradient-to-br from-[var(--blue)] to-[#1e40af] text-white grid place-items-center font-bold text-sm md:text-base shadow-md shadow-blue-500/20 shrink-0">
                2
              </div>
              <div className="pt-1 md:pt-2">
                <p className="font-bold text-[var(--ink)] text-sm md:text-base">Tunggu ~10 detik</p>
                <p className="text-xs md:text-sm text-[var(--ink-soft)] mt-1 leading-relaxed">Sistem otomatis mengirim item ke akun game setelah pembayaran terkonfirmasi.</p>
              </div>
            </div>

            {/* Step 3 */}
            <div className="relative flex gap-4 md:gap-5">
              <div className="relative z-10 w-10 h-10 md:w-12 md:h-12 rounded-full bg-gradient-to-br from-[var(--orange)] to-[#E06A13] text-white grid place-items-center font-bold text-sm md:text-base shadow-md shadow-orange-500/20 shrink-0">
                3
              </div>
              <div className="pt-1 md:pt-2">
                <p className="font-bold text-[var(--ink)] text-sm md:text-base">Cek in-game</p>
                <p className="text-xs md:text-sm text-[var(--ink-soft)] mt-1 leading-relaxed">Restart game bila item belum muncul. Struk juga dikirim ke WhatsApp kamu.</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ========== CS HELP BANNER ========== */}
      <div className="mt-5 rounded-3xl overflow-hidden">
        <div className="p-5 md:p-6 bg-gradient-to-r from-[#0F1B33] to-[#1a2d4d] text-white flex flex-col sm:flex-row items-center gap-4">
          <div className="flex items-center gap-3 flex-1">
            <div className="w-11 h-11 rounded-xl bg-white/10 grid place-items-center shrink-0">
              <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 15a4 4 0 0 1-4 4H8l-5 3V6a3 3 0 0 1 3-3h11a4 4 0 0 1 4 4z"/></svg>
            </div>
            <div>
              <p className="font-bold text-sm">Ada kendala?</p>
              <p className="text-xs text-white/60">Tim CS aktif 24 jam, dibalas di bawah 3 menit.</p>
            </div>
          </div>
          <a href="/bantuan#kontak" className="w-full sm:w-auto h-11 px-6 rounded-xl bg-white text-[var(--ink)] font-bold text-sm grid place-items-center hover:bg-white/90 active:scale-[0.98] transition-all">
            Hubungi CS
          </a>
        </div>
      </div>

      {/* ========== STICKY MOBILE CTA ========== */}
      <div className="fixed bottom-0 left-0 right-0 z-50 sm:hidden bg-white border-t border-[var(--line)] px-4 py-3 safe-area-inset">
        <div className="flex gap-3">
          <div className="flex-1 flex flex-col items-center justify-center">
            <span className="text-[10px] text-[var(--ink-soft)]">Total</span>
            <span className="font-extrabold font-display text-[var(--blue)] text-lg">Rp{details.total}</span>
          </div>
          <button className="flex-[2] h-12 rounded-xl bg-[var(--orange)] text-white font-bold text-base grid place-items-center active:scale-[0.98] shadow-lg shadow-orange-500/25 transition-all">
            Bayar Sekarang
          </button>
        </div>
      </div>

      {/* ========== BACK LINK ========== */}
      <div className="mt-6 text-center pb-24 sm:pb-8">
        <a href="/#games" className="inline-flex items-center gap-2 text-sm font-bold text-[var(--blue)] hover:underline">
          <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="m15 18-6-6 6-6"/></svg>
          Top up game lain di VEXBITS
        </a>
      </div>
    </>
  );
}
