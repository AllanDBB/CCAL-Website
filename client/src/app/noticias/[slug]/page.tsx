import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowIcon, Container } from "@/components/site/ui";
import { getNews, getNewsItem } from "@/lib/cms";
import { formatDate } from "@/lib/format";

export async function generateStaticParams() {
  const news = await getNews();
  return news.map((item) => ({ slug: item.slug }));
}

export async function generateMetadata({ params }: PageProps<"/noticias/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const item = await getNewsItem(slug);
  if (!item) return {};
  return {
    title: item.title,
    description: item.excerpt,
    openGraph: item.image ? { images: [{ url: item.image.src, alt: item.image.alt }] } : undefined,
  };
}

export default async function NoticiaPage({ params }: PageProps<"/noticias/[slug]">) {
  const { slug } = await params;
  const item = await getNewsItem(slug);
  if (!item) notFound();

  return (
    <article>
      <Container className="max-w-3xl pt-12 pb-10 sm:pt-16">
        <Link href="/noticias" className="group inline-flex items-center gap-2 text-sm font-semibold text-navy-900">
          <ArrowIcon className="h-4 w-4 rotate-180 transition-transform group-hover:-translate-x-0.5" />
          Noticias
        </Link>
        <div className="mt-8 flex items-center gap-3 text-sm">
          <span className="font-semibold text-gold-600">{item.category}</span>
          <span className="text-line" aria-hidden="true">
            |
          </span>
          <time dateTime={item.date} className="text-muted">
            {formatDate(item.date)}
          </time>
        </div>
        <h1 className="mt-3 text-4xl leading-tight text-navy-950 sm:text-5xl">{item.title}</h1>
        <p className="mt-5 text-xl leading-relaxed text-muted">{item.excerpt}</p>
      </Container>
      {item.image && (
        <Container className="max-w-5xl">
          <div className="relative aspect-[16/9] overflow-hidden rounded-[28px] bg-navy-50">
            <Image src={item.image.src} alt={item.image.alt} fill priority sizes="(min-width: 1024px) 1024px, 100vw" className="object-cover" />
          </div>
        </Container>
      )}
      <Container className="max-w-3xl py-12 sm:py-16">
        <div className="space-y-6 text-lg leading-relaxed text-ink">
          {item.body.map((p) => (
            <p key={p}>{p}</p>
          ))}
        </div>
      </Container>
    </article>
  );
}
