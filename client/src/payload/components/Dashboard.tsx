import Link from "next/link";
import type { BasePayload, TypedUser } from "payload";
import type { Role } from "../access";

const statusLabel: Record<string, string> = {
  proximamente: "Próximamente",
  abierta: "Inscripciones abiertas",
  cerrada: "Proceso cerrado",
  resultados: "Resultados publicados",
};

const roleLabel: Record<Role, string> = {
  admin: "Administrador",
  direccion: "Dirección",
  comunicacion: "Comunicación",
  admisiones: "Admisiones",
  docente: "Docente",
};

const formatDay = (iso?: string | null) =>
  iso
    ? new Intl.DateTimeFormat("es-CR", { day: "numeric", month: "long", year: "numeric", timeZone: "America/Costa_Rica" }).format(
        new Date(iso),
      )
    : "—";

type Action = { href: string; title: string; body: string; roles?: Role[]; external?: boolean };

const actions: Action[] = [
  { href: "/admin/globals/admission", title: "Proceso de admisión", body: "Estado, fechas, resultados y PDF de práctica.", roles: ["direccion", "admisiones"] },
  { href: "/admin/collections/news/create", title: "Escribir una noticia", body: "Logros, avisos y actividades del colegio.", roles: ["direccion", "comunicacion", "docente"] },
  { href: "/admin/globals/pages", title: "Textos de las páginas", body: "Titulares e introducciones de cada página.", roles: ["direccion", "comunicacion"] },
  { href: "/admin/collections/media/create", title: "Subir fotos", body: "Para noticias y la galería del sitio." },
  { href: "/", title: "Ver el sitio", body: "Abre el sitio en otra pestaña.", external: true },
];

export default async function Dashboard({ payload, user }: { payload: BasePayload; user?: TypedUser | null }) {
  const role = ((user as { role?: Role } | null)?.role ?? "docente") as Role;
  const name = (user as { name?: string } | null)?.name?.split(" ")[0];
  const can = (roles?: Role[]) => !roles || role === "admin" || roles.includes(role);

  const [admission, drafts, recent] = await Promise.all([
    payload.findGlobal({ slug: "admission", depth: 0 }),
    payload.count({ collection: "news", where: { _status: { equals: "draft" } } }),
    payload.find({ collection: "news", sort: "-updatedAt", limit: 5, depth: 0, draft: true }),
  ]);

  return (
    <div className="ccal-dashboard">
      <p className="ccal-dashboard__hello">
        Hola{name ? `, ${name}` : ""} · <span>{roleLabel[role]}</span>
      </p>

      <div className="ccal-dashboard__status">
        <Link href="/admin/globals/admission" className="ccal-dashboard__panel ccal-dashboard__panel--blue">
          <span className="ccal-dashboard__kicker">{admission.processName || "Admisión"}</span>
          <strong>{statusLabel[admission.status] ?? "Sin configurar"}</strong>
          <span>
            {admission.status === "cerrada" && admission.resultsDate
              ? `Resultados: ${formatDay(admission.resultsDate)}`
              : admission.status === "resultados"
                ? admission.resultsFile || admission.resultsUrl
                  ? "Los resultados están enlazados en el sitio."
                  : "Falta subir el PDF de resultados."
                : "Cambia el estado cuando avance el proceso."}
          </span>
        </Link>

        <Link href="/admin/collections/news?where[_status][equals]=draft" className="ccal-dashboard__panel">
          <span className="ccal-dashboard__kicker">Noticias en borrador</span>
          <strong>{drafts.totalDocs}</strong>
          <span>
            {drafts.totalDocs === 0
              ? "No hay borradores pendientes."
              : can(["direccion", "comunicacion"])
                ? "Revísalos y publícalos."
                : "Comunicación los revisará antes de publicarlos."}
          </span>
        </Link>
      </div>

      <h2>Accesos rápidos</h2>
      <div className="ccal-dashboard__grid">
        {actions.filter((a) => can(a.roles)).map((a) => (
          <Link key={a.href} href={a.href} target={a.external ? "_blank" : undefined} className="ccal-dashboard__card">
            <strong>{a.title}</strong>
            <span>{a.body}</span>
          </Link>
        ))}
      </div>

      {recent.docs.length > 0 && (
        <>
          <h2>Últimas noticias</h2>
          <ul className="ccal-dashboard__list">
            {recent.docs.map((doc) => (
              <li key={doc.id}>
                <Link href={`/admin/collections/news/${doc.id}`}>{doc.title}</Link>
                <span className={`ccal-dashboard__pill ccal-dashboard__pill--${doc._status}`}>
                  {doc._status === "published" ? "Publicada" : "Borrador"}
                </span>
                <span className="ccal-dashboard__date">{formatDay(doc.date)}</span>
              </li>
            ))}
          </ul>
        </>
      )}
    </div>
  );
}
