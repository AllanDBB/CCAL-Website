import type { Metadata } from "next";
import Image from "next/image";
import { Container, Eyebrow, PageHero } from "@/components/site/ui";
import { getInstitution, getSite } from "@/lib/cms";

export const metadata: Metadata = {
  title: "Historia",
  description: "El Colegio Científico de Alajuela nació el 11 de abril de 2006 como novena sede del Sistema Nacional de Colegios Científicos.",
};

export default async function HistoriaPage() {
  const [{ history, gallery }, site] = await Promise.all([getInstitution(), getSite()]);

  return (
    <>
      <PageHero eyebrow="Historia" title={`Desde el ${history.foundedOn}`} lead={history.intro} />

      <section className="py-20 sm:py-24">
        <Container className="grid gap-14 lg:grid-cols-12">
          <div className="space-y-6 text-lg leading-relaxed text-ink lg:col-span-7">
            {history.paragraphs.map((p) => (
              <p key={p}>{p}</p>
            ))}
          </div>
          <aside className="lg:col-span-4 lg:col-start-9">
            <div className="rounded-3xl border border-line bg-white p-8">
              <Eyebrow>Convenio fundacional</Eyebrow>
              <ul className="space-y-4">
                {history.founders.map((f) => (
                  <li key={f} className="border-b border-line pb-4 font-serif text-lg leading-snug text-navy-950 last:border-0 last:pb-0">
                    {f}
                  </li>
                ))}
              </ul>
              <p className="mt-6 text-sm leading-relaxed text-muted">{history.foundersNote}</p>
            </div>
          </aside>
        </Container>
      </section>

      <section className="pb-20 sm:pb-24">
        <Container>
          <figure className="relative aspect-[16/7] overflow-hidden rounded-[28px] bg-navy-50">
            <Image src={gallery[9].src} alt={gallery[9].alt} fill sizes="(min-width: 1152px) 1104px, 100vw" className="object-cover" />
          </figure>
        </Container>
      </section>

      <section className="border-t border-line bg-white py-20 text-center sm:py-24">
        <Container>
          <blockquote className="mx-auto max-w-3xl font-serif text-3xl leading-snug text-navy-950 sm:text-4xl">
            “{site.tagline}”
          </blockquote>
          <p className="mt-5 text-muted">Lema del Sistema Nacional de Colegios Científicos de Costa Rica</p>
        </Container>
      </section>
    </>
  );
}
