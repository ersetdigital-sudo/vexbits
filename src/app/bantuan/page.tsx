import type { Metadata } from "next";
import GameHeader from "@/components/GameHeader";
import FaqSearch from "@/components/FaqSearch";

export const metadata: Metadata = {
  title: "Pusat Bantuan — VEXBITS",
  description: "FAQ top up game, kebijakan refund, dan kontak customer service VEXBITS 24 jam.",
};

export default function BantuanPage() {
  return (
    <>
      <GameHeader />
      <main className="py-6 md:py-10">
        <div className="wrap">
          <nav className="text-xs text-[var(--ink-soft)] mb-4"><a href="/" className="hover:text-[var(--blue)]">Beranda</a> › <span className="text-[var(--ink)] font-semibold">Pusat Bantuan</span></nav>

          <div className="max-w-2xl">
            <h1 className="text-2xl md:text-3xl font-extrabold">Pusat Bantuan VEXBITS</h1>
            <p className="mt-2 text-sm md:text-base text-[var(--ink-soft)]">Semua yang perlu kamu tahu soal top up, pembayaran, refund, dan cara menghubungi tim kami.</p>
          </div>

          {/* shortcut */}
          <div className="mt-6 grid sm:grid-cols-3 gap-3">
            <a href="#faq" className="card p-4 flex items-center gap-3 hover:border-[#C7D6FF] hover:shadow-soft transition">
              <span className="w-10 h-10 rounded-xl bg-[var(--blue-soft)] text-[var(--blue)] grid place-items-center shrink-0"><svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="9"></circle><path d="M9.5 9a2.5 2.5 0 1 1 3.4 2.3c-.6.3-.9.8-.9 1.4v.3"></path><path d="M12 17h.01"></path></svg></span>
              <span><span className="block text-sm font-bold">FAQ Top Up</span><span className="block text-xs text-[var(--ink-soft)]">14 pertanyaan populer</span></span>
            </a>
            <a href="#refund" className="card p-4 flex items-center gap-3 hover:border-[#C7D6FF] hover:shadow-soft transition">
              <span className="w-10 h-10 rounded-xl bg-[#FFF1E6] text-[var(--orange)] grid place-items-center shrink-0"><svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M3 12a9 9 0 1 0 3-6.7"></path><path d="M3 4v5h5"></path></svg></span>
              <span><span className="block text-sm font-bold">Kebijakan Refund</span><span className="block text-xs text-[var(--ink-soft)]">Syarat &amp; prosesnya</span></span>
            </a>
            <a href="#kontak" className="card p-4 flex items-center gap-3 hover:border-[#C7D6FF] hover:shadow-soft transition">
              <span className="w-10 h-10 rounded-xl bg-[#E6FAF7] text-[var(--teal)] grid place-items-center shrink-0"><svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 15a4 4 0 0 1-4 4H8l-5 3V6a3 3 0 0 1 3-3h11a4 4 0 0 1 4 4z"></path></svg></span>
              <span><span className="block text-sm font-bold">Kontak CS</span><span className="block text-xs text-[var(--ink-soft)]">Aktif 24 jam</span></span>
            </a>
          </div>

          <div className="mt-8 grid lg:grid-cols-[1fr_340px] gap-6 items-start">
            <div className="space-y-6">
              {/* FAQ */}
              <section id="faq" className="anchor card p-5 md:p-6">
                <h2 className="text-xl font-extrabold">FAQ Top Up</h2>
                <FaqSearch />
              </section>

              {/* REFUND */}
              <section id="refund" className="anchor card p-5 md:p-6">
                <h2 className="text-xl font-extrabold">Kebijakan Refund</h2>
                <p className="mt-2 text-sm text-[var(--ink-soft)]">Berlaku untuk seluruh transaksi di vexbits.net. Terakhir diperbarui 1 September 2026.</p>

                <div className="mt-5 grid sm:grid-cols-2 gap-4">
                  <div className="p-4 rounded-xl border border-[#BFE9E2] bg-[#E6FAF7]">
                    <p className="text-sm font-extrabold text-[#0B7C77]">Refund DAPAT diajukan bila:</p>
                    <ul className="mt-2 space-y-2 text-sm text-[var(--ink-soft)]">
                      <li>✓ Pembayaran berhasil tetapi item tidak terkirim dalam 1x24 jam.</li>
                      <li>✓ Terjadi double payment untuk satu invoice yang sama.</li>
                      <li>✓ Produk sedang gangguan di sisi publisher dan pesanan dibatalkan sistem.</li>
                      <li>✓ Nominal yang dikirim tidak sesuai dengan yang kamu beli.</li>
                      <li>✓ Pesanan dibatalkan sebelum item dikirim (masih berstatus Diproses).</li>
                    </ul>
                  </div>
                  <div className="p-4 rounded-xl border border-[#F5C6D2] bg-[#FEE9EE]">
                    <p className="text-sm font-extrabold text-[#B3123A]">Refund TIDAK dapat diproses bila:</p>
                    <ul className="mt-2 space-y-2 text-sm text-[var(--ink-soft)]">
                      <li>✕ Salah memasukkan ID/Zone/Server dan item sudah terkirim.</li>
                      <li>✕ Berubah pikiran setelah item masuk ke akun game.</li>
                      <li>✕ Akun game terkena banned atau bermasalah oleh pihak publisher.</li>
                      <li>✕ Item sudah dipakai, ditukar, atau dihadiahkan di dalam game.</li>
                      <li>✕ Klaim diajukan lebih dari 7 hari setelah tanggal transaksi.</li>
                    </ul>
                  </div>
                </div>

                <h3 className="mt-6 text-base font-bold">Cara Mengajukan Refund</h3>
                <ol className="mt-3 space-y-3">
                  <li className="flex gap-3"><span className="step-num">1</span><div><p className="text-sm font-semibold">Siapkan bukti</p><p className="text-sm text-[var(--ink-soft)]">Nomor invoice, bukti pembayaran, dan screenshot kondisi item di dalam game.</p></div></li>
                  <li className="flex gap-3"><span className="step-num">2</span><div><p className="text-sm font-semibold">Ajukan ke CS</p><p className="text-sm text-[var(--ink-soft)]">Chat WhatsApp atau email dengan subjek &quot;Refund - [nomor invoice]&quot;.</p></div></li>
                  <li className="flex gap-3"><span className="step-num">3</span><div><p className="text-sm font-semibold">Verifikasi 1x24 jam</p><p className="text-sm text-[var(--ink-soft)]">Tim kami mengecek log transaksi dan status pengiriman ke publisher.</p></div></li>
                  <li className="flex gap-3"><span className="step-num">4</span><div><p className="text-sm font-semibold">Dana dikembalikan</p><p className="text-sm text-[var(--ink-soft)]">Saldo VEXBITS: instan. E-wallet: 1-2 hari kerja. Transfer bank/VA: 3-7 hari kerja mengikuti proses bank.</p></div></li>
                </ol>

                <p className="mt-5 text-xs text-[var(--ink-soft)] bg-[var(--bg)] border border-[var(--line)] rounded-xl p-3">Refund dikembalikan penuh tanpa potongan bila kesalahan berasal dari sistem VEXBITS. Untuk pembatalan atas permintaan pengguna sebelum item dikirim, biaya layanan payment gateway (bila sudah terpotong) tidak dapat dikembalikan.</p>
              </section>
            </div>

            {/* KONTAK */}
            <aside id="kontak" className="anchor space-y-4 lg:sticky lg:top-24">
              <div className="card p-5">
                <h2 className="text-lg font-extrabold">Kontak Customer Service</h2>
                <p className="mt-1 text-sm text-[var(--ink-soft)]">Tim manusia, aktif 24 jam termasuk hari libur. Rata-rata dibalas di bawah 3 menit.</p>
                <div className="mt-4 space-y-3">
                  <a href="https://wa.me/6281234567890" className="flex items-center gap-3 p-3 rounded-xl border border-[var(--line)] hover:border-[var(--blue)] transition">
                    <span className="w-10 h-10 rounded-xl bg-[#E6FAF7] text-[var(--teal)] grid place-items-center shrink-0"><svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 12a9 9 0 0 1-13.3 7.9L3 21l1.2-4.5A9 9 0 1 1 21 12z"></path></svg></span>
                    <span className="min-w-0"><span className="block text-sm font-bold">WhatsApp</span><span className="block text-xs text-[var(--ink-soft)] truncate">+62 812-3456-7890 · respon tercepat</span></span>
                  </a>
                  <a href="mailto:support@vexbits.net" className="flex items-center gap-3 p-3 rounded-xl border border-[var(--line)] hover:border-[var(--blue)] transition">
                    <span className="w-10 h-10 rounded-xl bg-[var(--blue-soft)] text-[var(--blue)] grid place-items-center shrink-0"><svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="5" width="18" height="14" rx="3"></rect><path d="m4 7 8 5 8-5"></path></svg></span>
                    <span className="min-w-0"><span className="block text-sm font-bold">Email</span><span className="block text-xs text-[var(--ink-soft)] truncate">support@vexbits.net · balas {'<'}6 jam</span></span>
                  </a>
                  <a href="https://www.instagram.com/" className="flex items-center gap-3 p-3 rounded-xl border border-[var(--line)] hover:border-[var(--blue)] transition">
                    <span className="w-10 h-10 rounded-xl bg-[#FFF1E6] text-[var(--orange)] grid place-items-center shrink-0"><svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="3" width="18" height="18" rx="5"></rect><circle cx="12" cy="12" r="4"></circle><circle cx="17.5" cy="6.5" r="1"></circle></svg></span>
                    <span className="min-w-0"><span className="block text-sm font-bold">Instagram</span><span className="block text-xs text-[var(--ink-soft)] truncate">@vexbits · info promo terbaru</span></span>
                  </a>
                </div>
                <div className="mt-4 p-3 rounded-xl bg-[var(--bg)] border border-[var(--line)]">
                  <p className="text-xs font-bold">Sebelum chat, siapkan:</p>
                  <p className="mt-1 text-xs text-[var(--ink-soft)]">Nomor invoice (VXB-xxxxxx), ID game tujuan, dan bukti pembayaran. Dengan data ini kasusmu bisa diselesaikan dalam satu kali balasan.</p>
                </div>
              </div>

              <div className="card p-5">
                <p className="text-sm font-bold">Cek status pesanan dulu?</p>
                <p className="mt-1 text-sm text-[var(--ink-soft)]">Sebagian besar pertanyaan terjawab langsung dari halaman status transaksi.</p>
                <a href="/cek-transaksi" className="mt-3 h-11 rounded-xl bg-[var(--orange)] text-white font-bold grid place-items-center hover:bg-[#F06C09]">Cek Transaksi</a>
              </div>

              <div className="card p-5" style={{ background: "#0F1B33", borderColor: "#0F1B33" }}>
                <p className="text-sm font-bold text-white">Waspada penipuan</p>
                <p className="mt-1 text-sm text-white/70">CS resmi VEXBITS tidak pernah meminta password, OTP, atau meminta transfer ke rekening pribadi. Semua pembayaran hanya melalui halaman checkout di vexbits.net.</p>
              </div>
            </aside>
          </div>
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
