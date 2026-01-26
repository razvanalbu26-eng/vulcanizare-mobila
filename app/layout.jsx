// src/app/layout.jsx
import "./globals.css";
import { SITE } from "../lib/config.js";
import HeaderClient from "../components/Header/Header.jsx";
import "leaflet/dist/leaflet.css";

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
      </body>
    </html>
  );
}
