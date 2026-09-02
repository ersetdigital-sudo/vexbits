"use client";

import { useState } from "react";

export default function Header() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 bg-white/95 backdrop-blur border-b border-[var(--line)]">
      <div className="wrap flex items-center gap-4 h-20 md:h-24">
        <a href="/" className="shrink-0 flex items-center">
          <img src="/images/c525e6ef-5042-4cd9-a3e1-f0ac5160b8a3.png" alt="VEXBITS" className="h-16 md:h-20 w-auto max-w-[240px]" />
        </a>

        <nav className="hidden lg:flex items-center gap-1 ml-4 text-sm font-semibold text-[var(--ink-soft)]">
          <a href="#beranda" className="px-3 py-2 rounded-lg hover:text-[var(--blue)] hover:bg-[var(--blue-soft)]">Beranda</a>
          <a href="#games" className="px-3 py-2 rounded-lg hover:text-[var(--blue)] hover:bg-[var(--blue-soft)]">Semua Game</a>
          <a href="#cara-order" className="px-3 py-2 rounded-lg hover:text-[var(--blue)] hover:bg-[var(--blue-soft)]">Cara Order</a>
          <a href="/cek-transaksi" className="px-3 py-2 rounded-lg hover:text-[var(--blue)] hover:bg-[var(--blue-soft)]">Cek Transaksi</a>
        </nav>

        <form className="hidden md:flex flex-1 max-w-sm ml-auto" onSubmit={(e) => e.preventDefault()}>
          <label className="relative w-full">
            <svg className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[var(--ink-soft)]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="11" cy="11" r="7"></circle><path d="m20 20-3.2-3.2"></path></svg>
            <input type="search" placeholder="Cari game favoritmu..." className="w-full h-10 pl-9 pr-3 rounded-xl bg-[var(--bg)] border border-[var(--line)] text-sm outline-none focus:border-[var(--blue)] focus:bg-white" />
          </label>
        </form>

        <div className="flex items-center gap-2 ml-auto md:ml-0">
          <a href="/cek-transaksi" className="inline-flex h-10 items-center px-4 rounded-xl text-sm font-bold text-white bg-[var(--orange)] hover:bg-[#F06C09] shadow-soft">Cek Transaksi</a>
          <button aria-label="Menu" onClick={() => setOpen(!open)} className="lg:hidden w-10 h-10 grid place-items-center rounded-xl border border-[var(--line)]">
            <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M4 7h16M4 12h16M4 17h16"></path></svg>
          </button>
        </div>
      </div>

      <div id="mobileNav" className={`${open ? "" : "hidden"} lg:hidden border-t border-[var(--line)] bg-white`}>
        <div className="wrap py-3 space-y-1 text-sm font-semibold">
          <a href="#beranda" className="block px-3 py-2 rounded-lg hover:bg-[var(--blue-soft)]">Beranda</a>
          <a href="#games" className="block px-3 py-2 rounded-lg hover:bg-[var(--blue-soft)]">Semua Game</a>
          <a href="#cara-order" className="block px-3 py-2 rounded-lg hover:bg-[var(--blue-soft)]">Cara Order</a>
          <a href="/cek-transaksi" className="block px-3 py-2 rounded-lg hover:bg-[var(--blue-soft)]">Cek Transaksi</a>
          <label className="relative block pt-2">
            <input type="search" placeholder="Cari game..." className="w-full h-10 px-3 rounded-xl bg-[var(--bg)] border border-[var(--line)] text-sm outline-none focus:border-[var(--blue)]" />
          </label>
        </div>
      </div>
    </header>
  );
}
