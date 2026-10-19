import type { Metadata } from "next";
import Image from "next/image";
import { Container, PageHero } from "@/components/site/ui";
import { getInstitution } from "@/lib/cms";

export const metadata: Metadata = {
  title: "Vida estudiantil",
  description: "Laboratorios, competencias, deporte y comunidad en el Colegio Científico de Alajuela.",
};

export default async function VidaEstudiantilPage() {
  const { gallery } = await getInstitution();

  return (
    <>
      <PageHero
        eyebrow="Vida estudiantil"
        title="Laboratorio, competencia y comunidad"
        lead="La vida en el CCAL va del laboratorio a las ferias científicas, de las competencias internacionales a la cancha."
      />
      <section className="py-16 sm:py-20">
        <Container>
          <div className="columns-1 gap-4 sm:columns-2 lg:columns-3">
            {gallery.map((img) => (
              <figure key={img.src} className="mb-4 break-inside-avoid">
                <Image
                  src={img.src}
                  alt={img.alt}
                  width={900}
                  height={700}
                  sizes="(min-width: 1024px) 360px, (min-width: 640px) 50vw, 100vw"
                  className="h-auto w-full rounded-2xl bg-navy-50"
                />
                <figcaption className="mt-2 text-sm text-muted">{img.caption}</figcaption>
              </figure>
            ))}
          </div>
        </Container>
      </section>
    </>
  );
}
