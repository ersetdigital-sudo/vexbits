export default function Footer() {
  return (
    <footer className="pt-12 pb-8">
      <div className="wrap grid gap-8 md:grid-cols-4">
        <div className="md:col-span-2 max-w-sm">
          <img src="/images/c525e6ef-5042-4cd9-a3e1-f0ac5160b8a3.png" alt="VEXBITS" className="h-14 md:h-16 w-auto max-w-[200px]" />
          <p className="mt-3 text-sm text-[var(--ink-soft)]">Top up cepat, harga jujur. VEXBITS melayani top up game dan voucher digital untuk gamer Indonesia, otomatis 24 jam.</p>
          <div className="mt-4 flex gap-2">
            <a href="#" aria-label="Instagram" className="w-9 h-9 rounded-xl border border-[var(--line)] bg-white grid place-items-center hover:border-[var(--blue)]"><svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="3" width="18" height="18" rx="5"></rect><circle cx="12" cy="12" r="4"></circle><circle cx="17.5" cy="6.5" r="1"></circle></svg></a>
            <a href="#" aria-label="TikTok" className="w-9 h-9 rounded-xl border border-[var(--line)] bg-white grid place-items-center hover:border-[var(--blue)]"><svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M15 3v9.5a4 4 0 1 1-3-3.87"></path><path d="M15 6a5 5 0 0 0 5 4"></path></svg></a>
            <a href="#" aria-label="WhatsApp" className="w-9 h-9 rounded-xl border border-[var(--line)] bg-white grid place-items-center hover:border-[var(--blue)]"><svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 12a9 9 0 0 1-13.3 7.9L3 21l1.2-4.5A9 9 0 1 1 21 12z"></path></svg></a>
            <a href="#" aria-label="Discord" className="w-9 h-9 rounded-xl border border-[var(--line)] bg-white grid place-items-center hover:border-[var(--blue)]"><svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M8 6h8l3 6-1 6-3-2H9l-3 2-1-6z"></path><circle cx="9.5" cy="12.5" r=".8"></circle><circle cx="14.5" cy="12.5" r=".8"></circle></svg></a>
          </div>
        </div>

        <div>
          <p className="text-sm font-bold">Navigasi</p>
          <ul className="mt-3 space-y-2 text-sm text-[var(--ink-soft)]">
            <li><a href="#beranda" className="hover:text-[var(--blue)]">Beranda</a></li>
            <li><a href="#games" className="hover:text-[var(--blue)]">Semua Game</a></li>
            <li><a href="#cara-order" className="hover:text-[var(--blue)]">Cara Order</a></li>
            <li><a href="/cek-transaksi" className="hover:text-[var(--blue)]">Cek Transaksi</a></li>
            <li><a href="/tentang-kami" className="hover:text-[var(--blue)]">Tentang Kami</a></li>
          </ul>
        </div>

        <div>
          <p className="text-sm font-bold">Bantuan</p>
          <ul className="mt-3 space-y-2 text-sm text-[var(--ink-soft)]">
            <li><a href="/bantuan" className="hover:text-[var(--blue)]">Pusat Bantuan</a></li>
            <li><a href="#" className="hover:text-[var(--blue)]">Syarat &amp; Ketentuan</a></li>
            <li><a href="#" className="hover:text-[var(--blue)]">Kebijakan Privasi</a></li>
            <li><a href="/bantuan#kontak" className="hover:text-[var(--blue)]">Hubungi CS</a></li>
          </ul>
        </div>
      </div>

      <div className="wrap mt-8">
        <p className="text-xs font-bold text-[var(--ink-soft)] uppercase tracking-wide">Metode pembayaran</p>
        <div className="mt-3 flex flex-wrap gap-2">
          {["QRIS", "GoPay", "OVO", "DANA", "ShopeePay", "BCA", "BRI", "Mandiri", "Alfamart", "Indomaret"].map((m) => (
            <span key={m} className="h-9 px-3 rounded-lg bg-white border border-[var(--line)] grid place-items-center text-xs font-bold text-[var(--ink-soft)]">{m}</span>
          ))}
        </div>
        <div className="mt-6 pt-5 border-t border-[var(--line)] flex flex-col sm:flex-row gap-2 sm:items-center sm:justify-between">
          <p className="text-xs text-[var(--ink-soft)]">© 2026 VEXBITS · vexbits.net. Seluruh hak cipta dilindungi.</p>
          <p className="text-xs text-[var(--ink-soft)]">Nama dan logo game adalah milik pemegang hak masing-masing.</p>
        </div>
      </div>
    </footer>
  );
}
