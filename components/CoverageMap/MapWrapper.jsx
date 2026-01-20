"use client";

import { useEffect, useRef, useState } from "react";

/**
 * React 18 StrictMode (dev) face mount → unmount → mount.
 * Leaflet “ștampilează” containerul cu _leaflet_id; dacă rămâne, apare:
 * "Map container is already initialized."
 *
 * Aici facem cleanup hard pe orice container Leaflet rămas.
 */
export default function MapWrapper({ children }) {
  const hostRef = useRef(null);
  const [mounted, setMounted] = useState(false);

  const hardResetLeafletContainer = () => {
    const host = hostRef.current;
    if (!host) return;

    const el = host.querySelector?.(".leaflet-container");
    if (!el) return;

    try {
      // eslint-disable-next-line no-underscore-dangle
      if (el._leaflet_id) delete el._leaflet_id;
    } catch {
      // ignore
    }

    // extra: dacă Leaflet a lăsat markup în container, îl golim
    try {
      el.innerHTML = "";
    } catch {
      // ignore
    }
  };

  useEffect(() => {
    // pre-clean: înainte să montăm copiii (harta)
    hardResetLeafletContainer();
    setMounted(true);

    return () => {
      // post-clean: după unmount (StrictMode dev)
      hardResetLeafletContainer();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return <div ref={hostRef}>{mounted ? children : null}</div>;
}
