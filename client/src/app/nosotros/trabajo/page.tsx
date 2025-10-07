export default function TrabajoPage() {
  return (
    <div className="min-h-screen overflow-x-hidden">
      <div className="fixed inset-0 -z-10 bg-gradient-to-br from-[#0A2463] via-[#0d2d73] to-[#1a4d99]"></div>

      {/* Hero */}
      <section className="relative text-white overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute -top-6 left-1/3 w-36 h-36 bg-[#FAA916] rounded-full opacity-10 blur-md animate-float-medium"></div>
          <div className="absolute bottom-6 right-8 w-24 h-24 bg-blue-300 rounded-full opacity-15 blur-sm animate-float-fast"></div>
        </div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <h1 className="text-4xl font-bold">Trabajo</h1>
          <p className="mt-3 text-blue-100 max-w-3xl">
            Oportunidades laborales y colaboraciones. Este es un texto temporal.
          </p>
        </div>
      </section>

      {/* Vacantes / Cards */}
      <section className="py-14">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
          <div className="grid md:grid-cols-2 gap-6">
            {Array.from({ length: 4 }).map((_, i) => (
              <div key={i} className="bg-white rounded-xl shadow-lg p-6 hover:shadow-2xl transition-all duration-300 hover:-translate-y-1">
                <div className="text-xs tracking-widest text-[#0A2463]/70">VACANTE</div>
                <h3 className="text-[#0A2463] font-bold text-lg mt-1">Puesto {i + 1}</h3>
                <p className="text-gray-700 mt-2 text-sm leading-relaxed">
                  Descripción breve del perfil buscado, responsabilidades y requisitos principales.
                  Contenido de ejemplo.
                </p>
                <div className="mt-4 inline-flex items-center text-[#0A2463] font-semibold hover:text-[#FAA916] transition-colors">
                  Ver más
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" /></svg>
                </div>
              </div>
            ))}
          </div>

          <div className="bg-gradient-to-r from-[#FAA916] to-[#ffb52e] rounded-xl p-8 text-[#0A2463] shadow-lg">
            <h2 className="text-2xl font-bold mb-2">¿Quieres postular?</h2>
            <p className="text-[#0A2463]/90">
              Envía tu CV y carta de presentación al correo institucional. Incluye el
              asunto “Postulación CCAL” y el puesto de interés. (Texto de ejemplo)
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
