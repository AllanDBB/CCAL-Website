import type { MetadataRoute } from "next";
import { getNews } from "@/lib/cms";

const baseUrl = "https://www.ccalajuela.ed.cr";

const pages: { path: string; priority: number; changeFrequency: "weekly" | "monthly" | "yearly" }[] = [
  { path: "", priority: 1, changeFrequency: "weekly" },
  { path: "/admisiones", priority: 0.9, changeFrequency: "weekly" },
  { path: "/nosotros", priority: 0.7, changeFrequency: "monthly" },
  { path: "/nosotros/historia", priority: 0.7, changeFrequency: "monthly" },
  { path: "/nosotros/mision-vision", priority: 0.7, changeFrequency: "monthly" },
  { path: "/oferta", priority: 0.8, changeFrequency: "monthly" },
  { path: "/excelencia", priority: 0.8, changeFrequency: "monthly" },
  { path: "/vida-estudiantil", priority: 0.6, changeFrequency: "monthly" },
  { path: "/noticias", priority: 0.8, changeFrequency: "weekly" },
  { path: "/contacto", priority: 0.7, changeFrequency: "yearly" },
  { path: "/terminos-de-uso", priority: 0.2, changeFrequency: "yearly" },
];

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const news = await getNews();
  return [
    ...pages.map((p) => ({ url: `${baseUrl}${p.path}`, changeFrequency: p.changeFrequency, priority: p.priority })),
    ...news.map((n) => ({ url: `${baseUrl}/noticias/${n.slug}`, lastModified: n.date, priority: 0.6 })),
  ];
}
