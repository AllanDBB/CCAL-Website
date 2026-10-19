// Carga inicial del panel: copia el contenido de src/content a Payload,
// sube las fotos de public/images y crea el primer administrador.
// Uso: npm run seed  (se puede repetir; no duplica contenido)
import config from "@payload-config";
import crypto from "node:crypto";
import path from "node:path";
import { getPayload } from "payload";
import { admission } from "./content/admission";
import * as institution from "./content/institution";
import { news } from "./content/news";
import { site } from "./content/site";

const context = { disableRevalidate: true };
const noon = (day: string) => `${day}T12:00:00.000Z`;

function paragraphsToLexical(paragraphs: string[]) {
  return {
    root: {
      type: "root",
      format: "" as const,
      indent: 0,
      version: 1,
      direction: "ltr" as const,
      children: paragraphs.map((text) => ({
        type: "paragraph",
        format: "" as const,
        indent: 0,
        version: 1,
        direction: "ltr" as const,
        textFormat: 0,
        children: [{ type: "text", text, format: 0, detail: 0, mode: "normal", style: "", version: 1 }],
      })),
    },
  };
}

const payload = await getPayload({ config });

// 1. Primer administrador
const users = await payload.count({ collection: "users" });
if (users.totalDocs === 0) {
  const email = process.env.SEED_ADMIN_EMAIL || "admin@ccalajuela.ed.cr";
  const password = process.env.SEED_ADMIN_PASSWORD || crypto.randomBytes(9).toString("base64url");
  await payload.create({ collection: "users", data: { name: "Administrador", email, password, role: "admin" } });
  console.log(`\nAdministrador creado:\n  correo:     ${email}\n  contraseña: ${password}\n  Cámbiala al entrar.\n`);
} else {
  console.log("Ya existen usuarios; no se crea administrador.");
}

// 2. Fotos
const mediaIds = new Map<string, number>();
async function media(src: string, alt: string) {
  if (mediaIds.has(src)) return mediaIds.get(src)!;
  const filename = path.basename(src);
  const existing = await payload.find({ collection: "media", where: { filename: { equals: filename } }, limit: 1 });
  const doc =
    existing.docs[0] ??
    (await payload.create({
      collection: "media",
      data: { alt },
      filePath: path.resolve(process.cwd(), "public", src.replace(/^\//, "")),
      context,
    }));
  mediaIds.set(src, doc.id);
  return doc.id;
}

const gallery = [];
for (const g of institution.gallery) {
  gallery.push({ image: await media(g.src, g.alt), caption: g.caption });
}
console.log(`Fotos en la biblioteca: ${mediaIds.size}`);

// 3. Globales
await payload.updateGlobal({ slug: "site", data: site, context });

await payload.updateGlobal({
  slug: "admission",
  context,
  data: {
    status: admission.status,
    processName: admission.processName,
    headline: admission.headline,
    summary: admission.summary,
    keyDates: admission.keyDates.map((d) => ({ label: d.label, date: noon(d.date), note: d.note })),
    resultsDate: admission.resultsDate ? noon(admission.resultsDate) : undefined,
    requirements: admission.requirements.map((text) => ({ text })),
    steps: admission.steps,
    scoreWeights: admission.scoreWeights,
    scoreNote: admission.scoreNote,
    paa: {
      description: admission.paa.description,
      areas: admission.paa.areas.map((text) => ({ text })),
      facts: admission.paa.facts.map((text) => ({ text })),
    },
    faqs: admission.faqs,
  },
});

await payload.updateGlobal({
  slug: "institution",
  context,
  data: {
    stats: institution.stats,
    pillars: institution.pillars,
    history: {
      ...institution.history,
      paragraphs: institution.history.paragraphs.map((text) => ({ text })),
      founders: institution.history.founders.map((text) => ({ text })),
    },
    mission: institution.mission,
    vision: institution.vision,
    skills: institution.skills.map((text) => ({ text })),
    subjectAreas: institution.subjectAreas,
    extraPrograms: institution.extraPrograms,
    achievements: institution.achievements,
    gallery,
  },
});
console.log("Globales cargados: datos del colegio, admisión, el colegio.");

// 4. Noticias
for (const item of news) {
  const existing = await payload.find({ collection: "news", where: { slug: { equals: item.slug } }, limit: 1, draft: true });
  const data = {
    title: item.title,
    slug: item.slug,
    date: noon(item.date),
    category: item.category,
    excerpt: item.excerpt,
    image: item.image ? await media(item.image.src, item.image.alt) : undefined,
    body: paragraphsToLexical(item.body as string[]),
    _status: "published" as const,
  };
  if (existing.docs[0]) {
    await payload.update({ collection: "news", id: existing.docs[0].id, data, context });
  } else {
    await payload.create({ collection: "news", data, context });
  }
}
console.log(`Noticias: ${news.length}`);

process.exit(0);
