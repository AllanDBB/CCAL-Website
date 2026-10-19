import type { CollectionConfig } from "payload";
import { allow, anyone, loggedIn } from "../access";

export const Media: CollectionConfig = {
  slug: "media",
  labels: { singular: "Archivo", plural: "Fotos y archivos" },
  admin: {
    group: "Contenido",
    description: "Fotos y PDF del sitio. Las fotos se optimizan automáticamente.",
  },
  access: {
    read: anyone,
    create: loggedIn,
    update: loggedIn,
    delete: allow("direccion", "comunicacion"),
  },
  upload: {
    mimeTypes: ["image/*", "application/pdf"],
    imageSizes: [
      { name: "thumb", width: 480 },
      { name: "large", width: 1600 },
    ],
    focalPoint: true,
  },
  fields: [
    {
      name: "alt",
      label: "Descripción de la imagen",
      type: "text",
      required: true,
      admin: { description: "Qué se ve en la foto. Lo leen los lectores de pantalla y Google." },
    },
  ],
};
