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
  title: "Vulcanizare mobilă Vernești 24/7 – Pană, schimb roată | La Răzvan",
  description:
    "Vulcanizare mobilă în Vernești și zonele apropiate. Intervenții non-stop pentru pană, schimb roată, anvelope noi și SH, autoturisme, utilitare și camioane.",
  path: "/vulcanizare-mobila-vernesti",
});

export default function Page() {
  return (
    <div className={styles.page}>
      <main className={styles.main}>
        <section className={styles.section}>
          <div style={{ maxWidth: 920, margin: "0 auto", padding: "24px 16px" }}>
            <h1 style={{ marginTop: 0 }}>
              Vulcanizare mobilă Vernești – intervenții rapide 24/7
            </h1>

            <p style={{ opacity: 0.9, lineHeight: 1.7 }}>
              Ai făcut pană în Vernești sau ai nevoie de schimb roată la fața
              locului? Vulcanizare Mobilă La Răzvan intervine rapid pentru
              autoturisme, SUV-uri, utilitare, camioane și TIR.
            </p>

            <p style={{ opacity: 0.9, lineHeight: 1.7 }}>
              Trimite locația pe WhatsApp și îți confirmăm timpul estimativ de
              sosire. Venim direct la mașină pentru pană, schimb roată sau
              înlocuire anvelopă, în funcție de situație și disponibilitate.
            </p>

            <div style={{ marginTop: 18 }}>
              <CTAButtons />
            </div>
          </div>
        </section>

        <section className={styles.section}>
          <div style={{ maxWidth: 920, margin: "0 auto", padding: "0 16px" }}>
            <h2>Zone acoperite în apropiere de Vernești</h2>

            <p style={{ opacity: 0.9, lineHeight: 1.7 }}>
              Intervenim în Vernești și localitățile apropiate, inclusiv
              Cândești, Nișcov, Zorești, Mărăcineni și Buzău, în funcție de
              distanță și disponibilitate.
            </p>

            <h2 style={{ marginTop: 34 }}>Când ne poți apela?</h2>

            <ul style={{ lineHeight: 1.9 }}>
              <li>✔ Pană auto în Vernești sau în apropiere</li>
              <li>✔ Schimb roată la domiciliu, în parcare sau pe drum</li>
              <li>✔ Anvelopă tăiată, explodată sau deteriorată</li>
              <li>✔ Înlocuire anvelope noi și SH, în funcție de stoc</li>
              <li>✔ Intervenții pentru autoturisme, utilitare, camioane și TIR</li>
              <li>✔ Asistență non-stop, 24/7</li>
            </ul>

            <h2 style={{ marginTop: 34 }}>
              Vulcanizare mobilă aproape de tine
            </h2>

            <p style={{ opacity: 0.9, lineHeight: 1.7 }}>
              Pentru șoferii din Vernești, o vulcanizare mobilă este soluția
              rapidă atunci când mașina nu mai poate fi deplasată în siguranță.
              În loc să cauți o vulcanizare deschisă sau să chemi platformă,
              venim direct la locația ta și încercăm să rezolvăm problema pe
              loc.
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
            title="Întrebări frecvente – Vulcanizare mobilă Vernești"
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