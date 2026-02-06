// app/sitemap.ts
import type { MetadataRoute } from "next";
import { SITE } from "../lib/config"; // ajustează path dacă e altul

export default function sitemap(): MetadataRoute.Sitemap {
  const base = `https://${SITE.domain}`;
  const now = new Date();

  return [
    { url: `${base}/`, lastModified: now, changeFrequency: "daily", priority: 1 },
    { url: `${base}/termeni`, lastModified: now, changeFrequency: "yearly", priority: 0.2 },
    { url: `${base}/confidentialitate`, lastModified: now, changeFrequency: "yearly", priority: 0.2 },
  ];
}
