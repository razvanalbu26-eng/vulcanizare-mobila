// components/sections/SectionServices/ServiceCardClient.jsx
"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import styles from "./SectionServices.module.css";
import { SITE } from "../../../lib/config.js";

/* ================= WHATSAPP HELPERS (same style as Header) ================= */

function buildWhatsAppText({ serviceTitle, lat, lng } = {}) {
  const parts = [
    "Bună! Am nevoie de vulcanizare mobilă.",
    `Serviciu: ${serviceTitle || "(nespecificat)"}`,
    "Problemă: (scriu aici detalii)",
  ];

  if (lat != null && lng != null) {
    parts.push(`Locație: https://maps.google.com/?q=${lat},${lng}`);
  } else {
    parts.push("Locație: (nu am GPS activ) – reper/km și sensul de mers.");
  }

  return parts.join("\n");
}

function openWhatsAppDirect({ waPhone, serviceTitle, lat, lng } = {}) {
  if (!waPhone) return;

  const text = buildWhatsAppText({ serviceTitle, lat, lng });

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

export default function ServiceCardClient({ item }) {
  const [gpsLoading, setGpsLoading] = useState(false);

  // ✅ Phone popover (2 numbers)
  const [phoneMenuOpen, setPhoneMenuOpen] = useState(false);
  const phoneWrapRef = useRef(null);

  // WhatsApp number: only digits, international format
  const waPhone = useMemo(() => {
    const raw = String(SITE?.whatsappPhone ?? "");
    return raw.replace(/[^\d]/g, "");
  }, []);

  // click outside -> close phone menu
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

  // fallback phone if WA not set
  const fallbackTel = SITE?.phone2 ?? SITE?.phone1 ?? SITE?.phone ?? "";

  const onWhatsAppNoGps = () => {
    if (!waPhone) {
      window.location.href = `tel:${fallbackTel}`;
      return;
    }
    openWhatsAppDirect({ waPhone, serviceTitle: item.title });
  };

  const onWhatsAppWithLocation = () => {
    if (!waPhone) {
      window.location.href = `tel:${fallbackTel}`;
      return;
    }

    // optional confirm like Header
    const ok = window.confirm("Vrei să trimiți locația ta pe WhatsApp?");
    if (!ok) {
      openWhatsAppDirect({ waPhone, serviceTitle: item.title });
      return;
    }

    if (!navigator.geolocation) {
      openWhatsAppDirect({ waPhone, serviceTitle: item.title });
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
          serviceTitle: item.title,
          lat: latitude,
          lng: longitude,
        });
      },
      () => {
        setGpsLoading(false);
        openWhatsAppDirect({ waPhone, serviceTitle: item.title });
      },
      { enableHighAccuracy: true, timeout: 8000, maximumAge: 30000 }
    );
  };

  return (
    <article className={styles.card}>
      <div className={styles.cardTop}>
        <div className={styles.titleRow}>
          <h3 className={styles.title}>{item.title}</h3>
          <span className={styles.kicker}>24/7</span>
        </div>

        <p className={styles.desc}>{item.desc}</p>

        <div className={styles.chips}>
          {item.chips.map((c) => (
            <span key={c} className={styles.chip}>
              {c}
            </span>
          ))}
        </div>
      </div>

      <div className={styles.infoBox}>
        <span className={styles.infoIcon} aria-hidden="true">
          i
        </span>
        <span className={styles.infoText}>{item.info}</span>
      </div>

      <div className={styles.actionsRow}>
        {/* ✅ CALL with 2 numbers (popover) */}
        <div ref={phoneWrapRef} className={styles.phoneWrap}>

          <button
            type="button"
            className={styles.call}
            onClick={() => setPhoneMenuOpen((v) => !v)}
            aria-label="Apelează"
            title="Apelează"
            aria-expanded={phoneMenuOpen}
            aria-haspopup="menu"
          >
            📞 Sună
          </button>

          {phoneMenuOpen && (
  <div
    role="menu"
    aria-label="Alege numărul de telefon"
    className={styles.phoneMenu}
  >
    {SITE?.phone1 && (
      <a
        role="menuitem"
        href={`tel:${SITE.phone1}`}
        onClick={() => setPhoneMenuOpen(false)}
        className={styles.phoneItem}
      >
        📞 {SITE.phone1}
      </a>
    )}

    {SITE?.phone2 && (
      <a
        role="menuitem"
        href={`tel:${SITE.phone2}`}
        onClick={() => setPhoneMenuOpen(false)}
        className={styles.phoneItem}
      >
        📞 {SITE.phone2}
      </a>
    )}
  </div>
)}

        </div>

        {/* ✅ WhatsApp GPS (direct app + fallback) */}
        <button
          type="button"
          className={styles.wa}
          onClick={onWhatsAppWithLocation}
          disabled={gpsLoading}
          title={gpsLoading ? "Se ia locația…" : "WhatsApp cu locație"}
        >
          💬 {gpsLoading ? "Se ia locația…" : "GPS"}
        </button>

        {/* ✅ WhatsApp fără GPS (direct app + fallback) */}
        <button
          type="button"
          className={styles.waGhost}
          onClick={onWhatsAppNoGps}
          title="WhatsApp fără locație"
        >
          Fără GPS
        </button>
      </div>
    </article>
  );
}
