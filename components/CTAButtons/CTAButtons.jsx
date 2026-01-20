"use client";

import { useEffect, useRef, useState } from "react";
import styles from "./CTAButtons.module.css";
import { SITE } from "../../lib/config.js";

function buildWhatsAppText({ lat, lng } = {}) {
  const parts = [
    "Bună! Am nevoie de vulcanizare mobilă.",
    "Problemă: pană roată / anvelopă.",
  ];
  if (lat != null && lng != null) {
    parts.push(`Locație: https://maps.google.com/?q=${lat},${lng}`);
  } else {
    parts.push("Locație: (nu am GPS activ) – îți spun reper/km și sensul.");
  }
  return parts.join("\n");
}

export default function CTAButtons() {
  // ✅ meniu cu 2 numere pentru apel
  const [phoneMenuOpen, setPhoneMenuOpen] = useState(false);
  const phoneWrapRef = useRef(null);

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

  function onWhatsAppWithLocation() {
    if (!navigator.geolocation) {
      openWhatsApp(false);
      return;
    }
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        const { latitude, longitude } = pos.coords;
        openWhatsApp(true, latitude, longitude);
      },
      () => openWhatsApp(false),
      { enableHighAccuracy: true, timeout: 8000 }
    );
  }

  function openWhatsApp(hasLoc, lat, lng) {
    const waPhone = String(SITE?.whatsappPhone ?? "").replace(/[^\d]/g, "");
    if (!waPhone) {
      // fallback: dacă lipsește WhatsApp, sună (aleg phone2 apoi phone1)
      window.location.href = `tel:${SITE?.phone2 ?? SITE?.phone1 ?? ""}`;
      return;
    }

    const text = buildWhatsAppText(hasLoc ? { lat, lng } : undefined);
    const url = `https://wa.me/${waPhone}?text=${encodeURIComponent(text)}`;
    window.open(url, "_blank", "noopener,noreferrer");
  }

  return (
    <div className={styles.wrap}>
      {/* 📞 Sună acum -> meniu cu 2 numere */}
      <div
        ref={phoneWrapRef}
        style={{ position: "relative", display: "inline-block" }}
      >
        <button
          type="button"
          className={styles.primary}
          onClick={() => setPhoneMenuOpen((v) => !v)}
          aria-haspopup="menu"
          aria-expanded={phoneMenuOpen}
        >
          📞 Sună acum
          <span className={styles.sub}>răspundem rapid</span>
        </button>

        {phoneMenuOpen && (
          <div
            role="menu"
            aria-label="Alege numărul de telefon"
            style={{
              position: "absolute",
              left: 0,
              top: "calc(100% + 8px)",
              minWidth: 220,
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

      <button className={styles.secondary} onClick={onWhatsAppWithLocation}>
        💬 WhatsApp cu locația mea
      </button>

      <button className={styles.ghost} onClick={() => openWhatsApp(false)}>
        WhatsApp fără GPS
      </button>
    </div>
  );
}
