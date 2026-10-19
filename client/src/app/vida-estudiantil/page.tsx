import type { Metadata } from "next";
import { PageHero, Photo } from "@/components/site/ui";
import { getInstitution } from "@/lib/cms";

export const metadata: Metadata = {
  title: "Vida estudiantil",
  description: "Laboratorios, competencias, deporte y comunidad en el Colegio Científico de Alajuela.",
};

// Patrón de tamaños que se repite: una foto ancha y dos normales.
const spans = ["lg:col-span-2 lg:row-span-2", "", "", "lg:col-span-2", "", "", "lg:row-span-2", "lg:col-span-2", "", ""];

export default async function VidaEstudiantilPage() {
  const { gallery } = await getInstitution();

  return (
    <>
      <PageHero
        label="Vida estudiantil"
        title="Laboratorio, competencia y comunidad"
        lead="La vida en el CCAL va del laboratorio a las ferias científicas, de las competencias internacionales a la cancha."
      />
      <section aria-label="Galería" className="grid auto-rows-[60vw] grid-cols-2 gap-px border-t border-ink bg-ink sm:auto-rows-[40vw] lg:auto-rows-[22vw] lg:grid-cols-4">
        {gallery.map((img, i) => (
          <Photo key={img.src} image={img} caption={img.caption} sizes="(min-width: 1024px) 50vw, 50vw" className={spans[i % spans.length]} />
        ))}
      </section>
    </>
  );
}
