import type { Metadata } from "next";
import Image from "next/image";
import { ArrowIcon, ButtonLink, Container, PageHero, SectionHeading } from "@/components/site/ui";
import { getInstitution } from "@/lib/cms";

export const metadata: Metadata = {
  title: "Excelencia",
  description: "Logros, reconocimientos y proyectos de investigación de estudiantes del Colegio Científico de Alajuela.",
};

export default async function ExcelenciaPage() {
  const { stats, achievements, gallery, pillars } = await getInstitution();
  const featured = [gallery[0], gallery[2], gallery[6]];

  return (
    <>
      <PageHero
        eyebrow="Excelencia CCAL"
        title="Resultados que hablan por nuestros estudiantes"
        lead="Formación integral de alto nivel: pensamiento crítico, creatividad y pasión por la ciencia, con resultados en ferias, olimpiadas y el ingreso universitario."
      />

      <section aria-label="Cifras" className="border-b border-line bg-white">
        <Container>
          <dl className="grid grid-cols-2 lg:grid-cols-4">
            {stats.map((s) => (
              <div key={s.label} className="border-b border-line py-8 pr-6 lg:border-b-0">
                <dt className="sr-only">{s.label}</dt>
                <dd>
                  <span className="block font-serif text-4xl text-navy-900 sm:text-5xl">{s.value}</span>
                  <span className="mt-2 block text-sm text-muted">{s.label}</span>
                </dd>
              </div>
            ))}
          </dl>
        </Container>
      </section>

      <section className="py-20 sm:py-24">
        <Container>
          <SectionHeading
            eyebrow="Investigación"
            title="Proyectos y competencias"
            lead="Nuestros estudiantes llevan sus proyectos a ferias científicas y competencias nacionales e internacionales."
          />
          <div className="mt-12 grid gap-4 md:grid-cols-3">
            {featured.map((img) => (
              <figure key={img.src}>
                <div className="relative aspect-[4/5] overflow-hidden rounded-2xl bg-navy-50">
                  <Image src={img.src} alt={img.alt} fill sizes="(min-width: 768px) 360px, 100vw" className="object-cover" />
                </div>
                <figcaption className="mt-3 font-semibold text-navy-950">{img.caption}</figcaption>
              </figure>
            ))}
          </div>
        </Container>
      </section>

      <section className="border-y border-line bg-white py-20 sm:py-24">
        <Container className="grid gap-12 lg:grid-cols-12">
          <SectionHeading className="lg:col-span-5" eyebrow="Reconocimientos" title="Distinciones recientes" />
          <ol className="lg:col-span-7">
            {achievements.map((a) => (
              <li key={`${a.year}-${a.title}`} className="grid grid-cols-[5rem_1fr] gap-6 border-b border-line py-6 first:pt-0">
                <span className="font-serif text-2xl text-gold-600">{a.year}</span>
                <div>
                  <h3 className="font-sans text-lg font-semibold text-navy-950">{a.title}</h3>
                  <p className="mt-1 text-muted">{a.institution}</p>
                </div>
              </li>
            ))}
          </ol>
        </Container>
      </section>

      <section className="py-20 sm:py-24">
        <Container className="grid gap-10 md:grid-cols-3">
          {pillars.map((p) => (
            <div key={p.title} className="border-t-2 border-navy-900 pt-6">
              <h3 className="text-2xl text-navy-950">{p.title}</h3>
              <p className="mt-3 leading-relaxed text-muted">{p.body}</p>
            </div>
          ))}
        </Container>
        <Container className="mt-16 flex justify-center">
          <ButtonLink href="/admisiones" variant="navy">
            Información de admisión <ArrowIcon />
          </ButtonLink>
        </Container>
      </section>
    </>
  );
}
