import Image from "next/image";
import AdmissionPanel from "@/components/site/AdmissionPanel";
import NewsRow from "@/components/site/NewsCard";
import { AccentSquare, ArrowIcon, ButtonLink, Container, Label, Photo, SectionHeader, TextLink } from "@/components/site/ui";
import { getAdmission, getInstitution, getNews, getSite } from "@/lib/cms";

export const revalidate = 3600;

export default async function HomePage() {
  const [site, admission, news, { stats, pillars, gallery, history }] = await Promise.all([
    getSite(),
    getAdmission(),
    getNews(3),
    getInstitution(),
  ]);

  const [hero, lab, travel, classroom, community, graduation, fair, football] = gallery;

  return (
    <>
      {/* Portada: texto a la izquierda, foto hasta el borde derecho */}
      <section className="grid lg:min-h-[calc(100svh-112px)] lg:grid-cols-[minmax(0,1fr)_minmax(0,42%)]">
        <div className="flex flex-col justify-between px-5 pt-12 pb-12 sm:px-8 lg:pt-16 lg:pb-14 lg:pl-[max(2rem,calc((100vw-1320px)/2+2rem))] lg:pr-12">
          <Label className="flex items-center gap-3">
            <AccentSquare className="h-2.5 w-2.5" />
            Sistema Nacional de Colegios Científicos — Sede 09
          </Label>

          <h1 className="my-12 text-[clamp(3.25rem,8.6vw,8.75rem)] leading-[0.92] tracking-[-0.045em] lg:my-16">
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
            <dl className="mt-12 grid grid-cols-3 border-t border-ink pt-4">
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
          <p className="absolute bottom-0 left-0 bg-white px-3 py-2 font-mono text-[11px] uppercase tracking-[0.08em]">
            {hero.caption}
          </p>
        </div>
      </section>

      {/* Admisión */}
      <AdmissionPanel admission={admission} />

      {/* Franja de fotos de borde a borde */}
      <section aria-label="Fotografías del colegio" className="grid grid-cols-2 gap-px bg-ink lg:grid-cols-4">
        {[lab, travel, classroom, fair].map((img) => (
          <Photo key={img.src} image={img} caption={img.caption} sizes="(min-width: 1024px) 25vw, 50vw" className="aspect-[3/4]" />
        ))}
      </section>

      {/* El colegio */}
      <section className="py-20 sm:py-28">
        <Container>
          <SectionHeader
            index="02"
            label="El colegio"
            title="Una formación exigente, pensada para la universidad y para el país."
            lead="Somos parte del Sistema Nacional de Colegios Científicos: colegios públicos que reúnen a estudiantes con talento para la ciencia en todo Costa Rica."
            action={<TextLink href="/nosotros">Conocer el colegio</TextLink>}
          />
          <ol className="mt-20 grid gap-x-10 md:grid-cols-3">
            {pillars.map((p, i) => (
              <li key={p.title}>
                <span className="block border-t-2 border-ink pt-4 font-mono text-[12px] text-muted">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <h3 className="mt-10 text-3xl leading-[1.05]">{p.title}</h3>
                <p className="mt-4 pb-8 leading-relaxed text-muted">{p.body}</p>
              </li>
            ))}
          </ol>
        </Container>
      </section>

      {/* Cifras */}
      <section aria-label="El CCAL en cifras" className="border-y border-ink">
        <Container>
          <dl className="grid grid-cols-2 lg:grid-cols-4">
            {stats.map((s, i) => (
              <div
                key={s.label}
                className={`border-ink py-10 ${i % 2 === 0 ? "border-r pr-5" : "pl-5"} ${i < 2 ? "border-b lg:border-b-0" : ""} lg:border-r lg:px-6 lg:first:pl-0 lg:last:border-r-0`}
              >
                <dt className="font-mono text-[11px] uppercase tracking-[0.08em] text-muted">{s.label}</dt>
                <dd className="mt-6 font-display text-5xl font-semibold tracking-[-0.05em] sm:text-7xl">{s.value}</dd>
              </div>
            ))}
          </dl>
        </Container>
      </section>

      {/* Vida estudiantil */}
      <section className="py-20 sm:py-28">
        <Container>
          <SectionHeader
            index="03"
            label="Vida estudiantil"
            title="Laboratorio, competencia y comunidad."
            action={<TextLink href="/vida-estudiantil">Ver galería</TextLink>}
          />
          <div className="mt-16 grid grid-cols-2 gap-2 lg:grid-cols-12 lg:grid-rows-[repeat(2,minmax(0,18rem))]">
            <Photo image={community} caption={community.caption} sizes="(min-width: 1024px) 50vw, 100vw" className="col-span-2 aspect-[4/3] lg:col-span-6 lg:row-span-2 lg:aspect-auto" />
            <Photo image={graduation} caption={graduation.caption} sizes="(min-width: 1024px) 50vw, 100vw" className="col-span-2 aspect-[16/9] lg:col-span-6 lg:aspect-auto" />
            <Photo image={football} caption={football.caption} sizes="(min-width: 1024px) 25vw, 50vw" className="aspect-square lg:col-span-3 lg:aspect-auto" />
            <Photo image={gallery[8]} caption={gallery[8].caption} sizes="(min-width: 1024px) 25vw, 50vw" className="aspect-square lg:col-span-3 lg:aspect-auto" />
          </div>
        </Container>
      </section>

      {/* Noticias */}
      <section className="pb-20 sm:pb-28">
        <Container>
          <SectionHeader index="04" label="Noticias" title="Lo más reciente" action={<TextLink href="/noticias">Todas las noticias</TextLink>} />
          <div className="mt-10 border-t border-line">
            {news.map((item) => (
              <NewsRow key={item.slug} item={item} />
            ))}
          </div>
        </Container>
      </section>
    </>
  );
}
