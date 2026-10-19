import { Container, Label, PageHero, SectionHeader } from "@/components/site/ui";
import { heroMetadata } from "@/lib/metadata";
import { getInstitution, getPages } from "@/lib/cms";

export const generateMetadata = heroMetadata((p) => p.history.hero);

export default async function HistoriaPage() {
  const [{ history }, { history: text }] = await Promise.all([getInstitution(), getPages()]);

  return (
    <>
      <PageHero label={text.hero.label} title={text.hero.title} lead={text.hero.lead} image={text.image} />

      <section className="py-20 sm:py-28">
        <Container>
          <SectionHeader label={text.origin.label} title={text.origin.title} />
          <div className="mt-12 grid gap-16 lg:grid-cols-12">
            <div className="space-y-6 text-xl leading-relaxed lg:col-span-6 lg:col-start-4">
              {history.paragraphs.map((p) => (
                <p key={p}>{p}</p>
              ))}
            </div>
            <aside className="lg:col-span-3">
              <Label>{text.foundersLabel}</Label>
              <ol className="mt-4 border-t border-line">
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
