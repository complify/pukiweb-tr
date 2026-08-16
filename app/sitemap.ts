import type { MetadataRoute } from "next";
import { allModuleCodes } from "@/lib/module-content";

const BASE = "https://www.puki.com.tr";
const LAST = new Date("2026-08-16");

export default function sitemap(): MetadataRoute.Sitemap {
  const main: MetadataRoute.Sitemap = [
    { url: `${BASE}/`, lastModified: LAST, changeFrequency: "weekly", priority: 1 },
    { url: `${BASE}/fiyatlandirma`, lastModified: LAST, changeFrequency: "weekly", priority: 0.9 },
    { url: `${BASE}/demo`, lastModified: LAST, changeFrequency: "monthly", priority: 0.8 },
    { url: `${BASE}/iletisim`, lastModified: LAST, changeFrequency: "monthly", priority: 0.6 },
  ];

  const modules: MetadataRoute.Sitemap = allModuleCodes().map((code) => ({
    url: `${BASE}/moduller/${code}`,
    lastModified: LAST,
    changeFrequency: "monthly",
    priority: 0.8,
  }));

  const legal: MetadataRoute.Sitemap = [
    "aydinlatma-metni",
    "gizlilik",
    "cerez-politikasi",
    "kullanim-kosullari",
    "mesafeli-satis",
    "on-bilgilendirme",
  ].map((slug) => ({
    url: `${BASE}/${slug}`,
    lastModified: LAST,
    changeFrequency: "yearly",
    priority: 0.3,
  }));

  return [...main, ...modules, ...legal];
}
