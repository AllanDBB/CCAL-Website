import type { Metadata } from "next";
import { ArrowIcon, ButtonLink, Container, PageHero, SectionHeading } from "@/components/site/ui";
import { getInstitution } from "@/lib/cms";

export const metadata: Metadata = {
  title: "Oferta académica",
  description: "Plan de estudios preuniversitario con ciencias, matemáticas y tecnología de nivel universitario.",
};

export default async function OfertaPage() {
  const { subjectAreas, extraPrograms } = await getInstitution();

  return (
    <>
      <PageHero
        eyebrow="Oferta académica"
        title="Preparación preuniversitaria con estándares universitarios"
        lead="Un plan de estudios científico y riguroso, complementado con tecnología, humanidades y desarrollo personal."
      />

      <section className="py-20 sm:py-24">
        <Container>
          <div className="divide-y divide-line border-y border-line">
            {subjectAreas.map((area) => (
              <div key={area.name} className="grid gap-6 py-10 lg:grid-cols-12">
                <h2 className="text-2xl text-navy-950 sm:text-3xl lg:col-span-4">{area.name}</h2>
                <ul className="grid gap-6 sm:grid-cols-2 lg:col-span-8">
                  {area.subjects.map((s) => (
                    <li key={s.name}>
                      <p className="text-xs font-semibold uppercase tracking-[0.16em] text-gold-600">{s.level}</p>
                      <h3 className="mt-1 font-sans text-lg font-semibold text-navy-950">{s.name}</h3>
                      <p className="mt-1 leading-relaxed text-muted">{s.description}</p>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </Container>
      </section>

      <section className="bg-navy-900 py-20 text-white sm:py-24">
        <Container className="grid gap-12 lg:grid-cols-12">
          <SectionHeading className="lg:col-span-5" light eyebrow="Más allá del aula" title="Programas adicionales" />
          <div className="grid gap-10 sm:grid-cols-2 lg:col-span-7">
            {extraPrograms.map((p) => (
              <div key={p.title} className="border-t border-white/20 pt-6">
                <h3 className="text-2xl text-white">{p.title}</h3>
                <p className="mt-3 leading-relaxed text-navy-100">{p.body}</p>
              </div>
            ))}
          </div>
        </Container>
      </section>

      <section className="py-20 text-center sm:py-24">
        <Container>
          <h2 className="text-3xl text-navy-950 sm:text-4xl">¿Te interesa estudiar en el CCAL?</h2>
          <div className="mt-8 flex justify-center">
            <ButtonLink href="/admisiones" variant="navy">
              Proceso de admisión <ArrowIcon />
            </ButtonLink>
          </div>
        </Container>
      </section>
    </>
  );
}
