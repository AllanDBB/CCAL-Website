import { revalidatePath } from "next/cache";
import type { CollectionAfterChangeHook, CollectionAfterDeleteHook, GlobalAfterChangeHook } from "payload";

// El sitio es estático; al guardar contenido en el panel se regenera
// para que el cambio se vea en segundos. Fuera de Next (p. ej. el script
// de carga inicial) no hay caché que invalidar.
function revalidateSite(context: Record<string, unknown>) {
  if (context.disableRevalidate) return;
  try {
    revalidatePath("/", "layout");
  } catch {
    // Sin servidor de Next.js activo.
  }
}

export const revalidateGlobal: GlobalAfterChangeHook = ({ doc, req }) => {
  revalidateSite(req.context);
  return doc;
};

export const revalidateDoc: CollectionAfterChangeHook = ({ doc, req }) => {
  revalidateSite(req.context);
  return doc;
};

export const revalidateDelete: CollectionAfterDeleteHook = ({ doc, req }) => {
  revalidateSite(req.context);
  return doc;
};
