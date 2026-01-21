import styles from "./SectionBlock.module.css";
import CTAButtons from "../CTAButtons/CTAButtons.jsx";
import { SITE } from "../../lib/config.js";

export default function SectionContact() {
  return (
    <div className={styles.wrap} id="contact">
      <div className={styles.head}>
        <h2 className={styles.h2}>Contact rapid</h2>
        <p className={styles.p}>
          Cel mai rapid: trimite locația pe WhatsApp sau sună direct. Îți confirmăm ETA după locație.
        </p>
      </div>

      <div className={styles.cardWide}>
        <div className={styles.row}>
          <div>
            <div className={styles.title}>Telefon</div>
            <div className={styles.desc}>
              <a href={`tel:${SITE.phone1 ?? SITE.phone}`} className={styles.linkStrong}>
                {SITE.phone1 ?? SITE.phone}
              </a>
            </div>
          </div>

          <div>
            <div className={styles.title}>Disponibilitate</div>
            <div className={styles.desc}>24/7 (în funcție de disponibilitate)</div>
          </div>
        </div>

        <div className={styles.facts}>
          <div className={styles.fact}>
            <div className={styles.factK}>Acoperire</div>
            <div className={styles.factV}>
              Standard {SITE.serviceRadiusKm} km · Autostradă până la {SITE.highwayRadiusKm} km
            </div>
          </div>

          <div className={styles.fact}>
            <div className={styles.factK}>Bază</div>
            <div className={styles.factV}>{SITE.baseLabel}</div>
          </div>

          <div className={styles.fact}>
            <div className={styles.factK}>Plată</div>
            <div className={styles.factV}>Cash / Card (în funcție de intervenție)</div>
          </div>
        </div>

        <div className={styles.how}>
          <div className={styles.howTitle}>Cum trimiți pe WhatsApp (recomandat)</div>
          <ol className={styles.howList}>
            <li>Apasă „WhatsApp”</li>
            <li>Trimite locația (GPS) sau „km + sens + reper”</li>
            <li>Spune problema (pană / schimb roată / TIR etc.)</li>
          </ol>
        </div>

        <div className={styles.ctaArea}>
          <CTAButtons />
          <div className={styles.smallNote}>
            Tip: dacă ai timp, trimite și o poză cu anvelopa — venim pregătiți.
          </div>
        </div>
      </div>
    </div>
  );
}
