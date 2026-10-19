import type { Admission } from "./types";

export const admission: Admission = {
  status: "cerrada",
  processName: "Admisión 2026",
  headline: "El proceso de admisión 2026 ha finalizado",
  summary:
    "Gracias a todas las personas estudiantes que presentaron la Prueba de Aptitud Académica. Los resultados se publicarán el viernes 23 de octubre de 2026.",
  keyDates: [
    { label: "Prueba de Aptitud Académica (PAA)", date: "2026-10-10" },
    { label: "Publicación de resultados", date: "2026-10-23" },
  ],
  resultsDate: "2026-10-23",
  resultsUrl: undefined,
  practiceUrl: undefined,
  requirements: [
    "Cursar noveno año",
    "Promedio anual de 85 o más en todas las materias",
    "Nota de conducta de 90 o más en sétimo, octavo y noveno año",
    "No haber repetido ni arrastrado años lectivos",
    "Presentar la Prueba de Aptitud Académica (PAA)",
  ],
  steps: [
    {
      title: "Cumplir los requisitos",
      description: "Promedios de 85 o más en materias y de 90 o más en conducta en 7°, 8° y 9°.",
    },
    {
      title: "Matricular",
      description: "Completar el formulario de admisión y entregar los documentos requeridos.",
    },
    {
      title: "Presentar la PAA",
      description: "Realizar la Prueba de Aptitud Académica en la fecha establecida.",
    },
    {
      title: "Consultar resultados",
      description: "Revisar la lista de personas admitidas en la fecha de publicación.",
    },
  ],
  scoreWeights: [
    { label: "Prueba de Aptitud Académica", percent: 90 },
    {
      label: "Nota de presentación",
      percent: 10,
      detail: "Promedio de las materias de 7°, 8° y 9° año.",
    },
  ],
  scoreNote:
    "Las materias fragmentadas, como Inglés o Estudios Sociales, se ponderan para obtener una nota unificada.",
  paa: {
    description:
      "Prueba escrita que se aplica en los Colegios Científicos a quienes matricularon y cumplen los requisitos. Mide destrezas de razonamiento, no conocimiento acumulado.",
    areas: ["Razonamiento lógico-verbal", "Razonamiento matemático"],
    facts: [
      "No hay un temario específico para estudiar.",
      "Se resuelve con lo aprendido en 7°, 8° y 9° año.",
      "No hay nota mínima: la admisión depende de los cupos de cada sede.",
    ],
  },
  faqs: [
    {
      question: "¿Puedo aplicar a más de una sede?",
      answer:
        "No. Solo se puede matricular en una sede. Conviene elegirla por cercanía y por las posibilidades de la familia.",
    },
    {
      question: "¿Cuántos estudiantes admite cada sede?",
      answer:
        "Cada sede admite entre 30 y 35 estudiantes. Cada sede es autónoma y define su cupo.",
    },
    {
      question: "¿Puedo volver a aplicar en décimo año?",
      answer:
        "No. El proceso de admisión solo se realiza en noveno año, aunque no se haya alcanzado la nota de ingreso.",
    },
    {
      question: "¿Hay becas?",
      answer:
        "Sí. Los Colegios Científicos cuentan con un sistema de apoyo socioeconómico para estudiantes admitidos que lo necesiten.",
    },
  ],
};
