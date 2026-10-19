/** @type {import('next').NextConfig} */
const nextConfig = {
  async redirects() {
    return [
      // Páginas retiradas mientras no tengan contenido real.
      { source: "/nosotros/equipo-docente", destination: "/nosotros", permanent: false },
      { source: "/nosotros/trabajo", destination: "/contacto", permanent: false },
    ];
  },
};

module.exports = nextConfig;
