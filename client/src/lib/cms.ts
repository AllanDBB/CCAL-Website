// Punto único de acceso al contenido. Con DATABASE_URL lee de Payload CMS
// (lo que el personal edita en /admin); sin base de datos usa los archivos
// de src/content, que también sirven como contenido inicial.
import config from "@payload-config";
import { getPayload } from "payload";
import { cache } from "react";
import { admission as localAdmission } from "@/content/admission";
import * as localInstitution from "@/content/institution";
import { mainNav as localNav } from "@/content/navigation";
import { news as localNews } from "@/content/news";
import { pages as localPages } from "@/content/pages";
import { site as localSite } from "@/content/site";
import type { Admission, GalleryItem, ImageRef, NavItem, NewsItem, PagesContent, SiteSettings } from "@/content/types";
import type { News } from "@/payload-types";

const payload = cache(() => getPayload({ config }));

// El panel se usa solo cuando hay base de datos y ya tiene el contenido
// inicial; mientras tanto el sitio sigue mostrando src/content.
const cmsReady = cache(async () => {
  if (!process.env.DATABASE_URL) return false;
  const site = await (await payload()).findGlobal({ slug: "site", depth: 0 });
  return Boolean(site.name);
});

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

/**
 * Completa lo que viene del panel con el contenido por defecto: un campo
 * vacío muestra el texto original en lugar de dejar un hueco en la página.
 */
function withDefaults<T>(defaults: T, value: unknown): T {
  if (value === null || value === undefined || value === "") return defaults;
  if (Array.isArray(defaults)) return (Array.isArray(value) && value.length ? value : defaults) as T;
  if (typeof defaults === "object" && defaults !== null && typeof value === "object") {
    const out: Record<string, unknown> = { ...(value as Record<string, unknown>) };
    for (const [key, def] of Object.entries(defaults)) {
      out[key] = withDefaults(def, (value as Record<string, unknown>)[key]);
    }
    return out as T;
  }
  return value as T;
}

export const getSite = cache(async (): Promise<SiteSettings> => {
  if (!(await cmsReady())) return localSite;
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
  if (!(await cmsReady())) return localAdmission;
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
  if (!(await cmsReady())) return localInstitution;
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
  if (!(await cmsReady())) {
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

/** Con `draft` devuelve también borradores (vista previa desde el panel). */
export const getNewsItem = cache(async (slug: string, draft = false): Promise<NewsItem | undefined> => {
  if (!(await cmsReady())) return localNews.find((item) => item.slug === slug);
  const res = await (await payload()).find({
    collection: "news",
    where: draft ? { slug: { equals: slug } } : { slug: { equals: slug }, _status: { equals: "published" } },
    draft,
    limit: 1,
    depth: 1,
  });
  return res.docs[0] ? toNewsItem(res.docs[0]) : undefined;
});

export const getPages = cache(async (): Promise<PagesContent> => {
  if (!(await cmsReady())) return localPages;
  const p = await (await payload()).findGlobal({ slug: "pages", depth: 1 });
  // Las fotos se resuelven aparte: el panel devuelve documentos de «media».
  const merged = withDefaults(localPages, {
    ...p,
    home: { ...p.home, heroImage: undefined },
    history: { ...p.history, image: undefined },
    programs: { ...p.programs, image: undefined },
  });
  merged.home.heroImage = toImage(p.home?.heroImage);
  merged.history.image = toImage(p.history?.image) ?? localPages.history.image;
  merged.programs.image = toImage(p.programs?.image) ?? localPages.programs.image;
  return merged;
});

export const getNavigation = cache(async (): Promise<NavItem[]> => {
  if (!(await cmsReady())) return localNav;
  const n = await (await payload()).findGlobal({ slug: "navigation", depth: 0 });
  if (!n.items?.length) return localNav;
  return n.items.map((item) => ({
    label: item.label,
    href: item.href,
    children: item.children?.length
      ? item.children.map((c) => ({ label: c.label, href: c.href, description: c.description ?? undefined }))
      : undefined,
  }));
});
