"use client";

import { useState, useEffect } from "react";

type GameItem = {
  slug: string;
  title: string;
  publisher: string;
  img: string;
  imgBg: string;
  price: string;
};

const TABS = [
  { cat: "all", label: "Semua" },
  { cat: "moba", label: "MOBA" },
  { cat: "br", label: "Battle Royale & FPS" },
  { cat: "rpg", label: "RPG & Strategi" },
];

const CAT_MAP: Record<string, string> = {
  "mobile-legends": "moba",
  "magic-chess": "moba",
  "free-fire": "br",
  "pubg-mobile": "br",
  "call-of-duty-mobile": "br",
  "genshin-impact": "rpg",
};

const BADGE_MAP: Record<string, { badge: string; badgeBg: string }> = {
  "mobile-legends": { badge: "Best Seller", badgeBg: "var(--orange)" },
  "free-fire": { badge: "Hot", badgeBg: "#E11D48" },
  "pubg-mobile": { badge: "Populer", badgeBg: "var(--orange)" },
  "genshin-impact": { badge: "Trending", badgeBg: "var(--teal)" },
  "magic-chess": { badge: "Baru", badgeBg: "var(--blue)" },
  "call-of-duty-mobile": { badge: "Hot", badgeBg: "#E11D48" },
};

export default function GameGrid() {
  const [cat, setCat] = useState("all");
  const [games, setGames] = useState<GameItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/products")
      .then((r) => r.json())
      .then((data: Array<{ slug: string; title: string; publisher: string; img: string; img_bg: string; product_nominals: Array<{ price: string }> }>) => {
        const mapped: GameItem[] = data.map((p) => {
          const lowestPrice = p.product_nominals?.length
            ? Math.min(...p.product_nominals.map((n) => parseInt(n.price.replace(/\./g, "")) || 0))
            : 0;
          return {
            slug: p.slug,
            title: p.title,
            publisher: p.publisher,
            img: p.img,
            imgBg: p.img_bg,
            price: lowestPrice > 0 ? `Mulai Rp${lowestPrice.toLocaleString("id-ID")}` : "Hubungi CS",
          };
        });
        setGames(mapped);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  if (loading) {
    return (
      <div className="mt-5 grid grid-cols-2 sm:grid-cols-3 gap-3 md:gap-4">
        {[1, 2, 3, 4, 5, 6].map((i) => (
          <div key={i} className="card overflow-hidden animate-pulse">
            <div className="w-full aspect-square bg-gray-200" />
            <div className="p-3 space-y-2">
              <div className="h-4 bg-gray-200 rounded w-3/4" />
              <div className="h-3 bg-gray-200 rounded w-1/2" />
            </div>
          </div>
        ))}
      </div>
    );
  }

  return (
    <>
      <div className="mt-5 flex gap-2 overflow-x-auto no-scrollbar pb-1" id="tabs">
        {TABS.map((t) => (
          <button
            key={t.cat}
            onClick={() => setCat(t.cat)}
            className={`tab h-9 px-4 rounded-full text-sm font-bold shrink-0 border ${cat === t.cat ? "border-transparent bg-[var(--blue)] text-white" : "border-[var(--line)] bg-white text-[var(--ink-soft)]"}`}
          >
            {t.label}
          </button>
        ))}
      </div>

      <div className="mt-5 grid grid-cols-2 sm:grid-cols-3 gap-3 md:gap-4" id="grid">
        {games
          .filter((g) => cat === "all" || CAT_MAP[g.slug] === cat)
          .map((g) => {
            const badgeInfo = BADGE_MAP[g.slug] ?? { badge: "New", badgeBg: "var(--blue)" };
            return (
              <a key={g.slug} href={`/game/${g.slug}`} className="game-card card overflow-hidden">
                <div className="relative" style={{ background: g.imgBg }}>
                  <img src={g.img} alt={g.title} className="w-full aspect-square object-contain" loading="lazy" />
                  <span className="badge absolute top-2 left-2 px-2 py-1 rounded-md text-white shadow-soft" style={{ background: badgeInfo.badgeBg }}>{badgeInfo.badge}</span>
                </div>
                <div className="p-3">
                  <p className="font-bold text-sm leading-tight">{g.title}</p>
                  <p className="text-[11px] text-[var(--ink-soft)] mt-0.5">{g.publisher}</p>
                  <p className="text-xs font-extrabold text-[var(--blue)] mt-2">{g.price}</p>
                </div>
              </a>
            );
          })}
      </div>
    </>
  );
}
