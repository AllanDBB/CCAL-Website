import type { PagesContent } from "./types";

// Textos de cada página. Son el contenido inicial de «Páginas» en el panel.
export const pages: PagesContent = {
  home: {
    heroLabel: "Sistema Nacional de Colegios Científicos — Sede 09",
    heroTitle: "Colegio\nCientífico\nde Alajuela",
    heroImage: { src: "/images/cientifica.jpeg", alt: "Estudiantes del CCAL con gabacha presentan un experimento a niños de escuela" },
    primaryButton: "Proceso de admisión",
    secondaryButton: "Conocer el colegio",
    facts: [
      { label: "Fundación", value: "11 abril 2006" },
      { label: "Sede", value: "09 del SNCCCR" },
      { label: "Ubicación", value: "Alajuela, CR" },
    ],
    school: {
      label: "El colegio",
      title: "Una formación exigente, pensada para la universidad y para el país.",
      lead: "Somos parte del Sistema Nacional de Colegios Científicos: colegios públicos que reúnen a estudiantes con talento para la ciencia en todo Costa Rica.",
      linkText: "Conocer el colegio",
    },
    photos: { label: "Vida estudiantil", title: "Laboratorio, competencia y comunidad.", linkText: "Ver galería" },
    news: { label: "Noticias", title: "Lo más reciente", linkText: "Todas las noticias" },
  },
  admissions: {
    dates: { label: "Fechas clave", title: "Calendario del proceso" },
    steps: { label: "Cómo funciona", title: "El proceso en cuatro pasos" },
    requirements: {
      label: "Requisitos",
      title: "Quién puede aplicar",
      lead: "El proceso está dirigido a estudiantes que cursan noveno año y cumplen todos estos requisitos.",
    },
    paa: { label: "La prueba", title: "Prueba de Aptitud Académica" },
    faq: { label: "Preguntas frecuentes", title: "Lo que más nos preguntan", lead: "¿No encuentras tu respuesta?" },
  },
  school: {
    hero: {
      label: "El Colegio",
      title: "Novena sede del Sistema Nacional de Colegios Científicos",
      lead: "El Colegio Científico de Costa Rica, sede Alajuela, es la novena sede del Sistema Nacional de Colegios Científicos. Atiende principalmente a estudiantes de Alajuela y Heredia.",
    },
  },
  history: {
    hero: {
      label: "Historia",
      title: "Desde el 11 de abril de 2006",
      lead: "El Colegio Científico de Costa Rica, sede Alajuela, es la novena sede del Sistema Nacional de Colegios Científicos. Atiende principalmente a estudiantes de Alajuela y Heredia.",
    },
    image: { src: "/images/2.jpeg", alt: "Estudiantes de los Colegios Científicos en el escenario de un acto del SNCCCR" },
    origin: { label: "Origen", title: "Una sede para Alajuela y Heredia" },
    foundersLabel: "Convenio fundacional",
  },
  missionVision: {
    hero: {
      label: "Misión y visión",
      title: "Llevar al límite el potencial de cada estudiante",
      lead: "Buscamos la mejor formación académica para nuestros estudiantes, con un enfoque en ciencias, ingenierías e investigación.",
    },
    skills: {
      label: "Competencias",
      title: "Habilidades para el siglo XXI",
      lead: "Además del rigor académico, desarrollamos competencias que acompañan a nuestras personas graduadas en la universidad y en la vida.",
    },
  },
  programs: {
    hero: {
      label: "Oferta académica",
      title: "Preparación preuniversitaria con estándares universitarios",
      lead: "Un plan de estudios científico y riguroso, complementado con tecnología, humanidades y desarrollo personal.",
    },
    image: { src: "/images/estudiantes.jpeg", alt: "Estudiantes con gabacha trabajando en el laboratorio" },
    areas: { label: "Plan de estudios", title: "Áreas y asignaturas" },
    extra: { label: "Más allá del aula", title: "Programas adicionales" },
    ctaButton: "Proceso de admisión",
  },
  excellence: {
    hero: {
      label: "Excelencia CCAL",
      title: "Resultados que hablan por nuestros estudiantes",
      lead: "Pensamiento crítico, creatividad y pasión por la ciencia, con resultados en ferias, olimpiadas y el ingreso universitario.",
    },
    research: {
      label: "Investigación",
      title: "Proyectos y competencias",
      lead: "Nuestros estudiantes llevan sus proyectos a ferias científicas y a competencias nacionales e internacionales.",
    },
    awards: { label: "Reconocimientos", title: "Distinciones recientes" },
    ctaButton: "Información de admisión",
  },
  studentLife: {
    hero: {
      label: "Vida estudiantil",
      title: "Laboratorio, competencia y comunidad",
      lead: "La vida en el CCAL va del laboratorio a las ferias científicas, de las competencias internacionales a la cancha.",
    },
  },
  news: {
    hero: { label: "Noticias", title: "Noticias y avisos", lead: "Admisión, logros de nuestros estudiantes y la vida del colegio." },
  },
  contact: {
    hero: {
      label: "Contacto",
      title: "Estamos para ayudarte",
      lead: "Escríbenos o llámanos con tus preguntas sobre el colegio o el proceso de admisión.",
    },
    hoursNote: "Puede variar en vacaciones y feriados.",
  },
  terms: {
    hero: { label: "Legal", title: "Términos de uso", lead: "Información sobre el propósito y el uso de este sitio web." },
    sections: [
      {
        title: "Propósito del sitio",
        body: "Este sitio transmite información sobre el Colegio Científico de Costa Rica, sede Alajuela (CCAL), de forma clara, accesible y actualizada para estudiantes, familias, personas educadoras y la comunidad.\n\nIncluye información sobre nuestra historia y misión, la oferta académica, el proceso de admisión, las actividades institucionales y las noticias del colegio.",
      },
      {
        title: "Sitio informativo",
        body: "El sitio es exclusivamente informativo. No procesa transacciones ni recopila datos personales sensibles.\n\nCon tu consentimiento, usamos cookies de analítica (Google Analytics) para entender cómo se usa el sitio y mejorarlo. Puedes rechazarlas en el aviso de cookies.",
      },
      {
        title: "Responsabilidad",
        body: "El contenido es informativo y puede cambiar sin previo aviso. El CCAL no se hace responsable por decisiones tomadas exclusivamente con base en esta información.\n\nPara información oficial, procesos de admisión o consultas específicas, contacta directamente a las oficinas administrativas del colegio.",
      },
    ],
    updated: "Última actualización: octubre de 2026.",
  },
};
