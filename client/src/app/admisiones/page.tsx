import type { Metadata } from "next";
import { KeyDates } from "@/components/site/AdmissionPanel";
import { ArrowIcon, ButtonLink, Container, Eyebrow, PageHero, SectionHeading } from "@/components/site/ui";
import { getAdmission, getSite } from "@/lib/cms";
import { dateParts, formatLongDate } from "@/lib/format";

export const revalidate = 3600;

export const metadata: Metadata = {
  title: "Admisiones",
  description:
    "Requisitos, Prueba de Aptitud Académica (PAA), fechas y resultados del proceso de admisión al Colegio Científico de Alajuela.",
};

export default async function AdmisionesPage() {
  const [admission, site] = await Promise.all([getAdmission(), getSite()]);

  return (
    <>
      <PageHero
        eyebrow={admission.processName}
        title={admission.headline}
        lead={admission.summary}
        aside={
          admission.resultsDate && admission.status !== "resultados" ? (
            <div className="rounded-[28px] bg-navy-900 p-8 text-white">
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-gold-500">Publicación de resultados</p>
              <p className="mt-4 flex items-baseline gap-3">
                <span className="font-serif text-7xl leading-none">{dateParts(admission.resultsDate).day}</span>
                <span className="font-serif text-2xl">{dateParts(admission.resultsDate).month}</span>
              </p>
              <p className="mt-3 text-navy-100 first-letter:uppercase">{formatLongDate(admission.resultsDate)}</p>
            </div>
          ) : undefined
        }
      >
        <div className="mt-10 flex flex-wrap gap-3">
          {admission.status === "resultados" && admission.resultsUrl && (
            <ButtonLink href={admission.resultsUrl} variant="gold">
              Ver resultados <ArrowIcon />
            </ButtonLink>
          )}
          {admission.practiceUrl && (
            <ButtonLink href={admission.practiceUrl} variant="outline">
              Descargar práctica de la PAA
            </ButtonLink>
          )}
          <ButtonLink href="#requisitos" variant="outline">
            Requisitos
          </ButtonLink>
          <ButtonLink href="#preguntas" variant="outline">
            Preguntas frecuentes
          </ButtonLink>
        </div>
      </PageHero>

      {/* Fechas y proceso */}
      <section className="py-20 sm:py-24">
        <Container className="grid gap-14 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <Eyebrow>Fechas clave</Eyebrow>
            <div className="rounded-3xl border border-line bg-white p-8">
              <KeyDates admission={admission} />
            </div>
          </div>
          <div className="lg:col-span-7 lg:col-start-6">
            <SectionHeading eyebrow="Cómo funciona" title="El proceso en cuatro pasos" />
            <ol className="mt-10 grid gap-x-8 gap-y-10 sm:grid-cols-2">
              {admission.steps.map((step, i) => (
                <li key={step.title} className="border-t-2 border-navy-900 pt-5">
                  <span className="font-serif text-lg text-gold-600">Paso {i + 1}</span>
                  <h3 className="mt-1 text-2xl text-navy-950">{step.title}</h3>
                  <p className="mt-2 leading-relaxed text-muted">{step.description}</p>
                </li>
              ))}
            </ol>
          </div>
        </Container>
      </section>

      {/* Requisitos */}
      <section id="requisitos" className="scroll-mt-24 border-y border-line bg-white py-20 sm:py-24">
        <Container className="grid gap-12 lg:grid-cols-12">
          <SectionHeading
            className="lg:col-span-5"
            eyebrow="Requisitos"
            title="Quién puede aplicar"
            lead="El proceso está dirigido a estudiantes que cursan noveno año y cumplen todos estos requisitos."
          />
          <ul className="lg:col-span-6 lg:col-start-7">
            {admission.requirements.map((req) => (
              <li key={req} className="flex gap-4 border-b border-line py-5 first:pt-0 text-lg text-ink">
                <svg className="mt-1 h-5 w-5 shrink-0 text-gold-600" viewBox="0 0 20 20" fill="none" aria-hidden="true">
                  <path d="m4.5 10.5 3.5 3.5 7.5-8" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
                {req}
              </li>
            ))}
          </ul>
        </Container>
      </section>

      {/* PAA y nota */}
      <section className="py-20 sm:py-24">
        <Container className="grid gap-8 lg:grid-cols-2">
          <div className="rounded-[28px] bg-navy-900 p-8 text-white sm:p-10">
            <Eyebrow light>La prueba</Eyebrow>
            <h2 className="text-3xl text-white sm:text-4xl">Prueba de Aptitud Académica</h2>
            <p className="mt-4 text-lg leading-relaxed text-navy-100">{admission.paa.description}</p>
            <div className="mt-8 flex flex-wrap gap-2">
              {admission.paa.areas.map((area) => (
                <span key={area} className="rounded-full bg-white/10 px-4 py-2 text-sm font-semibold">
                  {area}
                </span>
              ))}
            </div>
            <ul className="mt-8 space-y-3 border-t border-white/15 pt-8">
              {admission.paa.facts.map((fact) => (
                <li key={fact} className="flex gap-3 text-navy-100">
                  <span className="mt-2.5 h-1.5 w-1.5 shrink-0 rounded-full bg-gold-500" aria-hidden="true" />
                  {fact}
                </li>
              ))}
            </ul>
          </div>

          <div className="rounded-[28px] border border-line bg-white p-8 sm:p-10">
            <Eyebrow>Nota de ingreso</Eyebrow>
            <h2 className="text-3xl text-navy-950 sm:text-4xl">Cómo se calcula</h2>
            <div className="mt-8 flex h-4 overflow-hidden rounded-full" aria-hidden="true">
              {admission.scoreWeights.map((w, i) => (
                <span
                  key={w.label}
                  style={{ width: `${w.percent}%` }}
                  className={i === 0 ? "bg-navy-900" : "bg-gold-500"}
                />
              ))}
            </div>
            <dl className="mt-8 space-y-6">
              {admission.scoreWeights.map((w, i) => (
                <div key={w.label} className="flex items-start justify-between gap-6 border-b border-line pb-6">
                  <dt>
                    <span className="flex items-center gap-3 text-lg font-semibold text-navy-950">
                      <span className={`h-3 w-3 rounded-full ${i === 0 ? "bg-navy-900" : "bg-gold-500"}`} aria-hidden="true" />
                      {w.label}
                    </span>
                    {w.detail && <span className="mt-1 block pl-6 text-muted">{w.detail}</span>}
                  </dt>
                  <dd className="whitespace-nowrap font-serif text-4xl text-navy-900">{w.percent} %</dd>
                </div>
              ))}
            </dl>
            <p className="mt-6 text-sm leading-relaxed text-muted">{admission.scoreNote}</p>
          </div>
        </Container>
      </section>

      {/* Preguntas */}
      <section id="preguntas" className="scroll-mt-24 border-t border-line bg-white py-20 sm:py-24">
        <Container className="grid gap-12 lg:grid-cols-12">
          <SectionHeading
            className="lg:col-span-5"
            eyebrow="Preguntas frecuentes"
            title="Lo que más nos preguntan"
            lead={
              <>
                ¿No encuentras tu respuesta? Escríbenos a{" "}
                <a href={`mailto:${site.email}`} className="font-semibold text-navy-900 underline underline-offset-4">
                  {site.email}
                </a>{" "}
                o llama al {site.phone}.
              </>
            }
          />
          <div className="lg:col-span-6 lg:col-start-7">
            {admission.faqs.map((faq) => (
              <details key={faq.question} className="group border-b border-line py-2 first:border-t">
                <summary className="flex cursor-pointer list-none items-center justify-between gap-6 py-4 text-lg font-semibold text-navy-950 [&::-webkit-details-marker]:hidden">
                  {faq.question}
                  <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-line transition-transform group-open:rotate-45" aria-hidden="true">
                    <svg className="h-3.5 w-3.5" viewBox="0 0 14 14" fill="none">
                      <path d="M7 1v12M1 7h12" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
                    </svg>
                  </span>
                </summary>
                <p className="pb-5 pr-12 leading-relaxed text-muted">{faq.answer}</p>
              </details>
            ))}
          </div>
        </Container>
      </section>
    </>
  );
}
