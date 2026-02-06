import type { MetadataRoute } from "next";
import { SITE } from "../lib/config";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = `https://${SITE.domain}`;
  const now = new Date();

  return [
    // Homepage
    {
      url: `${base}/`,
      lastModified: now,
      changeFrequency: "daily",
      priority: 1,
    },

    // Pagini SEO principale
    {
      url: `${base}/vulcanizare-mobila-buzau`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      url: `${base}/vulcanizare-mobila-a7`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      url: `${base}/vulcanizare-camioane`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.9,
    },

    // Pagini legale
    {
      url: `${base}/termeni`,
      lastModified: now,
      changeFrequency: "yearly",
      priority: 0.2,
    },
    {
      url: `${base}/confidentialitate`,
      lastModified: now,
      changeFrequency: "yearly",
      priority: 0.2,
    },
  ];
}
