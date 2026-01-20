import { defaultMetadata } from "../../lib/seo.js";
import { SITE } from "../../lib/config.js";

export const metadata = defaultMetadata({
  title: "Confidențialitate & cookie",
  description: `Politica de confidențialitate pentru ${SITE.brand}.`,
  path: "/confidentialitate",
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

export default function ConfidentialitatePage() {
  const L = SITE.legal;

  return (
    <main style={{ maxWidth: 920, margin: "0 auto", padding: "32px 16px" }}>
      <h1 style={{ margin: 0 }}>Politica de confidențialitate (GDPR) & cookie</h1>
      <p style={{ opacity: 0.8, marginTop: 8 }}>
        Ultima actualizare: <b>{L.updatedAt}</b>
      </p>

      <Box>
        <div style={{ fontWeight: 900, marginBottom: 6 }}>Operator de date</div>
        <div style={{ opacity: 0.9, lineHeight: 1.5 }}>
          <b>{L.company}</b> · ONRC {L.reg} · CUI {L.cui}
          <br />
          E-mail: <a href={`mailto:${L.email}`}>{L.email}</a> · Tel:{" "}
          <a href={`tel:${L.tel}`}>{L.tel}</a>
        </div>
      </Box>

      <section style={{ marginTop: 18 }}>
        <h2>1) Despre această politică</h2>
        <p style={{ opacity: 0.92, lineHeight: 1.55 }}>
          Aici explicăm ce date putem prelucra atunci când ne contactezi pentru o intervenție, de ce le folosim și ce opțiuni ai.
          Prelucrăm datele conform GDPR (Reg. UE 2016/679) și legislației aplicabile din România (inclusiv Legea 506/2004).
        </p>
      </section>

      <section style={{ marginTop: 18 }}>
        <h2>2) Ce date putem prelucra</h2>
        <ul style={{ opacity: 0.92, lineHeight: 1.6 }}>
          <li><b>Date de contact:</b> nume (dacă îl oferi), telefon, e-mail.</li>
          <li><b>Detalii solicitare:</b> tip problemă, reper, mesaje (telefon/WhatsApp/SMS/e-mail).</li>
          <li><b>Locație:</b> doar dacă alegi să o trimiți (GPS / link Maps / coordonate).</li>
          <li><b>Date tehnice:</b> IP, device/browser, cookie-uri (vezi secțiunea Cookie).</li>
        </ul>
      </section>

      <section style={{ marginTop: 18 }}>
        <h2>3) Scopurile prelucrării</h2>
        <ul style={{ opacity: 0.92, lineHeight: 1.6 }}>
          <li><b>Intervenția:</b> preluare cerere, confirmare, ETA, deplasare și prestare.</li>
          <li><b>Comunicare:</b> actualizări legate de solicitare (de exemplu pe WhatsApp/telefon).</li>
          <li><b>Legal:</b> facturare/contabilitate unde este cazul.</li>
          <li><b>Securitate:</b> protecția site-ului și prevenirea abuzurilor.</li>
        </ul>
      </section>

      <section style={{ marginTop: 18 }}>
        <h2>4) Temeiuri legale (GDPR)</h2>
        <ul style={{ opacity: 0.92, lineHeight: 1.6 }}>
          <li><b>Contract / demersuri precontractuale</b> (art. 6(1)(b)) – pentru a răspunde și a presta serviciul.</li>
          <li><b>Obligații legale</b> (art. 6(1)(c)) – acolo unde există cerințe de evidență/facturare.</li>
          <li><b>Interes legitim</b> (art. 6(1)(f)) – securitate, îmbunătățire servicii, prevenirea fraudei.</li>
          <li><b>Consimțământ</b> (art. 6(1)(a)) – cookie-uri opționale/marketing (dacă sunt folosite).</li>
        </ul>
      </section>

      <section style={{ marginTop: 18 }}>
        <h2>5) WhatsApp / servicii terțe</h2>
        <p style={{ opacity: 0.92, lineHeight: 1.55 }}>
          Dacă ne scrii pe WhatsApp, comunicarea este gestionată și de WhatsApp/Meta conform politicilor lor.
          Noi folosim mesajele strict pentru a gestiona solicitarea ta și intervenția.
        </p>
      </section>

      <section style={{ marginTop: 18 }}>
        <h2>6) Păstrarea datelor</h2>
        <p style={{ opacity: 0.92, lineHeight: 1.55 }}>
          Păstrăm datele cât este necesar pentru comunicare și evidențe operaționale, plus perioadele impuse de lege
          pentru documente contabile (unde se aplică). Durata poate diferi în funcție de tipul solicitării.
        </p>
      </section>

      <section style={{ marginTop: 18 }}>
        <h2>7) Cookie</h2>
        <p style={{ opacity: 0.92, lineHeight: 1.55 }}>
          Site-ul poate utiliza cookie-uri pentru funcționare și, opțional, pentru statistici/marketing (în funcție de ce ai activat).
        </p>
        <ul style={{ opacity: 0.92, lineHeight: 1.6 }}>
          <li><b>Necesare:</b> funcționare și securitate (nu pot fi dezactivate din banner).</li>
          <li><b>Statistice:</b> măsurarea traficului (de regulă pe baza consimțământului).</li>
          <li><b>Marketing:</b> remarketing/identificatori (doar cu consimțământ).</li>
        </ul>
        <p style={{ opacity: 0.92, lineHeight: 1.55 }}>
          Dacă ai un banner de consimțământ, îți poți schimba opțiunile oricând din „Preferințe cookie” (dacă ai implementat această funcție).
        </p>
      </section>

      <section style={{ marginTop: 18 }}>
        <h2>8) Drepturile tale</h2>
        <ul style={{ opacity: 0.92, lineHeight: 1.6 }}>
          <li>acces, rectificare, ștergere</li>
          <li>restricționare, portabilitate</li>
          <li>opoziție</li>
          <li>retragerea consimțământului (unde se aplică)</li>
        </ul>

        <p style={{ opacity: 0.92, lineHeight: 1.55 }}>
          Pentru solicitări privind datele tale:{" "}
          <a href={`mailto:${L.email}`}>{L.email}</a> sau{" "}
          <a href={`tel:${L.tel}`}>{L.tel}</a>.
        </p>

        <Box>
          <div style={{ fontWeight: 900, marginBottom: 6 }}>Responsabil protecția datelor (DPO)</div>
          <div style={{ opacity: 0.9, lineHeight: 1.5 }}>
            DPO: {L.dpo || "N/A"} · Contact:{" "}
            <a href={`mailto:${L.dpoEmail || L.email}`}>{L.dpoEmail || L.email}</a>
          </div>
        </Box>

        <p style={{ opacity: 0.92, lineHeight: 1.55, marginTop: 12 }}>
          Dacă consideri că drepturile tale au fost încălcate, poți depune o plângere la ANSPDCP.
        </p>
      </section>

      <div style={{ marginTop: 28 }}>
        <a href="/" style={{ textDecoration: "underline" }}>← Înapoi acasă</a>
      </div>
    </main>
  );
}
