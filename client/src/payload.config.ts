import { postgresAdapter } from "@payloadcms/db-postgres";
import { lexicalEditor } from "@payloadcms/richtext-lexical";
import { vercelBlobStorage } from "@payloadcms/storage-vercel-blob";
import { es } from "@payloadcms/translations/languages/es";
import path from "path";
import { buildConfig } from "payload";
import sharp from "sharp";
import { fileURLToPath } from "url";
import { Media } from "./payload/collections/Media";
import { News } from "./payload/collections/News";
import { Users } from "./payload/collections/Users";
import { Admission } from "./payload/globals/Admission";
import { Institution } from "./payload/globals/Institution";
import { SiteSettings } from "./payload/globals/SiteSettings";

const dirname = path.dirname(fileURLToPath(import.meta.url));

export default buildConfig({
  serverURL: process.env.NEXT_PUBLIC_SERVER_URL || "",
  admin: {
    user: Users.slug,
    meta: { titleSuffix: " · Panel CCAL", icons: [{ url: "/Logo.svg", type: "image/svg+xml" }] },
    components: {
      graphics: { Logo: "/payload/components/Logo", Icon: "/payload/components/Icon" },
      beforeDashboard: ["/payload/components/Dashboard"],
    },
    importMap: { baseDir: path.resolve(dirname) },
  },
  i18n: { supportedLanguages: { es }, fallbackLanguage: "es" },
  collections: [News, Media, Users],
  globals: [Admission, Institution, SiteSettings],
  editor: lexicalEditor(),
  secret: process.env.PAYLOAD_SECRET || "",
  typescript: { outputFile: path.resolve(dirname, "payload-types.ts") },
  db: postgresAdapter({
    pool: { connectionString: process.env.DATABASE_URL || "" },
    migrationDir: path.resolve(dirname, "migrations"),
    // El esquema cambia solo con migraciones (npm run payload migrate), también en local.
    push: false,
  }),
  sharp,
  plugins: [
    // En Vercel las fotos se guardan en Vercel Blob; en local, en la carpeta media/.
    vercelBlobStorage({
      enabled: Boolean(process.env.BLOB_READ_WRITE_TOKEN),
      collections: { media: true },
      token: process.env.BLOB_READ_WRITE_TOKEN || "",
    }),
  ],
});
