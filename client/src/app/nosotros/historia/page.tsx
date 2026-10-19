import type { Metadata } from "next";
import { Container, Label, PageHero, SectionHeader } from "@/components/site/ui";
import { getInstitution } from "@/lib/cms";

export const metadata: Metadata = {
  title: "Historia",
  description: "El Colegio Científico de Alajuela nació el 11 de abril de 2006 como novena sede del Sistema Nacional de Colegios Científicos.",
};

export default async function HistoriaPage() {
  const { history, gallery } = await getInstitution();

  return (
    <>
      <PageHero label="Historia" title={`Desde el ${history.foundedOn}`} lead={history.intro} image={gallery[9]} />

      <section className="py-20 sm:py-28">
        <Container>
          <SectionHeader index="01" label="Origen" title="Una sede para Alajuela y Heredia" />
          <div className="mt-12 grid gap-16 lg:grid-cols-12">
            <div className="space-y-6 text-xl leading-relaxed lg:col-span-6 lg:col-start-4">
              {history.paragraphs.map((p) => (
                <p key={p}>{p}</p>
              ))}
            </div>
            <aside className="lg:col-span-3">
              <Label>Convenio fundacional</Label>
              <ol className="mt-4 border-t border-ink">
                {history.founders.map((f, i) => (
                  <li key={f} className="grid grid-cols-[2rem_1fr] border-b border-line py-4 font-medium leading-snug">
                    <span className="font-mono text-[12px] text-muted">{String(i + 1).padStart(2, "0")}</span>
                    {f}
                  </li>
                ))}
              </ol>
              <p className="mt-4 text-sm leading-relaxed text-muted">{history.foundersNote}</p>
            </aside>
          </div>
        </Container>
      </section>
    </>
  );
}
