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
  title: "Vulcanizare mobilă Smeeni 24/7 – Pană, schimb roată | La Răzvan",
  description:
    "Vulcanizare mobilă în Smeeni și localitățile apropiate. Intervenții non-stop pentru pană, schimb roată, anvelope noi și SH, autoturisme, utilitare și camioane.",
  path: "/vulcanizare-mobila-smeeni",
});

export default function Page() {
  return (
    <div className={styles.page}>
      <main className={styles.main}>
        <section className={styles.section}>
          <div style={{ maxWidth: 920, margin: "0 auto", padding: "24px 16px" }}>
            <h1 style={{ marginTop: 0 }}>
              Vulcanizare mobilă Smeeni – intervenții rapide 24/7
            </h1>

            <p style={{ opacity: 0.9, lineHeight: 1.7 }}>
              Ai făcut pană în Smeeni sau ai nevoie de schimb roată la fața
              locului? Vulcanizare Mobilă La Răzvan intervine rapid pentru
              autoturisme, SUV-uri, utilitare, camioane și TIR.
            </p>

            <p style={{ opacity: 0.9, lineHeight: 1.7 }}>
              Trimite locația pe WhatsApp și îți comunicăm timpul estimativ de
              sosire. Intervenim direct la locul unde te afli și încercăm să
              rezolvăm problema cât mai rapid.
            </p>

            <div style={{ marginTop: 18 }}>
              <CTAButtons />
            </div>
          </div>
        </section>

        <section className={styles.section}>
          <div style={{ maxWidth: 920, margin: "0 auto", padding: "0 16px" }}>
            <h2>Zone acoperite în apropiere de Smeeni</h2>

            <p style={{ opacity: 0.9, lineHeight: 1.7 }}>
              Intervenim în Smeeni și localitățile apropiate, inclusiv
              Moisica, Călțuna, Udati, Buzău și pe drumurile județene din zonă.
              În funcție de distanță putem interveni și pe E85 sau A7.
            </p>

            <h2 style={{ marginTop: 34 }}>
              Servicii oferite
            </h2>

            <ul style={{ lineHeight: 1.9 }}>
              <li>✔ Schimb roată la fața locului</li>
              <li>✔ Pană auto</li>
              <li>✔ Înlocuire anvelope noi și SH (în funcție de stoc)</li>
              <li>✔ Autoturisme, SUV-uri și utilitare</li>
              <li>✔ Camioane și TIR</li>
              <li>✔ Intervenții 24/7</li>
            </ul>

            <h2 style={{ marginTop: 34 }}>
              De ce să alegi vulcanizarea mobilă?
            </h2>

            <p style={{ opacity: 0.9, lineHeight: 1.7 }}>
              Dacă mașina nu mai poate fi deplasată în siguranță din cauza unei
              pene sau a unei anvelope deteriorate, nu este nevoie să cauți o
              vulcanizare deschisă. Venim direct la locația ta și efectuăm
              intervenția acolo unde te afli.
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
            title="Întrebări frecvente – Vulcanizare mobilă Smeeni"
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