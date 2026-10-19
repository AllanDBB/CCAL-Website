import type { CollectionConfig } from "payload";
import { allow, anyone, hasRole } from "../access";
import { revalidateDelete, revalidateDoc } from "../revalidate";

const categories = ["Admisión", "Logros", "Investigación", "Comunidad", "Avisos"];

function slugify(text: string) {
  return text
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

export const News: CollectionConfig = {
  slug: "news",
  labels: { singular: "Noticia", plural: "Noticias" },
  admin: {
    group: "Contenido",
    useAsTitle: "title",
    defaultColumns: ["title", "category", "date", "_status"],
    description: "Las noticias publicadas aparecen en la portada y en /noticias.",
    listSearchableFields: ["title", "excerpt"],
    // «Vista previa» abre la noticia tal como está, aunque sea un borrador.
    preview: (doc) => (doc?.slug ? `/vista-previa?ruta=/noticias/${doc.slug}` : null),
  },
  defaultSort: "-date",
  versions: { drafts: true, maxPerDoc: 25 },
  access: {
    // El público solo ve noticias publicadas; el personal ve también borradores.
    read: ({ req }) => (req.user ? true : { _status: { equals: "published" } }),
    create: allow("direccion", "comunicacion", "docente"),
    update: allow("direccion", "comunicacion", "docente"),
    delete: allow("direccion", "comunicacion"),
  },
  hooks: {
    beforeChange: [
      ({ data, req }) => {
        // Docentes escriben borradores; Comunicación o Dirección publican.
        if (req.user && data._status === "published" && !hasRole(req, "direccion", "comunicacion")) {
          data._status = "draft";
        }
        if (!data.slug && data.title) data.slug = slugify(data.title);
        return data;
      },
    ],
    afterChange: [revalidateDoc],
    afterDelete: [revalidateDelete],
  },
  fields: [
    { name: "title", label: "Título", type: "text", required: true },
    {
      type: "row",
      fields: [
        {
          name: "date",
          label: "Fecha",
          type: "date",
          required: true,
          defaultValue: () => new Date().toISOString(),
          admin: { date: { pickerAppearance: "dayOnly", displayFormat: "dd/MM/yyyy" } },
        },
        {
          name: "category",
          label: "Categoría",
          type: "select",
          required: true,
          defaultValue: "Comunidad",
          options: categories,
        },
      ],
    },
    {
      name: "excerpt",
      label: "Resumen",
      type: "textarea",
      required: true,
      maxLength: 240,
      admin: { description: "Una o dos oraciones. Se muestra en la lista de noticias." },
    },
    { name: "image", label: "Foto principal", type: "upload", relationTo: "media" },
    { name: "body", label: "Texto", type: "richText", required: true },
    {
      name: "slug",
      label: "Dirección web",
      type: "text",
      unique: true,
      index: true,
      admin: {
        position: "sidebar",
        description: "Se genera a partir del título. Ej.: /noticias/resultados-admision-2026",
      },
    },
  ],
};
