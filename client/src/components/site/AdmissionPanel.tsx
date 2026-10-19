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
    <ol className={`border-t ${light ? "border-white/25" : "border-ink"}`}>
      {admission.keyDates.map((d) => {
        const done = isPast(d.date);
        return (
          <li
            key={d.label}
            className={`grid grid-cols-[7.5rem_1fr_auto] items-baseline gap-4 border-b py-5 ${light ? "border-white/25" : "border-line"}`}
          >
            <time dateTime={d.date} className={`font-mono text-[13px] ${light ? "text-white/70" : "text-muted"}`}>
              {formatNumericDate(d.date)}
            </time>
            <span className={`text-lg font-medium leading-snug ${light ? "text-white" : "text-ink"}`}>
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

/** Bloque negro de admisión para la portada. */
export default function AdmissionPanel({ admission }: { admission: Admission }) {
  const next = admission.keyDates.find((d) => !isPast(d.date));
  const [day, month] = next ? formatNumericDate(next.date).split(".") : [];

  return (
    <section className="bg-ink py-20 text-white sm:py-28">
      <Container>
        <div className="grid gap-6 border-t border-white/25 pt-6 lg:grid-cols-12">
          <Label light className="lg:col-span-3">
            <span className="text-accent">01</span> — {admission.processName}
          </Label>
          <p className="flex items-center gap-2 font-mono text-[12px] uppercase tracking-[0.08em] text-white lg:col-span-9">
            <AccentSquare className="h-2 w-2" />
            {statusLabel[admission.status]}
          </p>
        </div>

        <div className="mt-12 grid gap-14 lg:grid-cols-12">
          <div className="lg:col-span-7">
            <h2 className="text-4xl leading-[1] sm:text-6xl lg:text-7xl">{admission.headline}</h2>
            <p className="mt-6 max-w-xl text-lg leading-relaxed text-white/70">{admission.summary}</p>
            <div className="mt-10 flex flex-wrap gap-3">
              {admission.status === "resultados" && admission.resultsUrl ? (
                <ButtonLink href={admission.resultsUrl} variant="accent">
                  Ver resultados <ArrowIcon />
                </ButtonLink>
              ) : (
                <ButtonLink href="/admisiones" variant="accent">
                  Detalles del proceso <ArrowIcon />
                </ButtonLink>
              )}
              <ButtonLink href="/admisiones#preguntas" variant="outline-light">
                Preguntas frecuentes <ArrowIcon />
              </ButtonLink>
            </div>
          </div>

          <div className="lg:col-span-5">
            {next && (
              <div className="mb-10">
                <Label light>Próxima fecha — {next.label}</Label>
                <p className="mt-3 font-display text-[7rem] font-semibold leading-[0.85] tracking-[-0.06em] text-accent sm:text-[9rem]">
                  {day}.{month}
                </p>
              </div>
            )}
            <KeyDates admission={admission} light />
          </div>
        </div>
      </Container>
    </section>
  );
}
