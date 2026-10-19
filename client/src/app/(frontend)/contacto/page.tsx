import type { Metadata } from "next";
import { Container, Label, PageHero } from "@/components/site/ui";
import { getSite } from "@/lib/cms";

export const metadata: Metadata = {
  title: "Contacto",
  description: "Dirección, teléfono, correo y horario de atención del Colegio Científico de Alajuela.",
};

export default async function ContactoPage() {
  const site = await getSite();
  const items = [
    { label: "Teléfono", value: site.phone, href: `tel:+506${site.phone.replace(/\D/g, "")}` },
    { label: "Correo", value: site.email, href: `mailto:${site.email}` },
    { label: "Dirección", value: site.address, detail: site.addressDetail },
    { label: "Horario", value: site.hours, detail: "Puede variar en vacaciones y feriados." },
  ];

  return (
    <>
      <PageHero label="Contacto" title="Estamos para ayudarte" lead="Escríbenos o llámanos con tus preguntas sobre el colegio o el proceso de admisión." />
      <section className="pb-20 sm:pb-28">
        <Container className="grid gap-12 lg:grid-cols-12">
          <dl className="border-t border-line lg:col-span-5">
            {items.map((item) => (
              <div key={item.label} className="border-b border-line py-6">
                <dt>
                  <Label>{item.label}</Label>
                </dt>
                <dd className="mt-2">
                  {item.href ? (
                    <a href={item.href} className="font-display text-3xl font-semibold tracking-[-0.03em] hover:text-blue">
                      {item.value}
                    </a>
                  ) : (
                    <span className="font-display text-2xl font-semibold tracking-[-0.03em]">{item.value}</span>
                  )}
                  {item.detail && <p className="mt-1 text-muted">{item.detail}</p>}
                </dd>
              </div>
            ))}
            <div className="py-6">
              <Label>Redes sociales</Label>
              <ul className="mt-3 flex flex-wrap gap-2">
                {site.social.map((s) => (
                  <li key={s.name}>
                    <a
                      href={s.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex min-h-11 items-center border border-blue px-4 font-medium text-blue hover:bg-blue hover:text-white"
                    >
                      {s.name} ↗
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </dl>
          <div className="relative min-h-[420px] border border-line bg-surface lg:col-span-7">
            <iframe
              src={site.mapEmbedUrl}
              title="Mapa de ubicación del Colegio Científico de Alajuela"
              className="absolute inset-0 h-full w-full grayscale"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              allowFullScreen
            />
          </div>
        </Container>
      </section>
    </>
  );
}
