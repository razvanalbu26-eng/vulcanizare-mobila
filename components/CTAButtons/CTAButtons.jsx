"use client";

import styles from "./CTAButtons.module.css";
import { SITE } from "../../lib/config.js";

function buildWhatsAppText({ lat, lng } = {}) {
  const parts = [
    "Bună! Am nevoie de vulcanizare mobilă.",
    "Problemă: pană roată / anvelopă.",
  ];
  if (lat && lng) {
    parts.push(`Locație: https://maps.google.com/?q=${lat},${lng}`);
  } else {
    parts.push("Locație: (nu am GPS activ) – îți spun reper/km și sensul.");
  }
  return parts.join("\n");
}

export default function CTAButtons() {
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
    const text = buildWhatsAppText(hasLoc ? { lat, lng } : undefined);
    const url = `https://wa.me/${SITE.whatsappPhone}?text=${encodeURIComponent(text)}`;
    window.open(url, "_blank", "noopener,noreferrer");
  }

  return (
    <div className={styles.wrap}>
      <a className={styles.primary} href={`tel:${SITE.phone}`}>
        📞 Sună acum
        <span className={styles.sub}>răspundem rapid</span>
      </a>

      <button className={styles.secondary} onClick={onWhatsAppWithLocation}>
        💬 WhatsApp cu locația mea
      </button>

      <button className={styles.ghost} onClick={() => openWhatsApp(false)}>
        WhatsApp fără GPS
      </button>
    </div>
  );
}
