import type { Metadata, Viewport } from "next";
import "./globals.css";

const SITE_URL = "https://www.vexbits.net";

export const metadata: Metadata = {
  title: {
    default: "VEXBITS — Top Up Game Cepat, Murah & Aman",
    template: "%s | VEXBITS",
  },
  description:
    "VEXBITS: top up diamond, UC, dan voucher game favoritmu dalam hitungan detik. Harga termurah, pembayaran aman via QRIS & e-wallet, support 24/7.",
  keywords: ["top up game", "beli diamond", "top up mobile legends", "top up free fire", "top up pubg", "top up genshin impact", "vexbits", "top up murah", "top up cepat"],
  authors: [{ name: "VEXBITS" }],
  creator: "VEXBITS",
  publisher: "VEXBITS",
  metadataBase: new URL(SITE_URL),
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    locale: "id_ID",
    url: SITE_URL,
    siteName: "VEXBITS",
    title: "VEXBITS — Top Up Game Cepat, Murah & Aman",
    description: "Top up diamond, UC, dan voucher game favoritmu dalam hitungan detik. Harga termurah, pembayaran aman, support 24/7.",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "VEXBITS - Top Up Game Cepat, Murah & Aman",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "VEXBITS — Top Up Game Cepat, Murah & Aman",
    description: "Top up diamond, UC, dan voucher game favoritmu dalam hitungan detik. Harga termurah, pembayaran aman, support 24/7.",
    images: ["/og-image.png"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
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
  const organizationJsonLd = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "VEXBITS",
    url: SITE_URL,
    logo: `${SITE_URL}/images/c525e6ef-5042-4cd9-a3e1-f0ac5160b8a3.png`,
    description: "Platform top up game terpercaya di Indonesia. Proses cepat, harga termurah, pembayaran aman.",
    sameAs: [],
    contactPoint: {
      "@type": "ContactPoint",
      telephone: "+62-812-3456-7890",
      contactType: "customer service",
      availableLanguage: "Indonesian",
    },
  };

  const websiteJsonLd = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "VEXBITS",
    url: SITE_URL,
    potentialAction: {
      "@type": "SearchAction",
      target: {
        "@type": "EntryPoint",
        urlTemplate: `${SITE_URL}/?q={search_term_string}`,
      },
      "query-input": "required name=search_term_string",
    },
  };

  return (
    <html lang="id" className="antialiased">
      <head>
        <link rel="icon" href="/favicon.svg" type="image/svg+xml" />
        <link rel="icon" href="/favicon-32.png" sizes="32x32" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationJsonLd) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteJsonLd) }}
        />
      </head>
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
