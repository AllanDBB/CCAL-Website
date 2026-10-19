import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowIcon, Container, PageHero } from "@/components/site/ui";
import { mainNav } from "@/content/navigation";
import { getInstitution } from "@/lib/cms";

export const metadata: Metadata = {
  title: "El Colegio",
  description: "Historia, misión, visión y oferta académica del Colegio Científico de Alajuela.",
};

export default async function NosotrosPage() {
  const { history, gallery } = await getInstitution();
  const sections = mainNav.find((item) => item.href === "/nosotros")?.children ?? [];
  const images = [gallery[1], gallery[6], gallery[3]];

  return (
    <>
      <PageHero eyebrow="El Colegio" title="Novena sede del Sistema Nacional de Colegios Científicos" lead={history.intro} />
      <section className="py-20 sm:py-24">
        <Container>
          <ul className="grid gap-6 md:grid-cols-3">
            {sections.map((section, i) => (
              <li key={section.href}>
                <Link href={section.href} className="group block">
                  <div className="relative aspect-[4/3] overflow-hidden rounded-2xl bg-navy-50">
                    <Image
                      src={images[i].src}
                      alt={images[i].alt}
                      fill
                      sizes="(min-width: 768px) 360px, 100vw"
                      className="object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                    />
                  </div>
                  <h2 className="mt-5 flex items-center gap-2 text-2xl text-navy-950">
                    {section.label}
                    <ArrowIcon className="h-5 w-5 text-gold-600 transition-transform group-hover:translate-x-1" />
                  </h2>
                  {section.description && <p className="mt-1 text-muted">{section.description}</p>}
                </Link>
              </li>
            ))}
          </ul>
        </Container>
      </section>
    </>
  );
}
