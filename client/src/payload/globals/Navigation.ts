import type { GlobalConfig } from "payload";
import { allow, anyone } from "../access";
import { revalidateGlobal } from "../revalidate";
import { rowLabel } from "../rowLabel";

export const Navigation: GlobalConfig = {
  slug: "navigation",
  label: "Menú",
  admin: {
    group: "Configuración",
    description: "Enlaces del menú principal y del pie de página. Arrastra para cambiar el orden.",
  },
  access: { read: anyone, update: allow("direccion") },
  hooks: { afterChange: [revalidateGlobal] },
  fields: [
    {
      name: "items",
      label: "Enlaces",
      type: "array",
      labels: { singular: "Enlace", plural: "Enlaces" },
      admin: rowLabel("label"),
      fields: [
        {
          type: "row",
          fields: [
            { name: "label", label: "Texto", type: "text", required: true },
            { name: "href", label: "Dirección", type: "text", required: true, admin: { description: "Ej.: /admisiones" } },
          ],
        },
        {
          name: "children",
          label: "Submenú",
          type: "array",
          labels: { singular: "Enlace", plural: "Enlaces" },
          admin: rowLabel("label"),
          fields: [
            {
              type: "row",
              fields: [
                { name: "label", label: "Texto", type: "text", required: true },
                { name: "href", label: "Dirección", type: "text", required: true },
              ],
            },
            { name: "description", label: "Descripción", type: "text" },
          ],
        },
      ],
    },
  ],
};
