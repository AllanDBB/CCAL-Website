export default function HistoriaPage() {
  return (
    <div className="min-h-screen overflow-x-hidden">
      <div className="fixed inset-0 -z-10 bg-gradient-to-br from-[#0A2463] via-[#0d2d73] to-[#1a4d99]"></div>

      {/* Hero */}
      <section className="relative text-white overflow-hidden">
        {/* decoraciones */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute -top-10 -left-10 w-48 h-48 bg-[#FAA916] rounded-full opacity-10 blur-md animate-float-slow"></div>
          <div className="absolute top-10 right-10 w-32 h-32 bg-blue-300 rounded-full opacity-15 blur-sm animate-float-medium"></div>
        </div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <h1 className="text-4xl sm:text-5xl font-bold leading-tight mb-4">Historia</h1>
          <p className="text-blue-100 max-w-3xl">
            Breve introducción a la historia del CCAL. Este texto es provisional y
            será reemplazado por el contenido definitivo.
          </p>
        </div>
      </section>

      {/* Timeline / Hitos */}
      <section className="py-14">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-3 gap-6">
            {["Fundación", "Consolidación", "Proyección"].map((title, i) => (
              <div key={i} className="bg-white rounded-xl shadow-lg p-6 hover:shadow-2xl transition-all duration-300 hover:-translate-y-1">
                <div className="text-xs tracking-widest text-[#0A2463]/70 mb-2">Hito {i + 1}</div>
                <h3 className="text-[#0A2463] font-bold text-xl mb-2">{title}</h3>
                <p className="text-gray-700 leading-relaxed">
                  Texto de ejemplo. Descripción breve del periodo y logros alcanzados.
                  Información real se agregará más adelante.
                </p>
              </div>
            ))}
          </div>

          <div className="mt-12 grid sm:grid-cols-3 gap-6">
            {["Premios", "Alianzas", "Egresados"].map((k, i) => (
              <div key={i} className="bg-white rounded-xl p-6 shadow-lg flex items-center gap-4 hover:shadow-2xl transition-all">
                <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-blue-400 to-purple-500"></div>
                <div>
                  <div className="text-2xl font-bold text-[#0A2463]">+{(i+1)*10}</div>
                  <div className="text-gray-600 text-sm">{k}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
