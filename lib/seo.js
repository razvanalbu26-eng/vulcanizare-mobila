import { SITE } from "./config";

export function siteUrl(path = "") {
  const p = path.startsWith("/") ? path : `/${path}`;
  return `https://${SITE.domain}${p}`;
}

export function defaultMetadata({ title, description, path = "/" }) {
  const baseUrl = "https://exemplu.ro"; // schimbă după domeniu

  return {
    metadataBase: new URL(baseUrl),
    title,
    description,
    alternates: { canonical: path },
    openGraph: {
      title,
      description,
      url: path,
      type: "website",
      images: [{ url: "/og.jpg" }],
    },
    robots: {
      index: true,
      follow: true,
    },
  };
}
