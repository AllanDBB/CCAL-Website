import type { MigrateDownArgs, MigrateUpArgs } from "@payloadcms/db-postgres";

// Cambios de contenido pedidos por el colegio (19/10/2026):
// - Retirar por completo la foto proyectos.jpeg (portada, galería y biblioteca).
// - Nueva foto de portada: cientifica.jpeg.
// - Pasar a borrador la noticia de prueba «PRueba».
const context = { disableRevalidate: true };

export async function up({ payload, req }: MigrateUpArgs): Promise<void> {
  // Coincide con «proyectos.jpeg» y con copias renombradas como «proyectos-1.jpeg».
  const byName = async (name: string) =>
    (await payload.find({ collection: "media", where: { filename: { like: name } }, limit: 100, depth: 0, req })).docs.filter(
      (m) => new RegExp(`^${name}(-\\d+)?\\.`).test(m.filename ?? ""),
    );

  const removedDocs = await byName("proyectos");
  const removedIds = new Set(removedDocs.map((m) => m.id));
  const hero = (await byName("cientifica"))[0];

  // Galería sin la foto retirada y con la nueva foto de portada al inicio.
  const institution = await payload.findGlobal({ slug: "institution", depth: 0, req });
  if (institution.gallery?.length) {
    const imageId = (img: unknown) => (typeof img === "object" && img ? (img as { id: number }).id : img);
    const rest = institution.gallery.filter((g) => !removedIds.has(imageId(g.image) as number));
    const first = rest.filter((g) => hero && imageId(g.image) === hero.id);
    const others = rest.filter((g) => !hero || imageId(g.image) !== hero.id);
    await payload.updateGlobal({
      slug: "institution",
      data: { gallery: [...first, ...others].map((g) => ({ image: imageId(g.image) as number, caption: g.caption })) },
      context,
      req,
    });
  }

  if (hero) {
    const pages = await payload.findGlobal({ slug: "pages", depth: 0, req });
    if (pages.home?.heroLabel) {
      await payload.updateGlobal({
        slug: "pages",
        data: { home: { ...pages.home, heroImage: hero.id } },
        context,
        req,
      });
    }
  }

  // Quitar la foto de cualquier noticia y borrarla de la biblioteca (y del Blob).
  for (const removed of removedDocs) {
    await payload.update({
      collection: "news",
      where: { image: { equals: removed.id } },
      data: { image: null },
      context,
      req,
    });
    await payload.delete({ collection: "media", id: removed.id, context, req });
  }

  await payload.update({
    collection: "news",
    where: { title: { equals: "PRueba" } },
    data: { _status: "draft" },
    context,
    req,
  });
}

export async function down(_args: MigrateDownArgs): Promise<void> {
  // La foto se eliminó a pedido del colegio; no se restaura.
}
