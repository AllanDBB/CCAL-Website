import Image from "next/image";
import Link from "next/link";
import { mainNav } from "@/content/navigation";
import { getAdmission } from "@/lib/cms";
import { formatLongDate } from "@/lib/format";
import { ArrowIcon, ButtonLink, Container } from "./ui";
import MobileNav from "./MobileNav";

async function AnnouncementBar() {
  const admission = await getAdmission();
  if (admission.status === "proximamente") return null;

  const message =
    admission.status === "cerrada" && admission.resultsDate
      ? `${admission.processName}: resultados el ${formatLongDate(admission.resultsDate)}`
      : admission.status === "resultados"
        ? `${admission.processName}: ya están disponibles los resultados`
        : `${admission.processName}: inscripciones abiertas`;

  return (
    <div className="bg-navy-950 text-white">
      <Container className="flex min-h-10 items-center justify-center py-2 text-center text-sm">
        <Link href="/admisiones" className="group inline-flex items-center gap-2 hover:text-gold-500">
          <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-gold-500" aria-hidden="true" />
          <span className="first-letter:uppercase">{message}</span>
          <ArrowIcon className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" />
        </Link>
      </Container>
    </div>
  );
}

export function Wordmark() {
  return (
    <Link href="/" className="flex items-center gap-3" aria-label="Colegio Científico de Alajuela, inicio">
      <Image src="/Logo.svg" alt="" width={44} height={44} priority className="h-11 w-11" />
      <span className="leading-tight">
        <span className="block font-serif text-[17px] font-semibold text-navy-950">Colegio Científico</span>
        <span className="block text-[13px] text-muted">Sede Alajuela</span>
      </span>
    </Link>
  );
}

export default async function Header() {
  return (
    <>
      <AnnouncementBar />
      <header className="sticky top-0 z-40 border-b border-line bg-paper/95 backdrop-blur supports-[backdrop-filter]:bg-paper/85">
        <Container className="flex h-[72px] items-center justify-between gap-6">
          <Wordmark />

          <nav aria-label="Principal" className="hidden lg:block">
            <ul className="flex items-center gap-1">
              {mainNav.map((item) => (
                <li key={item.href} className="group relative">
                  <Link
                    href={item.href}
                    className="flex items-center gap-1 rounded-full px-3 py-2 text-[15px] font-medium text-ink/80 transition-colors hover:bg-navy-50 hover:text-navy-900"
                  >
                    {item.label}
                    {item.children && (
                      <svg className="h-3 w-3 opacity-60" viewBox="0 0 12 12" fill="none" aria-hidden="true">
                        <path d="m3 4.5 3 3 3-3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                      </svg>
                    )}
                  </Link>
                  {item.children && (
                    <div className="invisible absolute left-0 top-full pt-2 opacity-0 transition-opacity group-focus-within:visible group-focus-within:opacity-100 group-hover:visible group-hover:opacity-100">
                      <ul className="w-72 rounded-2xl border border-line bg-white p-2 shadow-lg shadow-navy-950/5">
                        {item.children.map((child) => (
                          <li key={child.href}>
                            <Link href={child.href} className="block rounded-xl px-4 py-3 hover:bg-navy-50">
                              <span className="block text-[15px] font-semibold text-navy-950">{child.label}</span>
                              {child.description && (
                                <span className="mt-0.5 block text-sm text-muted">{child.description}</span>
                              )}
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
            <div className="hidden sm:block">
              <ButtonLink href="/admisiones" variant="navy">
                Admisión
              </ButtonLink>
            </div>
            <MobileNav items={mainNav} />
          </div>
        </Container>
      </header>
    </>
  );
}
