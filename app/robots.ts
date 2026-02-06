// app/robots.ts
import type { MetadataRoute } from "next";
import { SITE } from "../lib/config"; // ajustează path dacă e altul

export default function robots(): MetadataRoute.Robots {
  const base = `https://${SITE.domain}`;
  return {
    rules: {
      userAgent: "*",
      allow: "/",
    },
    sitemap: `${base}/sitemap.xml`,
  };
}
