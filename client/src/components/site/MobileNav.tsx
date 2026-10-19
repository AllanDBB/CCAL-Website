"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import type { NavItem } from "@/content/navigation";

export default function MobileNav({ items }: { items: NavItem[] }) {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => setOpen(false), [pathname]);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <div className="lg:hidden">
      <button
        type="button"
        onClick={() => setOpen(true)}
        aria-expanded={open}
        aria-controls="mobile-menu"
        className="flex h-11 w-11 items-center justify-center rounded-full text-navy-950 hover:bg-navy-50"
      >
        <span className="sr-only">Abrir menú</span>
        <svg className="h-6 w-6" viewBox="0 0 24 24" fill="none" aria-hidden="true">
          <path d="M4 7h16M4 12h16M4 17h16" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
        </svg>
      </button>

      {open && (
        <div id="mobile-menu" className="fixed inset-0 z-50 overflow-y-auto bg-paper">
          <div className="flex h-[72px] items-center justify-between border-b border-line px-4 sm:px-6">
            <span className="font-serif text-lg text-navy-950">Menú</span>
            <button
              type="button"
              onClick={() => setOpen(false)}
              className="flex h-11 w-11 items-center justify-center rounded-full text-navy-950 hover:bg-navy-50"
            >
              <span className="sr-only">Cerrar menú</span>
              <svg className="h-6 w-6" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                <path d="M6 6l12 12M18 6 6 18" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
              </svg>
            </button>
          </div>
          <nav aria-label="Principal" className="px-4 py-6 sm:px-6">
            <ul className="divide-y divide-line">
              {items.map((item) => (
                <li key={item.href} className="py-1">
                  <Link href={item.href} className="block py-3 font-serif text-2xl text-navy-950">
                    {item.label}
                  </Link>
                  {item.children && (
                    <ul className="mb-3 space-y-1 pl-4">
                      {item.children.map((child) => (
                        <li key={child.href}>
                          <Link href={child.href} className="block py-2 text-base text-muted">
                            {child.label}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  )}
                </li>
              ))}
            </ul>
            <Link
              href="/admisiones"
              className="mt-6 flex min-h-12 items-center justify-center rounded-full bg-navy-900 font-semibold text-white"
            >
              Información de admisión
            </Link>
          </nav>
        </div>
      )}
    </div>
  );
}
