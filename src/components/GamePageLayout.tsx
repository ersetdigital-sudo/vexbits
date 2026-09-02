import GameHeader from "@/components/GameHeader";
import GameOrderForm from "@/components/GameOrderForm";
import type { GameData } from "@/lib/games";
import { getGamesFromDB } from "@/lib/db-games";

const SITE_URL = "https://www.vexbits.net";

const GAME_DESCRIPTIONS: Record<string, { howTo: string; why: string; tips: string }> = {
  "mobile-legends": {
    howTo: "Top up Mobile Legends: Bang Bang di VEXBITS只需几步：输入 User ID 和 Zone ID，选择钻石数量，通过 QRIS、电子钱包或便利店付款，钻石将在 10 秒内到账。",
    why: "VEXBITS 是 Mobile Legends 最快、最便宜的充值平台。价格从 Rp1,500 起，支持所有主流支付方式，24/7 客服在线。",
    tips: "User ID 和 Zone ID 可以在游戏左上角的头像下方找到。充值前请确认 ID 正确，因为充值后无法撤回。",
  },
  "free-fire": {
    howTo: "Top up Free Fire diamond murah dan cepat di VEXBITS. Masukkan Player ID, pilih nominal diamond, bayar via QRIS atau e-wallet, diamond langsung masuk ke akun Garena kamu.",
    why: "Harga diamond Free Fire di VEXBITS mulai dari Rp2.000. Proses otomatis, tidak perlu daftar akun, dan tersedia berbagai metode pembayaran termasuk Alfamart dan Indomaret.",
    tips: "Player ID bisa dilihat dengan cara tap foto profil di menu utama Free Fire. Berupa 9-11 digit angka di bawah nickname.",
  },
  "pubg-mobile": {
    howTo: "Top up PUBG Mobile UC termurah di VEXBITS. Masukkan Character ID, pilih nominal UC, bayar selesai. UC langsung masuk dalam hitungan detik.",
    why: "VEXBITS menawarkan harga UC PUBG Mobile yang lebih murah dari harga resmi. Tersedia paket mulai 60 UC hingga 3.850 UC, plus Royale Pass.",
    tips: "Character ID bisa ditemukan di menu Profil PUBG Mobile. Pastikan Character ID benar sebelum membayar.",
  },
  "genshin-impact": {
    howTo: "Top up Genshin Impact Genesis Crystal murah di VEXBITS. Pilih server (Asia/America/Europe/TW/HK/MO), masukkan UID, pilih nominal crystal, bayar dan crystal langsung masuk.",
    why: "Harga Genesis Crystal di VEXBITS mulai dari Rp16.000. Tersedia juga Blessing of the Welkin Moon dan Battle Pass dengan harga spesial.",
    tips: "UID 9 digit ada di pojok kanan bawah layar dalam game. Pastikan memilih server yang sesuai dengan akun kamu.",
  },
  "magic-chess": {
    howTo: "Top up Magic Chess: Go Go Chess Coin murah di VEXBITS. Masukkan User ID dan Zone ID dari Mobile Legends, pilih nominal Chess Coin, bayar dan langsung masuk.",
    why: "Chess Coin Magic Chess harganya mulai dari Rp3.000 di VEXBITS. Tersedia juga Season Pass dan Bundle Starter dengan harga spesial.",
    tips: "User ID dan Zone ID Magic Chess sama dengan Mobile Legends karena satu publisher (Moonton). Lihat di profil game.",
  },
  "call-of-duty-mobile": {
    howTo: "Top up Call of Duty Mobile CP murah dan cepat di VEXBITS. Masukkan Open ID, pilih nominal CP, bayar via QRIS atau e-wallet, CP langsung masuk ke akun Activision kamu.",
    why: "Harga CP CODM di VEXBITS mulai dari Rp12.000. Tersedia paket 80 CP hingga 5.000 CP, plus Battle Pass dan BP Plus.",
    tips: "Open ID bisa ditemukan di Profil > Setelan > Akun di dalam game CODM. Salin Open ID dan tempel di sini.",
  },
};

function getMetaDescription(slug: string): string {
  const descriptions: Record<string, string> = {
    "mobile-legends": "Top up Mobile Legends: Bang Bang (MLBB) diamond termurah di VEXBITS. Harga mulai Rp1.500, proses otomatis 10 detik, bayar via QRIS, GoPay, OVO, DANA, ShopeePay, VA, atau minimarket.",
    "free-fire": "Top up Free Fire (FF) diamond termurah di VEXBITS. Harga mulai Rp2.000, proses instan, bayar via QRIS, e-wallet, VA bank, atau tunai di Alfamart/Indomaret.",
    "pubg-mobile": "Top up PUBG Mobile UC termurah di VEXBITS. Harga mulai Rp13.000, proses otomatis 10 detik, bayar via QRIS, GoPay, OVO, DANA, ShopeePay, VA, atau minimarket.",
    "genshin-impact": "Top up Genshin Impact Genesis Crystal termurah di VEXBITS. Harga mulai Rp16.000, proses instan, bayar via QRIS, e-wallet, VA bank, atau minimarket.",
    "magic-chess": "Top up Magic Chess: Go Go Chess Coin termurah di VEXBITS. Harga mulai Rp3.000, proses otomatis, bayar via QRIS, e-wallet, VA bank, atau minimarket.",
    "call-of-duty-mobile": "Top up Call of Duty Mobile (CODM) CP termurah di VEXBITS. Harga mulai Rp12.000, proses instan, bayar via QRIS, e-wallet, VA bank, atau minimarket.",
  };
  return descriptions[slug] || "Top up game termurah di VEXBITS. Proses cepat, pembayaran aman.";
}

function getGameTitle(slug: string): string {
  const titles: Record<string, string> = {
    "mobile-legends": "Top Up Mobile Legends: Bang Bang",
    "free-fire": "Top Up Free Fire",
    "pubg-mobile": "Top Up PUBG Mobile",
    "genshin-impact": "Top Up Genshin Impact",
    "magic-chess": "Top Up Magic Chess: Go Go",
    "call-of-duty-mobile": "Top Up Call of Duty Mobile",
  };
  return titles[slug] || "Top Up Game";
}

export default async function GamePageLayout({ game }: { game: GameData }) {
  const allGames = await getGamesFromDB();
  const others = allGames.filter((g) => g.slug !== game.slug);
  const desc = GAME_DESCRIPTIONS[game.slug] || { howTo: "", why: "", tips: "" };
  const lowestPrice = game.nominals.length > 0 ? game.nominals[0].price : "0";

  const productJsonLd = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: `${getGameTitle(game.slug)} - ${game.title}`,
    description: getMetaDescription(game.slug),
    brand: {
      "@type": "Brand",
      name: game.publisher,
    },
    offers: {
      "@type": "AggregateOffer",
      lowPrice: lowestPrice.replace(/\./g, ""),
      highPrice: game.nominals.length > 0 ? game.nominals[game.nominals.length - 1].price.replace(/\./g, "") : "0",
      priceCurrency: "IDR",
      availability: "https://schema.org/InStock",
      url: `${SITE_URL}/game/${game.slug}`,
    },
    url: `${SITE_URL}/game/${game.slug}`,
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
      {
        "@type": "ListItem",
        position: 2,
        name: "Game",
        item: `${SITE_URL}/#games`,
      },
      {
        "@type": "ListItem",
        position: 3,
        name: game.title,
        item: `${SITE_URL}/game/${game.slug}`,
      },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(productJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />

      <GameHeader />

      <main className="pt-5 md:pt-7">
        <div className="wrap">
          <nav className="text-xs text-[var(--ink-soft)] mb-4" aria-label="Breadcrumb">
            <a href="/" className="hover:text-[var(--blue)]">Beranda</a> › <a href="/#games" className="hover:text-[var(--blue)]">Semua Game</a> › <span className="text-[var(--ink)] font-semibold">{game.title}</span>
          </nav>

          {/* hero game */}
          <div className="card overflow-hidden shadow-soft">
            <div className="p-4 md:p-6 flex gap-4 md:gap-6 items-center">
              <div className="w-24 h-24 md:w-32 md:h-32 rounded-2xl overflow-hidden shrink-0" style={{ background: game.imgBg }}>
                <img src={game.img} alt={game.title} className="w-full h-full object-contain" width="128" height="128" />
              </div>
              <div className="min-w-0">
                <h1 className="text-xl md:text-3xl font-extrabold leading-tight">{game.title}</h1>
                <p className="text-sm text-[var(--ink-soft)] mt-1">{game.publisher}</p>
                <div className="mt-3 flex flex-wrap gap-2 text-[11px] font-bold">
                  <span className="px-2.5 py-1 rounded-md bg-[var(--blue-soft)] text-[var(--blue)]">Proses Instan</span>
                  <span className="px-2.5 py-1 rounded-md bg-[#FFF1E6] text-[var(--orange)]">Harga Termurah</span>
                  <span className="px-2.5 py-1 rounded-md bg-[#E6FAF7] text-[var(--teal)]">Aman &amp; Resmi</span>
                </div>
              </div>
            </div>
          </div>

          <GameOrderForm game={game} />

          {/* SEO Content */}
          <div className="mt-8 space-y-6">
            <section className="card p-5 md:p-6">
              <h2 className="text-lg font-extrabold">Cara Top Up {game.title} di VEXBITS</h2>
              <p className="mt-2 text-sm text-[var(--ink-soft)] leading-relaxed">{desc.howTo}</p>
            </section>

            <div className="grid md:grid-cols-2 gap-4">
              <section className="card p-5 md:p-6">
                <h2 className="text-lg font-extrabold">Kenapa Top Up di VEXBITS?</h2>
                <p className="mt-2 text-sm text-[var(--ink-soft)] leading-relaxed">{desc.why}</p>
              </section>
              <section className="card p-5 md:p-6">
                <h2 className="text-lg font-extrabold">Tips Top Up {game.title}</h2>
                <p className="mt-2 text-sm text-[var(--ink-soft)] leading-relaxed">{desc.tips}</p>
              </section>
            </div>
          </div>

          {/* game lain */}
          <section className="mt-8">
            <h2 className="text-xl font-extrabold">Game Lainnya</h2>
            <div className="mt-4 flex gap-3 overflow-x-auto no-scrollbar pb-2">
              {others.map((g) => (
                <a key={g.slug} href={`/game/${g.slug}`} className="card overflow-hidden shrink-0 w-[150px] hover:shadow-soft transition">
                  <div style={{ background: g.imgBg }}><img src={g.img} alt={g.title} className="w-full aspect-square object-contain" loading="lazy" width="150" height="150" /></div>
                  <div className="p-3"><p className="font-bold text-sm leading-tight">{g.title}</p><p className="text-[11px] text-[var(--ink-soft)] mt-0.5">{g.publisher}</p></div>
                </a>
              ))}
            </div>
          </section>
        </div>
      </main>

      <footer className="mt-12 border-t border-[var(--line)] py-8">
        <div className="wrap flex flex-col sm:flex-row gap-3 sm:items-center sm:justify-between">
          <img src="/images/c525e6ef-5042-4cd9-a3e1-f0ac5160b8a3.png" alt="VEXBITS" className="h-14 md:h-16 w-auto max-w-[200px]" />
          <p className="text-xs text-[var(--ink-soft)]">© 2026 VEXBITS · vexbits.net · Nama dan logo game milik pemegang hak masing-masing.</p>
        </div>
      </footer>
    </>
  );
}
