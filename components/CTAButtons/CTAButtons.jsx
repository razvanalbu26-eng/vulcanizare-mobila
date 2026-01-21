"use client";

import { useEffect, useRef, useState } from "react";
import styles from "./CTAButtons.module.css";
import { SITE } from "../../lib/config.js";

/* ================= WHATSAPP HELPERS ================= */

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

export default function CTAButtons() {
  const waPhone = String(SITE?.whatsappPhone ?? "").replace(/[^\d]/g, "");

  // ✅ Telefon: popover cu 2 numere
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

  const onWhatsAppWithLocation = () => {
    if (!waPhone) return;

    const ok = window.confirm("Vrei să trimiți locația ta pe WhatsApp?");
    if (!ok) {
      openWhatsAppDirect({ waPhone });
      return;
    }

    if (!navigator.geolocation) {
      openWhatsAppDirect({ waPhone });
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (pos) => {
        const { latitude, longitude } = pos.coords;
        openWhatsAppDirect({ waPhone, lat: latitude, lng: longitude });
      },
      () => openWhatsAppDirect({ waPhone }),
      { enableHighAccuracy: true, timeout: 8000, maximumAge: 30000 }
    );
  };

  return (
    <div className={styles.wrap}>
      {/* ✅ CALL cu 2 numere (buton full width ca înainte) */}
      <div ref={phoneWrapRef} className={styles.phoneWrap}>
        <button
          type="button"
          className={styles.primary}
          onClick={() => setPhoneMenuOpen((v) => !v)}
          aria-label="Sună acum (alege numărul)"
          aria-expanded={phoneMenuOpen}
          aria-haspopup="menu"
        >
          📞 Sună acum
          <span className={styles.sub}>răspundem rapid</span>
        </button>

        {phoneMenuOpen && (
          <div className={styles.phoneMenu} role="menu" aria-label="Alege numărul">
            <a
              role="menuitem"
              href={`tel:${SITE.phone1}`}
              onClick={() => setPhoneMenuOpen(false)}
              className={styles.phoneItem}
            >
              📞 {SITE.phone1}
            </a>

            <a
              role="menuitem"
              href={`tel:${SITE.phone2}`}
              onClick={() => setPhoneMenuOpen(false)}
              className={styles.phoneItem}
            >
              📞 {SITE.phone2}
            </a>
          </div>
        )}
      </div>

      {/* WhatsApp cu locație */}
      <button className={styles.secondary} onClick={onWhatsAppWithLocation}>
        📍 WhatsApp cu locația mea
      </button>

      {/* WhatsApp fără GPS */}
      <button className={styles.ghost} onClick={() => openWhatsAppDirect({ waPhone })}>
        💬 WhatsApp fără GPS
      </button>
    </div>
  );
}
