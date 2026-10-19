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
            ["01", "Misión", mission],
            ["02", "Visión", vision],
          ].map(([index, label, text]) => (
            <div key={label} className="grid gap-6 border-t border-ink pt-6 lg:grid-cols-12">
              <Label className="lg:col-span-3">
                <span className="text-ink">{index}</span> — {label}
              </Label>
              <p className="font-display text-3xl font-medium leading-[1.15] tracking-[-0.03em] sm:text-4xl lg:col-span-9">{text}</p>
            </div>
          ))}
        </Container>
      </section>

      <section className="bg-surface py-20 sm:py-28">
        <Container>
          <SectionHeader
            index="03"
            label="Competencias"
            title="Habilidades para el siglo XXI"
            lead="Además del rigor académico, desarrollamos competencias que acompañan a nuestras personas graduadas en la universidad y en la vida."
          />
          <ol className="mt-12 grid border-t border-ink sm:grid-cols-2 lg:ml-[25%]">
            {skills.map((s, i) => (
              <li key={s} className="grid grid-cols-[3rem_1fr] items-baseline border-b border-ink/15 py-4 text-xl sm:odd:pr-8 sm:even:pl-8">
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
