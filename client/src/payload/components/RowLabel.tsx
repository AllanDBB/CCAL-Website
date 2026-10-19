"use client";

import { useRowLabel } from "@payloadcms/ui";

/** Muestra el contenido real de cada fila (p. ej. «Publicación de resultados») en lugar de «Fecha 02». */
export default function RowLabel({ field }: { field: string }) {
  const { data, rowNumber } = useRowLabel<Record<string, unknown>>();
  const value = data?.[field];
  const text = typeof value === "string" && value.trim() ? value : `Nuevo elemento ${String((rowNumber ?? 0) + 1).padStart(2, "0")}`;
  return <span>{text}</span>;
}
