import { Container, PageHero, Photo } from "@/components/site/ui";
import { getInstitution, getPages } from "@/lib/cms";
import { heroMetadata } from "@/lib/metadata";

export const generateMetadata = heroMetadata((p) => p.studentLife.hero);

// Patrón de tamaños que se repite: una foto ancha y dos normales.
const spans = ["lg:col-span-2 lg:row-span-2", "", "", "lg:col-span-2", "", "", "lg:row-span-2", "lg:col-span-2", "", ""];

export default async function VidaEstudiantilPage() {
  const [{ gallery }, { studentLife: text }] = await Promise.all([getInstitution(), getPages()]);

  return (
    <>
      <PageHero
        label={text.hero.label}
        title={text.hero.title}
        lead={text.hero.lead}
      />
      <Container className="pb-20 sm:pb-28">
        <section aria-label="Galería" className="grid auto-rows-[45vw] grid-cols-2 gap-3 sm:auto-rows-[30vw] lg:auto-rows-[18rem] lg:grid-cols-4">
          {gallery.map((img, i) => (
            <Photo key={img.src} image={img} caption={img.caption} sizes="(min-width: 1024px) 640px, 50vw" className={spans[i % spans.length]} />
          ))}
        </section>
      </Container>
    </>
  );
}
