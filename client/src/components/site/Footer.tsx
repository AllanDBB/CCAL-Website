import Link from "next/link";
import { mainNav } from "@/content/navigation";
import { getSite } from "@/lib/cms";
import { AccentSquare, Container, Label } from "./ui";

export default async function Footer() {
  const site = await getSite();
  const year = new Date().getFullYear();

  return (
    <footer className="bg-blue text-white">
      <Container className="pt-16 pb-10 sm:pt-20">
        <p className="max-w-3xl font-display text-3xl font-semibold leading-[1.05] tracking-[-0.035em] sm:text-4xl">
          {site.tagline}
          <AccentSquare className="ml-2 h-3 w-3 align-baseline" />
        </p>

        <div className="mt-14 grid gap-10 border-t border-white/20 pt-8 sm:grid-cols-2 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <Label light>Colegio</Label>
            <p className="mt-4 max-w-sm leading-relaxed text-white/70">{site.description}</p>
          </div>

          <div className="lg:col-span-3 lg:col-start-6">
            <Label light>Contacto</Label>
            <address className="mt-4 space-y-1.5 not-italic text-white/70">
              <p>{site.address}</p>
              <p>
                <a href={`tel:+506${site.phone.replace(/\D/g, "")}`} className="hover:text-white">
                  {site.phone}
                </a>
              </p>
              <p>
                <a href={`mailto:${site.email}`} className="hover:text-white">
                  {site.email}
                </a>
              </p>
              <p>{site.hours}</p>
            </address>
          </div>

          <div className="lg:col-span-2">
            <Label light>Sitio</Label>
            <ul className="mt-4 space-y-1.5">
              {mainNav.map((item) => (
                <li key={item.href}>
                  <Link href={item.href} className="text-white/70 hover:text-white">
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="lg:col-span-2">
            <Label light>Redes</Label>
            <ul className="mt-4 space-y-1.5">
              {site.social.map((s) => (
                <li key={s.name}>
                  <a href={s.url} target="_blank" rel="noopener noreferrer" className="text-white/70 hover:text-white">
                    {s.name} ↗
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-14 flex flex-col gap-2 border-t border-white/20 pt-6 font-mono text-[11px] uppercase tracking-[0.08em] text-white/70 sm:flex-row sm:justify-between">
          <p>
            © {year} {site.name} — Sede 09, SNCCCR
          </p>
          <Link href="/terminos-de-uso" className="hover:text-white">
            Términos de uso
          </Link>
        </div>
      </Container>
    </footer>
  );
}
