import type { Metadata } from "next";
import Header from "@/components/Header";
import HeroSlider from "@/components/HeroSlider";
import GameGrid from "@/components/GameGrid";
import Footer from "@/components/Footer";

const SITE_URL = "https://www.vexbits.net";

export const metadata: Metadata = {
  title: "VEXBITS — Top Up Game Cepat, Murah & Aman",
  description:
    "Top up diamond, UC, dan voucher 6 game favorit (Mobile Legends, Free Fire, PUBG, Genshin Impact, Magic Chess, CODM) harga termurah. Proses otomatis 10 detik, bayar via QRIS, e-wallet, atau minimarket.",
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "VEXBITS — Top Up Game Cepat, Murah & Aman",
    description: "Top up diamond, UC, dan voucher 6 game favorit harga termurah. Proses otomatis 10 detik.",
    url: SITE_URL,
    images: ["/og-image.png"],
  },
};

export default function Home() {
  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      {
        "@type": "Question",
        name: "Berapa lama proses top up di VEXBITS?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Rata-rata 10 detik setelah pembayaran terkonfirmasi. Untuk metode transfer bank atau minimarket, konfirmasi bisa memakan waktu 1-10 menit.",
        },
      },
      {
        "@type": "Question",
        name: "Apakah harus daftar akun dulu untuk top up?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Tidak. Kamu bisa langsung pilih game, isi ID, dan bayar tanpa registrasi.",
        },
      },
      {
        "@type": "Question",
        name: "Metode pembayaran apa saja yang didukung VEXBITS?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "QRIS (semua e-wallet dan m-banking), GoPay, OVO, DANA, ShopeePay, Virtual Account BCA/BRI/Mandiri, serta pembayaran tunai di Alfamart dan Indomaret.",
        },
      },
      {
        "@type": "Question",
        name: "Apakah top up di VEXBITS aman?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Aman. VEXBITS hanya meminta ID publik (User ID/Zone ID/UID). Tidak pernah meminta password, OTP, atau akses ke akun game kamu.",
        },
      },
    ],
  };

  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Beranda",
        item: SITE_URL,
      },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />

      {/* ================= HEADER ================= */}
      <Header />

      {/* ================= HERO BANNER SLIDER ================= */}
      <section id="beranda" className="pt-4 md:pt-6">
        <div className="wrap">
          <HeroSlider />

          {/* quick trust strip */}
          <div className="mt-4 grid grid-cols-2 md:grid-cols-4 gap-3">
            <div className="card px-4 py-3 flex items-center gap-3">
              <span className="w-9 h-9 rounded-xl bg-[var(--blue-soft)] text-[var(--blue)] grid place-items-center shrink-0"><svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M13 2 4 14h7l-1 8 9-12h-7z"></path></svg></span>
              <div><p className="text-sm font-bold leading-tight">Proses 10 detik</p><p className="text-xs text-[var(--ink-soft)]">Otomatis 24 jam</p></div>
            </div>
            <div className="card px-4 py-3 flex items-center gap-3">
              <span className="w-9 h-9 rounded-xl bg-[#FFF1E6] text-[var(--orange)] grid place-items-center shrink-0"><svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 3v18M7 7h7a3 3 0 0 1 0 6H7h8"></path></svg></span>
              <div><p className="text-sm font-bold leading-tight">Harga termurah</p><p className="text-xs text-[var(--ink-soft)]">Tanpa biaya tersembunyi</p></div>
            </div>
            <div className="card px-4 py-3 flex items-center gap-3">
              <span className="w-9 h-9 rounded-xl bg-[#E6FAF7] text-[var(--teal)] grid place-items-center shrink-0"><svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 3 5 6v6c0 4.5 3 7.6 7 9 4-1.4 7-4.5 7-9V6z"></path><path d="m9 12 2 2 4-4"></path></svg></span>
              <div><p className="text-sm font-bold leading-tight">Bayar aman</p><p className="text-xs text-[var(--ink-soft)]">QRIS &amp; e-wallet resmi</p></div>
            </div>
            <div className="card px-4 py-3 flex items-center gap-3">
              <span className="w-9 h-9 rounded-xl bg-[var(--blue-soft)] text-[var(--blue)] grid place-items-center shrink-0"><svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 15a4 4 0 0 1-4 4H8l-5 3V6a3 3 0 0 1 3-3h11a4 4 0 0 1 4 4z"></path></svg></span>
              <div><p className="text-sm font-bold leading-tight">Support 24/7</p><p className="text-xs text-[var(--ink-soft)]">Balas di bawah 3 menit</p></div>
            </div>
          </div>
        </div>
      </section>

      {/* ================= GAME GRID ================= */}
      <section id="games" className="py-10 md:py-14">
        <div className="wrap">
          <div className="flex flex-wrap items-end justify-between gap-3">
            <div>
              <h2 className="text-2xl md:text-3xl font-extrabold">Game Populer</h2>
              <p className="text-sm md:text-base text-[var(--ink-soft)] mt-1">Pilih gamenya, isi ID, bayar. Sesederhana itu.</p>
            </div>
            <a href="/game/mobile-legends" className="text-sm font-bold text-[var(--blue)] hover:underline">Tampilkan semua →</a>
          </div>

          <GameGrid />
        </div>
      </section>

      {/* ================= KENAPA VEXBITS ================= */}
      <section id="kenapa" className="py-10 md:py-14 bg-white border-y border-[var(--line)]">
        <div className="wrap">
          <h2 className="text-2xl md:text-3xl font-extrabold text-center">Kenapa Pilih VEXBITS?</h2>
          <p className="text-sm md:text-base text-[var(--ink-soft)] text-center mt-2 max-w-xl mx-auto">Dibangun untuk gamer Indonesia: cepat, transparan, dan selalu ada saat kamu butuh.</p>

          <div className="mt-8 grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="card p-5">
              <span className="w-11 h-11 rounded-xl bg-[var(--blue-soft)] text-[var(--blue)] grid place-items-center"><svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M13 2 4 14h7l-1 8 9-12h-7z"></path></svg></span>
              <h3 className="mt-4 text-lg font-bold">Proses Cepat</h3>
              <p className="mt-1 text-sm text-[var(--ink-soft)]">Sistem otomatis mengirim item rata-rata dalam 10 detik setelah pembayaran terkonfirmasi.</p>
            </div>
            <div className="card p-5">
              <span className="w-11 h-11 rounded-xl bg-[#FFF1E6] text-[var(--orange)] grid place-items-center"><svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M20 12V8H6a2 2 0 0 1 0-4h12v4"></path><path d="M4 6v12a2 2 0 0 0 2 2h14v-4"></path><path d="M18 12a2 2 0 0 0 0 4h4v-4z"></path></svg></span>
              <h3 className="mt-4 text-lg font-bold">Harga Termurah</h3>
              <p className="mt-1 text-sm text-[var(--ink-soft)]">Harga distributor resmi tanpa markup. Promo mingguan dan cashback untuk member setia.</p>
            </div>
            <div className="card p-5">
              <span className="w-11 h-11 rounded-xl bg-[#E6FAF7] text-[var(--teal)] grid place-items-center"><svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 3 5 6v6c0 4.5 3 7.6 7 9 4-1.4 7-4.5 7-9V6z"></path><path d="m9 12 2 2 4-4"></path></svg></span>
              <h3 className="mt-4 text-lg font-bold">Pembayaran Aman</h3>
              <p className="mt-1 text-sm text-[var(--ink-soft)]">Transaksi terenkripsi lewat payment gateway berlisensi. Data akun kamu tidak pernah kami simpan.</p>
            </div>
            <div className="card p-5">
              <span className="w-11 h-11 rounded-xl bg-[var(--blue-soft)] text-[var(--blue)] grid place-items-center"><svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 15a4 4 0 0 1-4 4H8l-5 3V6a3 3 0 0 1 3-3h11a4 4 0 0 1 4 4z"></path></svg></span>
              <h3 className="mt-4 text-lg font-bold">Support 24/7</h3>
              <p className="mt-1 text-sm text-[var(--ink-soft)]">Tim CS manusia (bukan bot) siap membantu kapan pun, rata-rata dibalas di bawah 3 menit.</p>
            </div>
          </div>
        </div>
      </section>

      {/* ================= CARA ORDER ================= */}
      <section id="cara-order" className="py-10 md:py-14">
        <div className="wrap">
          <h2 className="text-2xl md:text-3xl font-extrabold text-center">Cara Order di VEXBITS</h2>
          <p className="text-sm md:text-base text-[var(--ink-soft)] text-center mt-2">Empat langkah, tanpa perlu daftar akun.</p>

          <div className="mt-8 grid grid-cols-1 md:grid-cols-4 gap-5 md:gap-4">
            <div className="relative text-center step-line">
              <div className="w-16 h-16 mx-auto rounded-2xl bg-white border border-[var(--line)] grid place-items-center text-xl font-extrabold text-[var(--blue)] font-display shadow-soft relative z-10">1</div>
              <h3 className="mt-3 font-bold">Pilih Game</h3>
              <p className="mt-1 text-sm text-[var(--ink-soft)] max-w-[240px] mx-auto">Cari game dari kolom pencarian atau grid game populer.</p>
            </div>
            <div className="relative text-center step-line">
              <div className="w-16 h-16 mx-auto rounded-2xl bg-white border border-[var(--line)] grid place-items-center text-xl font-extrabold text-[var(--blue)] font-display shadow-soft relative z-10">2</div>
              <h3 className="mt-3 font-bold">Isi ID &amp; Nominal</h3>
              <p className="mt-1 text-sm text-[var(--ink-soft)] max-w-[240px] mx-auto">Masukkan User ID / Server, lalu pilih nominal top up.</p>
            </div>
            <div className="relative text-center step-line">
              <div className="w-16 h-16 mx-auto rounded-2xl bg-white border border-[var(--line)] grid place-items-center text-xl font-extrabold text-[var(--blue)] font-display shadow-soft relative z-10">3</div>
              <h3 className="mt-3 font-bold">Bayar</h3>
              <p className="mt-1 text-sm text-[var(--ink-soft)] max-w-[240px] mx-auto">Bayar via QRIS, e-wallet, transfer bank, atau minimarket.</p>
            </div>
            <div className="relative text-center">
              <div className="w-16 h-16 mx-auto rounded-2xl bg-[var(--orange)] grid place-items-center text-xl font-extrabold text-white font-display shadow-soft relative z-10">4</div>
              <h3 className="mt-3 font-bold">Item Masuk</h3>
              <p className="mt-1 text-sm text-[var(--ink-soft)] max-w-[240px] mx-auto">Item langsung masuk ke akun game, struk dikirim otomatis.</p>
            </div>
          </div>

          {/* cek transaksi */}
          <div id="cek-transaksi" style={{ background: "#0F1B33", borderColor: "#0F1B33" }} className="mt-10 card p-5 md:p-7 text-white md:flex md:items-center md:gap-8">
            <div className="md:flex-1">
              <h3 className="text-xl md:text-2xl font-extrabold">Cek Status Transaksi</h3>
              <p className="mt-1 text-sm text-white/70">Masukkan nomor invoice atau nomor WhatsApp yang kamu pakai saat order.</p>
            </div>
            <form className="mt-4 md:mt-0 md:w-[440px] flex gap-2" action="/cek-transaksi" method="get">
              <input type="text" name="inv" placeholder="Contoh: VXB-482913" className="flex-1 h-12 px-4 rounded-xl bg-white/10 border border-white/20 text-sm text-white placeholder-white/50 outline-none focus:border-[var(--orange)]" />
              <button className="h-12 px-5 rounded-xl bg-[var(--orange)] font-bold text-sm hover:bg-[#F06C09]">Cek</button>
            </form>
          </div>
        </div>
      </section>

      {/* ================= TESTIMONI ================= */}
      <section className="py-10 md:py-14 bg-white border-y border-[var(--line)]">
        <div className="wrap">
          <div className="grid grid-cols-3 gap-3 md:gap-6 text-center max-w-3xl mx-auto">
            <div><p className="text-2xl md:text-4xl font-extrabold font-display text-[var(--blue)]">1,2 Jt+</p><p className="text-xs md:text-sm text-[var(--ink-soft)] mt-1">Transaksi sukses</p></div>
            <div><p className="text-2xl md:text-4xl font-extrabold font-display text-[var(--blue)]">180 rb+</p><p className="text-xs md:text-sm text-[var(--ink-soft)] mt-1">Gamer terdaftar</p></div>
            <div><p className="text-2xl md:text-4xl font-extrabold font-display text-[var(--blue)]">4,9/5</p><p className="text-xs md:text-sm text-[var(--ink-soft)] mt-1">Rating pelanggan</p></div>
          </div>

          <h2 className="mt-10 text-2xl md:text-3xl font-extrabold text-center">Kata Mereka yang Sudah Top Up</h2>

          <div className="mt-6 grid md:grid-cols-3 gap-4">
            <figure className="card p-5">
              <div className="flex gap-0.5 text-[var(--orange)]">★★★★★</div>
              <blockquote className="mt-3 text-sm text-[var(--ink-soft)]">&quot;Bayar pakai QRIS, diamond masuk sebelum saya sempat balik ke game. Sekarang langganan di sini.&quot;</blockquote>
              <figcaption className="mt-4 flex items-center gap-3">
                <span className="w-9 h-9 rounded-full bg-[var(--blue-soft)] text-[var(--blue)] grid place-items-center font-bold text-sm">RA</span>
                <span><span className="block text-sm font-bold">Rizky A.</span><span className="block text-xs text-[var(--ink-soft)]">Bandung</span></span>
              </figcaption>
            </figure>
            <figure className="card p-5">
              <div className="flex gap-0.5 text-[var(--orange)]">★★★★★</div>
              <blockquote className="mt-3 text-sm text-[var(--ink-soft)]">&quot;Harganya beda tipis tapi konsisten lebih murah dari tempat lain, dan nggak ada biaya admin aneh-aneh.&quot;</blockquote>
              <figcaption className="mt-4 flex items-center gap-3">
                <span className="w-9 h-9 rounded-full bg-[#FFF1E6] text-[var(--orange)] grid place-items-center font-bold text-sm">DP</span>
                <span><span className="block text-sm font-bold">Dinda P.</span><span className="block text-xs text-[var(--ink-soft)]">Surabaya</span></span>
              </figcaption>
            </figure>
            <figure className="card p-5">
              <div className="flex gap-0.5 text-[var(--orange)]">★★★★★</div>
              <blockquote className="mt-3 text-sm text-[var(--ink-soft)]">&quot;Sempat salah isi ID, chat CS jam 2 pagi langsung dibantu sampai selesai. Salut.&quot;</blockquote>
              <figcaption className="mt-4 flex items-center gap-3">
                <span className="w-9 h-9 rounded-full bg-[#E6FAF7] text-[var(--teal)] grid place-items-center font-bold text-sm">BS</span>
                <span><span className="block text-sm font-bold">Bagas S.</span><span className="block text-xs text-[var(--ink-soft)]">Makassar</span></span>
              </figcaption>
            </figure>
          </div>
        </div>
      </section>

      {/* ================= FOOTER ================= */}
      <Footer />
    </>
  );
}
