export function haversineKm(a, b) {
  const R = 6371;
  const toRad = (x) => (x * Math.PI) / 180;

  const dLat = toRad(b.lat - a.lat);
  const dLng = toRad(b.lng - a.lng);

  const lat1 = toRad(a.lat);
  const lat2 = toRad(b.lat);

  const s1 = Math.sin(dLat / 2) ** 2;
  const s2 = Math.sin(dLng / 2) ** 2;

  const h = s1 + Math.cos(lat1) * Math.cos(lat2) * s2;
  const c = 2 * Math.asin(Math.min(1, Math.sqrt(h)));
  return R * c;
}

export function etaMinutes(distanceKm, avgSpeedKmh) {
  if (!distanceKm || !avgSpeedKmh) return null;
  const hours = distanceKm / avgSpeedKmh;
  return Math.max(1, Math.round(hours * 60));
}
