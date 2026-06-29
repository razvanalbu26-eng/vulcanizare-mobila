import styles from "../../components/Sections/Sections.module.css";
import { defaultMetadata } from "../../lib/seo";
import CTAButtons from "../../components/CTAButtons/CTAButtons";
import SectionFAQ from "../../components/Sections/SectionFaq";
import SectionContact from "../../components/Sections/SectionContact";
import { faqTirItems } from "../../lib/faqitems.js";

export const metadata = defaultMetadata({
  title:
    "Vulcanizare mobilă camioane / TIR Buzău 24/7 | La Răzvan",
  description:
    "Vulcanizare mobilă pentru camioane și TIR în Buzău, pe A7, E85 și zone limitrofe. Intervenții non-stop pentru pană, schimb roată și anvelope.",
  path: "/vulcanizare-camioane",
});

export default function Page() {
  return (
    <div className={styles.page}>
      <main className={styles.main}>
        <section className={styles.section}>
          <div style={{ maxWidth: 920, margin: "0 auto", padding: "24px 16px" }}>
            <h1 style={{ marginTop: 0 }}>
              Vulcanizare mobilă camioane / TIR în Buzău – intervenție 24/7
            </h1>

            <p style={{ opacity: 0.9, lineHeight: 1.6 }}>
              Ai pană la camion sau TIR și nu poți ajunge la vulcanizare?
              Intervenim la fața locului în Buzău, pe A7, E85 și în zonele
              apropiate pentru schimb roată, pană, înlocuire anvelope și
              asistență rapidă.
            </p>

            <p style={{ opacity: 0.9, lineHeight: 1.6 }}>
              Trimite locația pe WhatsApp, spune ce problemă ai și revenim cu
              un timp estimativ de sosire. Lucrăm non-stop pentru șoferi
              profesioniști, transportatori și firme cu vehicule comerciale.
            </p>

            <div style={{ marginTop: 14 }}>
              <CTAButtons />
            </div>
          </div>
        </section>

        <section className={styles.section}>
          <div style={{ maxWidth: 920, margin: "0 auto", padding: "0 16px" }}>
            <h2>Servicii pentru camioane și TIR</h2>

            <ul style={{ lineHeight: 1.8, opacity: 0.9 }}>
              <li>Vulcanizare mobilă pentru camion și TIR</li>
              <li>Schimb roată la fața locului</li>
              <li>Intervenții în parcare, pe drum sau la sediu</li>
              <li>Asistență pentru pană pe A7, E85 și în județul Buzău</li>
              <li>Anvelope noi și SH, în funcție de disponibilitate</li>
            </ul>
          </div>
        </section>

        <section className={styles.section}>
          <SectionFAQ
            title="Întrebări frecvente – Vulcanizare camioane / TIR"
            items={faqTirItems}
          />
        </section>

        <section className={styles.section}>
          <SectionContact />
        </section>
      </main>
    </div>
  );
}