import Link from "next/link";
import { mainNav } from "@/content/navigation";
import { getSite } from "@/lib/cms";
import { AccentSquare, Container, Label } from "./ui";

export default async function Footer() {
  const site = await getSite();
  const year = new Date().getFullYear();

  return (
    <footer className="bg-ink text-white">
      <Container className="pt-20 pb-10 sm:pt-28">
        <p className="max-w-5xl font-display text-4xl font-semibold leading-[1] tracking-[-0.04em] sm:text-6xl lg:text-7xl">
          {site.tagline}
          <AccentSquare className="ml-3 h-4 w-4 align-baseline sm:h-6 sm:w-6" />
        </p>

        <div className="mt-20 grid gap-10 border-t border-white/20 pt-8 sm:grid-cols-2 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <Label light>Colegio</Label>
            <p className="mt-4 max-w-sm leading-relaxed text-white/80">{site.description}</p>
          </div>

          <div className="lg:col-span-3 lg:col-start-6">
            <Label light>Contacto</Label>
            <address className="mt-4 space-y-1.5 not-italic text-white/80">
              <p>{site.address}</p>
              <p>
                <a href={`tel:+506${site.phone.replace(/\D/g, "")}`} className="hover:text-accent">
                  {site.phone}
                </a>
              </p>
              <p>
                <a href={`mailto:${site.email}`} className="hover:text-accent">
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
                  <Link href={item.href} className="text-white/80 hover:text-accent">
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
                  <a href={s.url} target="_blank" rel="noopener noreferrer" className="text-white/80 hover:text-accent">
                    {s.name} ↗
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-16 flex flex-col gap-2 border-t border-white/20 pt-6 font-mono text-[11px] uppercase tracking-[0.08em] text-white/50 sm:flex-row sm:justify-between">
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
