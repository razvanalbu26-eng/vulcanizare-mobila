import styles from "./SectionBlock.module.css";
import QuickAssist from "../QuickAssist/QuickAssist";

export default function SectionAssist() {
  return (
    <div className={styles.wrap}>
      <div className={styles.head}>
        <h2 className={styles.h2}>Estimare rapidă intervenție</h2>
        <p className={styles.p}>Află rapid ETA orientativ și trimite detaliile direct pe WhatsApp.</p>
      </div>

      <QuickAssist />
    </div>
  );
}
