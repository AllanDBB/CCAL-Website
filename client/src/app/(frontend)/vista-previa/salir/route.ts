import { draftMode } from "next/headers";
import { redirect } from "next/navigation";

export async function GET(request: Request) {
  (await draftMode()).disable();
  const path = new URL(request.url).searchParams.get("ruta") ?? "/";
  redirect(path.startsWith("/") && !path.startsWith("//") ? path : "/");
}
