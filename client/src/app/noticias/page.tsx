import type { Metadata } from "next";
import NewsCard from "@/components/site/NewsCard";
import { Container, PageHero } from "@/components/site/ui";
import { getNews } from "@/lib/cms";

export const metadata: Metadata = {
  title: "Noticias",
  description: "Noticias, logros y avisos del Colegio Científico de Alajuela.",
};

export default async function NoticiasPage() {
  const news = await getNews();

  return (
    <>
      <PageHero eyebrow="Noticias" title="Noticias y avisos" lead="Admisión, logros de nuestros estudiantes y la vida del colegio." />
      <section className="py-16 sm:py-20">
        <Container>
          <div className="grid gap-x-8 gap-y-14 sm:grid-cols-2 lg:grid-cols-3">
            {news.map((item) => (
              <NewsCard key={item.slug} item={item} />
            ))}
          </div>
        </Container>
      </section>
    </>
  );
}
