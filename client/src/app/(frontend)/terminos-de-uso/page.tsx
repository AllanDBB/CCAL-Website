import Link from "next/link";
import { Container, Label, PageHero } from "@/components/site/ui";
import { getPages } from "@/lib/cms";
import { heroMetadata } from "@/lib/metadata";

export const generateMetadata = heroMetadata((p) => p.terms.hero, "title");

export default async function TerminosPage() {
  const { terms } = await getPages();

  return (
    <>
      <PageHero label={terms.hero.label} title={terms.hero.title} lead={terms.hero.lead} />
      <Container className="pb-20 sm:pb-28">
        {terms.sections.map((s) => (
          <section key={s.title} className="grid gap-6 border-t border-line py-8 lg:grid-cols-12">
            <Label className="lg:col-span-3">{s.title}</Label>
            <div className="space-y-4 text-lg leading-relaxed lg:col-span-6">
              {s.body.split(/\n\s*\n/).map((p) => (
                <p key={p}>{p}</p>
              ))}
            </div>
          </section>
        ))}
        <p className="border-t border-line pt-6 text-muted lg:pl-[25%]">
          ¿Preguntas sobre el sitio?{" "}
          <Link href="/contacto" className="text-ink underline underline-offset-4">
            Contáctanos
          </Link>
          . {terms.updated}
        </p>
      </Container>
    </>
  );
}
