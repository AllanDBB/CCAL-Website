import config from "@payload-config";
import { draftMode } from "next/headers";
import { redirect } from "next/navigation";
import { getPayload } from "payload";

// Activa la vista previa de borradores. Solo para personas con sesión en el panel.
export async function GET(request: Request) {
  const url = new URL(request.url);
  const path = url.searchParams.get("ruta") ?? "/";
  if (!path.startsWith("/") || path.startsWith("//")) return new Response("Ruta no válida", { status: 400 });

  const payload = await getPayload({ config });
  const { user } = await payload.auth({ headers: request.headers });
  if (!user) return new Response("Inicia sesión en /admin para ver borradores.", { status: 401 });

  (await draftMode()).enable();
  redirect(path);
}
