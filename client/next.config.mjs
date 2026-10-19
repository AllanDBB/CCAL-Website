import { withPayload } from "@payloadcms/next/withPayload";

/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    localPatterns: [{ pathname: "/images/**" }, { pathname: "/api/media/file/**" }, { pathname: "/Logo.svg" }],
    remotePatterns: [{ protocol: "https", hostname: "*.public.blob.vercel-storage.com" }],
  },
  async redirects() {
    return [
      // Páginas retiradas mientras no tengan contenido real.
      { source: "/nosotros/equipo-docente", destination: "/nosotros", permanent: false },
      { source: "/nosotros/trabajo", destination: "/contacto", permanent: false },
    ];
  },
};

export default withPayload(nextConfig, { devBundleServerPackages: false });
