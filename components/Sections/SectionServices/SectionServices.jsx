// components/sections/SectionServices/SectionServices.jsx
import styles from "./SectionServices.module.css";
import ServiceCardClient from "./ServiceCardClient.jsx";
import { SITE } from "../../../lib/config.js";

const items = [
  {
    key: "tir",
    title: "Camioane / TIR / Flote",
    desc: "Intervenții 24/7 pentru transport marfă: pană, schimb roată, pierdere aer. Venim în parcare, la rampă sau pe traseu.",
    chips: ["TIR", "Flote", "24/7", "Rapid"],
    info: "Spune tip vehicul + dimensiune anvelopă (ex: 315/80R22.5) ca să venim pregătiți.",
    highlight: "truck",
  },
  {
    key: "pana",
    title: "Pană roată",
    desc: "Reparație rapidă, inclusiv urgențe. Trimite locația GPS sau spune reper/km și sensul de mers.",
    chips: ["Pe loc", "Urgență", "ETA 25–45m"],
    info: "Dacă ai roată de rezervă, o montăm imediat.",
    highlight: "popular",
  },
  {
    key: "schimb",
    title: "Schimb roată",
    desc: "Montaj roată de rezervă / înlocuire anvelopă. Verificăm presiune + strângere corectă.",
    chips: ["Siguranță", "Pe loc", "Verificat"],
    info: "Recomandat: avarii + triunghi înainte să cobori.",
    highlight: "safe",
  },
  {
    key: "pierdere",
    title: "Supapă / pierdere aer",
    desc: "Identificăm scurgeri (supapă, valvă, cui, fisură) și remediem rapid.",
    chips: ["Etanșare", "Diagnostic", "Rapid"],
    info: "Dacă pierzi aer constant, evită viteza mare până ajungem.",
    highlight: "fast",
  },
  {
    key: "janta",
    title: "Jantă îndoită",
    desc: "Evaluare și soluție când se poate. Reducem vibrațiile și pierderea de aer.",
    chips: ["Evaluare", "Vibrații", "Pe loc*"],
    info: "*În funcție de gradul deformării.",
    highlight: "pro",
  },
];

export default function SectionServices() {
  return (
    <section id="services" className={styles.section}>
      <div className={styles.container}>
        <header className={styles.head}>
          <div className={styles.headTop}>
            <h2 className={styles.h2}>Servicii</h2>
            <div className={styles.quick}>
              <a href={`tel:${SITE.phone}`} className={styles.quickCall}>
  📞 Sună acum – intervenție rapidă
</a>
            </div>
          </div>

          <p className={styles.p}>
            Alege problema și contactează-ne instant. Pentru <strong>camioane/TIR</strong>,
            spune tipul vehiculului + dimensiunea anvelopei. Trimite locația (GPS) sau reper/km.
          </p>
        </header>

        <div className={styles.grid}>
          {items.map((item) => (
            <ServiceCardClient key={item.key} item={item} />
          ))}
        </div>

        <div className={styles.footerNote}>
          <span className={styles.noteDot} aria-hidden="true" />
          <span>ETA este orientativ. Confirmăm telefonic înainte de plecare.</span>
        </div>
      </div>
    </section>
  );
}
