interface MenuItem {
    title: string;
    link: string;
    submenu?: {
      title: string;
      link: string;
    }[];
  }
  
  export const menuItems: MenuItem[] = [
    {
      title: "NOSOTROS",
      link: "/nosotros",
      submenu: [
        {
          title: "Historia",
          link: "/nosotros/historia",
        },
        {
          title: "Misión y Visión",
          link: "/nosotros/mision-vision",
        }
      ]
    },
    {
      title: "EXCELENCIA CCAL",
      link: "/excelencia",
    },
    {
      title: "ADMISIONES",
      link: "/admisiones",
    }
  ];

export const contactInfo = {
  address: "Av. Principal #123, Ciudad",
  email: "info@ccal.edu",
  phone: "(123) 456-7890",
};

export const socialMedia = [
  {
    name: "Facebook",
    url: "https://facebook.com/ccalajuela",
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path>
      </svg>
    ),
  },
  {
    name: "Instagram",
    url: "https://instagram.com/ccalajuela",
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
        <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
        <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
      </svg>
    ),
  },
  {
    name: "LinkedIn",
    url: "https://www.linkedin.com/company/colegio-científico-de-alajuela",
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path>
        <rect x="2" y="9" width="4" height="12"></rect>
        <circle cx="4" cy="4" r="2"></circle>
      </svg>
    ),
  },
];

export const legalLinks = [
  { title: "Términos de Uso", link: "/terminos-de-uso" },
];

export const schoolDescription = "Colegio Científico Sede Alajuela (CCAL) es una institución educativa dedicada";

export const ctaButtons = [
  {
    title: "◉ PORTAL",
    link: "/portal",
    className: "px-6 py-3 rounded-full font-semibold text-sm text-center text-white bg-opacity-90 bg-[#0A2463] border border-transparent hover:bg-opacity-100 transition-all",
  },
  {
    title: "▷ ADMISIONES",
    link: "/admisiones",
    className: "px-6 py-3 rounded-full font-semibold text-sm text-center text-[#0A2463] bg-[#FAA916] shadow-md hover:bg-[#ffb52e] hover:shadow-lg transition-all",
  },
];