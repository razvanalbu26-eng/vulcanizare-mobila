import styles from "./SectionBlock.module.css";
import CoverageMap from "../CoverageMap/CoverageMap";
import { SITE } from "../../lib/config.js";

export default function SectionCoverage() {
  return (
    <div className={styles.wrap}>
      <div className={styles.head}>
        <h2 className={styles.h2}>Acoperire</h2>
        <p className={styles.p}>
          Intervenim pe {SITE.serviceAreaLabel}. Dacă nu ai GPS activ, pune un pin pe hartă sau spune reper/km și sensul.
        </p>
      </div>

      <CoverageMap />
    </div>
  );
}
