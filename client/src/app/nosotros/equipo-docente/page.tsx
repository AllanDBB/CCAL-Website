export default function EquipoDocentePage() {
  return (
    <div className="min-h-screen overflow-x-hidden">
      <div className="fixed inset-0 -z-10 bg-gradient-to-br from-[#0A2463] via-[#0d2d73] to-[#1a4d99]"></div>

      {/* Hero */}
      <section className="relative text-white overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-8 left-8 w-40 h-40 bg-[#FAA916] rounded-full opacity-10 blur-md animate-float-slow"></div>
          <div className="absolute bottom-8 right-10 w-28 h-28 bg-blue-300 rounded-full opacity-15 blur-sm animate-float-fast"></div>
        </div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <h1 className="text-4xl font-bold">Equipo Docente</h1>
          <p className="mt-3 text-blue-100 max-w-3xl">
            Conoce a las personas que impulsan el aprendizaje. Contenido
            provisional para reemplazar más adelante.
          </p>
        </div>
      </section>

      {/* Grid de docentes */}
      <section className="py-14">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {Array.from({ length: 6 }).map((_, i) => (
              <div key={i} className="group bg-white rounded-xl shadow-lg p-6 hover:shadow-2xl transition-all duration-300 hover:-translate-y-1">
                <div className="h-24 w-24 rounded-full bg-gradient-to-br from-blue-400 to-purple-500 mb-4"></div>
                <h3 className="text-[#0A2463] font-bold text-lg">Nombre Docente {i + 1}</h3>
                <p className="text-gray-600 text-sm">Especialidad o departamento</p>
                <div className="mt-4 h-1 w-0 bg-[#FAA916] transition-all duration-300 group-hover:w-24"></div>
                <p className="text-gray-700 mt-3 text-sm leading-relaxed">
                  Breve reseña del docente. Texto de ejemplo para completar con
                  información real.
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
