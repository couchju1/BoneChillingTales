const DAY_MS = 86_400_000;

/** Fills every hidden [data-days-since] counter under root with today's count. */
export function fillDaysSince(root: ParentNode = document) {
  const now = new Date();
  const today = Date.UTC(now.getFullYear(), now.getMonth(), now.getDate());
  for (const el of root.querySelectorAll<HTMLElement>("[data-days-since]")) {
    const [y, m, d] = el.dataset.daysSince!.split("-").map(Number);
    const days = Math.floor((today - Date.UTC(y!, m! - 1, d!)) / DAY_MS);
    if (days < 0) continue;
    el.textContent = `${el.dataset.label} ${days.toLocaleString("en-US")} ${days === 1 ? "day" : "days"}`;
    el.hidden = false;
  }
}
