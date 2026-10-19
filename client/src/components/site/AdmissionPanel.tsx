import type { Admission, AdmissionStatus } from "@/content/types";
import { formatLongDate, formatNumericDate, isPast } from "@/lib/format";
import { AccentSquare, ArrowIcon, ButtonLink, Container, Label } from "./ui";

export const statusLabel: Record<AdmissionStatus, string> = {
  proximamente: "Próximamente",
  abierta: "Inscripciones abiertas",
  cerrada: "Proceso cerrado",
  resultados: "Resultados publicados",
};

/** Tabla de fechas clave: fecha mono · evento · estado. */
export function KeyDates({ admission, light = false }: { admission: Admission; light?: boolean }) {
  return (
    <ol className={`border-t ${light ? "border-white/25" : "border-line"}`}>
      {admission.keyDates.map((d) => {
        const done = isPast(d.date);
        return (
          <li
            key={d.label}
            className={`grid grid-cols-[6.5rem_1fr_auto] items-baseline gap-4 border-b py-4 ${light ? "border-white/25" : "border-line"}`}
          >
            <time dateTime={d.date} className={`font-mono text-[13px] ${light ? "text-white/70" : "text-muted"}`}>
              {formatNumericDate(d.date)}
            </time>
            <span className={`font-medium leading-snug ${light ? "text-white" : "text-ink"}`}>
              {d.label}
              <span className="sr-only">, {formatLongDate(d.date)}</span>
            </span>
            <span className={`font-mono text-[11px] uppercase tracking-[0.08em] ${done ? (light ? "text-white/50" : "text-muted") : light ? "text-accent" : "text-accent-ink"}`}>
              {done ? "Hecho" : "Próximo"}
            </span>
          </li>
        );
      })}
    </ol>
  );
}

/** Bloque de admisión para la portada. */
export default function AdmissionPanel({ admission }: { admission: Admission }) {
  const next = admission.keyDates.find((d) => !isPast(d.date));
  const [day, month] = next ? formatNumericDate(next.date).split(".") : [];

  return (
    <section className="bg-surface py-16 sm:py-24">
      <Container className="grid gap-12 lg:grid-cols-12">
        <div className="lg:col-span-7">
          <Label className="flex items-center gap-2">
            <AccentSquare className="h-2 w-2" />
            {admission.processName} — {statusLabel[admission.status]}
          </Label>
          <h2 className="mt-6 text-3xl leading-[1.05] sm:text-4xl lg:text-5xl">{admission.headline}</h2>
          <p className="mt-5 max-w-xl text-lg leading-relaxed text-muted">{admission.summary}</p>
          <div className="mt-8">
            {admission.status === "resultados" && admission.resultsUrl ? (
              <ButtonLink href={admission.resultsUrl} variant="ink" className="min-w-60">
                Ver resultados <ArrowIcon />
              </ButtonLink>
            ) : (
              <ButtonLink href="/admisiones" variant="ink" className="min-w-60">
                Detalles del proceso <ArrowIcon />
              </ButtonLink>
            )}
          </div>
        </div>

        <div className="lg:col-span-4 lg:col-start-9">
          {next && (
            <div className="mb-8">
              <Label>{next.label}</Label>
              <p className="mt-2 font-display text-8xl font-semibold leading-[0.9] tracking-[-0.05em]">
                {day}.{month}
                <span className="text-accent">.</span>
              </p>
            </div>
          )}
          <KeyDates admission={admission} />
        </div>
      </Container>
    </section>
  );
}
