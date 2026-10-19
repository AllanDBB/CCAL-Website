import type { Metadata } from "next";
import { Container, Label, PageHero, SectionHeader } from "@/components/site/ui";
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
        label="Misión y visión"
        title="Llevar al límite el potencial de cada estudiante"
        lead="Buscamos la mejor formación académica para nuestros estudiantes, con un enfoque en ciencias, ingenierías e investigación."
      />

      <section className="pb-20 sm:pb-28">
        <Container className="space-y-16">
          {[
            ["Misión", mission],
            ["Visión", vision],
          ].map(([label, text]) => (
            <div key={label} className="grid gap-6 border-t border-line pt-6 lg:grid-cols-12">
              <Label className="lg:col-span-3">{label}</Label>
              <p className="font-display text-2xl font-medium leading-[1.25] tracking-[-0.02em] sm:text-3xl lg:col-span-9">{text}</p>
            </div>
          ))}
        </Container>
      </section>

      <section className="pb-20 sm:pb-28">
        <Container>
          <SectionHeader
            label="Competencias"
            title="Habilidades para el siglo XXI"
            lead="Además del rigor académico, desarrollamos competencias que acompañan a nuestras personas graduadas en la universidad y en la vida."
          />
          <ol className="mt-12 grid border-t border-line sm:grid-cols-2 lg:ml-[25%]">
            {skills.map((s, i) => (
              <li key={s} className="grid grid-cols-[3rem_1fr] items-baseline border-b border-line py-4 text-lg sm:odd:pr-8 sm:even:pl-8">
                <span className="font-mono text-[12px] text-muted">{String(i + 1).padStart(2, "0")}</span>
                {s}
              </li>
            ))}
          </ol>
        </Container>
      </section>
    </>
  );
}
