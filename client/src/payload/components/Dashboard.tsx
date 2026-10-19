import Link from "next/link";

const actions = [
  { href: "/admin/globals/admission", title: "Proceso de admisión", body: "Estado, fechas, resultados y PDF de práctica." },
  { href: "/admin/collections/news/create", title: "Escribir una noticia", body: "Logros, avisos y actividades del colegio." },
  { href: "/admin/collections/media/create", title: "Subir fotos", body: "Para noticias y la galería del sitio." },
  { href: "/", title: "Ver el sitio", body: "Abre ccalajuela.ed.cr en otra pestaña.", external: true },
];

export default function Dashboard() {
  return (
    <div className="ccal-dashboard">
      <h2>¿Qué quieres hacer hoy?</h2>
      <div className="ccal-dashboard__grid">
        {actions.map((a) => (
          <Link key={a.href} href={a.href} target={a.external ? "_blank" : undefined} className="ccal-dashboard__card">
            <strong>{a.title}</strong>
            <span>{a.body}</span>
          </Link>
        ))}
      </div>
      <p className="ccal-dashboard__note">Los cambios que guardes aparecen en el sitio en unos segundos.</p>
    </div>
  );
}
