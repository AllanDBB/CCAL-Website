"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import type { NavItem } from "@/content/types";

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
        className="flex h-11 items-center gap-2 px-2 font-mono text-[12px] font-medium uppercase tracking-[0.08em] text-ink"
      >
        Menú
        <svg className="h-5 w-5" viewBox="0 0 20 20" fill="none" aria-hidden="true">
          <path d="M2 6h16M2 14h16" stroke="currentColor" strokeWidth="1.5" />
        </svg>
      </button>

      {open && (
        <div id="mobile-menu" className="fixed inset-0 z-50 flex flex-col overflow-y-auto bg-blue text-white">
          <div className="flex h-[72px] shrink-0 items-center justify-between border-b border-white/15 px-5 sm:px-8">
            <span className="font-mono text-[12px] uppercase tracking-[0.08em] text-white/60">CCAL</span>
            <button
              type="button"
              onClick={() => setOpen(false)}
              className="flex h-11 items-center gap-2 px-2 font-mono text-[12px] font-medium uppercase tracking-[0.08em]"
            >
              Cerrar
              <svg className="h-5 w-5" viewBox="0 0 20 20" fill="none" aria-hidden="true">
                <path d="m4 4 12 12M16 4 4 16" stroke="currentColor" strokeWidth="1.5" />
              </svg>
            </button>
          </div>
          <nav aria-label="Principal" className="flex-1 px-5 py-6 sm:px-8">
            <ol>
              {items.map((item, i) => (
                <li key={item.href} className="border-b border-white/15">
                  <Link href={item.href} className="flex items-baseline gap-4 py-4">
                    <span className="font-mono text-[12px] text-accent">{String(i + 1).padStart(2, "0")}</span>
                    <span className="font-display text-3xl font-semibold tracking-[-0.03em]">{item.label}</span>
                  </Link>
                  {item.children && (
                    <ul className="-mt-1 mb-4 pl-9">
                      {item.children.map((child) => (
                        <li key={child.href}>
                          <Link href={child.href} className="block py-1.5 text-white/70">
                            {child.label}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  )}
                </li>
              ))}
            </ol>
          </nav>
          <Link href="/admisiones" className="flex min-h-14 shrink-0 items-center justify-between bg-accent px-5 font-medium text-ink sm:px-8">
            Información de admisión
            <span aria-hidden="true">→</span>
          </Link>
        </div>
      )}
    </div>
  );
}
