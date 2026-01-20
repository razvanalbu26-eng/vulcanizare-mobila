import styles from "./SectionBlock.module.css";
import FAQ from "../FAQ/FAQ";

export default function SectionFAQ() {
  const items = [
    {
      q: "Interveniți pe Autostrada A7?",
      a: (
        <>
          Da, intervenim pe Autostrada A7 și în zonele limitrofe.
          <br /><br />
          Trimite locația sau kilometrul + sensul de mers și îți confirmăm imediat dacă ești în aria de acoperire.
        </>
      ),
    },
    {
      q: "În cât timp ajungeți după ce trimit solicitarea?",
      a: (
        <>
          După ce primim locația, îți comunicăm rapid un ETA orientativ.
          <br /><br />
          Pe autostradă, de regulă ajungem mai repede datorită traficului fluent.
        </>
      ),
    },
    {
      q: "Ce fac dacă nu pot trimite locația GPS?",
      a: (
        <>
          Dacă GPS-ul nu funcționează, ne poți spune:
          <ul>
            <li>kilometrul aproximativ</li>
            <li>sensul de mers</li>
            <li>un reper vizibil (parcare, benzinărie, ieșire)</li>
          </ul>
          Aceste informații sunt suficiente pentru a ajunge la tine.
        </>
      ),
    },
    {
      q: "Interveniți și pentru autoutilitare sau camioane (TIR)?",
      a: (
        <>
          Da, intervenim și pentru autoutilitare, dube și camioane.
          <br /><br />
          Menționează tipul vehiculului când ne contactezi pentru a veni echipați corespunzător.
        </>
      ),
    },
    {
      q: "Cum pot lua legătura cel mai rapid cu voi?",
      a: (
        <>
          Cel mai rapid este prin telefon sau WhatsApp.
          <br /><br />
          <a href="tel:0774087678">📞 Sună acum</a>
          {" "}sau{" "}
          <a
            href="https://wa.me/40774087678"
            target="_blank"
            rel="noreferrer"
          >
            💬 scrie pe WhatsApp
          </a>
        </>
      ),
    },
  ];

  return (
    <div className={styles.wrap}>
      <div className={styles.head}>
        <h2 className={styles.h2}>Întrebări frecvente</h2>
        <p className={styles.p}>
          Răspunsuri rapide, clare, fără explicații inutile.
        </p>
      </div>

      <FAQ items={items} />
    </div>
  );
}
