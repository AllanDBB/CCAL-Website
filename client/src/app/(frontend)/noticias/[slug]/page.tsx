import type { Metadata } from "next";
import Link from "next/link";
import { RichText } from "@payloadcms/richtext-lexical/react";
import { notFound } from "next/navigation";
import { ArrowIcon, Container, Label, Photo } from "@/components/site/ui";
import { getNews, getNewsItem } from "@/lib/cms";
import { formatNumericDate } from "@/lib/format";

type Props = { params: Promise<{ slug: string }> };

export async function generateStaticParams() {
  const news = await getNews();
  return news.map((item) => ({ slug: item.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const item = await getNewsItem(slug);
  if (!item) return {};
  return {
    title: item.title,
    description: item.excerpt,
    openGraph: item.image ? { images: [{ url: item.image.src, alt: item.image.alt }] } : undefined,
  };
}

export default async function NoticiaPage({ params }: Props) {
  const { slug } = await params;
  const item = await getNewsItem(slug);
  if (!item) notFound();

  return (
    <article>
      <Container className="pt-12 pb-14 sm:pt-16 lg:pt-20">
        <Link href="/noticias" className="group inline-flex items-center gap-2 font-mono text-[12px] uppercase tracking-[0.08em] text-muted hover:text-ink">
          <ArrowIcon className="h-4 w-4 rotate-180 transition-transform group-hover:-translate-x-1" />
          Noticias
        </Link>
        <div className="mt-10 grid gap-6 border-t border-line pt-6 lg:grid-cols-12">
          <Label className="lg:col-span-3">
            <time dateTime={item.date} className="text-ink">
              {formatNumericDate(item.date)}
            </time>{" "}
            — {item.category}
          </Label>
          <div className="lg:col-span-9">
            <h1 className="text-4xl leading-[1] tracking-[-0.045em] sm:text-6xl lg:text-7xl">{item.title}</h1>
            <p className="mt-6 max-w-2xl text-xl leading-relaxed text-muted">{item.excerpt}</p>
          </div>
        </div>
      </Container>
      {item.image && <Photo image={item.image} priority sizes="100vw" className="aspect-[16/9] w-full sm:aspect-[21/9]" />}
      <Container className="py-14 sm:py-20">
        <div className="space-y-6 text-xl leading-relaxed lg:ml-[25%] lg:max-w-[42rem] [&_a]:text-blue [&_a]:underline [&_h2]:mt-10 [&_h2]:text-3xl [&_h3]:mt-8 [&_h3]:text-2xl [&_li]:ml-6 [&_ol]:list-decimal [&_ul]:list-disc">
          {Array.isArray(item.body) ? item.body.map((p) => <p key={p}>{p}</p>) : <RichText data={item.body} disableContainer />}
        </div>
      </Container>
    </article>
  );
}
