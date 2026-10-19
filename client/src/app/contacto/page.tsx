import type { Metadata } from "next";
import { Container, Eyebrow, PageHero } from "@/components/site/ui";
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
      <PageHero eyebrow="Contacto" title="Estamos para ayudarte" lead="Escríbenos o llámanos con tus preguntas sobre el colegio o el proceso de admisión." />
      <section className="py-16 sm:py-20">
        <Container className="grid gap-12 lg:grid-cols-12">
          <dl className="lg:col-span-5">
            {items.map((item) => (
              <div key={item.label} className="border-b border-line py-6 first:pt-0">
                <dt>
                  <Eyebrow>{item.label}</Eyebrow>
                </dt>
                <dd className="-mt-2">
                  {item.href ? (
                    <a href={item.href} className="font-serif text-2xl text-navy-950 hover:text-navy-600">
                      {item.value}
                    </a>
                  ) : (
                    <span className="font-serif text-2xl text-navy-950">{item.value}</span>
                  )}
                  {item.detail && <p className="mt-1 text-muted">{item.detail}</p>}
                </dd>
              </div>
            ))}
            <div className="pt-6">
              <Eyebrow>Redes sociales</Eyebrow>
              <ul className="-mt-2 flex flex-wrap gap-2">
                {site.social.map((s) => (
                  <li key={s.name}>
                    <a
                      href={s.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex min-h-11 items-center rounded-full border border-line px-5 font-semibold text-navy-900 hover:bg-navy-50"
                    >
                      {s.name}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </dl>
          <div className="lg:col-span-7">
            <div className="relative aspect-[4/3] overflow-hidden rounded-[28px] border border-line bg-navy-50 lg:aspect-auto lg:h-full lg:min-h-[480px]">
              <iframe
                src={site.mapEmbedUrl}
                title="Mapa de ubicación del Colegio Científico de Alajuela"
                className="absolute inset-0 h-full w-full"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                allowFullScreen
              />
            </div>
          </div>
        </Container>
      </section>
    </>
  );
}
