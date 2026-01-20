import { defaultMetadata } from "../../lib/seo.js";
import { SITE } from "../../lib/config.js";

export const metadata = defaultMetadata({
  title: "Termeni, condiții & informații legale",
  description: `Termeni și condiții de utilizare pentru ${SITE.brand}.`,
  path: "/termeni",
});

function Box({ children }) {
  return (
    <div
      style={{
        border: "1px solid rgba(255,255,255,.10)",
        background: "rgba(255,255,255,.03)",
        borderRadius: 16,
        padding: 14,
      }}
    >
      {children}
    </div>
  );
}

export default function TermeniPage() {
  const L = SITE.legal;

  return (
    <main style={{ maxWidth: 920, margin: "0 auto", padding: "32px 16px" }}>
      <h1 style={{ margin: 0 }}>Termeni, condiții & informații legale</h1>
      <p style={{ opacity: 0.8, marginTop: 8 }}>
        Ultima actualizare: <b>{L.updatedAt}</b>
      </p>

      <Box>
        <div style={{ fontWeight: 900, marginBottom: 6 }}>Operatorul site-ului / prestator</div>
        <div style={{ opacity: 0.9, lineHeight: 1.5 }}>
          <b>{L.company}</b>, sediul: {L.hq}
          <br />
          ONRC: {L.reg} · CUI: {L.cui}
          <br />
          E-mail: <a href={`mailto:${L.email}`}>{L.email}</a> · Tel:{" "}
          <a href={`tel:${L.tel}`}>{L.tel}</a>
        </div>
      </Box>

      <section style={{ marginTop: 18 }}>
        <h2>Cuprins</h2>
        <ol style={{ lineHeight: 1.7, opacity: 0.9 }}>
          <li><a href="#t1">Termeni & condiții</a></li>
          <li><a href="#t2">Plăți, rezervări, facturare</a></li>
          <li><a href="#t3">Anulări, reprogramări, rambursări</a></li>
          <li><a href="#t4">Garanții, răspundere, limitări</a></li>
          <li><a href="#t5">Drepturile consumatorului & soluționarea litigiilor</a></li>
          <li><a href="#t6">Contact legal</a></li>
        </ol>
      </section>

      <section id="t1" style={{ marginTop: 24 }}>
        <h2>1) Termeni & condiții</h2>
        <p style={{ opacity: 0.92, lineHeight: 1.55 }}>
          Acest site aparține {L.company} și are rol de prezentare și preluare solicitări pentru servicii de vulcanizare mobilă
          (ex: pană, schimb roată, asistență rutieră ușoară), prestate la locația indicată de client, în aria {SITE.serviceAreaLabel}.
        </p>

        <ul style={{ opacity: 0.92, lineHeight: 1.6 }}>
          <li><b>Acceptare:</b> utilizarea site-ului și transmiterea unei solicitări înseamnă acceptarea acestor termeni.</li>
          <li><b>Eligibilitate:</b> pentru a comanda, trebuie să ai cel puțin 18 ani.</li>
          <li>
            <b>Confirmare:</b> intervenția se consideră confirmată după acceptarea solicitării (telefon/WhatsApp) și stabilirea detaliilor
            (locație, tip serviciu, interval).
          </li>
          <li>
            <b>Prețuri:</b> tarifele sunt în lei și pot varia în funcție de distanță, urgență, oră, dimensiuni roți/anvelope,
            dificultate sau condiții din teren. Orice cost suplimentar se comunică înainte de execuție.
          </li>
          <li><b>Disponibilitate:</b> intervențiile depind de disponibilitate, trafic, condiții meteo și siguranță.</li>
          <li><b>Forță majoră:</b> evenimente neprevăzute (accidente, blocaje, vreme severă) pot întârzia sau împiedica intervenția.</li>
          <li><b>Drepturi autor:</b> conținutul (texte, grafică, cod, logo) este protejat; copierea fără acord scris este interzisă.</li>
        </ul>
      </section>

      <section id="t2" style={{ marginTop: 22 }}>
        <h2>2) Plăți, rezervări, facturare</h2>
        <p style={{ opacity: 0.92, lineHeight: 1.55 }}>
          Solicitările se pot face telefonic/WhatsApp sau prin formularele de pe site (dacă sunt disponibile), iar confirmarea se face printr-un canal agreat.
        </p>

        <ul style={{ opacity: 0.92, lineHeight: 1.6 }}>
          <li><b>Plată:</b> numerar / card la fața locului (dacă dotarea echipei permite) sau transfer bancar (dacă este comunicat).</li>
          <li><b>Factură:</b> se emite pe datele furnizate de client, acolo unde este cazul. Verifică datele transmise.</li>
          <li>
            <b>Deviz actualizat:</b> dacă situația din teren diferă semnificativ de informațiile inițiale (dimensiuni, blocaje, acces, jante speciale etc.),
            îți comunicăm diferențele înainte de a continua.
          </li>
        </ul>
      </section>

      <section id="t3" style={{ marginTop: 22 }}>
        <h2>3) Anulări, reprogramări, rambursări</h2>
        <ul style={{ opacity: 0.92, lineHeight: 1.6 }}>
          <li><b>Anulare:</b> recomandat cu minimum 12–24h înainte (în funcție de interval și disponibilitate).</li>
          <li>
            <b>Deplasare efectuată:</b> dacă echipa ajunge și intervenția nu poate fi prestată din motive imputabile clientului
            (adresă greșită, lipsă acces, lipsă răspuns), se poate percepe taxa de deplasare.
          </li>
          <li><b>Reprogramare:</b> se face în limita disponibilității, preferabil cu minimum 12–24h înainte.</li>
          <li>
            <b>Rambursări:</b> dacă există plăți online (în funcție de integrare), rambursarea se face pe același instrument de plată,
            în 3–14 zile lucrătoare (în funcție de bancă/procesator).
          </li>
          <li><b>Urgențe:</b> serviciile începute/prestate cu acordul clientului nu sunt rambursabile pentru partea deja efectuată.</li>
        </ul>
      </section>

      <section id="t4" style={{ marginTop: 22 }}>
        <h2>4) Garanții, răspundere, limitări</h2>
        <ul style={{ opacity: 0.92, lineHeight: 1.6 }}>
          <li><b>Garanție manoperă:</b> pentru defecte de execuție confirmate de noi, conform bonului/facturii și înțelegerii.</li>
          <li>
            <b>Excluderi:</b> uzură, lovituri/gropi, jante deformate, defecte preexistente, TPMS defect, materiale neconforme sau cauze externe.
          </li>
          <li><b>Piese/consumabile:</b> acoperite de garanția producătorului, unde se aplică.</li>
          <li>
            <b>Limitare răspundere:</b> nu răspundem pentru pierderi indirecte (timp, venit nerealizat).
            Răspunderea totală (dacă e cazul) nu depășește valoarea serviciului prestat.
          </li>
          <li><b>Obligații client:</b> acces sigur la vehicul și informații corecte despre problemă/locație.</li>
        </ul>
      </section>

      <section id="t5" style={{ marginTop: 22 }}>
        <h2>5) Drepturile consumatorului & soluționarea litigiilor</h2>
        <p style={{ opacity: 0.92, lineHeight: 1.55 }}>
          Pentru servicii contractate la distanță pot fi aplicabile prevederi specifice (de exemplu OUG 34/2014),
          cu particularități pentru servicii deja prestate/în curs.
        </p>

        <ul style={{ opacity: 0.92, lineHeight: 1.6 }}>
          <li>
            <b>Sesizări:</b> ne poți scrie la <a href={`mailto:${L.email}`}>{L.email}</a>. Încercăm să răspundem în 48–72h (zile lucrătoare).
          </li>
          <li><b>ANPC:</b> consumator.gov.ro</li>
          <li><b>ODR/SOL:</b> platforma europeană de soluționare online a litigiilor.</li>
        </ul>

        <p style={{ opacity: 0.75, marginTop: 10 }}>
          Notă: linkurile către platformele publice pot varia în timp; poți căuta “ANPC” / “ODR” pentru acces rapid.
        </p>
      </section>

      <section id="t6" style={{ marginTop: 22 }}>
        <h2>6) Contact legal</h2>
        <p style={{ opacity: 0.92, lineHeight: 1.55 }}>
          {L.company} · ONRC {L.reg} · CUI {L.cui}
          <br />
          E-mail: <a href={`mailto:${L.email}`}>{L.email}</a> · Tel:{" "}
          <a href={`tel:${L.tel}`}>{L.tel}</a>
        </p>
      </section>

      <div style={{ marginTop: 28 }}>
        <a href="/" style={{ textDecoration: "underline" }}>← Înapoi acasă</a>
      </div>
    </main>
  );
}
