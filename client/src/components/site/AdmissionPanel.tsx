import type { Admission, AdmissionStatus } from "@/content/types";
import { formatLongDate, isPast } from "@/lib/format";
import { ArrowIcon, ButtonLink, Eyebrow } from "./ui";

const statusLabel: Record<AdmissionStatus, string> = {
  proximamente: "Próximamente",
  abierta: "Inscripciones abiertas",
  cerrada: "Proceso cerrado",
  resultados: "Resultados publicados",
};

export function KeyDates({ admission, light = false }: { admission: Admission; light?: boolean }) {
  return (
    <ol className="relative space-y-6">
      {admission.keyDates.map((d, i) => {
        const done = isPast(d.date);
        const isLast = i === admission.keyDates.length - 1;
        return (
          <li key={d.label} className="relative flex gap-4">
            {!isLast && (
              <span
                className={`absolute left-[11px] top-7 h-[calc(100%-4px)] w-px ${light ? "bg-white/20" : "bg-line"}`}
                aria-hidden="true"
              />
            )}
            <span
              className={`mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full border-2 ${
                done
                  ? light
                    ? "border-white/40 bg-white/10"
                    : "border-navy-900/30 bg-navy-50"
                  : "border-gold-500 bg-gold-500"
              }`}
              aria-hidden="true"
            >
              {done && (
                <svg className={`h-3 w-3 ${light ? "text-white" : "text-navy-900"}`} viewBox="0 0 12 12" fill="none">
                  <path d="m2.5 6.5 2.5 2.5 4.5-6" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
                </svg>
              )}
            </span>
            <div>
              <p className={`text-sm ${light ? "text-navy-100" : "text-muted"}`}>
                <span className="first-letter:uppercase">{formatLongDate(d.date)}</span>
                {done && <span className="sr-only"> (completado)</span>}
              </p>
              <p className={`mt-0.5 text-lg font-semibold ${light ? "text-white" : "text-navy-950"}`}>{d.label}</p>
              {d.note && <p className={`mt-1 text-sm ${light ? "text-navy-100" : "text-muted"}`}>{d.note}</p>}
            </div>
          </li>
        );
      })}
    </ol>
  );
}

export default function AdmissionPanel({ admission }: { admission: Admission }) {
  return (
    <div className="grid gap-12 rounded-[28px] bg-navy-900 p-8 text-white sm:p-12 lg:grid-cols-12 lg:gap-16">
      <div className="lg:col-span-7">
        <div className="flex flex-wrap items-center gap-3">
          <Eyebrow light>{admission.processName}</Eyebrow>
          <span className="mb-4 rounded-full bg-white/10 px-3 py-1 text-xs font-semibold text-white">
            {statusLabel[admission.status]}
          </span>
        </div>
        <h2 className="text-3xl leading-tight text-white sm:text-4xl">{admission.headline}</h2>
        <p className="mt-4 max-w-xl text-lg leading-relaxed text-navy-100">{admission.summary}</p>
        <div className="mt-8 flex flex-wrap gap-3">
          {admission.status === "resultados" && admission.resultsUrl ? (
            <ButtonLink href={admission.resultsUrl} variant="gold">
              Ver resultados <ArrowIcon />
            </ButtonLink>
          ) : (
            <ButtonLink href="/admisiones" variant="gold">
              Detalles del proceso <ArrowIcon />
            </ButtonLink>
          )}
          <ButtonLink href="/admisiones#preguntas" variant="outline-light">
            Preguntas frecuentes
          </ButtonLink>
        </div>
      </div>
      <div className="lg:col-span-5 lg:border-l lg:border-white/15 lg:pl-12">
        <p className="mb-6 text-xs font-semibold uppercase tracking-[0.18em] text-navy-100">Fechas clave</p>
        <KeyDates admission={admission} light />
      </div>
    </div>
  );
}
