// src/app/layout.jsx

import "./globals.css";
import { SITE } from "../lib/config.js";
import HeaderClient from "../components/Header/Header.jsx";
import "leaflet/dist/leaflet.css";
import Script from "next/script";

export const metadata = {
  metadataBase: new URL(`https://${SITE.domain}`),
  title: `${SITE.brand} – Vulcanizare mobilă`,
  description:
    "Vulcanizare mobilă 24/7 – intervenție rapidă. Sună sau trimite locația pe WhatsApp.",
  icons: {
    icon: "/app/favicon.ico",
    apple: "/app/favicon.ico",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="ro" suppressHydrationWarning>
      <body>
        <HeaderClient />
        {children}

        {/* Google Ads / Google Tag */}
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=AW-17973794953"
          strategy="afterInteractive"
        />

        <Script id="google-ads" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());

            gtag('config', 'AW-17973794953');
          `}
        </Script>
      </body>
    </html>
  );
}

