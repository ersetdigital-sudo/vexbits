import type { Metadata, Viewport } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "VEXBITS — Top Up Game Cepat, Murah & Aman",
  description:
    "VEXBITS: top up diamond, UC, dan voucher game favoritmu dalam hitungan detik. Harga termurah, pembayaran aman, support 24/7.",
  icons: {
    icon: [
      { url: "/favicon.svg", type: "image/svg+xml" },
      { url: "/favicon-32.png", sizes: "32x32", type: "image/png" },
    ],
  },
};

export const viewport: Viewport = {
  themeColor: "#FF7A1A",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="id" className="antialiased">
      <head>
        <link rel="icon" href="/favicon.svg" type="image/svg+xml" />
        <link rel="icon" href="/favicon-32.png" sizes="32x32" />
      </head>
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
