import { MetadataRoute } from "next";

const SITE_URL = "https://www.vexbits.net";

const GAMES = [
  "mobile-legends",
  "free-fire",
  "pubg-mobile",
  "genshin-impact",
  "magic-chess",
  "call-of-duty-mobile",
];

export default function sitemap(): MetadataRoute.Sitemap {
  const staticPages = [
    { url: SITE_URL, lastModified: new Date(), changeFrequency: "weekly" as const, priority: 1.0 },
    { url: `${SITE_URL}/cek-transaksi`, lastModified: new Date(), changeFrequency: "monthly" as const, priority: 0.6 },
    { url: `${SITE_URL}/bantuan`, lastModified: new Date(), changeFrequency: "monthly" as const, priority: 0.7 },
    { url: `${SITE_URL}/tentang-kami`, lastModified: new Date(), changeFrequency: "monthly" as const, priority: 0.5 },
  ];

  const gamePages = GAMES.map((slug) => ({
    url: `${SITE_URL}/game/${slug}`,
    lastModified: new Date(),
    changeFrequency: "weekly" as const,
    priority: 0.9,
  }));

  return [...staticPages, ...gamePages];
}
