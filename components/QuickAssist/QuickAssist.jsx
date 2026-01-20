"use client";

import { useMemo, useState } from "react";
import { SITE } from "../../lib/config";
import styles from "./QuickAssist.module.css";

const ISSUES = [
  "Pană roată",
  "Anvelopă tăiată",
  "Vulcanizare",
  "Schimb roată",
  "Camion / TIR",
];

const DIRECTIONS = ["Spre Buzău", "Dinspre Buzău", "Spre Râmnicu Sărat", "Spre București"];
const ROAD_TYPES = ["Autostradă", "DN / E", "Oraș"];

export default function QuickAssist() {
  const [mode, setMode] = useState("gps"); // "gps" | "manual"
  const [phone, setPhone] = useState("");
  const [reper, setReper] = useState("");
  const [issue, setIssue] = useState(ISSUES[0]);

  // manual
  const [roadType, setRoadType] = useState("Autostradă");
  const [direction, setDirection] = useState(DIRECTIONS[0]);
  const [km, setKm] = useState(35);

  // gps
  const [loc, setLoc] = useState(null); // {lat,lng}
  const [err, setErr] = useState("");
  const [loading, setLoading] = useState(false);

  const mapsUrl = useMemo(() => {
    if (!loc) return "";
    return `https://maps.google.com/?q=${loc.lat},${loc.lng}`;
  }, [loc]);

  // ✅ km max diferit (autostradă mai mare)
  const maxKm = useMemo(() => {
    if (roadType === "Autostradă") return SITE.highwayRadiusKm ?? 120;
    if (roadType === "DN / E") return Math.max(SITE.serviceRadiusKm, 80);
    return SITE.serviceRadiusKm;
  }, [roadType]);

  // ✅ ETA mai realist, în funcție de tip drum
  const etaMin = useMemo(() => {
    const speed = SITE.speedKmhByRoad?.[roadType] ?? 70;
    return Math.max(8, Math.round((km / speed) * 60));
  }, [km, roadType]);

  // dacă user a tras sliderul peste max și schimbă roadType, îl “aducem” înapoi
  useMemo(() => {
    if (km > maxKm) setKm(maxKm);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [maxKm]);

  const waText = useMemo(() => {
    const parts = [
      `Salut! Am nevoie de ${SITE.brand}.`,
      `Problemă: ${issue}.`,
      phone ? `Telefon: ${phone}.` : null,

      mode === "gps"
        ? loc
          ? `Locație (GPS): ${mapsUrl}`
          : `Locație: (încerc să trimit GPS)`
        : `Poziție estimată: ${roadType} · ${direction} · aprox. km ${km}${reper ? ` · Reper: ${reper}` : ""}.`,

      mode === "manual" ? `ETA estimativ: ~${etaMin} min (în funcție de trafic).` : null,
      `Plecare: ${SITE.baseLabel ?? "bază"}`,
    ].filter(Boolean);

    return encodeURIComponent(parts.join("\n"));
  }, [issue, phone, mode, loc, mapsUrl, roadType, direction, km, reper, etaMin]);

  const waUrl = `https://wa.me/${SITE.whatsappPhone}?text=${waText}`;

  function getLocation() {
    setErr("");
    if (!navigator.geolocation) {
      setErr("Browser-ul nu suportă locația. Alege „Fără GPS” și completează km + reper.");
      return;
    }
    setLoading(true);
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        setLoading(false);
        setLoc({ lat: pos.coords.latitude, lng: pos.coords.longitude });
      },
      (e) => {
        setLoading(false);
        if (e?.code === 1) setErr("Locația e blocată. Permite Location din setările site-ului și reîncarcă.");
        else setErr("Nu am putut prelua locația. Încearcă din nou sau folosește modul „Fără GPS”.");
      },
      { enableHighAccuracy: true, timeout: 8000, maximumAge: 30000 }
    );
  }

  return (
    <section className={styles.card}>
      <header className={styles.header}>
        <div className={styles.titleWrap}>
          <div className={styles.kicker}>
            <span className={styles.dot} />
            Estimator intervenție • {SITE.serviceAreaLabel}
          </div>
          <h3 className={styles.h3}>Trimite solicitarea în 30 secunde</h3>
          <p className={styles.sub}>
            Alegi metoda (GPS / fără GPS), completezi detaliile și trimiți direct pe WhatsApp.
          </p>
        </div>

        <div className={styles.badges}>
          <span className={styles.badge}>Factură & garanție</span>
          <span className={styles.badge}>Cash / Card</span>
          <span className={styles.badge}>ETA orientativ</span>
        </div>
      </header>

      {err && <div className={styles.error}>{err}</div>}

      <div className={styles.grid}>
        <aside className={styles.side}>
          <div className={styles.sideCard}>
            <div className={styles.sideTitle}>Cum lucrăm</div>
            <ul className={styles.steps}>
              <li><span className={styles.stepNum}>1</span> Confirmare rapidă pe WhatsApp / telefon</li>
              <li><span className={styles.stepNum}>2</span> Reper + poză (dacă e cazul) pentru identificare</li>
              <li><span className={styles.stepNum}>3</span> Plecăm și îți comunicăm ETA actualizat</li>
            </ul>
          </div>

          <div className={styles.sideCard}>
            <div className={styles.sideTitle}>Arie acoperire</div>
            <div className={styles.mini}>
              <div>
                <div className={styles.miniLabel}>Standard</div>
                <div className={styles.miniValue}>{SITE.serviceRadiusKm} km</div>
              </div>
              <div>
                <div className={styles.miniLabel}>Autostradă</div>
                <div className={styles.miniValue}>{SITE.highwayRadiusKm ?? 120} km</div>
              </div>
            </div>
            <div className={styles.note}>
              Pe autostradă putem acoperi distanțe mai mari datorită vitezei constante. În oraș/DN, timpul poate varia.
            </div>
          </div>
        </aside>

        <div className={styles.form}>
          <div className={styles.row}>
            <label className={styles.label}>Problemă</label>
            <select className={styles.input} value={issue} onChange={(e) => setIssue(e.target.value)}>
              {ISSUES.map((x) => (
                <option key={x}>{x}</option>
              ))}
            </select>
          </div>

          <div className={styles.row2}>
            <div>
              <label className={styles.label}>Telefon (opțional)</label>
              <input
                className={styles.input}
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="07xx xxx xxx"
                inputMode="tel"
              />
            </div>

            <div>
              <label className={styles.label}>Reper (opțional)</label>
              <input
                className={styles.input}
                value={reper}
                onChange={(e) => setReper(e.target.value)}
                placeholder="ex: km, ieșire, benzinărie"
              />
            </div>
          </div>

          <div className={styles.mode}>
            <button
              type="button"
              className={`${styles.modeBtn} ${mode === "gps" ? styles.active : ""}`}
              onClick={() => setMode("gps")}
            >
              Cu GPS
            </button>
            <button
              type="button"
              className={`${styles.modeBtn} ${mode === "manual" ? styles.active : ""}`}
              onClick={() => setMode("manual")}
            >
              Fără GPS
            </button>
          </div>

          {mode === "gps" ? (
            <div className={styles.panel}>
              <div className={styles.panelHead}>
                <div>
                  <div className={styles.panelTitle}>Trimite locația automată</div>
                  <div className={styles.panelSub}>Recomandat dacă ești pe A7 / E85 și ai semnal bun.</div>
                </div>
                <button type="button" className={styles.ghost} onClick={getLocation} disabled={loading}>
                  {loading ? "Se preia…" : "📍 Preia locația"}
                </button>
              </div>

              {loc ? (
                <div className={styles.ok}>
                  <div className={styles.okLine}>
                    <span className={styles.okDot} />
                    Locație capturată
                  </div>
                  <a className={styles.link} href={mapsUrl} target="_blank" rel="noreferrer">
                    Deschide în Maps
                  </a>
                </div>
              ) : (
                <div className={styles.hint}>Dacă nu merge, treci pe “Fără GPS” și pune tip drum + km + sens.</div>
              )}
            </div>
          ) : (
            <div className={styles.panel}>
              <div className={styles.panelHead}>
                <div>
                  <div className={styles.panelTitle}>Estimare pe tip drum + km</div>
                  <div className={styles.panelSub}>Autostrada permite distanțe mai mari. ETA este orientativ.</div>
                </div>
                <div className={styles.pill}>ETA ~ {etaMin} min</div>
              </div>

              <div className={styles.row2}>
                <div>
                  <label className={styles.label}>Tip drum</label>
                  <select className={styles.input} value={roadType} onChange={(e) => setRoadType(e.target.value)}>
                    {ROAD_TYPES.map((x) => (
                      <option key={x}>{x}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className={styles.label}>Sens</label>
                  <select className={styles.input} value={direction} onChange={(e) => setDirection(e.target.value)}>
                    {DIRECTIONS.map((x) => (
                      <option key={x}>{x}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div className={styles.row}>
                <label className={styles.label}>Km estimat (max {maxKm} km)</label>
                <div className={styles.kmWrap}>
                  <input
                    type="range"
                    min={0}
                    max={maxKm}
                    step={5}
                    value={km}
                    onChange={(e) => setKm(Number(e.target.value))}
                    className={styles.range}
                  />
                  <div className={styles.kmValue}>{km} km</div>
                </div>
                <div className={styles.ticks}>
                  <span>0</span>
                  <span>{Math.round(maxKm / 2)}</span>
                  <span>{maxKm}</span>
                </div>

                <div className={styles.hint}>
                  Tip: Reperul ajută mult (ex: “km 52, parcare dreapta”, “ieșire X”, “OMV”). Pe autostradă acoperirea e
                  mai mare.
                </div>
              </div>
            </div>
          )}

          <div className={styles.cta}>
            <a className={styles.primary} href={waUrl} target="_blank" rel="noopener noreferrer">
              💬 Trimite pe WhatsApp
            </a>
            <a className={styles.secondary} href={`tel:${SITE.phone}`}>
              📞 Sună acum
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
