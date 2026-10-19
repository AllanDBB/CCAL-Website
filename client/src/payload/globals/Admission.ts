import type { GlobalConfig } from "payload";
import { allow, anyone } from "../access";
import { revalidateGlobal } from "../revalidate";

const dayOnly = { date: { pickerAppearance: "dayOnly" as const, displayFormat: "dd/MM/yyyy" } };

export const Admission: GlobalConfig = {
  slug: "admission",
  label: "Proceso de admisión",
  admin: {
    group: "Contenido",
    description:
      "Controla la página de Admisiones, la barra superior y el bloque de admisión de la portada. Cambia el estado para que el sitio muestre el mensaje correcto.",
  },
  access: { read: anyone, update: allow("direccion", "admisiones") },
  hooks: { afterChange: [revalidateGlobal] },
  fields: [
    {
      type: "tabs",
      tabs: [
        {
          label: "Estado y fechas",
          fields: [
            {
              type: "row",
              fields: [
                {
                  name: "status",
                  label: "Estado del proceso",
                  type: "select",
                  required: true,
                  options: [
                    { label: "Próximamente", value: "proximamente" },
                    { label: "Inscripciones abiertas", value: "abierta" },
                    { label: "Proceso cerrado (esperando resultados)", value: "cerrada" },
                    { label: "Resultados publicados", value: "resultados" },
                  ],
                  admin: { description: "Con «Próximamente» se oculta la barra superior del sitio." },
                },
                {
                  name: "processName",
                  label: "Nombre del proceso",
                  type: "text",
                  required: true,
                  admin: { description: "Ej.: Admisión 2027" },
                },
              ],
            },
            { name: "headline", label: "Titular", type: "text", required: true },
            { name: "summary", label: "Resumen", type: "textarea", required: true },
            {
              name: "keyDates",
              label: "Fechas clave",
              type: "array",
              labels: { singular: "Fecha", plural: "Fechas" },
              fields: [
                {
                  type: "row",
                  fields: [
                    { name: "label", label: "Evento", type: "text", required: true },
                    { name: "date", label: "Fecha", type: "date", required: true, admin: dayOnly },
                  ],
                },
                { name: "note", label: "Nota", type: "text" },
              ],
            },
            {
              type: "row",
              fields: [
                {
                  name: "resultsDate",
                  label: "Fecha de publicación de resultados",
                  type: "date",
                  admin: { ...dayOnly, description: "Se muestra en grande mientras el proceso está cerrado." },
                },
              ],
            },
          ],
        },
        {
          label: "Documentos",
          fields: [
            {
              name: "resultsFile",
              label: "Resultados (PDF)",
              type: "upload",
              relationTo: "media",
              admin: { description: "Súbelo y cambia el estado a «Resultados publicados» para que aparezca el botón." },
            },
            {
              name: "resultsUrl",
              label: "o enlace externo a los resultados",
              type: "text",
            },
            { name: "practiceFile", label: "Práctica de la PAA (PDF)", type: "upload", relationTo: "media" },
          ],
        },
        {
          label: "Requisitos y proceso",
          fields: [
            {
              name: "requirements",
              label: "Requisitos",
              type: "array",
              labels: { singular: "Requisito", plural: "Requisitos" },
              fields: [{ name: "text", label: "Requisito", type: "text", required: true }],
            },
            {
              name: "steps",
              label: "Pasos del proceso",
              type: "array",
              labels: { singular: "Paso", plural: "Pasos" },
              fields: [
                { name: "title", label: "Título", type: "text", required: true },
                { name: "description", label: "Descripción", type: "textarea", required: true },
              ],
            },
            {
              name: "scoreWeights",
              label: "Composición de la nota de ingreso",
              type: "array",
              labels: { singular: "Componente", plural: "Componentes" },
              fields: [
                {
                  type: "row",
                  fields: [
                    { name: "label", label: "Componente", type: "text", required: true },
                    { name: "percent", label: "Porcentaje", type: "number", required: true, min: 0, max: 100 },
                  ],
                },
                { name: "detail", label: "Detalle", type: "text" },
              ],
            },
            { name: "scoreNote", label: "Nota sobre el cálculo", type: "textarea" },
          ],
        },
        {
          label: "PAA",
          fields: [
            {
              name: "paa",
              type: "group",
              label: false,
              fields: [
                { name: "description", label: "Descripción de la prueba", type: "textarea", required: true },
                {
                  name: "areas",
                  label: "Áreas que evalúa",
                  type: "array",
                  fields: [{ name: "text", label: "Área", type: "text", required: true }],
                },
                {
                  name: "facts",
                  label: "Datos importantes",
                  type: "array",
                  fields: [{ name: "text", label: "Dato", type: "text", required: true }],
                },
              ],
            },
          ],
        },
        {
          label: "Preguntas frecuentes",
          fields: [
            {
              name: "faqs",
              label: "Preguntas",
              type: "array",
              labels: { singular: "Pregunta", plural: "Preguntas" },
              fields: [
                { name: "question", label: "Pregunta", type: "text", required: true },
                { name: "answer", label: "Respuesta", type: "textarea", required: true },
              ],
            },
          ],
        },
      ],
    },
  ],
};
