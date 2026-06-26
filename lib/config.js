export const SITE = {
  domain: "vulcanizare-mobila-razvan.ro",
  brand: "Vulcanizare Mobilă",

  phone1: "0774087678",
  phone2: "0786989556",
  whatsappPhone: "40786989556",

  serviceAreaLabel: "Autostrada A7 + zone limitrofe",
  availability: "available",

  baseLocation: { lat: 45.1756318, lng: 26.8261073 },
  baseLabel: "E85 nr. 3",

  serviceRadiusKm: 60,
  highwayRadiusKm: 120,

  speedKmhByRoad: {
    Autostradă: 110,
    "DN / E": 75,
    Oraș: 40,
  },

  legal: {
    updatedAt: "12.01.2026",
    company: "VULCANIZARE MOBILĂ NON-STOP LA RĂZVAN SRL",
    hq: "Mărăcineni, jud. Buzău, România",
    reg: "J2023000552104",
    cui: "48280134",
    email: "razvanalbu644@yahoo.com",
    tel: "+40 774 087 678",
    dpo: "N/A",
    dpoEmail: "razvanalbu644@yahoo.com",
  },

  sections: [
    { id: "hero", label: "Acasă" },
    { id: "coverage", label: "Acoperire" },
    { id: "services", label: "Servicii" },
    { id: "assist", label: "Estimare rapidă" },
    { id: "reviews", label: "Recenzii" },
    { id: "gallery", label: "Galerie" },
    { id: "faq", label: "Întrebări" },
    { id: "contact", label: "Contact" },
  ],

  reviews: {
    rating: 4.9,
    countText: "Recenzii Google",
    googleUrl: "https://www.google.com/maps/place/Vulcanizare+Mobil%C4%83+Camioane+%26+Autoturisme+Non-Stop+Buz%C4%83u/@45.1756319,26.8251967,18z/data=!4m6!3m5!1s0x40b167e353397e23:0xcf6f60d25d7e7206!8m2!3d45.1756318!4d26.8261073!16s%2Fg%2F11scny7cs5?entry=ttu&g_ep=EgoyMDI2MDYyMy4wIKXMDSoASAFQAw%3D%3D",
    items: [
      {
        name: "Marius",
        where: "Google",
        stars: 5,
        text: "Am trimis locația pe WhatsApp și am primit ETA imediat. Rapid și profi.",
        date: "Recenzie Google",
      },
      {
        name: "Andreea",
        where: "Google",
        stars: 5,
        text: "Schimb roată pe seară, fără stres. Recomand!",
        date: "Recenzie Google",
      },
      {
        name: "Gabi",
        where: "Google",
        stars: 5,
        text: "Serviciu corect, preț comunicat dinainte. A ajuns repede.",
        date: "Recenzie Google",
      },
    ],
  },

  gallery: {
    items: [
      {
        type: "video",
        src: "/gallery/2026-01-09.mp4",
        poster: "/gallery/2026-01-09.jpg",
        alt: "Intervenție pe autostradă",
      },
      {
        type: "video",
        src: "/gallery/2026-01-10.mp4",
        poster: "/gallery/2026-01-10.jpg",
        alt: "Schimb roată la fața locului",
      },
    ],
  },
};