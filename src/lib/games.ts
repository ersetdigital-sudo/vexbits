export type Nominal = {
  value: string;
  price: string;
  strike?: string;
};

export type GameData = {
  slug: string;
  title: string;
  publisher: string;
  img: string;
  imgBg: string;
  accountMode: "userzone" | "single" | "select";
  accountLabel: string;
  accountPlaceholder: string;
  zoneLabel?: string;
  zonePlaceholder?: string;
  zoneOptions?: string[];
  accountHint: string;
  nominalTitle: string;
  nominals: Nominal[];
};

export const PAYMENTS = [
  { value: "QRIS", note: "Semua e-wallet & m-banking" },
  { value: "GoPay" },
  { value: "OVO" },
  { value: "DANA" },
  { value: "ShopeePay" },
  { value: "BCA Virtual Account" },
  { value: "BRI Virtual Account" },
  { value: "Mandiri VA" },
  { value: "Alfamart" },
  { value: "Indomaret" },
];

export const GAMES: GameData[] = [
  {
    slug: "mobile-legends",
    title: "Mobile Legends: Bang Bang",
    publisher: "Moonton",
    img: "/images/mobile-legend.png",
    imgBg: "#EEF3FF",
    accountMode: "userzone",
    accountLabel: "User ID",
    accountPlaceholder: "Contoh: 123456789",
    zoneLabel: "Zone ID",
    zonePlaceholder: "Contoh: 2143",
    accountHint: "Buka game > tap avatar di kiri atas. User ID dan Zone ID tertera di bawah nama, contoh: 12345678 (1234).",
    nominalTitle: "Pilih Nominal Diamond",
    nominals: [
      { value: "5 Diamond", price: "1.500", strike: "Rp1.700" },
      { value: "12 Diamond", price: "3.400" },
      { value: "19 Diamond", price: "5.300" },
      { value: "28 Diamond", price: "7.800" },
      { value: "44 Diamond", price: "12.100" },
      { value: "59 Diamond", price: "16.200" },
      { value: "85 Diamond", price: "23.000" },
      { value: "170 Diamond", price: "45.500", strike: "Rp48.000" },
      { value: "240 Diamond", price: "64.000" },
      { value: "296 Diamond", price: "78.500" },
      { value: "568 Diamond", price: "149.000", strike: "Rp155.000" },
      { value: "Twilight Pass", price: "149.000" },
    ],
  },
  {
    slug: "free-fire",
    title: "Free Fire",
    publisher: "Garena",
    img: "/images/free-fire.png",
    imgBg: "#FFF3E9",
    accountMode: "single",
    accountLabel: "Player ID",
    accountPlaceholder: "Contoh: 123456789",
    accountHint: "Buka Free Fire > tap foto profil. Player ID berupa 9-11 digit angka di bawah nickname.",
    nominalTitle: "Pilih Nominal Diamond",
    nominals: [
      { value: "5 Diamond", price: "2.000" },
      { value: "12 Diamond", price: "4.200" },
      { value: "50 Diamond", price: "7.500", strike: "Rp8.000" },
      { value: "70 Diamond", price: "10.000" },
      { value: "140 Diamond", price: "19.500" },
      { value: "355 Diamond", price: "48.000" },
      { value: "720 Diamond", price: "96.000", strike: "Rp99.000" },
      { value: "1.450 Diamond", price: "190.000" },
      { value: "Membership Mingguan", price: "28.000" },
      { value: "Membership Bulanan", price: "89.000" },
    ],
  },
  {
    slug: "pubg-mobile",
    title: "PUBG Mobile",
    publisher: "Level Infinite",
    img: "/images/pubg-mobile.png",
    imgBg: "#EDF1F6",
    accountMode: "single",
    accountLabel: "Character ID",
    accountPlaceholder: "Contoh: 123456789",
    accountHint: "Buka PUBG Mobile > menu Profil. Character ID adalah deretan angka panjang di bawah nickname.",
    nominalTitle: "Pilih Nominal UC",
    nominals: [
      { value: "60 UC", price: "13.000", strike: "Rp67.000" },
      { value: "120 UC", price: "26.000" },
      { value: "180 UC", price: "39.000" },
      { value: "325 UC", price: "64.000" },
      { value: "660 UC", price: "128.000", strike: "Rp335.000" },
      { value: "985 UC", price: "191.000" },
      { value: "1.800 UC", price: "320.000" },
      { value: "3.850 UC", price: "640.000" },
      { value: "Royale Pass", price: "149.000" },
      { value: "Royale Pass Elite", price: "379.000" },
    ],
  },
  {
    slug: "genshin-impact",
    title: "Genshin Impact",
    publisher: "HoYoverse",
    img: "/images/genshin.png",
    imgBg: "#EAF4FF",
    accountMode: "select",
    accountLabel: "UID",
    accountPlaceholder: "Contoh: 123456789",
    zoneLabel: "Server",
    zoneOptions: ["Asia", "America", "Europe", "TW/HK/MO"],
    accountHint: "UID ada di pojok kanan bawah layar dalam game (9 digit). Pastikan server sesuai akunmu.",
    nominalTitle: "Pilih Nominal Genesis Crystal",
    nominals: [
      { value: "60 Genesis Crystal", price: "16.000", strike: "Rp259.000" },
      { value: "300 + 30 Crystal", price: "79.000" },
      { value: "980 + 110 Crystal", price: "249.000" },
      { value: "1.980 + 260 Crystal", price: "499.000" },
      { value: "3.280 + 600 Crystal", price: "799.000" },
      { value: "6.480 + 1.600 Crystal", price: "1.599.000" },
      { value: "Blessing of the Moon", price: "79.000" },
      { value: "Battle Pass Gnostic Hymn", price: "199.000" },
    ],
  },
  {
    slug: "magic-chess",
    title: "Magic Chess: Go Go",
    publisher: "Moonton",
    img: "/images/magic-chess.jpg",
    imgBg: "#E9FAF7",
    accountMode: "userzone",
    accountLabel: "User ID",
    accountPlaceholder: "Contoh: 123456789",
    zoneLabel: "Zone ID",
    zonePlaceholder: "Contoh: 2143",
    accountHint: "Buka Magic Chess: Go Go > tap profil. Format User ID dan Zone ID sama seperti Mobile Legends.",
    nominalTitle: "Pilih Nominal Chess Coin",
    nominals: [
      { value: "10 Chess Coin", price: "3.000", strike: "Rp34.000" },
      { value: "30 Chess Coin", price: "8.500" },
      { value: "60 Chess Coin", price: "16.500" },
      { value: "120 Chess Coin", price: "32.000" },
      { value: "300 Chess Coin", price: "79.000" },
      { value: "600 Chess Coin", price: "155.000" },
      { value: "Season Pass", price: "89.000" },
      { value: "Bundle Starter", price: "49.000" },
    ],
  },
  {
    slug: "call-of-duty-mobile",
    title: "Call of Duty Mobile",
    publisher: "Activision",
    img: "/images/call-of-duty.png",
    imgBg: "#ECEFF5",
    accountMode: "single",
    accountLabel: "Open ID",
    accountPlaceholder: "Contoh: 123456789",
    accountHint: "Buka CODM > Profil > Setelan > Akun. Salin Open ID (deretan angka panjang) lalu tempel di sini.",
    nominalTitle: "Pilih Nominal CP",
    nominals: [
      { value: "80 CP", price: "12.000", strike: "Rp65.000" },
      { value: "160 CP", price: "24.000" },
      { value: "420 CP", price: "62.000" },
      { value: "880 CP", price: "125.000" },
      { value: "2.400 CP", price: "320.000" },
      { value: "5.000 CP", price: "640.000" },
      { value: "Battle Pass", price: "89.000" },
      { value: "BP Plus", price: "199.000" },
    ],
  },
];

export function getGame(slug: string) {
  return GAMES.find((g) => g.slug === slug);
}

export function otherGames(slug: string) {
  return GAMES.filter((g) => g.slug !== slug);
}
