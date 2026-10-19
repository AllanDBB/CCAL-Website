import type { NewsItem } from "./types";

export const news: NewsItem[] = [
  {
    slug: "resultados-admision-2026",
    title: "Resultados de admisión: viernes 23 de octubre",
    date: "2026-10-19",
    category: "Admisión",
    excerpt:
      "La lista de personas admitidas para el proceso 2026 se publicará el viernes 23 de octubre en este sitio.",
    image: { src: "/images/estudiantes.jpeg", alt: "Estudiantes del CCAL en el laboratorio" },
    body: [
      "El proceso de admisión 2026 del Colegio Científico de Alajuela ha finalizado. La lista de personas admitidas se publicará el viernes 23 de octubre de 2026 en la sección de Admisiones de este sitio.",
      "La nota de ingreso se compone en un 90 % de la Prueba de Aptitud Académica y en un 10 % de la nota de presentación, que corresponde al promedio de 7°, 8° y 9° año.",
      "Agradecemos a todas las familias y estudiantes que participaron en el proceso.",
    ],
  },
  {
    slug: "paa-2026-aplicada",
    title: "Se aplicó la Prueba de Aptitud Académica 2026",
    date: "2026-10-10",
    category: "Admisión",
    excerpt:
      "Estudiantes de noveno año presentaron la PAA, el paso principal del proceso de admisión a los Colegios Científicos.",
    image: { src: "/images/laboratorio.jpg", alt: "Laboratorio de química del CCAL" },
    body: [
      "El sábado 10 de octubre de 2026 se aplicó la Prueba de Aptitud Académica (PAA) a estudiantes de noveno año que aspiran a ingresar al Colegio Científico de Alajuela.",
      "La PAA evalúa razonamiento lógico-verbal y matemático. Representa el 90 % de la nota de ingreso.",
    ],
  },
];
