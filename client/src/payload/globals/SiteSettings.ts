import type { GlobalConfig } from "payload";
import { allow, anyone } from "../access";
import { revalidateGlobal } from "../revalidate";
import { rowLabel } from "../rowLabel";

export const SiteSettings: GlobalConfig = {
  slug: "site",
  label: "Datos del colegio",
  admin: {
    group: "Configuración",
    preview: () => "/contacto",
    description: "Contacto, redes sociales y textos que aparecen en todo el sitio (pie de página, encabezado).",
  },
  access: { read: anyone, update: allow("direccion") },
  hooks: { afterChange: [revalidateGlobal] },
  fields: [
    {
      type: "row",
      fields: [
        { name: "name", label: "Nombre", type: "text", required: true },
        { name: "shortName", label: "Sigla", type: "text", required: true },
      ],
    },
    { name: "tagline", label: "Lema", type: "text", required: true },
    { name: "description", label: "Descripción corta", type: "textarea", required: true },
    { name: "foundedYear", label: "Año de fundación", type: "number", required: true },
    {
      type: "collapsible",
      label: "Contacto",
      fields: [
        {
          type: "row",
          fields: [
            { name: "phone", label: "Teléfono", type: "text", required: true },
            { name: "email", label: "Correo", type: "email", required: true },
          ],
        },
        { name: "address", label: "Dirección", type: "text", required: true },
        { name: "addressDetail", label: "Referencia de la dirección", type: "text" },
        { name: "hours", label: "Horario de atención", type: "text", required: true },
        {
          name: "mapEmbedUrl",
          label: "Mapa (URL de inserción de Google Maps)",
          type: "text",
          admin: { description: "En Google Maps: Compartir → Insertar un mapa → copiar solo la dirección del src." },
        },
      ],
    },
    {
      name: "social",
      label: "Redes sociales",
      type: "array",
      labels: { singular: "Red", plural: "Redes" },
      admin: rowLabel("name"),
      fields: [
        {
          type: "row",
          fields: [
            {
              name: "name",
              label: "Red",
              type: "select",
              required: true,
              options: ["Facebook", "Instagram", "LinkedIn", "YouTube"],
            },
            { name: "handle", label: "Usuario", type: "text" },
          ],
        },
        { name: "url", label: "Enlace", type: "text", required: true },
      ],
    },
  ],
};
