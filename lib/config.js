export const SITE = {
  brand: "Vulcanizare Mobilă",

  phone: "0774087678", 
  phone: "0786989556",
  whatsappPhone: "40774087678",

  serviceAreaLabel: "Autostrada A7 + zone limitrofe",
  availability: "available",

  baseLocation: { lat: 45.1756318, lng: 26.8261073 },
  baseLabel: "E85 nr. 3",

  // ✅ acoperire standard (oraș / DN)
  serviceRadiusKm: 60,

  // ✅ extra pe autostradă (doar pentru modul „Fără GPS” / estimare)
  highwayRadiusKm: 120,

  // fallback speeds (dacă nu ai OSRM)
  speedKmhByRoad: {
    Autostradă: 110,
    "DN / E": 75,
    Oraș: 40,
  },

  // ✅ Date legale (operator real al serviciului/site-ului)
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
  countText: "100+ intervenții",
  items: [
    {
      name: "Marius",
      where: "A7, km 52",
      stars: 5,
      text: "Am trimis locația pe WhatsApp și am primit ETA imediat. Rapid și profi.",
      date: "Ian 2026",
    },
    {
      name: "Andreea",
      where: "Buzău",
      stars: 5,
      text: "Schimb roată pe seară, fără stres. Recomand!",
      date: "Dec 2025",
    },
    {
      name: "Gabi",
      where: "E85",
      stars: 5,
      text: "Serviciu corect, preț comunicat dinainte. A ajuns repede.",
      date: "Noi 2025",
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
