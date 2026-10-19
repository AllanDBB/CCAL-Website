// Punto único de acceso al contenido. Hoy lee archivos locales en
// src/content; en la fase 2 estas funciones consultarán Payload CMS y las
// páginas no tendrán que cambiar.
import { admission } from "@/content/admission";
import { news } from "@/content/news";
import { site } from "@/content/site";
import * as institution from "@/content/institution";

export async function getSite() {
  return site;
}

export async function getAdmission() {
  return admission;
}

export async function getNews(limit?: number) {
  const sorted = [...news].sort((a, b) => b.date.localeCompare(a.date));
  return limit ? sorted.slice(0, limit) : sorted;
}

export async function getNewsItem(slug: string) {
  return news.find((item) => item.slug === slug);
}

export async function getInstitution() {
  return institution;
}
