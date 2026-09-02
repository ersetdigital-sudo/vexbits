import GameHeader from "@/components/GameHeader";
import GameOrderForm from "@/components/GameOrderForm";
import { otherGames, type GameData } from "@/lib/games";

export default function GamePageLayout({ game }: { game: GameData }) {
  const others = otherGames(game.slug);

  return (
    <>
      <GameHeader />

      <main className="pt-5 md:pt-7">
        <div className="wrap">
          <nav className="text-xs text-[var(--ink-soft)] mb-4"><a href="/" className="hover:text-[var(--blue)]">Beranda</a> › <a href="/#games" className="hover:text-[var(--blue)]">Semua Game</a> › <span className="text-[var(--ink)] font-semibold">{game.title}</span></nav>

          {/* hero game */}
          <div className="card overflow-hidden shadow-soft">
            <div className="p-4 md:p-6 flex gap-4 md:gap-6 items-center">
              <div className="w-24 h-24 md:w-32 md:h-32 rounded-2xl overflow-hidden shrink-0" style={{ background: game.imgBg }}>
                <img src={game.img} alt={game.title} className="w-full h-full object-contain" />
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

          {/* game lain */}
          <section className="mt-8">
            <h2 className="text-xl font-extrabold">Game Lainnya</h2>
            <div className="mt-4 flex gap-3 overflow-x-auto no-scrollbar pb-2">
              {others.map((g) => (
                <a key={g.slug} href={`/game/${g.slug}`} className="card overflow-hidden shrink-0 w-[150px] hover:shadow-soft transition">
                  <div style={{ background: g.imgBg }}><img src={g.img} alt={g.title} className="w-full aspect-square object-contain" loading="lazy" /></div>
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
