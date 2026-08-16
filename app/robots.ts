import type { MetadataRoute } from "next";

const BASE = "https://www.puki.com.tr";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      // Yönetim, müşteri portalı, API ve ödeme akışı indekslenmesin
      disallow: ["/admin", "/hesap", "/api", "/odeme"],
    },
    sitemap: `${BASE}/sitemap.xml`,
    host: BASE,
  };
}
