// Punto único de acceso al contenido. Con DATABASE_URL lee de Payload CMS
// (lo que el personal edita en /admin); sin base de datos usa los archivos
// de src/content, que también sirven como contenido inicial.
import config from "@payload-config";
import { getPayload } from "payload";
import { cache } from "react";
import { admission as localAdmission } from "@/content/admission";
import * as localInstitution from "@/content/institution";
import { news as localNews } from "@/content/news";
import { site as localSite } from "@/content/site";
import type { Admission, GalleryItem, ImageRef, NewsItem, SiteSettings } from "@/content/types";
import type { News } from "@/payload-types";

const useCMS = Boolean(process.env.DATABASE_URL);

const payload = cache(() => getPayload({ config }));

type MediaDoc = { url?: string | null; alt?: string | null } | number | null | undefined;

// Payload antepone serverURL a los archivos locales; next/image los necesita relativos.
function relative(url: string) {
  const base = process.env.NEXT_PUBLIC_SERVER_URL;
  return base && url.startsWith(base) ? url.slice(base.length) : url;
}

function toImage(media: MediaDoc): ImageRef | undefined {
  if (!media || typeof media === "number" || !media.url) return undefined;
  return { src: relative(media.url), alt: media.alt ?? "" };
}

function mediaUrl(media: MediaDoc) {
  return media && typeof media === "object" && media.url ? relative(media.url) : undefined;
}

/** Fecha de Payload (ISO con hora) → AAAA-MM-DD en hora de Costa Rica. */
function toDay(value?: string | null) {
  if (!value) return undefined;
  return new Date(Date.parse(value) - 6 * 3600 * 1000).toISOString().slice(0, 10);
}

const texts = (rows?: { text: string }[] | null) => (rows ?? []).map((r) => r.text);

export const getSite = cache(async (): Promise<SiteSettings> => {
  if (!useCMS) return localSite;
  const s = await (await payload()).findGlobal({ slug: "site" });
  return {
    name: s.name,
    shortName: s.shortName,
    tagline: s.tagline,
    description: s.description,
    foundedYear: s.foundedYear,
    address: s.address,
    addressDetail: s.addressDetail ?? "",
    phone: s.phone,
    email: s.email,
    hours: s.hours,
    mapEmbedUrl: s.mapEmbedUrl ?? "",
    social: (s.social ?? []).map((r) => ({ name: r.name, url: r.url, handle: r.handle ?? "" })),
  };
});

export const getAdmission = cache(async (): Promise<Admission> => {
  if (!useCMS) return localAdmission;
  const a = await (await payload()).findGlobal({ slug: "admission", depth: 1 });
  return {
    status: a.status,
    processName: a.processName,
    headline: a.headline,
    summary: a.summary,
    keyDates: (a.keyDates ?? []).map((d) => ({ label: d.label, date: toDay(d.date)!, note: d.note ?? undefined })),
    resultsDate: toDay(a.resultsDate),
    resultsUrl: mediaUrl(a.resultsFile) ?? (a.resultsUrl || undefined),
    practiceUrl: mediaUrl(a.practiceFile),
    requirements: texts(a.requirements),
    steps: (a.steps ?? []).map((s) => ({ title: s.title, description: s.description })),
    scoreWeights: (a.scoreWeights ?? []).map((w) => ({ label: w.label, percent: w.percent, detail: w.detail ?? undefined })),
    scoreNote: a.scoreNote ?? "",
    paa: { description: a.paa.description, areas: texts(a.paa.areas), facts: texts(a.paa.facts) },
    faqs: (a.faqs ?? []).map((f) => ({ question: f.question, answer: f.answer })),
  };
});

export const getInstitution = cache(async (): Promise<typeof localInstitution> => {
  if (!useCMS) return localInstitution;
  const i = await (await payload()).findGlobal({ slug: "institution", depth: 1 });
  return {
    stats: (i.stats ?? []).map((s) => ({ value: s.value, label: s.label })),
    pillars: (i.pillars ?? []).map((p) => ({ title: p.title, body: p.body })),
    history: {
      foundedOn: i.history.foundedOn,
      intro: i.history.intro,
      paragraphs: texts(i.history.paragraphs),
      founders: texts(i.history.founders),
      foundersNote: i.history.foundersNote ?? "",
    },
    mission: i.mission,
    vision: i.vision,
    skills: texts(i.skills),
    subjectAreas: (i.subjectAreas ?? []).map((a) => ({
      name: a.name,
      subjects: (a.subjects ?? []).map((s) => ({ name: s.name, level: s.level ?? "", description: s.description ?? "" })),
    })),
    extraPrograms: (i.extraPrograms ?? []).map((p) => ({ title: p.title, body: p.body })),
    achievements: (i.achievements ?? []).map((a) => ({ year: a.year, title: a.title, institution: a.institution })),
    gallery: (i.gallery ?? []).flatMap((g): GalleryItem[] => {
      const image = toImage(g.image);
      return image ? [{ ...image, caption: g.caption }] : [];
    }),
  };
});

function toNewsItem(doc: News): NewsItem {
  return {
    slug: doc.slug ?? String(doc.id),
    title: doc.title,
    date: toDay(doc.date)!,
    category: doc.category,
    excerpt: doc.excerpt,
    image: toImage(doc.image),
    body: doc.body,
  };
}

export const getNews = cache(async (limit?: number): Promise<NewsItem[]> => {
  if (!useCMS) {
    const sorted = [...localNews].sort((a, b) => b.date.localeCompare(a.date));
    return limit ? sorted.slice(0, limit) : sorted;
  }
  const res = await (await payload()).find({
    collection: "news",
    where: { _status: { equals: "published" } },
    sort: "-date",
    limit: limit ?? 100,
    depth: 1,
  });
  return res.docs.map((doc) => toNewsItem(doc));
});

export const getNewsItem = cache(async (slug: string): Promise<NewsItem | undefined> => {
  if (!useCMS) return localNews.find((item) => item.slug === slug);
  const res = await (await payload()).find({
    collection: "news",
    where: { slug: { equals: slug }, _status: { equals: "published" } },
    limit: 1,
    depth: 1,
  });
  return res.docs[0] ? toNewsItem(res.docs[0]) : undefined;
});
