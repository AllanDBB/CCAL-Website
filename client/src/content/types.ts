// Tipos del contenido editable. Cada tipo corresponde a una colección o
// "global" del futuro panel /admin (Payload CMS), para que el cambio de
// archivos locales a base de datos no toque los componentes.

export interface ImageRef {
  src: string;
  alt: string;
}

export interface SocialLink {
  name: "Facebook" | "Instagram" | "LinkedIn" | "YouTube";
  url: string;
  handle: string;
}

export interface SiteSettings {
  name: string;
  shortName: string;
  tagline: string;
  description: string;
  foundedYear: number;
  address: string;
  addressDetail: string;
  phone: string;
  email: string;
  hours: string;
  mapEmbedUrl: string;
  social: SocialLink[];
}

/** Estado del proceso de admisión: controla el banner y la portada. */
export type AdmissionStatus = "proximamente" | "abierta" | "cerrada" | "resultados";

export interface KeyDate {
  label: string;
  /** Fecha ISO, AAAA-MM-DD */
  date: string;
  note?: string;
}

export interface Admission {
  status: AdmissionStatus;
  /** Nombre del proceso tal como se muestra, p. ej. "Admisión 2026" */
  processName: string;
  headline: string;
  summary: string;
  keyDates: KeyDate[];
  resultsDate?: string;
  resultsUrl?: string;
  practiceUrl?: string;
  requirements: string[];
  steps: { title: string; description: string }[];
  scoreWeights: { label: string; percent: number; detail?: string }[];
  scoreNote: string;
  paa: {
    description: string;
    areas: string[];
    facts: string[];
  };
  faqs: { question: string; answer: string }[];
}

export interface Stat {
  value: string;
  label: string;
}

export interface Pillar {
  title: string;
  body: string;
}

export type NewsCategory = "Admisión" | "Logros" | "Investigación" | "Comunidad" | "Avisos";

export interface NewsItem {
  slug: string;
  title: string;
  /** Fecha ISO, AAAA-MM-DD */
  date: string;
  category: NewsCategory;
  excerpt: string;
  image?: ImageRef;
  body: string[];
}

export interface Achievement {
  year: string;
  title: string;
  institution: string;
}

export interface Subject {
  name: string;
  level: string;
  description: string;
}

export interface SubjectArea {
  name: string;
  subjects: Subject[];
}

export interface GalleryItem extends ImageRef {
  caption: string;
}
