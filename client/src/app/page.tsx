import Image from "next/image";
import Link from "next/link";
import AdmissionPanel from "@/components/site/AdmissionPanel";
import NewsCard from "@/components/site/NewsCard";
import { ArrowIcon, ButtonLink, Container, Eyebrow, SectionHeading } from "@/components/site/ui";
import { getAdmission, getInstitution, getNews, getSite } from "@/lib/cms";

export const revalidate = 3600;

export default async function HomePage() {
  const [site, admission, news, { stats, pillars, gallery }] = await Promise.all([
    getSite(),
    getAdmission(),
    getNews(3),
    getInstitution(),
  ]);

  const mosaic = gallery.slice(1, 6);

  return (
    <>
      {/* Portada */}
      <section className="overflow-hidden">
        <Container className="grid items-center gap-12 pt-12 pb-16 sm:pt-16 lg:grid-cols-12 lg:gap-10 lg:pt-20 lg:pb-24">
          <div className="lg:col-span-6">
            <Eyebrow>Colegio Científico de Costa Rica · Sede Alajuela</Eyebrow>
            <h1 className="text-[2.75rem] leading-[1.04] text-navy-950 sm:text-6xl lg:text-[4.25rem]">
              Formamos a la próxima generación de científicos de Costa Rica.
            </h1>
            <p className="mt-6 max-w-xl text-lg leading-relaxed text-muted sm:text-xl">{site.description}</p>
            <div className="mt-9 flex flex-wrap gap-3">
              <ButtonLink href="/admisiones" variant="navy">
                Proceso de admisión <ArrowIcon />
              </ButtonLink>
              <ButtonLink href="/nosotros" variant="outline">
                Conocer el colegio
              </ButtonLink>
            </div>
          </div>
          <figure className="relative lg:col-span-6">
            <div className="relative aspect-[4/5] overflow-hidden rounded-[28px] bg-navy-50 sm:aspect-[5/4] lg:aspect-[4/5]">
              <Image
                src={gallery[0].src}
                alt={gallery[0].alt}
                fill
                priority
                sizes="(min-width: 1024px) 560px, 100vw"
                className="object-cover"
              />
            </div>
            <figcaption className="absolute bottom-5 left-5 right-5 rounded-2xl bg-paper/95 px-5 py-4 shadow-lg shadow-navy-950/10 backdrop-blur sm:right-auto sm:max-w-xs">
              <p className="text-xs font-semibold uppercase tracking-[0.16em] text-gold-600">Desde {site.foundedYear}</p>
              <p className="mt-1 font-serif text-lg leading-snug text-navy-950">{site.tagline}</p>
            </figcaption>
          </figure>
        </Container>
      </section>

      {/* Cifras */}
      <section aria-label="El CCAL en cifras" className="border-y border-line bg-white">
        <Container>
          <dl className="grid grid-cols-2 divide-line lg:grid-cols-4 lg:divide-x">
            {stats.map((s, i) => (
              <div
                key={s.label}
                className={`py-8 lg:px-8 lg:first:pl-0 ${i % 2 === 1 ? "pl-6" : "pr-6"} ${i < 2 ? "border-b border-line lg:border-b-0" : ""}`}
              >
                <dt className="sr-only">{s.label}</dt>
                <dd>
                  <span className="block font-serif text-4xl text-navy-900 sm:text-5xl">{s.value}</span>
                  <span className="mt-2 block text-sm leading-snug text-muted">{s.label}</span>
                </dd>
              </div>
            ))}
          </dl>
        </Container>
      </section>

      {/* Admisión */}
      <section className="py-20 sm:py-24">
        <Container>
          <AdmissionPanel admission={admission} />
        </Container>
      </section>

      {/* Pilares */}
      <section className="pb-20 sm:pb-28">
        <Container className="grid gap-12 lg:grid-cols-12">
          <SectionHeading
            className="lg:col-span-5"
            eyebrow="Por qué el CCAL"
            title="Una formación exigente, pensada para la universidad y para el país."
            lead="Somos parte del Sistema Nacional de Colegios Científicos: colegios públicos que reúnen a estudiantes con talento para la ciencia en todo Costa Rica."
          />
          <ol className="lg:col-span-6 lg:col-start-7">
            {pillars.map((p, i) => (
              <li key={p.title} className="flex gap-6 border-t border-line py-7 last:border-b">
                <span className="font-serif text-2xl text-gold-600" aria-hidden="true">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <div>
                  <h3 className="text-2xl text-navy-950">{p.title}</h3>
                  <p className="mt-2 leading-relaxed text-muted">{p.body}</p>
                </div>
              </li>
            ))}
          </ol>
        </Container>
      </section>

      {/* Vida estudiantil */}
      <section className="bg-white py-20 sm:py-28">
        <Container>
          <div className="flex flex-wrap items-end justify-between gap-6">
            <SectionHeading
              eyebrow="Vida estudiantil"
              title="Laboratorio, competencia y comunidad."
              lead="Del aula a las ferias científicas y a competencias internacionales, con espacio para el deporte y la convivencia."
            />
            <Link href="/vida-estudiantil" className="group inline-flex items-center gap-2 font-semibold text-navy-900">
              Ver más fotos <ArrowIcon className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
            </Link>
          </div>
          <div className="mt-12 grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-4 lg:grid-rows-2">
            {mosaic.map((img, i) => (
              <figure
                key={img.src}
                className={`group relative overflow-hidden rounded-2xl bg-navy-50 ${
                  i === 0 ? "col-span-2 aspect-[4/3] lg:row-span-2 lg:aspect-auto" : "aspect-square"
                }`}
              >
                <Image
                  src={img.src}
                  alt={img.alt}
                  fill
                  sizes={i === 0 ? "(min-width: 1024px) 560px, 100vw" : "(min-width: 1024px) 280px, 50vw"}
                  className="object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                />
                <figcaption className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-navy-950/70 to-transparent px-4 pt-10 pb-3 text-sm font-medium text-white">
                  {img.caption}
                </figcaption>
              </figure>
            ))}
          </div>
        </Container>
      </section>

      {/* Lema */}
      <section className="py-20 sm:py-28">
        <Container className="text-center">
          <span className="mx-auto block h-px w-16 bg-gold-500" aria-hidden="true" />
          <blockquote className="mx-auto mt-10 max-w-3xl font-serif text-3xl leading-snug text-navy-950 sm:text-5xl">
            “{site.tagline}”
          </blockquote>
          <p className="mt-6 text-muted">Lema del Sistema Nacional de Colegios Científicos de Costa Rica</p>
        </Container>
      </section>

      {/* Noticias */}
      <section className="border-t border-line bg-white py-20 sm:py-28">
        <Container>
          <div className="flex flex-wrap items-end justify-between gap-6">
            <SectionHeading eyebrow="Noticias" title="Lo más reciente" />
            <Link href="/noticias" className="group inline-flex items-center gap-2 font-semibold text-navy-900">
              Todas las noticias <ArrowIcon className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
            </Link>
          </div>
          <div className="mt-12 grid gap-10 sm:grid-cols-2 lg:grid-cols-3">
            {news.map((item) => (
              <NewsCard key={item.slug} item={item} />
            ))}
          </div>
        </Container>
      </section>
    </>
  );
}
