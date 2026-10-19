import { ArrowIcon, ButtonLink, Container, Label, PageHero, SectionHeader } from "@/components/site/ui";
import { getInstitution, getPages } from "@/lib/cms";
import { heroMetadata } from "@/lib/metadata";

export const generateMetadata = heroMetadata((p) => p.programs.hero);

export default async function OfertaPage() {
  const [{ subjectAreas, extraPrograms }, { programs: text }] = await Promise.all([getInstitution(), getPages()]);

  return (
    <>
      <PageHero
        label={text.hero.label}
        title={text.hero.title}
        lead={text.hero.lead}
        image={text.image}
      />

      <section className="py-20 sm:py-28">
        <Container>
          <SectionHeader label={text.areas.label} title={text.areas.title} />
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
          <SectionHeader label={text.extra.label} title={text.extra.title} />
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
              {text.ctaButton} <ArrowIcon />
            </ButtonLink>
          </div>
        </Container>
      </section>
    </>
  );
}
