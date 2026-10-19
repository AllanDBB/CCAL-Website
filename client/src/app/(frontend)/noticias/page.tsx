import type { Metadata } from "next";
import NewsRow from "@/components/site/NewsCard";
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
      <PageHero label="Noticias" title="Noticias y avisos" lead="Admisión, logros de nuestros estudiantes y la vida del colegio." />
      <section className="pb-20 sm:pb-28">
        <Container>
          <div className="border-t border-line">
            {news.map((item) => (
              <NewsRow key={item.slug} item={item} />
            ))}
          </div>
        </Container>
      </section>
    </>
  );
}
