// src/components/Sections/SectionFaq.jsx
import styles from "./SectionBlock.module.css";
import FAQ from "../FAQ/FAQ";

export default function SectionFAQ({
  title = "Întrebări frecvente",
  subtitle = "Răspunsuri rapide, clare, fără explicații inutile.",
  items = [],
}) {
  if (!items?.length) return null;

  return (
    <div className={styles.wrap}>
      <div className={styles.head}>
        <h2 className={styles.h2}>{title}</h2>
        {subtitle ? <p className={styles.p}>{subtitle}</p> : null}
      </div>

      <FAQ items={items} />
    </div>
  );
}