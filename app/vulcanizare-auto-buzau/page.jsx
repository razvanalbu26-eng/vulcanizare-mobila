import styles from "../../components/Sections/Sections.module.css";
import { defaultMetadata } from "../../lib/seo";

import CTAButtons from "../../components/CTAButtons/CTAButtons";
import SectionServices from "../../components/Sections/SectionServices/SectionServices";
import SectionAssist from "../../components/Sections/SectionAssist";
import SectionFAQ from "../../components/Sections/SectionFaq";
import SectionContact from "../../components/Sections/SectionContact";
import SectionReviews from "../../components/Sections/SectionReviews";

import { faqBuzauItems } from "../../lib/faqitems.js";

export const metadata = defaultMetadata({
  title: "Vulcanizare auto Buzău 24/7 – Pană, schimb roată | La Răzvan",
  description:
    "Vulcanizare auto în Buzău cu intervenții mobile non-stop. Schimb roată, pană, anvelope noi și SH pentru autoturisme, SUV-uri și utilitare.",
  path: "/vulcanizare-auto-buzau",
});

export default function Page() {
  return (
    <div className={styles.page}>
      <main className={styles.main}>
        <section className={styles.section}>
          <div style={{ maxWidth: 920, margin: "0 auto", padding: "24px 16px" }}>
            <h1 style={{ marginTop: 0 }}>
              Vulcanizare auto Buzău – intervenții rapide 24/7
            </h1>

            <p style={{ opacity: 0.9, lineHeight: 1.7 }}>
              Ai făcut pană în Buzău sau ai nevoie de schimbarea unei anvelope
              la fața locului? Vulcanizare Mobilă La Răzvan intervine rapid
              pentru autoturisme, SUV-uri și utilitare.
            </p>

            <p style={{ opacity: 0.9, lineHeight: 1.7 }}>
              Venim direct la locația indicată, evaluăm situația și efectuăm
              schimbul roții sau înlocuirea anvelopei, în funcție de
              disponibilitate. Trimite locația pe WhatsApp pentru timp estimativ
              de sosire.
            </p>

            <div style={{ marginTop: 18 }}>
              <CTAButtons />
            </div>
          </div>
        </section>

        <section className={styles.section}>
          <div style={{ maxWidth: 920, margin: "0 auto", padding: "0 16px" }}>
            <h2>Servicii de vulcanizare auto în Buzău</h2>

            <ul style={{ lineHeight: 1.9 }}>
              <li>✔ Schimb roată la fața locului</li>
              <li>✔ Pană auto în oraș sau pe drum</li>
              <li>✔ Înlocuire anvelope noi și SH, în funcție de stoc</li>
              <li>✔ Intervenții pentru autoturisme, SUV-uri și utilitare</li>
              <li>✔ Asistență în parcări, la domiciliu sau pe carosabil</li>
              <li>✔ Disponibilitate non-stop</li>
            </ul>

            <h2 style={{ marginTop: 34 }}>Zone acoperite</h2>

            <p style={{ opacity: 0.9, lineHeight: 1.7 }}>
              Intervenim în municipiul Buzău, Mărăcineni, Spătaru și zonele
              apropiate, precum și pe E85/DN2 și A7, în funcție de distanță și
              disponibilitate.
            </p>
          </div>
        </section>

        <section className={styles.section}>
          <SectionServices />
        </section>

        <section className={styles.section}>
          <SectionReviews />
        </section>

        <section className={styles.section}>
          <SectionAssist />
        </section>

        <section className={styles.section}>
          <SectionFAQ
            title="Întrebări frecvente – Vulcanizare auto Buzău"
            items={faqBuzauItems}
          />
        </section>

        <section className={styles.section}>
          <SectionContact />
        </section>
      </main>
    </div>
  );
}