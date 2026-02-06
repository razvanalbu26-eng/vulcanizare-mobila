import styles from "../../components/Sections/Sections.module.css";
import { defaultMetadata } from "../../lib/seo";

import CTAButtons from "../../components/CTAButtons/CTAButtons";
import SectionServices from "../../components/Sections/SectionServices/SectionServices";
import SectionAssist from "../../components/Sections/SectionAssist";
import SectionFAQ from "../../components/Sections/SectionFaq";
import SectionContact from "../../components/Sections/SectionContact";

export const metadata = defaultMetadata({
  title: "Vulcanizare mobilă Buzău – Intervenție rapidă 24/7 | La Răzvan",
  description:
    "Vulcanizare mobilă non-stop în Buzău și zonele limitrofe. Pană roată, schimb roată, anvelope noi & SH. Sună sau trimite locația pe WhatsApp.",
  path: "/vulcanizare-mobila-buzau",
});

export default function Page() {
  return (
    <div className={styles.page}>
      <main className={styles.main}>
        <section className={styles.section}>
          <div style={{ maxWidth: 920, margin: "0 auto", padding: "24px 16px" }}>
            <h1 style={{ marginTop: 0 }}>
              Vulcanizare mobilă în Buzău – intervenție rapidă 24/7
            </h1>

            <p style={{ opacity: 0.9, lineHeight: 1.6 }}>
              Ai făcut pană în Buzău sau ai nevoie de schimb roată la fața locului?
              Intervenim rapid, non-stop, pentru autoturisme și camioane/TIR. Cel mai simplu:
              apasă WhatsApp și trimite locația sau sună direct.
            </p>

            <div style={{ marginTop: 14 }}>
              <CTAButtons />
            </div>

            <h2 style={{ marginTop: 22 }}>Zone acoperite</h2>
            <p style={{ opacity: 0.9, lineHeight: 1.6 }}>
              Buzău, Mărăcineni, Spătaru și zonele limitrofe, plus E85/DN2 și A7 (în funcție de distanță).
            </p>
          </div>
        </section>

        <section className={styles.section}><SectionServices /></section>
        <section className={styles.section}><SectionAssist /></section>
        <section className={styles.section}><SectionFAQ /></section>
        <section className={styles.section}><SectionContact /></section>
      </main>
    </div>
  );
}
