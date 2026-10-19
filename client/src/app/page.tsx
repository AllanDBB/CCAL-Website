import Image from "next/image";
import AdmissionPanel from "@/components/site/AdmissionPanel";
import NewsRow from "@/components/site/NewsCard";
import { AccentSquare, ArrowIcon, ButtonLink, Container, Label, Photo, SectionHeader, TextLink } from "@/components/site/ui";
import { getAdmission, getInstitution, getNews, getSite } from "@/lib/cms";

export const revalidate = 3600;

export default async function HomePage() {
  const [site, admission, news, { pillars, gallery, history }] = await Promise.all([
    getSite(),
    getAdmission(),
    getNews(3),
    getInstitution(),
  ]);

  const [hero, lab, travel, classroom, community, , fair] = gallery;

  return (
    <>
      {/* Portada: texto a la izquierda, foto hasta el borde derecho */}
      <section className="grid lg:min-h-[calc(100svh-112px)] lg:grid-cols-[minmax(0,1fr)_minmax(0,42%)]">
        <div className="flex flex-col justify-between px-5 pt-12 pb-12 sm:px-8 lg:pt-16 lg:pb-14 lg:pl-[max(2rem,calc((100vw-1320px)/2+2rem))] lg:pr-12">
          <Label className="flex items-center gap-3">
            <AccentSquare className="h-2.5 w-2.5" />
            Sistema Nacional de Colegios Científicos — Sede 09
          </Label>

          <h1 className="my-12 text-[clamp(3rem,7vw,7rem)] leading-[0.95] tracking-[-0.045em] lg:my-14">
            Colegio
            <br />
            Científico
            <br />
            de Alajuela<span className="text-accent">.</span>
          </h1>

          <div>
            <p className="max-w-lg text-lg leading-relaxed text-muted sm:text-xl">{site.description}</p>
            <div className="mt-8 flex flex-wrap gap-3">
              <ButtonLink href="/admisiones" variant="ink" className="min-w-56">
                Proceso de admisión <ArrowIcon />
              </ButtonLink>
              <ButtonLink href="/nosotros" variant="outline" className="min-w-56">
                Conocer el colegio <ArrowIcon />
              </ButtonLink>
            </div>
            <dl className="mt-12 grid grid-cols-3 border-t border-line pt-4">
              {[
                ["Fundación", history.foundedOn.replace(" de ", " ").replace(" de ", " ")],
                ["Sede", "09 del SNCCCR"],
                ["Ubicación", "Alajuela, CR"],
              ].map(([k, v]) => (
                <div key={k} className="pr-3">
                  <dt className="font-mono text-[11px] uppercase tracking-[0.08em] text-muted">{k}</dt>
                  <dd className="mt-1 text-[15px] font-medium leading-snug">{v}</dd>
                </div>
              ))}
            </dl>
          </div>
        </div>

        <div className="relative aspect-[4/5] bg-surface sm:aspect-[16/11] lg:aspect-auto">
          <Image src={hero.src} alt={hero.alt} fill priority sizes="(min-width: 1024px) 42vw, 100vw" className="object-cover" />
        </div>
      </section>

      {/* Admisión */}
      <AdmissionPanel admission={admission} />


      {/* El colegio */}
      <section className="py-20 sm:py-28">
        <Container>
          <SectionHeader
            label="El colegio"
            title="Una formación exigente, pensada para la universidad y para el país."
            lead="Somos parte del Sistema Nacional de Colegios Científicos: colegios públicos que reúnen a estudiantes con talento para la ciencia en todo Costa Rica."
            action={<TextLink href="/nosotros">Conocer el colegio</TextLink>}
          />
          <ul className="mt-14 grid gap-x-10 gap-y-10 md:grid-cols-3 lg:ml-[25%]">
            {pillars.map((p) => (
              <li key={p.title}>
                <h3 className="text-xl leading-tight tracking-[-0.02em]">{p.title}</h3>
                <p className="mt-3 leading-relaxed text-muted">{p.body}</p>
              </li>
            ))}
          </ul>
        </Container>
      </section>

      {/* Fotos */}
      <section className="pb-20 sm:pb-28">
        <Container>
          <SectionHeader label="Vida estudiantil" title="Laboratorio, competencia y comunidad." action={<TextLink href="/vida-estudiantil">Ver galería</TextLink>} />
          <div className="mt-12 grid grid-cols-2 gap-3 lg:grid-cols-4">
            {[lab, travel, classroom, fair].map((img, i) => (
              <Photo
                key={img.src}
                image={img}
                sizes="(min-width: 1024px) 25vw, 50vw"
                className={i === 0 ? "col-span-2 aspect-[4/3] lg:col-span-2 lg:row-span-2 lg:aspect-auto" : "aspect-square"}
              />
            ))}
            <Photo image={community} sizes="(min-width: 1024px) 25vw, 50vw" className="hidden aspect-square lg:block" />
          </div>
        </Container>
      </section>

      {/* Noticias */}
      <section className="pb-20 sm:pb-28">
        <Container>
          <SectionHeader label="Noticias" title="Lo más reciente" action={<TextLink href="/noticias">Todas las noticias</TextLink>} />
          <div className="mt-8 border-t border-line">
            {news.map((item) => (
              <NewsRow key={item.slug} item={item} />
            ))}
          </div>
        </Container>
      </section>
    </>
  );
}
