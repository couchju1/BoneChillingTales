const DAY_MS = 86_400_000;

/** "Missing 14,364 days", counted to today in the reader's calendar. */
export function daysSinceText(isoDay: string, label: string, now = new Date()): string | null {
  const today = Date.UTC(now.getFullYear(), now.getMonth(), now.getDate());
  const [y, m, d] = isoDay.split("-").map(Number);
  const days = Math.floor((today - Date.UTC(y!, m! - 1, d!)) / DAY_MS);
  if (days < 0) return null;
  return `${label} ${days.toLocaleString("en-US")} ${days === 1 ? "day" : "days"}`;
}

/**
 * Counters are built with the count as of the build day but kept invisible (class "pending"),
 * so their space is held and nothing moves when this fills in today's count. Without JS they
 * stay invisible and the date beside them does the job.
 */
export function fillDaysSince(root: ParentNode = document) {
  for (const el of root.querySelectorAll<HTMLElement>("[data-days-since]")) {
    const text = daysSinceText(el.dataset.daysSince!, el.dataset.label!);
    if (!text) continue;
    el.textContent = text;
    el.classList.remove("pending");
    el.removeAttribute("aria-hidden");
  }
}
