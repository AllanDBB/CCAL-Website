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
      className="fixed inset-x-4 bottom-4 z-50 max-w-md rounded-2xl border border-line bg-white p-5 shadow-xl shadow-navy-950/10 sm:left-6 sm:right-auto"
    >
      <p className="text-sm leading-relaxed text-muted">
        Usamos cookies de analítica para entender cómo se usa el sitio.{" "}
        <Link href="/terminos-de-uso" className="font-medium text-navy-900 underline underline-offset-2">
          Más información
        </Link>
      </p>
      <div className="mt-4 flex gap-2">
        <button
          type="button"
          onClick={() => decide(true)}
          className="min-h-10 rounded-full bg-navy-900 px-5 text-sm font-semibold text-white hover:bg-navy-800"
        >
          Aceptar
        </button>
        <button
          type="button"
          onClick={() => decide(false)}
          className="min-h-10 rounded-full border border-line px-5 text-sm font-semibold text-navy-900 hover:bg-navy-50"
        >
          Rechazar
        </button>
      </div>
    </div>
  );
}
