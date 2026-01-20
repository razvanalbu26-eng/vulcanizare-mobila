"use client";

import { useEffect, useMemo, useState } from "react";
import styles from "./Header.module.css";
import { SITE } from "../../lib/config.js";
import BurgerMenu from "../BurgerMenu/BurgerMenu.jsx";

function buildWhatsAppText({ lat, lng } = {}) {
  const parts = [
    "Bună! Am nevoie de vulcanizare mobilă.",
    "Problemă: (scriu aici detalii)",
  ];

  if (lat != null && lng != null) {
    parts.push(`Locație: https://maps.google.com/?q=${lat},${lng}`);
  } else {
    parts.push("Locație: (nu am GPS activ) – reper/km și sensul de mers.");
  }

  return parts.join("\n");
}

function openWhatsApp({ waPhone, lat, lng } = {}) {
  if (!waPhone) return;
  const text = buildWhatsAppText({ lat, lng });
  const url = `https://wa.me/${waPhone}?text=${encodeURIComponent(text)}`;
  window.open(url, "_blank", "noopener,noreferrer");
}

export default function HeaderClient() {
  const [gpsLoading, setGpsLoading] = useState(false);
  const [theme, setTheme] = useState("dark");
  const [menuOpen, setMenuOpen] = useState(false);

  const waPhone = useMemo(() => {
    return String(SITE?.whatsappPhone ?? "").replace(/[^\d]/g, "");
  }, []);

  /* ================= THEME ================= */
  useEffect(() => {
    const saved = localStorage.getItem("theme");
    if (saved === "dark" || saved === "light") {
      setTheme(saved);
      document.documentElement.setAttribute("data-theme", saved);
      return;
    }

    const prefersLight =
      window.matchMedia?.("(prefers-color-scheme: light)")?.matches;
    const initial = prefersLight ? "light" : "dark";
    setTheme(initial);
    document.documentElement.setAttribute("data-theme", initial);
  }, []);

  const toggleTheme = () => {
    const next = theme === "dark" ? "light" : "dark";
    setTheme(next);
    document.documentElement.setAttribute("data-theme", next);
    localStorage.setItem("theme", next);
  };

  /* ================= ACTIONS ================= */
  const onWhatsAppChat = () => {
    if (!waPhone) {
      window.location.href = `tel:${SITE?.phone ?? ""}`;
      return;
    }
    openWhatsApp({ waPhone });
  };

  const onWhatsAppWithLocation = () => {
    if (!waPhone) {
      window.location.href = `tel:${SITE?.phone ?? ""}`;
      return;
    }

    if (!navigator.geolocation) {
      openWhatsApp({ waPhone });
      return;
    }

    if (gpsLoading) return;
    setGpsLoading(true);

    navigator.geolocation.getCurrentPosition(
      (pos) => {
        setGpsLoading(false);
        const { latitude, longitude } = pos.coords;
        openWhatsApp({ waPhone, lat: latitude, lng: longitude });
      },
      () => {
        setGpsLoading(false);
        openWhatsApp({ waPhone });
      },
      { enableHighAccuracy: true, timeout: 8000, maximumAge: 30000 }
    );
  };

  const onMenu = () => setMenuOpen((v) => !v);

  return (
    <header className={styles.header}>
      <div className={styles.inner}>
        {/* LEFT */}
        <div className={styles.brand}>
          <div className={styles.logo}>●</div>
          <div>
            <div className={styles.brandName}>{SITE.brand}</div>
            <div className={styles.brandSub}>{SITE.serviceAreaLabel}</div>
          </div>
        </div>

        {/* RIGHT */}
        <div className={styles.right}>
          <a
            className={styles.iconBtn}
            href={`tel:${SITE.phone}`}
            aria-label="Apelează"
            title="Apelează"
          >
            📞
          </a>

          <button
            type="button"
            className={styles.iconBtn}
            onClick={onWhatsAppWithLocation}
            aria-label="Trimite locația pe WhatsApp"
            title={gpsLoading ? "Se ia locația…" : "WhatsApp cu locație"}
            disabled={gpsLoading}
          >
            📍
          </button>

          <button
            type="button"
            className={styles.iconBtn}
            onClick={onWhatsAppChat}
            aria-label="Deschide WhatsApp"
            title="WhatsApp"
          >
            💬
          </button>

          <button
            type="button"
            className={styles.iconBtn}
            onClick={toggleTheme}
            aria-label="Schimbă tema"
            title="Schimbă tema"
          >
            {theme === "dark" ? "☀️" : "🌙"}
          </button>

          {/* BUTONUL ☰ */}
          <button
            type="button"
            className={styles.menuBtn}
            onClick={onMenu}
            aria-label="Meniu"
            title="Meniu"
          >
            ☰
          </button>

          {/* Panel-ul meniului (fără trigger-ul intern) */}
          <BurgerMenu open={menuOpen} onOpenChange={setMenuOpen} trigger="none" />
        </div>
      </div>
    </header>
  );
}
