import styles from "./SectionHero.module.css";
import { SITE } from "../../../lib/config.js";
import CTAButtons from "../../CTAButtons/CTAButtons.jsx";

const MAPS_URL =
  "https://www.google.com/maps/place/Vulcanizare+Mobil%C4%83+Camioane+%26+Autoturisme+Non-Stop+Buz%C4%83u/@45.1756209,26.8238683,15z/data=!4m6!3m5!1s0x40b167e353397e23:0xcf6f60d25d7e7206!8m2!3d45.1756318!4d26.8261073!16s%2Fg%2F11scny7cs5?entry=ttu";

export default function SectionHero() {
  const badge =
    SITE.availability === "available"
      ? { cls: styles.green, text: "Disponibil acum" }
      : SITE.availability === "busy"
      ? { cls: styles.red, text: "Ocupat – preluăm în scurt timp" }
      : { cls: styles.gray, text: "Status indisponibil" };

  return (
    <section id="acasa" className={styles.section}>
      <div className={styles.bg} aria-hidden="true" />

      <div className={styles.container}>
        <div className={`${styles.card} ${styles.enter}`}>
          <div className={styles.topRow}>
            <span className={`${styles.badge} ${badge.cls}`}>● {badge.text}</span>

            <span className={styles.pill}>24/7</span>
            <span className={styles.pill}>Cash/Card</span>
            <span className={styles.pill}>Factură</span>

            <span className={`${styles.pill} ${styles.pillTruck}`}>CAMIOANE / TIR</span>
          </div>

          <div className={styles.eyebrow}>
            Vulcanizare mobilă <span className={styles.dot}>•</span> {SITE.serviceAreaLabel}
          </div>

          <div className={styles.locationLine}>
            <span className={styles.locationIcon} aria-hidden="true">
              📍
            </span>
            <a
              className={styles.locationLink}
              href={MAPS_URL}
              target="_blank"
              rel="noopener noreferrer"
            >
              E85 / DN2 nr. 3 – Vezi locația pe hartă
            </a>
          </div>

          <h1 className={styles.h1}>
            Vulcanizare mobilă pentru{" "}
            <span className={styles.accent}>autoturisme</span> și{" "}
            <span className={styles.accent2}>camioane</span> pe A7
          </h1>

          <p className={styles.p}>
            Pană roată, anvelopă tăiată, jantă îndoită? Intervenim rapid la fața locului.
            Pentru <strong>camioane / TIR</strong> venim în parcare, pe acostament sau la punctul tău.
            Cel mai simplu: apasă WhatsApp și trimite locația sau sună direct.
          </p>
<div className={styles.offerBanner} role="note" aria-label="Serviciu nou">
  <span className={styles.offerIcon} aria-hidden="true">🛞</span>

  <div className={styles.offerText}>
    <div className={styles.offerTitle}>
      Înlocuire anvelope la fața locului pentru{" "}
      <span className={styles.wordAuto}>autoturisme</span> și{" "}
      <span className={styles.wordTruck}>camioane</span>
    </div>

    <div className={styles.offerSub}>
      Anvelope{" "}
      <span className={styles.wordNew}>noi</span> și{" "}
      <span className={styles.wordSh}>SH</span>
      {" "}• orice dimensiune din stoc • montaj rapid
    </div>
  </div>

  <span className={styles.offerChip}>NOU</span>
</div>

          {/* Wrapper pentru a micșora CTAButtons doar în hero */}
          <div className={styles.ctaWrap}>
            <CTAButtons />
          </div>

          <div className={styles.miniGrid}>
            <div className={`${styles.miniCard} ${styles.miniCardHighlight}`}>
              <div className={styles.miniTitle}>Camioane / TIR</div>
              <div className={styles.small}>
                Intervenții rapide • Flote • Transport marfă • 24/7
              </div>
            </div>

            <div className={styles.miniCard}>
              <div className={styles.miniTitle}>Urgențe</div>
              <div className={styles.small}>
                Pană roată • Anvelopă explodată • Schimb roată
              </div>
            </div>

            <div className={styles.miniCard}>
              <div className={styles.miniTitle}>Acoperire</div>
              <div className={styles.small}>{SITE.serviceAreaLabel}</div>
            </div>

            <div className={styles.miniCard}>
              <div className={styles.miniTitle}>Contact rapid</div>
              <div className={styles.small}>
                Telefon + WhatsApp cu mesaj precompletat
              </div>
            </div>
          </div>

          <div className={styles.heroArt} aria-hidden="true">
            <div className={styles.mapShape} />
            <div className={styles.route} />
            <div className={styles.glowOrb} />
          </div>
        </div>
      </div>
    </section>
  );
}
