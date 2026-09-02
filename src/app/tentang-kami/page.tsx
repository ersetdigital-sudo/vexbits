import type { Metadata } from "next";
import GameHeader from "@/components/GameHeader";

const SITE_URL = "https://www.vexbits.net";

export const metadata: Metadata = {
  title: "Tentang Kami — VEXBITS",
  description: "Kenali VEXBITS, platform top up game terpercaya di Indonesia. Cepat, aman, dan harga termurah untuk 6 game populer.",
  alternates: { canonical: "/tentang-kami" },
  openGraph: {
    title: "Tentang Kami — VEXBITS",
    description: "Kenali VEXBITS, platform top up game terpercaya di Indonesia.",
    url: `${SITE_URL}/tentang-kami`,
    images: ["/og-image.png"],
  },
};

export default function TentangKamiPage() {
  const aboutJsonLd = {
    "@context": "https://schema.org",
    "@type": "AboutPage",
    name: "Tentang VEXBITS",
    description: "Kenali VEXBITS, platform top up game terpercaya di Indonesia.",
    url: `${SITE_URL}/tentang-kami`,
    mainEntity: {
      "@type": "Organization",
      name: "VEXBITS",
      url: SITE_URL,
      logo: `${SITE_URL}/images/c525e6ef-5042-4cd9-a3e1-f0ac5160b8a3.png`,
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(aboutJsonLd) }}
      />

      <GameHeader />
      <main className="py-6 md:py-10">
        <div className="wrap max-w-3xl">
          <nav className="text-xs text-[var(--ink-soft)] mb-4" aria-label="Breadcrumb">
            <a href="/" className="hover:text-[var(--blue)]">Beranda</a> › <span className="text-[var(--ink)] font-semibold">Tentang Kami</span>
          </nav>

          <h1 className="text-2xl md:text-3xl font-extrabold">Tentang VEXBITS</h1>

          <div className="mt-6 space-y-6 text-sm md:text-base text-[var(--ink)] leading-relaxed">
            <section>
              <h2 className="text-lg font-extrabold mb-2">Siapa Kami?</h2>
              <p>VEXBITS adalah platform top up game yang dibangun oleh tim kecil yang terdiri dari gamer Indonesia. Kami mulai dari masalah sederhana: terlalu ribet dan mahal untuk beli diamond atau UC. Dari situ kami bangun sistem yang bisa mengirim item secara otomatis dalam hitungan detik, tanpa perlu daftar akun, tanpa biaya tersembunyi.</p>
            </section>

            <section>
              <h2 className="text-lg font-extrabold mb-2">Misi Kami</h2>
              <p>Membuat top up game di Indonesia semudah beli pulsa: pilih game, isi ID, bayar, selesai. Tidak ada langkah yang tidak perlu, tidak ada biaya admin yang mengejutkan. Harga yang tertera adalah harga yang harus kamu bayar.</p>
            </section>

            <section>
              <h2 className="text-lg font-extrabold mb-2">Game yang Tersedia</h2>
              <p>Saat ini VEXBITS melayani top up untuk 6 game populer di Indonesia:</p>
              <ul className="mt-2 space-y-1 ml-4">
                <li>• <strong>Mobile Legends: Bang Bang</strong> — Diamond dan Twilight Pass</li>
                <li>• <strong>Free Fire</strong> — Diamond dan Membership</li>
                <li>• <strong>PUBG Mobile</strong> — UC dan Royale Pass</li>
                <li>• <strong>Genshin Impact</strong> — Genesis Crystal, Welkin Moon, dan Battle Pass</li>
                <li>• <strong>Magic Chess: Go Go</strong> — Chess Coin dan Season Pass</li>
                <li>• <strong>Call of Duty Mobile</strong> — CP dan Battle Pass</li>
              </ul>
            </section>

            <section>
              <h2 className="text-lg font-extrabold mb-2">Bagaimana Kami Bekerja</h2>
              <p>Sistem VEXBITS terhubung langsung ke distributor resmi dari masing-masing publisher game. Begitu pembayaran dikonfirmasi, item dikirim secara otomatis ke akun game kamu tanpa perlu campur tangan manusia. Prosesnya rata-rata hanya 10 detik.</p>
              <p className="mt-2">Kami tidak menyimpan password atau data login akun game kamu. Yang kami butuhkan hanyalah ID publik (User ID, Zone ID, atau UID) yang memang terlihat di dalam game dan digunakan untuk pengiriman item.</p>
            </section>

            <section>
              <h2 className="text-lg font-extrabold mb-2">Keamanan Transaksi</h2>
              <p>Semua transaksi di VEXBITS terenkripsi melalui payment gateway berlisensi. Kami mendukung QRIS (semua e-wallet dan m-banking), GoPay, OVO, DANA, ShopeePay, Virtual Account BCA/BRI/Mandiri, serta pembayaran tunai di Alfamart dan Indomaret.</p>
            </section>

            <section>
              <h2 className="text-lg font-extrabold mb-2">Tim Support</h2>
              <p>Tim customer service VEXBITS adalah manusia asli, bukan bot. Mereka aktif 24 jam termasuk hari libur, dengan rata-rata waktu respons di bawah 3 menit. Kamu bisa menghubungi kami melalui WhatsApp, email, atau Instagram.</p>
            </section>

            <section>
              <h2 className="text-lg font-extrabold mb-2">Kontak</h2>
              <div className="mt-2 space-y-1">
                <p>• WhatsApp: <a href="https://wa.me/6281234567890" className="text-[var(--blue)] font-bold hover:underline">+62 812-3456-7890</a></p>
                <p>• Email: <a href="mailto:support@vexbits.net" className="text-[var(--blue)] font-bold hover:underline">support@vexbits.net</a></p>
                <p>• Instagram: <a href="https://www.instagram.com/" className="text-[var(--blue)] font-bold hover:underline">@vexbits</a></p>
              </div>
            </section>
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
