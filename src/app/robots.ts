export default function robots() {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/admin", "/api/", "/cek-transaksi*"],
      },
      {
        userAgent: ["GPTBot", "ClaudeBot", "PerplexityBot", "Google-Extended"],
        allow: "/",
        disallow: ["/admin", "/api/", "/cek-transaksi*"],
      },
    ],
    sitemap: "https://www.vexbits.net/sitemap.xml",
  };
}
