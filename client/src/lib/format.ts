const longDate = new Intl.DateTimeFormat("es-CR", {
  weekday: "long",
  day: "numeric",
  month: "long",
  year: "numeric",
  timeZone: "UTC",
});

const shortDate = new Intl.DateTimeFormat("es-CR", {
  day: "numeric",
  month: "long",
  year: "numeric",
  timeZone: "UTC",
});

/** "viernes, 23 de octubre de 2026" */
export function formatLongDate(iso: string) {
  return longDate.format(new Date(`${iso}T00:00:00Z`));
}

/** "23 de octubre de 2026" */
export function formatDate(iso: string) {
  return shortDate.format(new Date(`${iso}T00:00:00Z`));
}

/** Día y mes por separado, para bloques de fecha. */
export function dateParts(iso: string) {
  const d = new Date(`${iso}T00:00:00Z`);
  return {
    day: d.getUTCDate(),
    month: new Intl.DateTimeFormat("es-CR", { month: "short", timeZone: "UTC" })
      .format(d)
      .replace(".", ""),
  };
}

/** Compara con la fecha de hoy en Costa Rica (UTC-6). */
export function isPast(iso: string) {
  const today = new Date(Date.now() - 6 * 3600 * 1000).toISOString().slice(0, 10);
  return iso < today;
}
