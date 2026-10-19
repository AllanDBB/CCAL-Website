import type { Metadata } from "next";
import type { PageHero, PagesContent } from "@/content/types";
import { getPages } from "./cms";

/** Título y descripción de la página a partir de su encabezado en el panel. */
export function heroMetadata(pick: (pages: PagesContent) => PageHero, titleFrom: "label" | "title" = "label") {
  return async (): Promise<Metadata> => {
    const hero = pick(await getPages());
    return { title: hero[titleFrom], description: hero.lead };
  };
}
