"use client";

import { useState } from "react";

const TABS = [
  { cat: "all", label: "Semua" },
  { cat: "moba", label: "MOBA" },
  { cat: "br", label: "Battle Royale & FPS" },
  { cat: "rpg", label: "RPG & Strategi" },
];

const GAMES = [
  {
    href: "/game/mobile-legends",
    cat: "moba",
    img: "/images/mobile-legend.png",
    alt: "Mobile Legends: Bang Bang",
    bg: "#EEF3FF",
    badge: "Best Seller",
    badgeBg: "var(--orange)",
    title: "Mobile Legends: Bang Bang",
    publisher: "Moonton",
    price: "Mulai Rp1.500",
  },
  {
    href: "/game/free-fire",
    cat: "br",
    img: "/images/free-fire.png",
    alt: "Free Fire",
    bg: "#FFF3E9",
    badge: "Hot",
    badgeBg: "#E11D48",
    title: "Free Fire",
    publisher: "Garena",
    price: "Mulai Rp2.000",
  },
  {
    href: "/game/pubg-mobile",
    cat: "br",
    img: "/images/pubg-mobile.png",
    alt: "PUBG Mobile",
    bg: "#EDF1F6",
    badge: "Populer",
    badgeBg: "var(--orange)",
    title: "PUBG Mobile",
    publisher: "Level Infinite",
    price: "Mulai Rp13.000",
  },
  {
    href: "/game/genshin-impact",
    cat: "rpg",
    img: "/images/genshin.png",
    alt: "Genshin Impact",
    bg: "#EAF4FF",
    badge: "Trending",
    badgeBg: "var(--teal)",
    title: "Genshin Impact",
    publisher: "HoYoverse",
    price: "Mulai Rp16.000",
  },
  {
    href: "/game/magic-chess",
    cat: "rpg",
    img: "/images/magic-chess.jpg",
    alt: "Magic Chess: Go Go",
    bg: "#E9FAF7",
    badge: "Baru",
    badgeBg: "var(--blue)",
    title: "Magic Chess: Go Go",
    publisher: "Moonton",
    price: "Mulai Rp3.000",
  },
  {
    href: "/game/call-of-duty-mobile",
    cat: "br",
    img: "/images/call-of-duty.png",
    alt: "Call of Duty Mobile",
    bg: "#ECEFF5",
    badge: "Hot",
    badgeBg: "#E11D48",
    title: "Call of Duty Mobile",
    publisher: "Activision",
    price: "Mulai Rp12.000",
  },
];

export default function GameGrid() {
  const [cat, setCat] = useState("all");

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
        {GAMES.filter((g) => cat === "all" || g.cat === cat).map((g) => (
          <a key={g.href} href={g.href} className="game-card card overflow-hidden">
            <div className="relative" style={{ background: g.bg }}>
              <img src={g.img} alt={g.alt} className="w-full aspect-square object-contain" loading="lazy" />
              <span className="badge absolute top-2 left-2 px-2 py-1 rounded-md text-white shadow-soft" style={{ background: g.badgeBg }}>{g.badge}</span>
            </div>
            <div className="p-3">
              <p className="font-bold text-sm leading-tight">{g.title}</p>
              <p className="text-[11px] text-[var(--ink-soft)] mt-0.5">{g.publisher}</p>
              <p className="text-xs font-extrabold text-[var(--blue)] mt-2">{g.price}</p>
            </div>
          </a>
        ))}
      </div>
    </>
  );
}
