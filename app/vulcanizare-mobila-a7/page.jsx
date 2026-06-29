import styles from "../../components/Sections/Sections.module.css";
import { defaultMetadata } from "../../lib/seo";
import CTAButtons from "../../components/CTAButtons/CTAButtons";
import SectionServices from "../../components/Sections/SectionServices/SectionServices";
import SectionFAQ from "../../components/Sections/SectionFaq";
import SectionContact from "../../components/Sections/SectionContact";
import { faqA7Items } from "../../lib/faqitems.js";

export const metadata = defaultMetadata({
  title:
    "Vulcanizare mobilă A7 24/7 – Pană pe autostradă, schimb roată | La Răzvan",
  description:
    "Vulcanizare mobilă non-stop pe Autostrada A7. Pană roată, schimb roată, intervenții pentru autoturisme și camioane/TIR. Trimite locația pe WhatsApp.",
  path: "/vulcanizare-mobila-a7",
});

export default function Page() {
  return (
    <div className={styles.page}>
      <main className={styles.main}>

        {/* HERO */}
        <section className={styles.section}>
          <div
            style={{
              maxWidth: 920,
              margin: "0 auto",
              padding: "24px 16px",
            }}
          >
            <h1 style={{ marginTop: 0 }}>
              Vulcanizare mobilă pe Autostrada A7 – intervenție 24/7
            </h1>

            <p style={{ opacity: 0.9, lineHeight: 1.7 }}>
              Ai făcut pană pe Autostrada A7? Echipa Vulcanizare Mobilă La
              Răzvan intervine rapid pentru autoturisme, SUV-uri, utilitare,
              camioane și TIR-uri. Venim direct la locația ta și efectuăm
              schimbul roții sau înlocuirea anvelopei atunci când este posibil.
            </p>

            <p style={{ opacity: 0.9, lineHeight: 1.7 }}>
              Pentru o intervenție cât mai rapidă trimite locația pe WhatsApp.
              Vei primi imediat timpul estimativ de sosire (ETA) și toate
              informațiile necesare.
            </p>

            <div style={{ marginTop: 18 }}>
              <CTAButtons />
            </div>
          </div>
        </section>

        {/* SERVICII */}
        <section className={styles.section}>
          <SectionServices />
        </section>

        {/* CONTINUT SEO */}
        <section className={styles.section}>
          <div
            style={{
              maxWidth: 920,
              margin: "0 auto",
              padding: "0 16px",
            }}
          >
            <h2>Ce servicii oferim pe Autostrada A7?</h2>

            <p style={{ lineHeight: 1.7, opacity: 0.9 }}>
              Oferim asistență rutieră și vulcanizare mobilă pentru orice
              situație în care un pneu nu mai poate fi utilizat în siguranță.
              Intervenim atât pentru persoane aflate în tranzit, cât și pentru
              transportatori.
            </p>

            <ul style={{ lineHeight: 1.9 }}>
              <li>✔ Schimb roată la fața locului</li>
              <li>✔ Pană de cauciuc</li>
              <li>✔ Anvelopă explodată sau tăiată</li>
              <li>✔ Înlocuire anvelope noi și SH (în funcție de stoc)</li>
              <li>✔ Autoturisme, SUV-uri și utilitare</li>
              <li>✔ Camioane și TIR</li>
              <li>✔ Disponibilitate 24/7</li>
            </ul>

            <h2 style={{ marginTop: 34 }}>
              Zone acoperite pe A7
            </h2>

            <p style={{ lineHeight: 1.7, opacity: 0.9 }}>
              Intervenim pe Autostrada A7 și în zonele limitrofe din județul
              Buzău, inclusiv ieșirile către E85 și drumurile naționale din
              apropiere. Dacă nu ești sigur că te afli în aria noastră de
              acoperire, trimite locația și îți confirmăm imediat.
            </p>

            <h2 style={{ marginTop: 34 }}>
              De ce să alegi vulcanizarea mobilă?
            </h2>

            <p style={{ lineHeight: 1.7, opacity: 0.9 }}>
              Nu mai este nevoie să cauți o vulcanizare deschisă sau să
              tractezi mașina. Venim direct la tine, economisești timp și poți
              continua drumul în siguranță. Majoritatea intervențiilor sunt
              rezolvate chiar la fața locului.
            </p>
          </div>
        </section>

        {/* FAQ */}
        <section className={styles.section}>
          <SectionFAQ
            title="Întrebări frecvente – Vulcanizare mobilă A7"
            items={faqA7Items}
          />
        </section>

        {/* CONTACT */}
        <section className={styles.section}>
          <SectionContact />
        </section>

      </main>
    </div>
  );
}