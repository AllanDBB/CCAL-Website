import Image from "next/image";
import Link from "next/link";
import { getAdmission, getNavigation } from "@/lib/cms";
import { formatLongDate } from "@/lib/format";
import { AccentSquare, ArrowIcon, Container } from "./ui";
import MobileNav from "./MobileNav";

async function AnnouncementBar() {
  const admission = await getAdmission();
  if (admission.status === "proximamente") return null;

  const message =
    admission.status === "cerrada" && admission.resultsDate
      ? `${admission.processName} — Resultados: ${formatLongDate(admission.resultsDate)}`
      : admission.status === "resultados"
        ? `${admission.processName} — Resultados disponibles`
        : `${admission.processName} — Inscripciones abiertas`;

  return (
    <Link href="/admisiones" className="group block bg-blue text-white">
      <Container className="flex min-h-9 items-center justify-center gap-3 py-2 text-[13px]">
        <AccentSquare className="h-2 w-2" />
        <span>{message}</span>
        <ArrowIcon className="h-3.5 w-3.5 shrink-0 transition-transform group-hover:translate-x-1" />
      </Container>
    </Link>
  );
}

export function Wordmark() {
  return (
    <Link href="/" className="flex items-center gap-3" aria-label="Colegio Científico de Alajuela, inicio">
      <Image src="/Logo.svg" alt="" width={40} height={40} priority className="h-10 w-10" />
      <span className="font-display text-[15px] font-semibold leading-[1.1] tracking-[-0.02em]">
        Colegio Científico
        <br />
        de Alajuela
      </span>
    </Link>
  );
}

export default async function Header() {
  const mainNav = await getNavigation();
  return (
    <>
      <AnnouncementBar />
      <header className="sticky top-0 z-40 border-b border-line bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/85">
        <Container className="flex h-[72px] items-center justify-between gap-6">
          <Wordmark />

          <nav aria-label="Principal" className="hidden lg:block">
            <ul className="flex items-center">
              {mainNav.map((item) => (
                <li key={item.href} className="group relative">
                  <Link
                    href={item.href}
                    className="flex h-[72px] items-center gap-1 px-3.5 text-[15px] font-medium text-ink transition-colors hover:text-blue"
                  >
                    {item.label}
                  </Link>
                  <span className="absolute inset-x-3.5 bottom-0 h-0.5 origin-left scale-x-0 bg-accent transition-transform group-hover:scale-x-100" aria-hidden="true" />
                  {item.children && (
                    <div className="invisible absolute left-0 top-full opacity-0 transition-opacity group-focus-within:visible group-focus-within:opacity-100 group-hover:visible group-hover:opacity-100">
                      <ul className="w-80 border border-line bg-white shadow-lg shadow-blue/5">
                        {item.children.map((child) => (
                          <li key={child.href} className="border-b border-line last:border-0">
                            <Link href={child.href} className="flex items-start justify-between gap-4 px-5 py-4 hover:bg-blue-50">
                              <span>
                                <span className="block text-[15px] font-medium text-ink">{child.label}</span>
                                {child.description && <span className="mt-0.5 block text-sm text-muted">{child.description}</span>}
                              </span>
                              <ArrowIcon className="mt-1 h-4 w-4 text-muted" />
                            </Link>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </li>
              ))}
            </ul>
          </nav>

          <div className="flex items-center gap-2">
            <Link
              href="/admisiones"
              className="hidden min-h-11 items-center gap-3 bg-blue px-5 text-[15px] font-medium text-white transition-colors hover:bg-blue-700 sm:flex"
            >
              <AccentSquare className="h-2 w-2" />
              Admisión
            </Link>
            <MobileNav items={mainNav} />
          </div>
        </Container>
      </header>
    </>
  );
}
