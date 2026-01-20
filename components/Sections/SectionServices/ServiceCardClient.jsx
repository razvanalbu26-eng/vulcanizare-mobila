// components/sections/SectionServices/ServiceCardClient.jsx
"use client";

import { useMemo, useState } from "react";
import styles from "./SectionServices.module.css";
import { SITE } from "../../../lib/config.js";

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

export default function ServiceCardClient({ item }) {
  const [gpsLoading, setGpsLoading] = useState(false);

  // wa.me cere număr în format internațional, doar cifre (fără +, fără spații)
  const waPhone = useMemo(() => {
    const raw = String(SITE?.whatsappPhone ?? "");
    return raw.replace(/[^\d]/g, "");
  }, []);

  const openWhatsApp = ({ serviceTitle, lat, lng } = {}) => {
    // dacă nu e setat WhatsApp corect, nu lăsăm “buton mort”
    if (!waPhone) {
      window.location.href = `tel:${SITE?.phone ?? ""}`;
      return;
    }

    const text = buildWhatsAppText({ serviceTitle, lat, lng });
    const url = `https://wa.me/${waPhone}?text=${encodeURIComponent(text)}`;
    window.open(url, "_blank", "noopener,noreferrer");
  };

  const onWhatsAppWithLocation = () => {
    if (gpsLoading) return;

    if (!navigator.geolocation) {
      openWhatsApp({ serviceTitle: item.title });
      return;
    }

    setGpsLoading(true);

    navigator.geolocation.getCurrentPosition(
      (pos) => {
        const { latitude, longitude } = pos.coords;
        setGpsLoading(false);
        openWhatsApp({ serviceTitle: item.title, lat: latitude, lng: longitude });
      },
      () => {
        setGpsLoading(false);
        openWhatsApp({ serviceTitle: item.title });
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
        <a className={styles.call} href={`tel:${SITE.phone}`}>
          📞 Sună
        </a>

        <button
          type="button"
          className={styles.wa}
          onClick={onWhatsAppWithLocation}
          disabled={gpsLoading}
        >
          💬 {gpsLoading ? "Se ia locația…" : "GPS"}
        </button>

        <button
          type="button"
          className={styles.waGhost}
          onClick={() => openWhatsApp({ serviceTitle: item.title })}
        >
          Fără GPS
        </button>
      </div>
    </article>
  );
}
