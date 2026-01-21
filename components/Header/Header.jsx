"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import styles from "./Header.module.css";
import { SITE } from "../../lib/config.js";
import BurgerMenu from "../BurgerMenu/BurgerMenu.jsx";

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

function buildWhatsAppUrl({ waPhone, lat, lng } = {}) {
  if (!waPhone) return null;
  const text = buildWhatsAppText({ lat, lng });
  return `https://wa.me/${waPhone}?text=${encodeURIComponent(text)}`;
}

/* ================= COMPONENT ================= */

export default function HeaderClient() {
  const [gpsLoading, setGpsLoading] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  // popover telefoane
  const [phoneMenuOpen, setPhoneMenuOpen] = useState(false);
  const phoneWrapRef = useRef(null);

  // WhatsApp number
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

  /* ================= CLICK OUTSIDE (PHONE MENU) ================= */

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

  // 💬 WhatsApp fără locație
  const onWhatsAppChat = () => {
    if (!waPhone) {
      window.location.href = `tel:${SITE?.phone2 ?? SITE?.phone1 ?? ""}`;
      return;
    }

    window.location.href = buildWhatsAppUrl({ waPhone });
  };

const onWhatsAppWithLocation = () => {
  if (!waPhone) {
    window.location.href = `tel:${SITE?.phone2 ?? SITE?.phone1 ?? ""}`;
    return;
  }

  // opțional: o confirmare “a ta” înainte să apară prompt-ul browserului
  const ok = window.confirm("Vrei să trimiți locația ta pe WhatsApp?");
  if (!ok) {
    // dacă nu vrea locație, deschidem WhatsApp fără locație
    window.location.href = buildWhatsAppUrl({ waPhone });
    return;
  }

  if (!navigator.geolocation) {
    window.location.href = buildWhatsAppUrl({ waPhone });
    return;
  }

  if (gpsLoading) return;
  setGpsLoading(true);

  navigator.geolocation.getCurrentPosition(
    (pos) => {
      setGpsLoading(false);
      const { latitude, longitude } = pos.coords;

      // ✅ fără popup, doar redirect în același tab
      window.location.href = buildWhatsAppUrl({
        waPhone,
        lat: latitude,
        lng: longitude,
      });
    },
    () => {
      setGpsLoading(false);
      window.location.href = buildWhatsAppUrl({ waPhone });
    },
    { enableHighAccuracy: true, timeout: 8000, maximumAge: 30000 }
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
            >
              📞
            </button>

            {phoneMenuOpen && (
              <div
                role="menu"
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
                  style={{ display: "block", padding: 10 }}
                >
                  📞 {SITE.phone1}
                </a>

                <a
                  role="menuitem"
                  href={`tel:${SITE.phone2}`}
                  onClick={() => setPhoneMenuOpen(false)}
                  style={{ display: "block", padding: 10 }}
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
            disabled={gpsLoading}
            title={gpsLoading ? "Se ia locația…" : "WhatsApp cu locație"}
          >
            📍
          </button>

          {/* 💬 WhatsApp */}
          <button
            type="button"
            className={styles.iconBtn}
            onClick={onWhatsAppChat}
            title="WhatsApp"
          >
            💬
          </button>

          {/* 🌗 Theme */}
          <button
            type="button"
            className={styles.iconBtn}
            onClick={toggleTheme}
          >
            {theme === "dark" ? "☀️" : "🌙"}
          </button>

          {/* ☰ Menu */}
          <button
            type="button"
            className={styles.menuBtn}
            onClick={onMenu}
          >
            ☰
          </button>

          <BurgerMenu open={menuOpen} onOpenChange={setMenuOpen} trigger="none" />
        </div>
      </div>
    </header>
  );
}
