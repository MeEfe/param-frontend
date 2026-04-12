export function getBarColor(pct: number): string {
  if (pct > 100) return "oklch(0.6509 0.2199 25.04)";
  if (pct > 90)  return "oklch(0.7200 0.1800 40)";
  if (pct > 70)  return "oklch(0.7800 0.1500 75)";
  return "oklch(0.7797 0.1299 79.58)";
}
