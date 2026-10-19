"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

type Gtag = (command: string, action: string, params: Record<string, string>) => void;

export default function CookieBanner() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    try {
      if (!localStorage.getItem("cookies-accepted")) setShow(true);
    } catch {
      // Almacenamiento bloqueado: no se muestra el aviso.
    }
  }, []);

  const decide = (accepted: boolean) => {
    try {
      localStorage.setItem("cookies-accepted", String(accepted));
    } catch {}
    if (accepted) {
      const gtag = (window as unknown as { gtag?: Gtag }).gtag;
      gtag?.("consent", "update", { analytics_storage: "granted" });
    }
    setShow(false);
  };

  if (!show) return null;

  return (
    <div
      role="dialog"
      aria-label="Aviso de cookies"
      className="fixed inset-x-4 bottom-4 z-50 max-w-md border border-ink bg-white p-5 sm:left-6 sm:right-auto"
    >
      <p className="text-sm leading-relaxed text-muted">
        Usamos cookies de analítica para entender cómo se usa el sitio.{" "}
        <Link href="/terminos-de-uso" className="font-medium text-ink underline underline-offset-2">
          Más información
        </Link>
      </p>
      <div className="mt-4 flex gap-2">
        <button
          type="button"
          onClick={() => decide(true)}
          className="min-h-10 bg-ink px-5 text-sm font-medium text-white hover:bg-accent hover:text-ink"
        >
          Aceptar
        </button>
        <button
          type="button"
          onClick={() => decide(false)}
          className="min-h-10 border border-ink px-5 text-sm font-medium text-ink hover:bg-surface"
        >
          Rechazar
        </button>
      </div>
    </div>
  );
}
