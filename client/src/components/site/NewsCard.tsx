import Image from "next/image";
import Link from "next/link";
import type { NewsItem } from "@/content/types";
import { formatNumericDate } from "@/lib/format";
import { ArrowIcon } from "./ui";

/** Fila de noticia en lista: fecha · categoría · título · miniatura. */
export default function NewsRow({ item }: { item: NewsItem }) {
  return (
    <article className="group relative grid grid-cols-[1fr_auto] gap-6 border-b border-line py-7 sm:grid-cols-12 sm:items-center">
      <div className="col-span-2 flex gap-4 font-mono text-[12px] uppercase tracking-[0.08em] text-muted sm:col-span-3 sm:flex-col sm:gap-1">
        <time dateTime={item.date}>{formatNumericDate(item.date)}</time>
        <span className="text-ink">{item.category}</span>
      </div>
      <div className="sm:col-span-6">
        <h3 className="text-2xl leading-tight sm:text-3xl">
          <Link href={`/noticias/${item.slug}`} className="after:absolute after:inset-0">
            {item.title}
          </Link>
        </h3>
        <p className="mt-2 hidden leading-relaxed text-muted sm:block">{item.excerpt}</p>
      </div>
      <div className="relative row-start-2 aspect-square w-24 overflow-hidden bg-surface sm:col-span-2 sm:col-start-10 sm:row-start-auto sm:aspect-[4/3] sm:w-full">
        {item.image && (
          <Image src={item.image.src} alt="" fill sizes="(min-width: 640px) 200px, 96px" className="object-cover transition-transform duration-700 group-hover:scale-105" />
        )}
      </div>
      <ArrowIcon className="row-start-2 hidden h-6 w-6 justify-self-end transition-transform group-hover:translate-x-1 sm:col-span-1 sm:row-start-auto sm:block" />
    </article>
  );
}
