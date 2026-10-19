import Image from "next/image";
import Link from "next/link";
import type { NewsItem } from "@/content/types";
import { formatDate } from "@/lib/format";

export default function NewsCard({ item }: { item: NewsItem }) {
  return (
    <article className="group relative flex flex-col">
      <div className="relative aspect-[3/2] overflow-hidden rounded-2xl bg-navy-50">
        {item.image && (
          <Image
            src={item.image.src}
            alt={item.image.alt}
            fill
            sizes="(min-width: 1024px) 360px, (min-width: 640px) 50vw, 100vw"
            className="object-cover transition-transform duration-500 group-hover:scale-[1.03]"
          />
        )}
      </div>
      <div className="mt-5 flex items-center gap-3 text-sm">
        <span className="font-semibold text-gold-600">{item.category}</span>
        <span className="text-line" aria-hidden="true">
          |
        </span>
        <time dateTime={item.date} className="text-muted">
          {formatDate(item.date)}
        </time>
      </div>
      <h3 className="mt-2 text-xl leading-snug text-navy-950">
        <Link href={`/noticias/${item.slug}`} className="after:absolute after:inset-0 group-hover:underline group-hover:decoration-gold-500 group-hover:underline-offset-4">
          {item.title}
        </Link>
      </h3>
      <p className="mt-2 leading-relaxed text-muted">{item.excerpt}</p>
    </article>
  );
}
