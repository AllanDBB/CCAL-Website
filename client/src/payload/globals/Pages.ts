import type { Field, GlobalConfig, Tab } from "payload";
import { allow, anyone } from "../access";
import { revalidateGlobal } from "../revalidate";
import { rowLabel } from "../rowLabel";

/** Encabezado de página: etiqueta, titular y entrada. */
const hero = (description?: string): Field => ({
  name: "hero",
  label: "Encabezado",
  type: "group",
  admin: { description },
  fields: [
    { name: "label", label: "Etiqueta", type: "text", required: true, admin: { description: "Texto pequeño sobre el titular." } },
    { name: "title", label: "Titular", type: "text", required: true },
    { name: "lead", label: "Entrada", type: "textarea", required: true, admin: { description: "También se usa como descripción para Google." } },
  ],
});

/** Encabezado de una sección dentro de la página. */
const section = (name: string, label: string, opts: { lead?: boolean; link?: boolean } = {}): Field => ({
  name,
  label,
  type: "group",
  fields: [
    {
      type: "row",
      fields: [
        { name: "label", label: "Etiqueta", type: "text", required: true },
        { name: "title", label: "Título", type: "text", required: true },
      ],
    },
    ...(opts.lead ? [{ name: "lead", label: "Texto", type: "textarea" } as Field] : []),
    ...(opts.link ? [{ name: "linkText", label: "Texto del enlace", type: "text" } as Field] : []),
  ],
});

const tab = (label: string, name: string, path: string, fields: Field[]): Tab => ({
  label,
  name,
  description: `Textos de ${path}`,
  fields,
});

export const Pages: GlobalConfig = {
  slug: "pages",
  label: "Páginas",
  admin: {
    group: "Contenido",
    description: "Titulares, textos de introducción y títulos de sección de cada página del sitio.",
    preview: () => "/",
  },
  access: { read: anyone, update: allow("direccion", "comunicacion") },
  hooks: { afterChange: [revalidateGlobal] },
  fields: [
    {
      type: "tabs",
      tabs: [
        tab("Inicio", "home", "la portada (/)", [
          {
            type: "row",
            fields: [
              { name: "heroLabel", label: "Etiqueta superior", type: "text", required: true },
              {
                name: "heroImage",
                label: "Foto principal",
                type: "upload",
                relationTo: "media",
                admin: { description: "Si se deja vacía se usa la primera foto de la galería." },
              },
            ],
          },
          {
            name: "heroTitle",
            label: "Titular",
            type: "textarea",
            required: true,
            admin: { description: "Cada línea del texto es una línea del titular." },
          },
          {
            type: "row",
            fields: [
              { name: "primaryButton", label: "Botón principal", type: "text", required: true },
              { name: "secondaryButton", label: "Botón secundario", type: "text", required: true },
            ],
          },
          {
            name: "facts",
            label: "Datos bajo los botones",
            type: "array",
            maxRows: 3,
            labels: { singular: "Dato", plural: "Datos" },
            admin: rowLabel("label"),
            fields: [
              {
                type: "row",
                fields: [
                  { name: "label", label: "Etiqueta", type: "text", required: true },
                  { name: "value", label: "Valor", type: "text", required: true },
                ],
              },
            ],
          },
          section("school", "Sección «El colegio»", { lead: true, link: true }),
          section("photos", "Sección de fotos", { link: true }),
          section("news", "Sección de noticias", { link: true }),
        ]),
        tab("Admisiones", "admissions", "/admisiones (los datos del proceso están en «Proceso de admisión»)", [
          section("dates", "Fechas clave"),
          section("steps", "Pasos"),
          section("requirements", "Requisitos", { lead: true }),
          section("paa", "Prueba de Aptitud Académica"),
          section("faq", "Preguntas frecuentes", { lead: true }),
        ]),
        tab("El colegio", "school", "/nosotros", [hero()]),
        tab("Historia", "history", "/nosotros/historia", [
          hero(),
          { name: "image", label: "Foto principal", type: "upload", relationTo: "media" },
          section("origin", "Sección de historia"),
          { name: "foundersLabel", label: "Título del convenio fundacional", type: "text", required: true },
        ]),
        tab("Misión y visión", "missionVision", "/nosotros/mision-vision", [
          hero(),
          section("skills", "Sección de competencias", { lead: true }),
        ]),
        tab("Oferta", "programs", "/oferta", [
          hero(),
          { name: "image", label: "Foto principal", type: "upload", relationTo: "media" },
          section("areas", "Plan de estudios"),
          section("extra", "Programas adicionales"),
          { name: "ctaButton", label: "Botón final", type: "text", required: true },
        ]),
        tab("Excelencia", "excellence", "/excelencia", [
          hero(),
          section("research", "Investigación", { lead: true }),
          section("awards", "Reconocimientos"),
          { name: "ctaButton", label: "Botón final", type: "text", required: true },
        ]),
        tab("Vida estudiantil", "studentLife", "/vida-estudiantil", [hero()]),
        tab("Noticias", "news", "/noticias", [hero()]),
        tab("Contacto", "contact", "/contacto", [
          hero(),
          { name: "hoursNote", label: "Nota del horario", type: "text" },
        ]),
        tab("Términos", "terms", "/terminos-de-uso", [
          hero(),
          {
            name: "sections",
            label: "Secciones",
            type: "array",
            labels: { singular: "Sección", plural: "Secciones" },
            admin: rowLabel("title"),
            fields: [
              { name: "title", label: "Título", type: "text", required: true },
              { name: "body", label: "Texto", type: "textarea", required: true, admin: { description: "Deja una línea en blanco entre párrafos." } },
            ],
          },
          { name: "updated", label: "Nota de actualización", type: "text" },
        ]),
      ],
    },
  ],
};
