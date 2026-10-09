const DAY_MS = 86_400_000;

/** Content dates are calendar days stored as UTC midnight, so always format in UTC. */
export function formatDate(date: Date): string {
  return date.toLocaleDateString("en-US", { timeZone: "UTC", month: "long", day: "numeric", year: "numeric" });
}

/** "1987" → "1987", "1987-06" → "June 1987", "1987-06-12" → "June 12, 1987". */
export function formatLooseDate(value: string): string {
  const [y, m, d] = value.split("-").map(Number);
  if (!m) return String(y);
  const date = new Date(Date.UTC(y!, m - 1, d ?? 1));
  return d
    ? formatDate(date)
    : date.toLocaleDateString("en-US", { timeZone: "UTC", month: "long", year: "numeric" });
}

export function isoDate(date: Date): string {
  return date.toISOString().slice(0, 10);
}

export function daysBetween(from: Date, to: Date): number {
  return Math.floor((to.getTime() - from.getTime()) / DAY_MS);
}
