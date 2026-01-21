"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import styles from "./CoverageMap.module.css";
import { SITE } from "../../lib/config.js";
import { haversineKm, etaMinutes } from "../../lib/geo.js";
import L from "leaflet";

function round1(n) {
  return Math.round(n * 10) / 10;
}
function secToMin(s) {
  return Math.max(1, Math.round(s / 60));
}
function mToKm(m) {
  return m / 1000;
}

export default function CoverageMapInner() {
  const [client, setClient] = useState(null);
  const [err, setErr] = useState("");
  const [gpsLoading, setGpsLoading] = useState(false);
  const [routeLoading, setRouteLoading] = useState(false);

  // Info rută reală (pe drum)
  const [routeInfo, setRouteInfo] = useState(null); // { kmRoad, minRoad }

  const mapDivRef = useRef(null);
  const mapRef = useRef(null);

  const baseMarkerRef = useRef(null);
  const clientMarkerRef = useRef(null);
  const circleRef = useRef(null);
  const tileRef = useRef(null);

  // ✅ 2 linii pentru traseu: halo + linie principală
  const routeHaloRef = useRef(null);
  const routeLineRef = useRef(null);

  const base = useMemo(
    () => ({ lat: SITE.baseLocation.lat, lng: SITE.baseLocation.lng }),
    []
  );

  const basePoint = useMemo(() => [base.lat, base.lng], [base.lat, base.lng]);

  const clientPoint = useMemo(
    () => (client ? [client.lat, client.lng] : null),
    [client]
  );

  const radiusKm = SITE.serviceRadiusKm ?? 60;

  // fallback linie dreaptă (în caz OSRM nu merge)
  const fallback = useMemo(() => {
    if (!client) return null;

    const kmRaw = haversineKm(base, client);
    const km = round1(kmRaw);
    const eta = etaMinutes(kmRaw, SITE.avgSpeedKmh);

    const inCoverage = kmRaw <= radiusKm;
    return { km, eta, inCoverage };
  }, [client, base, radiusKm]);

  // icon fix (Next)
  useEffect(() => {
    const DefaultIcon = L.icon({
      iconUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
      iconRetinaUrl:
        "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png",
      shadowUrl:
        "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
      iconSize: [25, 41],
      iconAnchor: [12, 41],
    });
    L.Marker.prototype.options.icon = DefaultIcon;
  }, []);

  // Init map (bulletproof dev/HMR)
  useEffect(() => {
    const el = mapDivRef.current;
    if (!el) return;

    try {
      if (el._leaflet_id) delete el._leaflet_id;
    } catch {}
    try {
      el.innerHTML = "";
    } catch {}

    const map = L.map(el, {
      scrollWheelZoom: true,
      touchZoom: true,
      doubleClickZoom: true,
      boxZoom: true,
      dragging: true,
      zoomControl: true,
    }).setView(basePoint, 12);

    mapRef.current = map;

    tileRef.current = L.tileLayer(
      "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",
      { attribution: "&copy; OpenStreetMap" }
    ).addTo(map);

    baseMarkerRef.current = L.marker(basePoint)
      .addTo(map)
      .bindPopup(
        `<b>${SITE.baseLabel ?? "Bază"}</b><br/>${base.lat.toFixed(
          4
        )}, ${base.lng.toFixed(4)}`
      );

    circleRef.current = L.circle(basePoint, {
      radius: radiusKm * 1000,
      opacity: 0.35,
      fillOpacity: 0.1,
    }).addTo(map);

    setTimeout(() => {
      try {
        map.invalidateSize();
      } catch {}
    }, 0);

    return () => {
      try {
        map.remove();
      } catch {}

      try {
        if (el._leaflet_id) delete el._leaflet_id;
      } catch {}
      try {
        el.innerHTML = "";
      } catch {}

      mapRef.current = null;
      baseMarkerRef.current = null;
      clientMarkerRef.current = null;
      circleRef.current = null;
      tileRef.current = null;

      routeHaloRef.current = null;
      routeLineRef.current = null;
    };
  }, [basePoint, base.lat, base.lng, radiusKm]);

  // marker client + reset când nu avem client
  useEffect(() => {
    const map = mapRef.current;
    if (!map) return;

    if (!clientPoint) {
      map.setView(basePoint, 12, { animate: true });

      if (clientMarkerRef.current) {
        try {
          clientMarkerRef.current.remove();
        } catch {}
        clientMarkerRef.current = null;
      }

      if (routeHaloRef.current) {
        try {
          routeHaloRef.current.remove();
        } catch {}
        routeHaloRef.current = null;
      }
      if (routeLineRef.current) {
        try {
          routeLineRef.current.remove();
        } catch {}
        routeLineRef.current = null;
      }

      setRouteInfo(null);
      return;
    }

    if (!clientMarkerRef.current) {
      clientMarkerRef.current = L.marker(clientPoint)
        .addTo(map)
        .bindPopup(
          `<b>Tu</b><br/>${client.lat.toFixed(4)}, ${client.lng.toFixed(4)}`
        );
    } else {
      clientMarkerRef.current.setLatLng(clientPoint);
      clientMarkerRef.current.setPopupContent(
        `<b>Tu</b><br/>${client.lat.toFixed(4)}, ${client.lng.toFixed(4)}`
      );
    }
  }, [clientPoint, basePoint, client]);

  // OSRM routing
  async function buildRoute(fromLatLng, toLatLng) {
    const from = `${fromLatLng[1]},${fromLatLng[0]}`;
    const to = `${toLatLng[1]},${toLatLng[0]}`;

    const url =
      `https://router.project-osrm.org/route/v1/driving/${from};${to}` +
      `?overview=full&geometries=geojson&alternatives=false&steps=false`;

    const res = await fetch(url);
    if (!res.ok) throw new Error("OSRM failed");

    const json = await res.json();
    const route = json?.routes?.[0];
    if (!route?.geometry?.coordinates?.length) throw new Error("No route");

    const latlngs = route.geometry.coordinates.map((c) => [c[1], c[0]]);

    return {
      latlngs,
      distanceM: route.distance,
      durationS: route.duration,
    };
  }

  // ✅ Stil traseu mai clar (halo + linie principală)
  function drawStyledRoute(map, latlngs) {
    // curăță vechiul traseu
    if (routeHaloRef.current) {
      try {
        routeHaloRef.current.remove();
      } catch {}
      routeHaloRef.current = null;
    }
    if (routeLineRef.current) {
      try {
        routeLineRef.current.remove();
      } catch {}
      routeLineRef.current = null;
    }

    // 1) HALO (sub) - gros, semi-transparent
    routeHaloRef.current = L.polyline(latlngs, {
      weight: 10,
      opacity: 0.35,
      lineCap: "round",
      lineJoin: "round",
      // nu setez culoare explicită ca să fie ok în orice temă;
      // Leaflet default e albastru; dacă vrei, îți leg la var(--accent)
    }).addTo(map);

    // 2) LINIE PRINCIPALĂ (sus) - mai subțire, foarte clară
    routeLineRef.current = L.polyline(latlngs, {
      weight: 5,
      opacity: 0.95,
      lineCap: "round",
      lineJoin: "round",
      // opțional: dashed pentru “altfel”
      // dashArray: "8 10",
    }).addTo(map);

    // aduce linia principală în față
    try {
      routeLineRef.current.bringToFront();
      clientMarkerRef.current?.bringToFront?.();
      baseMarkerRef.current?.bringToFront?.();
    } catch {}
  }

  async function drawRoute(toLatLng) {
    const map = mapRef.current;
    if (!map) return;

    setRouteLoading(true);
    setErr("");

    try {
      const r = await buildRoute(basePoint, toLatLng);

      drawStyledRoute(map, r.latlngs);

      const bounds = routeLineRef.current.getBounds();
      map.fitBounds(bounds, { padding: [32, 32] });

      setRouteInfo({
        kmRoad: round1(mToKm(r.distanceM)),
        minRoad: secToMin(r.durationS),
      });
    } catch {
      setRouteInfo(null);
      setErr(
        "Nu am putut calcula drumul acum (routing). Îți arăt estimarea orientativă pe distanță."
      );
    } finally {
      setRouteLoading(false);
    }
  }

  function geoErrorMessage(error) {
    if (error?.code === 1) {
      return (
        "Locația este blocată în browser (ai respins de câteva ori). " +
        "Dă click pe iconița de lângă adresă (lacăt / tune) → Permissions → Location → Allow, apoi reîncarcă pagina."
      );
    }
    if (error?.code === 2) {
      return "Nu am putut determina locația (semnal slab). Încearcă din nou.";
    }
    if (error?.code === 3) {
      return "A expirat cererea de locație. Încearcă din nou.";
    }
    return "Nu am putut prelua locația. Activează GPS și încearcă din nou.";
  }

  function getLocation() {
    setErr("");
    if (!navigator.geolocation) {
      setErr(
        "Browser-ul nu suportă locația. Poți folosi WhatsApp fără GPS sau spune reper/km."
      );
      return;
    }
    if (gpsLoading) return;

    setGpsLoading(true);
    navigator.geolocation.getCurrentPosition(
      async (pos) => {
        setGpsLoading(false);

        const nextClient = {
          lat: pos.coords.latitude,
          lng: pos.coords.longitude,
        };
        setClient(nextClient);

        await drawRoute([nextClient.lat, nextClient.lng]);
      },
      (error) => {
        setGpsLoading(false);
        setErr(geoErrorMessage(error));
      },
      { enableHighAccuracy: true, timeout: 8000, maximumAge: 30000 }
    );
  }

  // Maps helpers
  function mapsPlaceUrl() {
    return `https://maps.google.com/?q=${base.lat},${base.lng}`;
  }

  function mapsDirectionsUrl(originLat, originLng) {
    return `https://www.google.com/maps/dir/?api=1&origin=${originLat},${originLng}&destination=${base.lat},${base.lng}&travelmode=driving`;
  }

  // Deschide Maps: dacă nu avem client, încearcă să ia locația înainte
  const openMaps = () => {
    setErr("");

    if (client) {
      window.open(
        mapsDirectionsUrl(client.lat, client.lng),
        "_blank",
        "noopener,noreferrer"
      );
      return;
    }

    if (!navigator.geolocation) {
      window.open(mapsPlaceUrl(), "_blank", "noopener,noreferrer");
      return;
    }

    if (gpsLoading) return;
    setGpsLoading(true);

    navigator.geolocation.getCurrentPosition(
      (pos) => {
        setGpsLoading(false);
        const originLat = pos.coords.latitude;
        const originLng = pos.coords.longitude;

        const nextClient = { lat: originLat, lng: originLng };
        setClient(nextClient);
        drawRoute([originLat, originLng]);

        window.open(
          mapsDirectionsUrl(originLat, originLng),
          "_blank",
          "noopener,noreferrer"
        );
      },
      (error) => {
        setGpsLoading(false);
        setErr(geoErrorMessage(error));
        window.open(mapsPlaceUrl(), "_blank", "noopener,noreferrer");
      },
      { enableHighAccuracy: true, timeout: 8000, maximumAge: 30000 }
    );
  };

  const inCoverage = fallback ? fallback.inCoverage : null;

  return (
    <div className={styles.wrap}>
      <div className={styles.head}>
        <div>
          <div className={styles.title}>Acoperire & ETA</div>
          <div className={styles.sub}>
            Rută + timp estimativ de la {SITE.baseLabel ?? "bază"}.
          </div>
        </div>

        <div className={styles.actions}>
          <button
            type="button"
            className={styles.btnPrimary}
            onClick={getLocation}
            disabled={gpsLoading}
          >
            {gpsLoading ? "Se ia locația…" : "📍 Preia locația mea"}
          </button>

          <button
            type="button"
            className={styles.btnGhost}
            onClick={openMaps}
            disabled={gpsLoading}
            title={gpsLoading ? "Se ia locația…" : "Deschide direcțiile în Maps"}
          >
            {gpsLoading ? "Se ia locația…" : "🗺️ Deschide în Maps"}
          </button>
        </div>
      </div>

      <div className={styles.map}>
        <div ref={mapDivRef} className={styles.leaflet} />
      </div>

      {err && <div className={styles.err}>{err}</div>}

      <div className={styles.infoRow}>
        <div className={styles.box}>
          <div className={styles.k}>Bază</div>
          <div className={styles.v}>
            {SITE.baseLabel ?? "Bază"} <br />
            {base.lat.toFixed(4)}, {base.lng.toFixed(4)}
          </div>
        </div>

        <div className={styles.box}>
          <div className={styles.k}>Tu</div>
          <div className={styles.v}>
            {client ? `${client.lat.toFixed(4)}, ${client.lng.toFixed(4)}` : "—"}
          </div>
        </div>

        <div className={styles.box}>
          <div className={styles.k}>Drum / ETA</div>
          <div className={styles.v}>
            {client ? (
              routeInfo ? (
                <>
                  <b>{routeInfo.kmRoad} km</b> · <b>{routeInfo.minRoad} min</b>
                  <div style={{ marginTop: 6 }}>
                    {inCoverage ? (
                      <span>✅ În acoperire (≤ {radiusKm} km)</span>
                    ) : (
                      <span>⚠️ În afara acoperirii (&gt; {radiusKm} km)</span>
                    )}
                  </div>
                  {routeLoading && (
                    <div style={{ marginTop: 4, opacity: 0.8 }}>
                      Se calculează ruta…
                    </div>
                  )}
                </>
              ) : (
                <>
                  <b>{fallback?.km ?? "—"} km</b> · <b>{fallback?.eta ?? "—"} min</b>
                  <div style={{ marginTop: 6, opacity: 0.8 }}>
                    (Estimare orientativă; ruta nu e disponibilă acum.)
                  </div>
                </>
              )
            ) : (
              "—"
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
