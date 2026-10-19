import Link from "next/link";
import { mainNav } from "@/content/navigation";
import { getSite } from "@/lib/cms";
import { Container } from "./ui";

export default async function Footer() {
  const site = await getSite();
  const year = new Date().getFullYear();

  return (
    <footer className="bg-navy-950 text-navy-100">
      <Container className="grid gap-12 py-16 md:grid-cols-12">
        <div className="md:col-span-5">
          <p className="font-serif text-2xl text-white">{site.name}</p>
          <p className="mt-3 max-w-sm leading-relaxed">{site.description}</p>
          <p className="mt-6 font-serif text-lg italic text-gold-500">“{site.tagline}”</p>
        </div>

        <div className="md:col-span-3">
          <h2 className="font-sans text-xs font-semibold uppercase tracking-[0.18em] text-white">Sitio</h2>
          <ul className="mt-4 space-y-2.5">
            {mainNav.map((item) => (
              <li key={item.href}>
                <Link href={item.href} className="hover:text-white">
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div className="md:col-span-4">
          <h2 className="font-sans text-xs font-semibold uppercase tracking-[0.18em] text-white">Contacto</h2>
          <address className="mt-4 space-y-2.5 not-italic">
            <p>{site.address}</p>
            <p>
              <a href={`tel:+506${site.phone.replace(/\D/g, "")}`} className="hover:text-white">
                Tel. {site.phone}
              </a>
            </p>
            <p>
              <a href={`mailto:${site.email}`} className="hover:text-white">
                {site.email}
              </a>
            </p>
            <p>{site.hours}</p>
          </address>
          <ul className="mt-6 flex flex-wrap gap-x-5 gap-y-2">
            {site.social.map((s) => (
              <li key={s.name}>
                <a href={s.url} target="_blank" rel="noopener noreferrer" className="font-semibold text-white hover:text-gold-500">
                  {s.name}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </Container>

      <div className="border-t border-white/10">
        <Container className="flex flex-col gap-2 py-6 text-sm text-navy-100/70 sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {year} {site.name}. Sede del Sistema Nacional de Colegios Científicos de Costa Rica.
          </p>
          <Link href="/terminos-de-uso" className="hover:text-white">
            Términos de uso
          </Link>
        </Container>
      </div>
    </footer>
  );
}
