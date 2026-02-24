// src/lib/faqItems.jsx
import React from "react";

const phoneTel = "tel:0774087678";
const waLink = "https://wa.me/40774087678";

const contactNode = (
  <>
    Cel mai rapid este prin telefon sau WhatsApp.
    <br /><br />
    <a href={phoneTel}>📞 Sună acum</a>
    {" "}sau{" "}
    <a href={waLink} target="_blank" rel="noreferrer">
      💬 scrie pe WhatsApp
    </a>
  </>
);

export const faqBuzauItems = [
  {
    q: "În cât timp ajungeți în Buzău?",
    a: (
      <>
        După ce primim locația, îți comunicăm rapid un <strong>ETA orientativ</strong>.
        <br /><br />
        Timpul depinde de distanță și trafic. Trimite locația pe WhatsApp ca să îți confirmăm.
      </>
    ),
  },
  {
    q: "Interveniți 24/7 în Buzău?",
    a: (
      <>
        Da, intervenim <strong>non-stop</strong>, inclusiv seara și în weekend, în funcție de disponibilitate.
      </>
    ),
  },
  {
    q: "Ce informații să trimit pe WhatsApp?",
    a: (
      <>
        Trimite:
        <ul>
          <li>locația (share location)</li>
          <li>tipul vehiculului (auto / utilitară / camion)</li>
          <li>problema (pană, anvelopă tăiată, schimb roată)</li>
          <li>dimensiunea anvelopei (dacă o știi)</li>
        </ul>
      </>
    ),
  },
  {
    q: "Aveți anvelope noi și SH?",
    a: (
      <>
        Da, în funcție de <strong>stoc</strong> și <strong>dimensiune</strong>. Spune dimensiunea și îți confirmăm rapid.
      </>
    ),
  },
  {
    q: "Interveniți și pe E85/DN2 sau spre A7?",
    a: (
      <>
        Da, în funcție de distanță și disponibilitate.
        <br /><br />
        Trimite locația și îți confirmăm imediat dacă ești în aria de acoperire.
      </>
    ),
  },
  {
    q: "Cum pot lua legătura cel mai rapid cu voi?",
    a: contactNode,
  },
];

export const faqA7Items = [
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
    a: contactNode,
  },
];

export const faqTirItems = [
  {
    q: "Interveniți pentru camioane/TIR 24/7?",
    a: (
      <>
        Da, intervenim <strong>non-stop</strong>, în funcție de disponibilitate și condiții de siguranță la locație.
      </>
    ),
  },
  {
    q: "Ce trebuie să trimit ca să veniți echipați corect?",
    a: (
      <>
        Trimite:
        <ul>
          <li>locația exactă (share location)</li>
          <li>tip vehicul (cap tractor / semiremorcă)</li>
          <li>poziția roții (față/spate/semiremorcă)</li>
          <li>dimensiunea anvelopei (ex: 315/80 R22.5) dacă o știi</li>
        </ul>
        Dacă poți, trimite și o poză – ajută mult.
      </>
    ),
  },
  {
    q: "Interveniți și la roți duble?",
    a: (
      <>
        În funcție de acces și siguranță, da. O poză + locația ajută să confirmăm rapid.
      </>
    ),
  },
  {
    q: "Aveți anvelope pentru camion/TIR?",
    a: (
      <>
        În funcție de stoc și dimensiune. Îți confirmăm imediat după ce ne spui dimensiunea.
      </>
    ),
  },
  {
    q: "Cum iau legătura cel mai rapid cu voi?",
    a: contactNode,
  },
];