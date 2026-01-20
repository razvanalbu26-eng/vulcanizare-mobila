"use client";

import { useEffect, useMemo, useRef, useState } from "react";
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
  const [menuOpen, setMenuOpen] = useState(false);

  // ✅ pentru popover-ul de telefoane
  const [phoneMenuOpen, setPhoneMenuOpen] = useState(false);
  const phoneWrapRef = useRef(null);

  // ✅ WhatsApp: folosește un singur număr (SITE.whatsappPhone)
  const waPhone = useMemo(() => {
    const raw = SITE?.whatsappPhone ?? "";
    return String(raw).replace(/[^\d]/g, "");
  }, []);

  /* ================= THEME (fără setState în effect) ================= */
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

  /* ================= PHONE MENU (click outside) ================= */
  useEffect(() => {
    const onDocDown = (e) => {
      if (!phoneMenuOpen) return;
      const wrap = phoneWrapRef.current;
      if (wrap && !wrap.contains(e.target)) setPhoneMenuOpen(false);
    };
    document.addEventListener("mousedown", onDocDown);
    document.addEventListener("touchstart", onDocDown);
    return () => {
      document.removeEventListener("mousedown", onDocDown);
      document.removeEventListener("touchstart", onDocDown);
    };
  }, [phoneMenuOpen]);

  /* ================= ACTIONS ================= */
  const onWhatsAppChat = () => {
    // 💬 fără locație => WhatsApp pe numărul unic
    if (!waPhone) {
      window.location.href = `tel:${SITE?.phone2 ?? SITE?.phone1 ?? ""}`;
      return;
    }
    openWhatsApp({ waPhone });
  };

  const onWhatsAppWithLocation = () => {
    // 📍 cu locație => WhatsApp pe numărul unic
    if (!waPhone) {
      window.location.href = `tel:${SITE?.phone2 ?? SITE?.phone1 ?? ""}`;
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
          {/* ✅ Telefon: la click arată ambele numere */}
          <div
            ref={phoneWrapRef}
            style={{ position: "relative", display: "inline-block" }}
          >
            <button
              type="button"
              className={styles.iconBtn}
              onClick={() => setPhoneMenuOpen((v) => !v)}
              aria-label="Apelează (alege numărul)"
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
                style={{
                  position: "absolute",
                  right: 0,
                  top: "calc(100% + 8px)",
                  minWidth: 180,
                  padding: 8,
                  borderRadius: 12,
                  background: "var(--panel, #111)",
                  border: "1px solid rgba(255,255,255,0.12)",
                  boxShadow: "0 12px 30px rgba(0,0,0,0.35)",
                  zIndex: 50,
                }}
              >
                <a
                  role="menuitem"
                  href={`tel:${SITE.phone1}`}
                  onClick={() => setPhoneMenuOpen(false)}
                  style={{
                    display: "block",
                    padding: "10px 10px",
                    borderRadius: 10,
                    textDecoration: "none",
                    color: "inherit",
                  }}
                >
                  📞 {SITE.phone1}
                </a>

                <a
                  role="menuitem"
                  href={`tel:${SITE.phone2}`}
                  onClick={() => setPhoneMenuOpen(false)}
                  style={{
                    display: "block",
                    padding: "10px 10px",
                    borderRadius: 10,
                    textDecoration: "none",
                    color: "inherit",
                    marginTop: 4,
                  }}
                >
                  📞 {SITE.phone2}
                </a>
              </div>
            )}
          </div>

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
