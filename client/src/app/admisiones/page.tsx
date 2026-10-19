import type { Metadata } from "next";
import { KeyDates, statusLabel } from "@/components/site/AdmissionPanel";
import { AccentSquare, ArrowIcon, ButtonLink, Container, Label, PageHero, SectionHeader } from "@/components/site/ui";
import { getAdmission, getSite } from "@/lib/cms";
import { formatLongDate, formatNumericDate } from "@/lib/format";

export const revalidate = 3600;

export const metadata: Metadata = {
  title: "Admisiones",
  description:
    "Requisitos, Prueba de Aptitud Académica (PAA), fechas y resultados del proceso de admisión al Colegio Científico de Alajuela.",
};

export default async function AdmisionesPage() {
  const [admission, site] = await Promise.all([getAdmission(), getSite()]);
  const results = admission.resultsDate ? formatNumericDate(admission.resultsDate).split(".") : null;

  return (
    <>
      <PageHero
        label={`${admission.processName} — ${statusLabel[admission.status]}`}
        title={admission.headline}
        lead={admission.summary}
        aside={
          results && admission.status !== "resultados" ? (
            <div className="border-t-2 border-ink pt-4">
              <Label>Publicación de resultados</Label>
              <p className="mt-2 font-display text-[6.5rem] font-semibold leading-[0.85] tracking-[-0.06em] sm:text-[8rem]">
                {results[0]}.{results[1]}
                <span className="text-accent">.</span>
              </p>
              <p className="mt-2 font-mono text-[12px] uppercase tracking-[0.08em] text-muted">{formatLongDate(admission.resultsDate!)}</p>
            </div>
          ) : undefined
        }
      >
        <div className="flex flex-col gap-2">
          {admission.status === "resultados" && admission.resultsUrl && (
            <ButtonLink href={admission.resultsUrl} variant="accent">
              Ver resultados <ArrowIcon />
            </ButtonLink>
          )}
          {admission.practiceUrl && (
            <ButtonLink href={admission.practiceUrl} variant="outline">
              Práctica de la PAA <ArrowIcon />
            </ButtonLink>
          )}
          <ButtonLink href="#requisitos" variant="outline">
            Requisitos <ArrowIcon className="h-4 w-4 rotate-90" />
          </ButtonLink>
          <ButtonLink href="#preguntas" variant="outline">
            Preguntas frecuentes <ArrowIcon className="h-4 w-4 rotate-90" />
          </ButtonLink>
        </div>
      </PageHero>

      {/* Fechas */}
      <section className="pb-20 sm:pb-28">
        <Container>
          <SectionHeader index="01" label="Fechas clave" title="Calendario del proceso" />
          <div className="mt-12 lg:ml-[25%]">
            <KeyDates admission={admission} />
          </div>
        </Container>
      </section>

      {/* Pasos */}
      <section className="bg-surface py-20 sm:py-28">
        <Container>
          <SectionHeader index="02" label="Cómo funciona" title="El proceso en cuatro pasos" />
          <ol className="mt-16 grid gap-x-8 sm:grid-cols-2 lg:grid-cols-4">
            {admission.steps.map((step, i) => (
              <li key={step.title}>
                <span className="block border-t-2 border-ink pt-4 font-display text-6xl font-semibold tracking-[-0.05em]">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <h3 className="mt-8 text-2xl leading-tight">{step.title}</h3>
                <p className="mt-3 pb-10 leading-relaxed text-muted">{step.description}</p>
              </li>
            ))}
          </ol>
        </Container>
      </section>

      {/* Requisitos */}
      <section id="requisitos" className="scroll-mt-28 py-20 sm:py-28">
        <Container>
          <SectionHeader
            index="03"
            label="Requisitos"
            title="Quién puede aplicar"
            lead="El proceso está dirigido a estudiantes que cursan noveno año y cumplen todos estos requisitos."
          />
          <ol className="mt-12 border-t border-ink lg:ml-[25%]">
            {admission.requirements.map((req, i) => (
              <li key={req} className="grid grid-cols-[3rem_1fr] items-baseline border-b border-line py-5 text-xl">
                <span className="font-mono text-[12px] text-muted">{String(i + 1).padStart(2, "0")}</span>
                {req}
              </li>
            ))}
          </ol>
        </Container>
      </section>

      {/* PAA y nota */}
      <section className="bg-ink py-20 text-white sm:py-28">
        <Container>
          <SectionHeader index="04" label="La prueba" title="Prueba de Aptitud Académica" lead={admission.paa.description} light />
          <div className="mt-16 grid gap-16 lg:ml-[25%] lg:grid-cols-2">
            <div>
              <Label light>Evalúa</Label>
              <ul className="mt-4 border-t border-white/25">
                {admission.paa.areas.map((area) => (
                  <li key={area} className="flex items-center gap-3 border-b border-white/25 py-4 text-xl">
                    <AccentSquare className="h-2.5 w-2.5" />
                    {area}
                  </li>
                ))}
              </ul>
              <ul className="mt-8 space-y-3 text-white/70">
                {admission.paa.facts.map((fact) => (
                  <li key={fact}>— {fact}</li>
                ))}
              </ul>
            </div>
            <div>
              <Label light>Nota de ingreso</Label>
              <div className="mt-4 flex h-3" aria-hidden="true">
                {admission.scoreWeights.map((w, i) => (
                  <span key={w.label} style={{ width: `${w.percent}%` }} className={i === 0 ? "bg-white" : "bg-accent"} />
                ))}
              </div>
              <dl className="mt-6 border-t border-white/25">
                {admission.scoreWeights.map((w) => (
                  <div key={w.label} className="flex items-start justify-between gap-6 border-b border-white/25 py-5">
                    <dt>
                      <span className="block text-lg">{w.label}</span>
                      {w.detail && <span className="mt-1 block text-sm text-white/60">{w.detail}</span>}
                    </dt>
                    <dd className="whitespace-nowrap font-display text-5xl font-semibold tracking-[-0.05em]">{w.percent}%</dd>
                  </div>
                ))}
              </dl>
              <p className="mt-6 text-sm leading-relaxed text-white/60">{admission.scoreNote}</p>
            </div>
          </div>
        </Container>
      </section>

      {/* Preguntas */}
      <section id="preguntas" className="scroll-mt-28 py-20 sm:py-28">
        <Container>
          <SectionHeader
            index="05"
            label="Preguntas frecuentes"
            title="Lo que más nos preguntan"
            lead={
              <>
                ¿No encuentras tu respuesta? Escríbenos a{" "}
                <a href={`mailto:${site.email}`} className="text-ink underline underline-offset-4">
                  {site.email}
                </a>{" "}
                o llama al {site.phone}.
              </>
            }
          />
          <div className="mt-12 border-t border-ink lg:ml-[25%]">
            {admission.faqs.map((faq) => (
              <details key={faq.question} className="group border-b border-line">
                <summary className="flex cursor-pointer list-none items-center justify-between gap-6 py-6 text-xl font-medium [&::-webkit-details-marker]:hidden">
                  {faq.question}
                  <span className="font-mono text-2xl leading-none transition-transform group-open:rotate-45" aria-hidden="true">
                    +
                  </span>
                </summary>
                <p className="max-w-2xl pb-6 text-lg leading-relaxed text-muted">{faq.answer}</p>
              </details>
            ))}
          </div>
        </Container>
      </section>
    </>
  );
}
