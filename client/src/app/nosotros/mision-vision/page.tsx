import type { Metadata } from "next";
import { Container, Eyebrow, PageHero, SectionHeading } from "@/components/site/ui";
import { getInstitution } from "@/lib/cms";

export const metadata: Metadata = {
  title: "Misión y visión",
  description: "La misión, la visión y las competencias que guían la formación en el Colegio Científico de Alajuela.",
};

export default async function MisionVisionPage() {
  const { mission, vision, skills } = await getInstitution();

  return (
    <>
      <PageHero
        eyebrow="Misión y visión"
        title="Llevar al límite el potencial de cada estudiante"
        lead="Buscamos la mejor formación académica para nuestros estudiantes, con un enfoque en ciencias, ingenierías e investigación."
      />

      <section className="py-20 sm:py-24">
        <Container className="grid gap-8 lg:grid-cols-2">
          <article className="rounded-[28px] bg-navy-900 p-8 text-white sm:p-12">
            <Eyebrow light>Misión</Eyebrow>
            <p className="font-serif text-2xl leading-snug sm:text-[1.75rem]">{mission}</p>
          </article>
          <article className="rounded-[28px] border border-line bg-white p-8 sm:p-12">
            <Eyebrow>Visión</Eyebrow>
            <p className="font-serif text-2xl leading-snug text-navy-950 sm:text-[1.75rem]">{vision}</p>
          </article>
        </Container>
      </section>

      <section className="border-t border-line bg-white py-20 sm:py-24">
        <Container className="grid gap-12 lg:grid-cols-12">
          <SectionHeading
            className="lg:col-span-5"
            eyebrow="Competencias"
            title="Habilidades para el siglo XXI"
            lead="Además del rigor académico, desarrollamos competencias que acompañan a nuestras personas graduadas en la universidad y en la vida."
          />
          <ul className="grid grid-cols-1 gap-x-8 sm:grid-cols-2 lg:col-span-6 lg:col-start-7">
            {skills.map((s) => (
              <li key={s} className="flex items-center gap-3 border-b border-line py-4 text-lg text-navy-950">
                <span className="h-1.5 w-1.5 rounded-full bg-gold-500" aria-hidden="true" />
                {s}
              </li>
            ))}
          </ul>
        </Container>
      </section>
    </>
  );
}
