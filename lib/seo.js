import { SITE } from "./config";

export function siteUrl(path = "") {
  const p = path.startsWith("/") ? path : `/${path}`;
  return `https://${SITE.domain}${p}`;
}

export function defaultMetadata({ title, description, path = "/" }) {
  const baseUrl = `https://${SITE.domain}`;

  return {
    metadataBase: new URL(baseUrl),
    title,
    description,

    // canonical corect (relativ la metadataBase)
    alternates: { canonical: path },

    openGraph: {
      title,
      description,
      // url ABSOLUT (recomandat)
      url: new URL(path, baseUrl).toString(),
      type: "website",
      // imagine ABSOLUTĂ (recomandat)
      images: [{ url: new URL("/og.jpg", baseUrl).toString() }],
    },

    robots: {
      index: true,
      follow: true,
    },
  };
}
