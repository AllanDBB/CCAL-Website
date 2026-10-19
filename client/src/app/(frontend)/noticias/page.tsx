import NewsRow from "@/components/site/NewsCard";
import { Container, PageHero } from "@/components/site/ui";
import { getNews, getPages } from "@/lib/cms";
import { heroMetadata } from "@/lib/metadata";

export const generateMetadata = heroMetadata((p) => p.news.hero);

export default async function NoticiasPage() {
  const [news, { news: text }] = await Promise.all([getNews(), getPages()]);

  return (
    <>
      <PageHero label={text.hero.label} title={text.hero.title} lead={text.hero.lead} />
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
