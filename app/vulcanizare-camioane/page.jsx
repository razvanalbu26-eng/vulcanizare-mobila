import styles from "../../components/Sections/Sections.module.css";
import { defaultMetadata } from "../../lib/seo";
import CTAButtons from "../../components/CTAButtons/CTAButtons";
import SectionFAQ from "../../components/Sections/SectionFaq";
import SectionContact from "../../components/Sections/SectionContact";
import { faqTirItems } from "../../lib/faqitems.js";

export const metadata = defaultMetadata({
  title: "Vulcanizare mobilă TIR / Camioane 24/7 – Intervenții la fața locului | La Răzvan",
  description:
    "Vulcanizare mobilă pentru camioane și TIR non-stop. Intervenții la fața locului: pană, schimb roată, înlocuire anvelope. Trimite locația pe WhatsApp.",
  path: "/vulcanizare-camioane",
});

export default function Page() {
  return (
    <div className={styles.page}>
      <main className={styles.main}>
        <section className={styles.section}>
          <div style={{ maxWidth: 920, margin: "0 auto", padding: "24px 16px" }}>
            <h1 style={{ marginTop: 0 }}>Vulcanizare mobilă camioane / TIR – intervenție 24/7</h1>
            <p style={{ opacity: 0.9, lineHeight: 1.6 }}>
              Intervenim pentru camioane/TIR în parcare, pe acostament sau la punctul indicat.
              Trimite locația pe WhatsApp pentru ETA și detalii.
            </p>
            <div style={{ marginTop: 14 }}>
              <CTAButtons />
            </div>
          </div>
        </section>

        <section className={styles.section}>
          <SectionFAQ
            title="Întrebări frecvente – Vulcanizare camioane / TIR"
            items={faqTirItems}
          />
        </section>

        <section className={styles.section}><SectionContact /></section>
      </main>
    </div>
  );
}