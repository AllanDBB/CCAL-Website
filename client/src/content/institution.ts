import type { Achievement, GalleryItem, Pillar, Stat, SubjectArea } from "./types";

// Cifras mostradas en la portada. Pendiente: confirmar con Dirección y citar fuente.
export const stats: Stat[] = [
  { value: "2006", label: "Año de fundación" },
  { value: "09", label: "Sede del Sistema Nacional de Colegios Científicos" },
  { value: "95%", label: "Ingreso a la universidad" },
  { value: "400+", label: "Personas graduadas" },
];

export const pillars: Pillar[] = [
  {
    title: "Rigor preuniversitario",
    body: "Física, química, biología, matemáticas y computación con estándares de nivel universitario, impartidas por docentes especialistas.",
  },
  {
    title: "Investigación desde el aula",
    body: "Proyectos propios en ferias científicas y entrenamiento para olimpiadas nacionales e internacionales de ciencias, matemáticas y tecnología.",
  },
  {
    title: "Formación integral",
    body: "Creatividad, resiliencia, empatía y servicio: actividades extracurriculares, voluntariado y proyectos con impacto en la comunidad.",
  },
];

export const history = {
  foundedOn: "11 de abril de 2006",
  intro:
    "El Colegio Científico de Costa Rica, sede Alajuela, es la novena sede del Sistema Nacional de Colegios Científicos. Atiende principalmente a estudiantes de Alajuela y Heredia.",
  paragraphs: [
    "La sede se creó el 11 de abril de 2006, fecha en que se conmemora al héroe nacional Juan Santamaría por su papel en la Batalla de Rivas.",
    "El equipo docente y administrativo reúne a académicos que inspiran a la comunidad con su excelencia y su compromiso con la educación costarricense. Juntos desarrollan un proyecto educativo de vanguardia, con altos estándares académicos y formación humana integral.",
    "La propuesta preuniversitaria da un énfasis especial a las áreas STEAM, sin dejar de lado las actividades extracurriculares, los proyectos con impacto en la comunidad y el voluntariado.",
  ],
  founders: [
    "Ministerio de Educación Pública",
    "Ministerio de Ciencia, Innovación, Tecnología y Telecomunicaciones",
    "Universidad Estatal a Distancia (UNED)",
  ],
  foundersNote:
    "El convenio fundacional lo firmó como rector Rodrigo Arias Camacho, de la UNED, gran aliado de los Colegios Científicos.",
};

export const mission =
  "Brindar a los estudiantes un excelente servicio académico enfocado en las ciencias, las ingenierías y la investigación, formándolos de manera integral desde los más altos valores costarricenses, y cultivando la creación, preservación, transmisión y búsqueda del conocimiento en ciencia y tecnología.";

export const vision =
  "Lograr una adecuada inserción de los jóvenes en la realidad nacional, formando líderes capaces, creativos y con espíritu crítico, con interés en la innovación tecnológica y la gestión del conocimiento sustentada en las ciencias y las humanidades, que causen un impacto positivo en la sociedad.";

export const skills = [
  "Adaptabilidad al cambio",
  "Resiliencia",
  "Trabajo en equipo",
  "Pensamiento crítico",
  "Resolución de problemas",
  "Empoderamiento",
  "Emprendimiento",
  "Liderazgo",
  "Investigación",
  "Innovación",
];

export const subjectAreas: SubjectArea[] = [
  {
    name: "Ciencias básicas",
    subjects: [
      { name: "Física", level: "Nivel universitario", description: "Mecánica, electromagnetismo, termodinámica y física moderna." },
      { name: "Química", level: "Nivel universitario", description: "Química general, orgánica, inorgánica y analítica." },
      { name: "Biología", level: "Nivel universitario", description: "Biología celular y molecular, genética y ecología." },
    ],
  },
  {
    name: "Matemáticas",
    subjects: [
      { name: "Precálculo", level: "Fundamentos avanzados", description: "Funciones, trigonometría y análisis matemático." },
      { name: "Cálculo", level: "Nivel universitario", description: "Cálculo diferencial e integral." },
    ],
  },
  {
    name: "Tecnología",
    subjects: [
      { name: "Programación", level: "Desarrollo de software", description: "Algoritmos, estructuras de datos y desarrollo de aplicaciones." },
      { name: "Robótica", level: "Diseño e innovación", description: "Construcción, programación y diseño de robots." },
    ],
  },
  {
    name: "Lenguaje y comunicación",
    subjects: [
      { name: "Español", level: "Gramática y comprensión", description: "Análisis textual, redacción académica y comunicación efectiva." },
      { name: "Inglés", level: "Nivel avanzado", description: "Inglés conversacional, técnico y académico." },
    ],
  },
  {
    name: "Ciencias sociales",
    subjects: [
      { name: "Historia", level: "Nacional y universal", description: "Análisis histórico y pensamiento crítico." },
      { name: "Geografía", level: "Física y humana", description: "Geografía mundial, recursos naturales y geopolítica." },
    ],
  },
  {
    name: "Educación física",
    subjects: [{ name: "Deporte", level: "Desarrollo integral", description: "Actividad física, deportes y vida saludable." }],
  },
];

export const extraPrograms = [
  {
    title: "Entrenamiento para olimpiadas",
    body: "Clases adicionales para preparar estudiantes en olimpiadas nacionales e internacionales de ciencias, matemáticas, tecnología y humanidades.",
  },
  {
    title: "Progrentis",
    body: "Plataforma para desarrollar habilidades cognitivas: comprensión lectora, velocidad de procesamiento y otras capacidades.",
  },
];

// Pendiente: verificar cada reconocimiento con Dirección antes de publicar el sitio nuevo.
export const achievements: Achievement[] = [
  { year: "2024", title: "Premio a la Innovación Educativa", institution: "MEP Costa Rica" },
  { year: "2023", title: "Mejor Proyecto de Sostenibilidad", institution: "Intel ISEF" },
  { year: "2023", title: "Institución del Año", institution: "Asociación de Colegios Científicos" },
  { year: "2022", title: "Excelencia Académica", institution: "CONARE" },
];

export const gallery: GalleryItem[] = [
  { src: "/images/proyectos.jpeg", alt: "Dos estudiantes conectan un circuito electrónico", caption: "Proyectos de electrónica y robótica" },
  { src: "/images/estudiantes.jpeg", alt: "Estudiantes con gabacha trabajando en el laboratorio", caption: "Laboratorios de ciencias" },
  { src: "/images/actividades.jpeg", alt: "Estudiantes con la bandera de Costa Rica en Singapur", caption: "Competencias internacionales" },
  { src: "/images/cientifica.jpeg", alt: "Estudiantes con gabacha presentan un experimento", caption: "Ciencia en el aula" },
  { src: "/images/futbol-chill.jpeg", alt: "Grupo de estudiantes con camisetas de fútbol", caption: "Comunidad" },
  { src: "/images/graduacion.jpeg", alt: "Auditorio lleno durante una ceremonia de graduación", caption: "Graduación" },
  { src: "/images/proyecto.jpeg", alt: "Estudiantes muestran un proyecto a visitantes", caption: "Ferias y exposiciones" },
  { src: "/images/futbol-chill2.jpeg", alt: "Partido de fútbol en la cancha", caption: "Deporte" },
  { src: "/images/lab.jpeg", alt: "Práctica de disección en el laboratorio de biología", caption: "Biología" },
  { src: "/images/2.jpeg", alt: "Estudiantes de los Colegios Científicos en el escenario de un acto del SNCCCR", caption: "Sistema Nacional de Colegios Científicos" },
];
