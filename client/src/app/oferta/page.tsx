import type { Metadata } from "next";
import { ArrowIcon, ButtonLink, Container, Label, PageHero, SectionHeader } from "@/components/site/ui";
import { getInstitution } from "@/lib/cms";

export const metadata: Metadata = {
  title: "Oferta académica",
  description: "Plan de estudios preuniversitario con ciencias, matemáticas y tecnología de nivel universitario.",
};

export default async function OfertaPage() {
  const { subjectAreas, extraPrograms, gallery } = await getInstitution();

  return (
    <>
      <PageHero
        label="Oferta académica"
        title="Preparación preuniversitaria con estándares universitarios"
        lead="Un plan de estudios científico y riguroso, complementado con tecnología, humanidades y desarrollo personal."
        image={gallery[1]}
      />

      <section className="py-20 sm:py-28">
        <Container>
          <SectionHeader label="Plan de estudios" title="Áreas y asignaturas" />
          <div className="mt-12">
            {subjectAreas.map((area, i) => (
              <div key={area.name} className="grid gap-6 border-t border-line py-8 lg:grid-cols-12">
                <div className="lg:col-span-3">
                  <Label>{String(i + 1).padStart(2, "0")}</Label>
                  <h3 className="mt-2 text-2xl leading-tight tracking-[-0.02em]">{area.name}</h3>
                </div>
                <ul className="grid gap-x-8 gap-y-6 sm:grid-cols-2 lg:col-span-9 lg:grid-cols-3">
                  {area.subjects.map((s) => (
                    <li key={s.name}>
                      <p className="text-xl font-medium">{s.name}</p>
                      <p className="mt-1 font-mono text-[11px] uppercase tracking-[0.08em] text-blue-700">{s.level}</p>
                      <p className="mt-3 leading-relaxed text-muted">{s.description}</p>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </Container>
      </section>

      <section className="bg-blue-50 py-20 sm:py-28">
        <Container>
          <SectionHeader label="Más allá del aula" title="Programas adicionales" />
          <div className="mt-12 grid gap-12 sm:grid-cols-2 lg:ml-[25%]">
            {extraPrograms.map((p) => (
              <div key={p.title} className="border-t border-line pt-6">
                <h3 className="text-2xl tracking-[-0.02em]">{p.title}</h3>
                <p className="mt-3 leading-relaxed text-muted">{p.body}</p>
              </div>
            ))}
          </div>
          <div className="mt-16 lg:ml-[25%]">
            <ButtonLink href="/admisiones" variant="ink" className="min-w-64">
              Proceso de admisión <ArrowIcon />
            </ButtonLink>
          </div>
        </Container>
      </section>
    </>
  );
}
