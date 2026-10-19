import type { Metadata } from "next";
import { ArrowIcon, ButtonLink, Container, PageHero, Photo, SectionHeader } from "@/components/site/ui";
import { getInstitution } from "@/lib/cms";

export const metadata: Metadata = {
  title: "Excelencia",
  description: "Logros, reconocimientos y proyectos de investigación de estudiantes del Colegio Científico de Alajuela.",
};

export default async function ExcelenciaPage() {
  const { stats, achievements, gallery } = await getInstitution();
  const featured = [gallery[0], gallery[2], gallery[6]];

  return (
    <>
      <PageHero
        label="Excelencia CCAL"
        title="Resultados que hablan por nuestros estudiantes"
        lead="Pensamiento crítico, creatividad y pasión por la ciencia, con resultados en ferias, olimpiadas y el ingreso universitario."
      />

      <section aria-label="Cifras" className="border-y border-line">
        <Container>
          <dl className="grid grid-cols-2 lg:grid-cols-4">
            {stats.map((s, i) => (
              <div
                key={s.label}
                className={`border-line py-10 ${i % 2 === 0 ? "border-r pr-5" : "pl-5"} ${i < 2 ? "border-b lg:border-b-0" : ""} lg:border-r lg:px-6 lg:first:pl-0 lg:last:border-r-0`}
              >
                <dt className="font-mono text-[11px] uppercase tracking-[0.08em] text-muted">{s.label}</dt>
                <dd className="mt-4 font-display text-5xl font-semibold tracking-[-0.04em] sm:text-6xl">{s.value}</dd>
              </div>
            ))}
          </dl>
        </Container>
      </section>

      <section className="py-20 sm:py-28">
        <Container>
          <SectionHeader
            label="Investigación"
            title="Proyectos y competencias"
            lead="Nuestros estudiantes llevan sus proyectos a ferias científicas y a competencias nacionales e internacionales."
          />
        </Container>
        <Container className="mt-12 grid gap-3 md:grid-cols-3">
          {featured.map((img) => (
            <Photo key={img.src} image={img} caption={img.caption} sizes="(min-width: 768px) 33vw, 100vw" className="aspect-[4/5]" />
          ))}
        </Container>
      </section>

      <section className="pb-20 sm:pb-28">
        <Container>
          <SectionHeader label="Reconocimientos" title="Distinciones recientes" />
          <ol className="mt-12 border-t border-line lg:ml-[25%]">
            {achievements.map((a) => (
              <li key={`${a.year}-${a.title}`} className="grid grid-cols-[5rem_1fr] gap-6 border-b border-line py-6 sm:grid-cols-[6rem_1fr_1fr]">
                <span className="font-mono text-[13px] text-muted">{a.year}</span>
                <h3 className="font-sans text-xl font-medium tracking-normal">{a.title}</h3>
                <p className="col-start-2 text-muted sm:col-start-auto">{a.institution}</p>
              </li>
            ))}
          </ol>
          <div className="mt-16 lg:ml-[25%]">
            <ButtonLink href="/admisiones" variant="ink" className="min-w-64">
              Información de admisión <ArrowIcon />
            </ButtonLink>
          </div>
        </Container>
      </section>
    </>
  );
}
