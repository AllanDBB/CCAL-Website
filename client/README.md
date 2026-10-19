# Sitio del Colegio Científico de Alajuela

Next.js 16 + [Payload CMS 3](https://payloadcms.com). El sitio público está en `src/app/(frontend)` y el panel de contenido en `/admin` (`src/app/(payload)`).

## Contenido

El personal edita en `/admin` con su correo y contraseña:

| Rol | Puede editar |
| --- | --- |
| Administrador | Todo, incluidos usuarios y roles |
| Dirección | Todo el contenido |
| Comunicación | Noticias y fotos |
| Admisiones | Proceso de admisión |
| Docente | Noticias en borrador (Comunicación o Dirección las publican) |

Los cambios regeneran las páginas al guardar; no hace falta volver a desplegar.

`src/lib/cms.ts` es el único punto de lectura. Sin `DATABASE_URL` usa el contenido de `src/content`, que también es la carga inicial del panel.

## Desarrollo local

```bash
docker run -d --name ccal-postgres -e POSTGRES_USER=ccal -e POSTGRES_PASSWORD=ccal \
  -e POSTGRES_DB=ccal -p 5434:5432 postgres:16
cp .env.example .env          # DATABASE_URL=postgres://ccal:ccal@localhost:5434/ccal
npm install
npx payload migrate           # crea las tablas
npm run seed                  # contenido inicial + primer administrador (imprime la contraseña)
npm run dev
```

Al cambiar colecciones o globales en `src/payload/`:

```bash
npx payload migrate:create nombre-del-cambio
npm run generate:types
```

## Despliegue (Vercel)

Variables necesarias en el proyecto de Vercel:

- `DATABASE_URL`: Storage → Neon (Postgres)
- `BLOB_READ_WRITE_TOKEN`: Storage → Blob (fotos y PDF)
- `PAYLOAD_SECRET`: cadena aleatoria larga
- `NEXT_PUBLIC_SERVER_URL`: URL pública del sitio

`npm run build` aplica las migraciones pendientes antes de compilar. La primera vez, ejecuta `npm run seed` con `DATABASE_URL` y `BLOB_READ_WRITE_TOKEN` de producción para cargar el contenido y crear el administrador.
