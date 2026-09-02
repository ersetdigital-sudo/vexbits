"use client";

import { useState } from "react";

const FAQ_ITEMS = [
  { q: "Berapa lama item masuk setelah saya bayar?", a: "Rata-rata 10 detik setelah pembayaran terkonfirmasi. Untuk metode transfer bank atau minimarket, konfirmasi bisa memakan waktu 1-10 menit tergantung bank/gerai. Selama status masih \"Diproses\", pesananmu aman dan sedang dalam antrean pengiriman." },
  { q: "Apakah harus daftar akun dulu untuk top up?", a: "Tidak. Kamu bisa langsung pilih game, isi ID, dan bayar tanpa registrasi. Membuat akun hanya bermanfaat kalau kamu ingin menyimpan ID game, melihat riwayat lengkap, dan mengumpulkan poin cashback." },
  { q: "Di mana saya bisa melihat User ID dan Zone ID?", a: "Berbeda tiap game:\n- Mobile Legends / Magic Chess: tap avatar di kiri atas, User ID dan Zone ID ada di bawah nickname, format 12345678 (1234).\n- Free Fire: tap foto profil, Player ID berupa 9-11 digit angka.\n- PUBG Mobile: menu Profil, Character ID di bawah nickname.\n- Genshin Impact: UID 9 digit di pojok kanan bawah layar, pilih server yang sesuai.\n- Call of Duty Mobile: Profil > Setelan > Akun > Open ID." },
  { q: "Saya salah memasukkan User ID, bagaimana?", a: "Segera hubungi CS dengan menyertakan nomor invoice. Jika item belum terkirim, kami bisa membatalkan dan mengembalikan dana. Jika item sudah terkirim ke ID yang salah, transaksi tidak dapat ditarik kembali karena pengiriman bersifat final di sisi publisher, jadi pastikan ID benar sebelum membayar." },
  { q: "Diamond/UC belum masuk padahal sudah bayar. Apa yang harus saya lakukan?", a: "Langkah cepat: (1) restart game kamu, item sering baru tampil setelah relogin; (2) cek statusnya di halaman Cek Transaksi; (3) kalau status masih \"Diproses\" lebih dari 15 menit, chat CS dengan nomor invoice dan bukti bayar. Kami selesaikan maksimal 1x24 jam." },
  { q: "Metode pembayaran apa saja yang didukung?", a: "QRIS (bisa dibayar dari semua e-wallet dan m-banking), GoPay, OVO, DANA, ShopeePay, Virtual Account BCA/BRI/Mandiri, serta pembayaran tunai di Alfamart dan Indomaret." },
  { q: "Apakah ada biaya admin tambahan?", a: "Harga yang tampil di halaman produk sudah final. Beberapa metode pembayaran pihak ketiga (VA bank tertentu dan minimarket) mengenakan biaya layanan yang akan ditampilkan transparan sebelum kamu membayar, jadi tidak ada biaya tersembunyi." },
  { q: "Bagaimana cara pakai kode promo?", a: "Masukkan kode di kolom \"Kode Promo\" pada langkah 4 di halaman top up sebelum menekan Bayar Sekarang. Satu transaksi hanya bisa memakai satu kode, dan kode tidak bisa ditambahkan setelah pesanan dibuat." },
  { q: "Apakah akun game saya aman?", a: "Aman. Kami hanya meminta ID publik (User ID/Zone ID/UID) yang memang dipakai untuk pengiriman item. VEXBITS tidak pernah meminta password, kode OTP, email login, atau akses ke akunmu. Abaikan siapa pun yang mengaku CS VEXBITS lalu meminta data tersebut." },
  { q: "Apakah top up di VEXBITS legal dan resmi?", a: "Ya. Semua produk dibeli melalui jalur distributor resmi, sehingga item dikirim langsung ke akun game tanpa perlu login. Tidak ada risiko banned seperti pada metode joki atau share akun." },
  { q: "Berapa batas minimum dan maksimum transaksi?", a: "Minimum mengikuti nominal terkecil tiap game (mulai Rp1.500). Maksimum Rp10.000.000 per hari per nomor WhatsApp. Butuh limit lebih besar untuk kebutuhan reseller? Hubungi CS untuk akun khusus." },
  { q: "Bisakah saya top up untuk akun teman?", a: "Bisa. Cukup masukkan ID akun tujuan, tidak harus akunmu sendiri. Pastikan ID yang kamu masukkan benar karena pengiriman tidak bisa dibatalkan setelah berhasil." },
  { q: "Bagaimana kalau pembayaran saya terpotong tapi status masih \"Menunggu Pembayaran\"?", a: "Tunggu 5-10 menit, sebagian gateway butuh waktu untuk mengirim notifikasi. Jika masih belum berubah, kirim bukti transfer beserta nomor invoice ke CS. Dana yang terpotong tanpa pesanan berhasil akan dikembalikan 100%." },
  { q: "Apakah bisa jadi reseller VEXBITS?", a: "Bisa. Kami menyediakan harga khusus dan limit transaksi lebih tinggi untuk reseller aktif. Hubungi CS dengan subjek \"Reseller\" untuk info paket dan syaratnya." },
];

export default function FaqSearch() {
  const [q, setQ] = useState("");
  const lq = q.toLowerCase().trim();
  const hits = lq ? FAQ_ITEMS.filter((f) => f.q.toLowerCase().includes(lq) || f.a.toLowerCase().includes(lq)) : FAQ_ITEMS;
  const listRef = FAQ_ITEMS;

  return (
    <>
      <label className="relative block mt-4">
        <svg className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[var(--ink-soft)]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="11" cy="11" r="7"></circle><path d="m20 20-3.2-3.2"></path></svg>
        <input className="field pl-9" placeholder="Cari pertanyaan, misal: diamond belum masuk" value={q} onChange={(e) => setQ(e.target.value)} />
      </label>
      <p className={`mt-4 text-sm text-[var(--ink-soft)] ${hits.length > 0 ? "hidden" : ""}`}>Tidak ada pertanyaan yang cocok. Coba kata kunci lain atau langsung chat CS di bawah.</p>
      <div className="mt-2">
        {listRef.map((f, i) => {
          const match = !lq || f.q.toLowerCase().includes(lq) || f.a.toLowerCase().includes(lq);
          if (!match) return null;
          return (
            <details key={i} className="faq" open={!!lq}>
              <summary>{f.q}<span className="chev">▾</span></summary>
              <div className="ans">
                {f.a.includes("\n") ? (
                  <ul>
                    {f.a.split("\n").map((line, j) => <li key={j}>{line.replace(/^- /, "")}</li>)}
                  </ul>
                ) : f.a}
              </div>
            </details>
          );
        })}
      </div>
    </>
  );
}
