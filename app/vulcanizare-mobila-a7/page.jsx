import styles from "../../components/Sections/Sections.module.css";
import { defaultMetadata } from "../../lib/seo";
import CTAButtons from "../../components/CTAButtons/CTAButtons";
import SectionServices from "../../components/Sections/SectionServices/SectionServices";
import SectionFAQ from "../../components/Sections/SectionFaq";
import SectionContact from "../../components/Sections/SectionContact";

export const metadata = defaultMetadata({
  title: "Vulcanizare mobilă A7 – Intervenții rapide 24/7 | La Răzvan",
  description:
    "Vulcanizare mobilă non-stop pe Autostrada A7. Pană roată, schimb roată, intervenții pentru autoturisme și camioane/TIR. Trimite locația pe WhatsApp.",
  path: "/vulcanizare-mobila-a7",
});

export default function Page() {
  return (
    <div className={styles.page}>
      <main className={styles.main}>
        <section className={styles.section}>
          <div style={{ maxWidth: 920, margin: "0 auto", padding: "24px 16px" }}>
            <h1 style={{ marginTop: 0 }}>Vulcanizare mobilă pe Autostrada A7 – 24/7</h1>
            <p style={{ opacity: 0.9, lineHeight: 1.6 }}>
              Intervenim pe A7 pentru pană roată, anvelopă tăiată, schimb roată și înlocuire anvelope
              (în funcție de stoc). Trimite locația pe WhatsApp pentru ETA.
            </p>
            <div style={{ marginTop: 14 }}>
              <CTAButtons />
            </div>
          </div>
        </section>

        <section className={styles.section}><SectionServices /></section>
        <section className={styles.section}><SectionFAQ /></section>
        <section className={styles.section}><SectionContact /></section>
      </main>
    </div>
  );
}
