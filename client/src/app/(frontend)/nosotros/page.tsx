import Link from "next/link";
import { ArrowIcon, Container, PageHero, Photo } from "@/components/site/ui";
import { heroMetadata } from "@/lib/metadata";
import { getInstitution, getNavigation, getPages } from "@/lib/cms";

export const generateMetadata = heroMetadata((p) => p.school.hero);

export default async function NosotrosPage() {
  const [{ gallery }, nav, { school }] = await Promise.all([getInstitution(), getNavigation(), getPages()]);
  const sections = nav.find((item) => item.href === "/nosotros")?.children ?? [];
  const imageFor = (i: number) => (gallery.length ? gallery[(gallery.length - 1 - i * 2 + gallery.length * 2) % gallery.length] : undefined);

  return (
    <>
      <PageHero label={school.hero.label} title={school.hero.title} lead={school.hero.lead} />
      <section className="pb-20 sm:pb-28">
        <Container>
          <ol className="border-t border-line">
            {sections.map((section, i) => (
              <li key={section.href} className="border-b border-line">
                <Link href={section.href} className="group grid items-center gap-6 py-8 sm:grid-cols-12">
                  <span className="font-mono text-[12px] text-muted sm:col-span-1">{String(i + 1).padStart(2, "0")}</span>
                  <span className="sm:col-span-6">
                    <span className="block font-display text-3xl font-semibold tracking-[-0.035em] sm:text-5xl">{section.label}</span>
                    {section.description && <span className="mt-2 block text-muted">{section.description}</span>}
                  </span>
                  {imageFor(i) && <Photo image={imageFor(i)!} sizes="(min-width: 640px) 25vw, 100vw" className="aspect-[16/9] sm:col-span-4" />}
                  <ArrowIcon className="hidden h-8 w-8 justify-self-end transition-transform group-hover:translate-x-1 sm:col-span-1 sm:block" />
                </Link>
              </li>
            ))}
          </ol>
        </Container>
      </section>
    </>
  );
}
