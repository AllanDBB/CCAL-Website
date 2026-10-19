export interface NavItem {
  label: string;
  href: string;
  children?: { label: string; href: string; description?: string }[];
}

export const mainNav: NavItem[] = [
  { label: "Admisiones", href: "/admisiones" },
  {
    label: "El Colegio",
    href: "/nosotros",
    children: [
      { label: "Historia", href: "/nosotros/historia", description: "Desde 2006, novena sede del sistema" },
      { label: "Misión y visión", href: "/nosotros/mision-vision", description: "Lo que nos guía" },
      { label: "Oferta académica", href: "/oferta", description: "Plan de estudios preuniversitario" },
    ],
  },
  { label: "Excelencia", href: "/excelencia" },
  { label: "Vida estudiantil", href: "/vida-estudiantil" },
  { label: "Noticias", href: "/noticias" },
  { label: "Contacto", href: "/contacto" },
];
