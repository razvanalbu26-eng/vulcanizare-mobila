"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import styles from "./Header.module.css";
import { SITE } from "../../lib/config.js";
import BurgerMenu from "../BurgerMenu/BurgerMenu.jsx";

/* ================= GOOGLE ADS ================= */

function trackPhoneConversion() {
  if (typeof window === "undefined") return;
  if (typeof window.gtag !== "function") return;

  window.gtag("event", "conversion", {
    send_to: "AW-17973794953/GI0gCK3tkMAcEImxyfpC",
    value: 1.0,
    currency: "RON",
  });
}

/* ================= WHATSAPP HELPERS ================= */

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

function openWhatsAppDirect({ waPhone, lat, lng } = {}) {
  if (!waPhone) return;

  const text = buildWhatsAppText({ lat, lng });

  const appUrl = `whatsapp://send?phone=${waPhone}&text=${encodeURIComponent(
    text
  )}`;
  const webUrl = `https://wa.me/${waPhone}?text=${encodeURIComponent(text)}`;

  const ua = typeof navigator !== "undefined" ? navigator.userAgent : "";
  const isMobile = /Android|iPhone|iPad|iPod/i.test(ua);

  if (!isMobile) {
    window.location.href = webUrl;
    return;
  }

  window.location.href = appUrl;

  const t = setTimeout(() => {
    window.location.href = webUrl;
  }, 900);

  const onVis = () => {
    if (document.visibilityState === "hidden") {
      clearTimeout(t);
      document.removeEventListener("visibilitychange", onVis);
    }
  };

  document.addEventListener("visibilitychange", onVis);
}

/* ================= COMPONENT ================= */

export default function HeaderClient() {
  const [gpsLoading, setGpsLoading] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [phoneMenuOpen, setPhoneMenuOpen] = useState(false);
  const phoneWrapRef = useRef(null);

  const waPhone = useMemo(() => {
    const raw = SITE?.whatsappPhone ?? "";
    return String(raw).replace(/[^\d]/g, "");
  }, []);

  /* ================= THEME ================= */

  const getInitialTheme = () => {
    if (typeof window === "undefined") return "dark";

    const saved = localStorage.getItem("theme");
    if (saved === "dark" || saved === "light") return saved;

    const prefersLight =
      window.matchMedia?.("(prefers-color-scheme: light)")?.matches;

    return prefersLight ? "light" : "dark";
  };

  const [theme, setTheme] = useState(getInitialTheme);

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
    localStorage.setItem("theme", theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme((t) => (t === "dark" ? "light" : "dark"));
  };

  /* ================= CLICK OUTSIDE PHONE MENU ================= */

  useEffect(() => {
    const onDocDown = (e) => {
      if (!phoneMenuOpen) return;

      const wrap = phoneWrapRef.current;
      if (wrap && !wrap.contains(e.target)) {
        setPhoneMenuOpen(false);
      }
    };

    document.addEventListener("mousedown", onDocDown);
    document.addEventListener("touchstart", onDocDown);

    return () => {
      document.removeEventListener("mousedown", onDocDown);
      document.removeEventListener("touchstart", onDocDown);
    };
  }, [phoneMenuOpen]);

  /* ================= ACTIONS ================= */

  const onPhoneClick = () => {
    trackPhoneConversion();
    setPhoneMenuOpen(false);
  };

  const onWhatsAppChat = () => {
    if (!waPhone) {
      trackPhoneConversion();
      window.location.href = `tel:${SITE?.phone2 ?? SITE?.phone1 ?? ""}`;
      return;
    }

    openWhatsAppDirect({ waPhone });
  };

  const onWhatsAppWithLocation = () => {
    if (!waPhone) {
      trackPhoneConversion();
      window.location.href = `tel:${SITE?.phone2 ?? SITE?.phone1 ?? ""}`;
      return;
    }

    const ok = window.confirm("Vrei să trimiți locația ta pe WhatsApp?");

    if (!ok) {
      openWhatsAppDirect({ waPhone });
      return;
    }

    if (!navigator.geolocation) {
      openWhatsAppDirect({ waPhone });
      return;
    }

    if (gpsLoading) return;

    setGpsLoading(true);

    navigator.geolocation.getCurrentPosition(
      (pos) => {
        setGpsLoading(false);

        const { latitude, longitude } = pos.coords;

        openWhatsAppDirect({
          waPhone,
          lat: latitude,
          lng: longitude,
        });
      },
      () => {
        setGpsLoading(false);
        openWhatsAppDirect({ waPhone });
      },
      {
        enableHighAccuracy: true,
        timeout: 8000,
        maximumAge: 30000,
      }
    );
  };

  const onMenu = () => setMenuOpen((v) => !v);

  /* ================= RENDER ================= */

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
          {/* 📞 Telefon */}
          <div
            ref={phoneWrapRef}
            style={{ position: "relative", display: "inline-block" }}
          >
            <button
              type="button"
              className={styles.iconBtn}
              onClick={() => setPhoneMenuOpen((v) => !v)}
              aria-label="Apelează"
              title="Apelează"
              aria-expanded={phoneMenuOpen}
              aria-haspopup="menu"
            >
              📞
            </button>

            {phoneMenuOpen && (
              <div
                role="menu"
                aria-label="Alege numărul de telefon"
                className={styles.phoneMenu}
              >
                <a
                  role="menuitem"
                  href={`tel:${SITE.phone1}`}
                  onClick={onPhoneClick}
                  className={styles.phoneItem}
                >
                  📞 {SITE.phone1}
                </a>

                <a
                  role="menuitem"
                  href={`tel:${SITE.phone2}`}
                  onClick={onPhoneClick}
                  className={styles.phoneItem}
                >
                  📞 {SITE.phone2}
                </a>
              </div>
            )}
          </div>

          {/* 📍 WhatsApp cu locație */}
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

          {/* 💬 WhatsApp */}
          <button
            type="button"
            className={styles.iconBtn}
            onClick={onWhatsAppChat}
            aria-label="Deschide WhatsApp"
            title="WhatsApp"
          >
            💬
          </button>

          {/* 🌗 Theme */}
          <button
            type="button"
            className={styles.iconBtn}
            onClick={toggleTheme}
            aria-label="Schimbă tema"
            title="Schimbă tema"
          >
            {theme === "dark" ? "☀️" : "🌙"}
          </button>

          {/* ☰ Menu */}
          <button
            type="button"
            className={styles.menuBtn}
            onClick={onMenu}
            aria-label="Meniu"
            title="Meniu"
          >
            ☰
          </button>

          <BurgerMenu open={menuOpen} onOpenChange={setMenuOpen} trigger="none" />
        </div>
      </div>
    </header>
  );
}

