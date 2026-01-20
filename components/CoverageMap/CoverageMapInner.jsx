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
  const routeLineRef = useRef(null);

  const base = useMemo(
    () => ({ lat: SITE.baseLocation.lat, lng: SITE.baseLocation.lng }),
    []
  );

  const basePoint = useMemo(() => [base.lat, base.lng], [base.lat, base.lng]);
  const clientPoint = client ? [client.lat, client.lng] : null;

  const radiusKm = SITE.serviceRadiusKm ?? 60;

  // fallback linie dreaptă (în caz că OSRM nu merge)
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
      // eslint-disable-next-line no-underscore-dangle
      if (el._leaflet_id) delete el._leaflet_id;
    } catch {}
    try {
      el.innerHTML = "";
    } catch {}

    const map = L.map(el, {
  scrollWheelZoom: true,     // ✅ zoom cu rotița
  touchZoom: true,           // ✅ pinch zoom pe telefon
  doubleClickZoom: true,     // ✅ zoom la dublu click/tap
  boxZoom: true,             // ✅ zoom selectând cu mouse
  dragging: true,            // ✅ glisare (deja e true implicit)
  zoomControl: true,         // + / - în colț
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
        // eslint-disable-next-line no-underscore-dangle
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
      routeLineRef.current = null;
    };
  }, [basePoint, base.lat, base.lng, radiusKm]);

  // marker client + fit bounds
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
    // OSRM: lon,lat
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

  async function drawRoute(toLatLng) {
    const map = mapRef.current;
    if (!map) return;

    setRouteLoading(true);
    setErr("");

    try {
      const r = await buildRoute(basePoint, toLatLng);

      if (routeLineRef.current) {
        try {
          routeLineRef.current.remove();
        } catch {}
        routeLineRef.current = null;
      }

      routeLineRef.current = L.polyline(r.latlngs, {
        weight: 5,
        opacity: 0.8,
      }).addTo(map);

      // fit bounds pe rută
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
    // 1 = PERMISSION_DENIED
    if (error?.code === 1) {
      return (
        "Locația este blocată în browser (ai respins de câteva ori). " +
        "Dă click pe iconița de lângă adresă (lacăt / tune) → Permissions → Location → Allow, apoi reîncarcă pagina."
      );
    }
    // 2 = POSITION_UNAVAILABLE
    if (error?.code === 2) {
      return "Nu am putut determina locația (semnal slab). Încearcă din nou.";
    }
    // 3 = TIMEOUT
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

        // calculează ruta imediat
        await drawRoute([nextClient.lat, nextClient.lng]);
      },
      (error) => {
        setGpsLoading(false);
        setErr(geoErrorMessage(error));
      },
      { enableHighAccuracy: true, timeout: 8000, maximumAge: 30000 }
    );
  }

  const googleMapsUrl = client
    ? `https://maps.google.com/?q=${client.lat},${client.lng}`
    : `https://maps.google.com/?q=${base.lat},${base.lng}`;

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

          <a
            className={styles.btnGhost}
            href={googleMapsUrl}
            target="_blank"
            rel="noopener noreferrer"
          >
            🗺️ Deschide în Maps
          </a>
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
