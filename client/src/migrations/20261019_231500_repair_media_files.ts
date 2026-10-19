import type { MigrateDownArgs, MigrateUpArgs } from "@payloadcms/db-postgres";
import { list } from "@vercel/blob";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

// La carga inicial registró las fotos en la base pero sus archivos no quedaron
// en Vercel Blob. Vuelve a subir cada foto que falte desde public/images y
// verifica el resultado; si algo sigue faltando, el despliegue falla.
export async function up({ payload, req }: MigrateUpArgs): Promise<void> {
  const token = process.env.BLOB_READ_WRITE_TOKEN;
  if (!token) {
    payload.logger.info("Sin BLOB_READ_WRITE_TOKEN: no hay archivos que reparar.");
    return;
  }

  const listAll = async () => {
    const names = new Set<string>();
    let cursor: string | undefined;
    do {
      const page = await list({ token, cursor, limit: 1000 });
      page.blobs.forEach((b) => names.add(b.pathname));
      cursor = page.hasMore ? page.cursor : undefined;
    } while (cursor);
    return names;
  };

  const stored = await listAll();
  const { docs } = await payload.find({ collection: "media", limit: 1000, depth: 0, req });
  const missing = docs.filter((m) => m.filename && !stored.has(m.filename));
  payload.logger.info(`Fotos en la base: ${docs.length}; sin archivo en Blob: ${missing.length}`);

  for (const media of missing) {
    const original = media.filename!.replace(/-\d+(\.\w+)$/, "$1");
    const source = path.resolve(process.cwd(), "public/images", original);
    if (!fs.existsSync(source)) {
      payload.logger.warn(`No hay copia local de ${media.filename}; súbela de nuevo desde el panel.`);
      continue;
    }
    // Copia temporal con el mismo nombre del registro para que no cambie.
    const temp = path.join(os.tmpdir(), media.filename!);
    fs.copyFileSync(source, temp);
    await payload.update({
      collection: "media",
      id: media.id,
      data: {},
      filePath: temp,
      overwriteExistingFiles: true,
      context: { disableRevalidate: true },
      req,
    });
    fs.rmSync(temp, { force: true });
  }

  const after = await listAll();
  const { docs: final } = await payload.find({ collection: "media", limit: 1000, depth: 0, req });
  const stillMissing = final.filter((m) => m.filename && !after.has(m.filename)).map((m) => m.filename);
  payload.logger.info(`Archivos en Blob tras la reparación: ${after.size}`);
  if (stillMissing.length) {
    throw new Error(`Siguen sin archivo en Blob: ${stillMissing.join(", ")}`);
  }
}

export async function down(_args: MigrateDownArgs): Promise<void> {}
