import type { Metadata } from "next";
import Link from "next/link";
import { Container, Label, PageHero } from "@/components/site/ui";

export const metadata: Metadata = {
  title: "Términos de uso",
  description: "Propósito y condiciones de uso del sitio web del Colegio Científico de Alajuela.",
};

const sections = [
  {
    title: "Propósito del sitio",
    body: [
      "Este sitio transmite información sobre el Colegio Científico de Costa Rica, sede Alajuela (CCAL), de forma clara, accesible y actualizada para estudiantes, familias, personas educadoras y la comunidad.",
      "Incluye información sobre nuestra historia y misión, la oferta académica, el proceso de admisión, las actividades institucionales y las noticias del colegio.",
    ],
  },
  {
    title: "Sitio informativo",
    body: [
      "El sitio es exclusivamente informativo. No procesa transacciones ni recopila datos personales sensibles.",
      "Con tu consentimiento, usamos cookies de analítica (Google Analytics) para entender cómo se usa el sitio y mejorarlo. Puedes rechazarlas en el aviso de cookies.",
    ],
  },
  {
    title: "Responsabilidad",
    body: [
      "El contenido es informativo y puede cambiar sin previo aviso. El CCAL no se hace responsable por decisiones tomadas exclusivamente con base en esta información.",
      "Para información oficial, procesos de admisión o consultas específicas, contacta directamente a las oficinas administrativas del colegio.",
    ],
  },
];

export default function TerminosPage() {
  return (
    <>
      <PageHero label="Legal" title="Términos de uso" lead="Información sobre el propósito y el uso de este sitio web." />
      <Container className="pb-20 sm:pb-28">
        {sections.map((s) => (
          <section key={s.title} className="grid gap-6 border-t border-line py-8 lg:grid-cols-12">
            <Label className="lg:col-span-3">
              {s.title}
            </Label>
            <div className="space-y-4 text-lg leading-relaxed lg:col-span-6">
              {s.body.map((p) => (
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
          . Última actualización: octubre de 2026.
        </p>
      </Container>
    </>
  );
}
