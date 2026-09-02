export default function GameHeader() {
  return (
    <header className="sticky top-0 z-50 bg-white/95 backdrop-blur border-b border-[var(--line)]">
      <div className="wrap flex items-center gap-4 h-20 md:h-24">
        <a href="/" className="shrink-0"><img src="/images/c525e6ef-5042-4cd9-a3e1-f0ac5160b8a3.png" alt="VEXBITS" className="h-16 md:h-20 w-auto max-w-[240px]" /></a>
        <nav className="hidden md:flex items-center gap-1 ml-4 text-sm font-semibold text-[var(--ink-soft)]">
          <a href="/" className="px-3 py-2 rounded-lg hover:text-[var(--blue)] hover:bg-[var(--blue-soft)]">Beranda</a>
          <a href="/#games" className="px-3 py-2 rounded-lg hover:text-[var(--blue)] hover:bg-[var(--blue-soft)]">Semua Game</a>
          <a href="/#cara-order" className="px-3 py-2 rounded-lg hover:text-[var(--blue)] hover:bg-[var(--blue-soft)]">Cara Order</a>
          <a href="/cek-transaksi" className="px-3 py-2 rounded-lg hover:text-[var(--blue)] hover:bg-[var(--blue-soft)]">Cek Transaksi</a>
          <a href="/bantuan" className="px-3 py-2 rounded-lg hover:text-[var(--blue)] hover:bg-[var(--blue-soft)]">Bantuan</a>
        </nav>
        <a href="/cek-transaksi" className="ml-auto inline-flex h-10 items-center px-4 rounded-xl text-sm font-bold text-white bg-[var(--orange)] hover:bg-[#F06C09] shadow-soft">Cek Transaksi</a>
      </div>
    </header>
  );
}
