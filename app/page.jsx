// src/app/page.jsx
import styles from "../components/Sections/Sections.module.css";
import { SITE } from "../lib/config.js";
import { defaultMetadata } from "../lib/seo.js";

import SectionHero from "../components/Sections/SectionHero/SectionHero.jsx";
import SectionServices from "../components/Sections/SectionServices/SectionServices.jsx";
import SectionCoverage from "../components/Sections/SectionCoverage.jsx";
import SectionFAQ from "../components/Sections/SectionFaq.jsx";
import SectionContact from "../components/Sections/SectionContact.jsx";
import SectionAssist from "../components/Sections/SectionAssist.jsx";
import SectionReviews from "../components/Sections/SectionReviews.jsx";
import SectionGallery from "../components/Sections/SectionGaleery"; // ajustează dacă ai alt nume
export const metadata = defaultMetadata({
  title:
    "Vulcanizare mobilă 24/7 A7 – Anvelope noi & SH | Autoturisme și Camioane – La Răzvan",
  description:
    "Vulcanizare mobilă non-stop pe Autostrada A7 și în județul Buzău. Înlocuire anvelope la fața locului (noi și SH) pentru autoturisme, camioane și TIR-uri. Intervenții rapide.",
  path: "/",
});

export default function HomePage() {
  return (
    <div className={styles.page}>
      <main className={styles.main}>
        <section id="hero" className={styles.section}>
          <SectionHero />
        </section>

        <section id="coverage" className={styles.section}>
          <SectionCoverage />
        </section>

        <section id="reviews" className={styles.section}>
          <SectionReviews />
        </section>
        
        <section id="services" className={styles.section}>
          <SectionServices />
        </section>

        <section id="assist" className={styles.section}>
          <SectionAssist />
        </section>


        <section id="gallery" className={styles.section}>
          <SectionGallery />
        </section>

        <section id="faq" className={styles.section}>
          <SectionFAQ />
        </section>

        <section id="contact" className={styles.section}>
          <SectionContact />
        </section>
      </main>

      <footer className={styles.footer}>
  <div className={styles.footerInner}>

    <div className={styles.footerLeft}>
      <div>
        © {new Date().getFullYear()} {SITE.brand}. Toate drepturile rezervate.
      </div>

      <div className={styles.footerMeta}>
        Intervenție: {SITE.serviceAreaLabel} · {SITE.baseLabel}
      </div>
    </div>

    <div className={styles.footerRight}>

      <div>
        <strong>Informații</strong>

        <a className={styles.footerLink} href="/termeni">
          Termeni și condiții
        </a>

        <a className={styles.footerLink} href="/confidentialitate">
          Politica de confidențialitate
        </a>
      </div>

      <div>
        <strong>Servicii</strong>

        <a className={styles.footerLink} href="/vulcanizare-auto-buzau">
          Vulcanizare auto Buzău
        </a>

        <a className={styles.footerLink} href="/vulcanizare-camioane">
          Vulcanizare camioane / TIR
        </a>

        <a className={styles.footerLink} href="/anvelope-noi-si-sh">
          Anvelope noi și SH
        </a>
      </div>

      <div>
        <strong>Zone</strong>

        <a className={styles.footerLink} href="/vulcanizare-mobila-buzau">
          Vulcanizare mobilă Buzău
        </a>

        <a className={styles.footerLink} href="/vulcanizare-mobila-a7">
          Vulcanizare mobilă A7
        </a>

        <a className={styles.footerLink} href="/vulcanizare-mobila-e85">
          Vulcanizare mobilă E85
        </a>
        <a className={styles.footerLink} href="/vulcanizare-mobila-maracineni">
  Vulcanizare mobilă Mărăcineni
</a>
<a className={styles.footerLink} href="/vulcanizare-mobila-vernesti">
  Vulcanizare mobilă Vernești
</a>
<a className={styles.footerLink} href="/vulcanizare-mobila-smeeni">
  Vulcanizare mobilă Smeeni
</a>

      </div>

    </div>
  </div>
</footer>
    </div>
  );
}
