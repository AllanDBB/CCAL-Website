import type { GlobalConfig } from "payload";
import { allow, anyone } from "../access";
import { revalidateGlobal } from "../revalidate";

const textList = (name: string, label: string, itemLabel: string) => ({
  name,
  label,
  type: "array" as const,
  labels: { singular: itemLabel, plural: label },
  fields: [{ name: "text", label: itemLabel, type: "text" as const, required: true }],
});

export const Institution: GlobalConfig = {
  slug: "institution",
  label: "El colegio",
  admin: {
    group: "Contenido",
    description: "Historia, misión, oferta académica, cifras, reconocimientos y galería de fotos.",
  },
  access: { read: anyone, update: allow("direccion") },
  hooks: { afterChange: [revalidateGlobal] },
  fields: [
    {
      type: "tabs",
      tabs: [
        {
          label: "Portada",
          fields: [
            {
              name: "stats",
              label: "Cifras",
              type: "array",
              labels: { singular: "Cifra", plural: "Cifras" },
              admin: { description: "Usa solo datos verificables." },
              fields: [
                {
                  type: "row",
                  fields: [
                    { name: "value", label: "Valor", type: "text", required: true },
                    { name: "label", label: "Descripción", type: "text", required: true },
                  ],
                },
              ],
            },
            {
              name: "pillars",
              label: "Por qué el CCAL",
              type: "array",
              labels: { singular: "Pilar", plural: "Pilares" },
              fields: [
                { name: "title", label: "Título", type: "text", required: true },
                { name: "body", label: "Texto", type: "textarea", required: true },
              ],
            },
          ],
        },
        {
          label: "Historia",
          fields: [
            {
              name: "history",
              type: "group",
              label: false,
              fields: [
                { name: "foundedOn", label: "Fecha de fundación (texto)", type: "text", required: true },
                { name: "intro", label: "Introducción", type: "textarea", required: true },
                textList("paragraphs", "Párrafos", "Párrafo"),
                textList("founders", "Convenio fundacional", "Institución"),
                { name: "foundersNote", label: "Nota del convenio", type: "textarea" },
              ],
            },
          ],
        },
        {
          label: "Misión y visión",
          fields: [
            { name: "mission", label: "Misión", type: "textarea", required: true },
            { name: "vision", label: "Visión", type: "textarea", required: true },
            textList("skills", "Competencias", "Competencia"),
          ],
        },
        {
          label: "Oferta académica",
          fields: [
            {
              name: "subjectAreas",
              label: "Áreas",
              type: "array",
              labels: { singular: "Área", plural: "Áreas" },
              fields: [
                { name: "name", label: "Área", type: "text", required: true },
                {
                  name: "subjects",
                  label: "Asignaturas",
                  type: "array",
                  labels: { singular: "Asignatura", plural: "Asignaturas" },
                  fields: [
                    {
                      type: "row",
                      fields: [
                        { name: "name", label: "Asignatura", type: "text", required: true },
                        { name: "level", label: "Nivel", type: "text" },
                      ],
                    },
                    { name: "description", label: "Descripción", type: "text" },
                  ],
                },
              ],
            },
            {
              name: "extraPrograms",
              label: "Programas adicionales",
              type: "array",
              labels: { singular: "Programa", plural: "Programas" },
              fields: [
                { name: "title", label: "Programa", type: "text", required: true },
                { name: "body", label: "Descripción", type: "textarea", required: true },
              ],
            },
          ],
        },
        {
          label: "Reconocimientos",
          fields: [
            {
              name: "achievements",
              label: "Reconocimientos",
              type: "array",
              labels: { singular: "Reconocimiento", plural: "Reconocimientos" },
              fields: [
                {
                  type: "row",
                  fields: [
                    { name: "year", label: "Año", type: "text", required: true },
                    { name: "title", label: "Reconocimiento", type: "text", required: true },
                    { name: "institution", label: "Otorgado por", type: "text", required: true },
                  ],
                },
              ],
            },
          ],
        },
        {
          label: "Galería",
          fields: [
            {
              name: "gallery",
              label: "Fotos",
              type: "array",
              labels: { singular: "Foto", plural: "Fotos" },
              admin: {
                description:
                  "El orden importa: la primera es la foto grande de la portada; las siguientes aparecen en la portada y en Vida estudiantil.",
              },
              fields: [
                { name: "image", label: "Foto", type: "upload", relationTo: "media", required: true },
                { name: "caption", label: "Pie de foto", type: "text", required: true },
              ],
            },
          ],
        },
      ],
    },
  ],
};
