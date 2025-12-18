// Placeholder image generator helper
// Este archivo genera URLs de placeholder para imágenes temporales

export const getPlaceholder = (
  width: number = 1920,
  height: number = 1080,
  text: string = "CCAL",
  bgColor: string = "0A2463",
  textColor: string = "FAA916"
): string => {
  return `https://placehold.co/${width}x${height}/${bgColor}/${textColor}?text=${encodeURIComponent(text)}`;
};

// Placeholders para el homepage carousel
export const homepageCarouselPlaceholders = [
  {
    src: getPlaceholder(1920, 1080, "Instalaciones CCAL"),
    alt: "Instalaciones del CCAL",
    caption: "Modernas instalaciones para el aprendizaje"
  },
  {
    src: getPlaceholder(1920, 1080, "Laboratorios"),
    alt: "Laboratorio de Ciencias",
    caption: "Laboratorios equipados con tecnología de punta"
  },
  {
    src: getPlaceholder(1920, 1080, "Estudiantes"),
    alt: "Estudiantes en clase",
    caption: "Formación académica de excelencia"
  },
  {
    src: getPlaceholder(1920, 1080, "Actividades"),
    alt: "Actividades estudiantiles",
    caption: "Desarrollo integral y vida estudiantil"
  },
  {
    src: getPlaceholder(1920, 1080, "Proyectos"),
    alt: "Proyectos de investigación",
    caption: "Proyectos científicos premiados a nivel nacional"
  }
];

// Placeholders para admisiones
export const admisionesPlaceholders = [
  {
    src: getPlaceholder(1920, 1080, "Laboratorio"),
    alt: "Estudiantes en laboratorio",
    caption: "Experimenta con equipos de última generación"
  },
  {
    src: getPlaceholder(1920, 1080, "Clase"),
    alt: "Clase interactiva",
    caption: "Clases dinámicas con profesores especializados"
  },
  {
    src: getPlaceholder(1920, 1080, "Actividades"),
    alt: "Actividades extracurriculares",
    caption: "Clubes, deportes y actividades culturales"
  },
  {
    src: getPlaceholder(1920, 1080, "Graduación"),
    alt: "Ceremonia de graduación",
    caption: "Prepárate para tu futuro universitario"
  },
  {
    src: getPlaceholder(1920, 1080, "Feria+Científica"),
    alt: "Feria científica",
    caption: "Participa en ferias científicas nacionales e internacionales"
  }
];

// Placeholders para excelencia
export const excelenciaPlaceholders = [
  {
    src: getPlaceholder(1920, 1080, "Física"),
    alt: "Proyecto de Física",
    caption: "Investigación en energías renovables - 1er Lugar Nacional"
  },
  {
    src: getPlaceholder(1920, 1080, "Química"),
    alt: "Proyecto de Química",
    caption: "Desarrollo de bioplásticos - Premio Internacional"
  },
  {
    src: getPlaceholder(1920, 1080, "Biología"),
    alt: "Proyecto de Biología",
    caption: "Conservación de especies endémicas"
  },
  {
    src: getPlaceholder(1920, 1080, "Robótica"),
    alt: "Proyecto de Robótica",
    caption: "Robot autónomo para agricultura - Mención Honorífica"
  },
  {
    src: getPlaceholder(1920, 1080, "Feria+Científica"),
    alt: "Feria Científica",
    caption: "Participación en Feria Científica Nacional"
  }
];

// Placeholders para historia
export const historiaPlaceholders = [
  {
    src: getPlaceholder(1280, 960, "Fundación+2006"),
    alt: "Fundación del CCAL 2006",
    title: "Fundación del CCAL - 11 de Abril 2006"
  },
  {
    src: getPlaceholder(1280, 960, "Primera+Generación"),
    alt: "Primeros estudiantes",
    title: "Primera generación de estudiantes"
  },
  {
    src: getPlaceholder(1280, 960, "Instalaciones+UNED"),
    alt: "Instalaciones originales",
    title: "Instalaciones originales en la UNED"
  },
  {
    src: getPlaceholder(1280, 960, "Primer+Premio"),
    alt: "Primer premio científico",
    title: "Primer reconocimiento en Feria Científica"
  },
  {
    src: getPlaceholder(1280, 960, "Primera+Graduación"),
    alt: "Primera graduación",
    title: "Primera ceremonia de graduación"
  },
  {
    src: getPlaceholder(1280, 960, "Laboratorios"),
    alt: "Nuevos laboratorios",
    title: "Inauguración de laboratorios modernos"
  },
  {
    src: getPlaceholder(1280, 960, "10+Años"),
    alt: "10 años del CCAL",
    title: "Celebración 10 años de excelencia"
  },
  {
    src: getPlaceholder(1280, 960, "CCAL+Actual"),
    alt: "CCAL actualidad",
    title: "El CCAL en la actualidad"
  },
  {
    src: getPlaceholder(1280, 960, "Comunidad"),
    alt: "Comunidad CCAL",
    title: "Nuestra comunidad educativa"
  }
];
