export default function MisionVisionPage() {
  return (
    <div className="min-h-screen overflow-x-hidden">
      <div className="fixed inset-0 -z-10 bg-gradient-to-br from-[#0A2463] via-[#0d2d73] to-[#1a4d99]"></div>

      {/* Hero */}
      <section className="relative text-white overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-12 left-10 w-36 h-36 bg-[#FAA916] rounded-full opacity-10 blur-md animate-float-medium"></div>
          <div className="absolute -bottom-8 right-12 w-28 h-28 bg-blue-300 rounded-full opacity-15 blur-sm animate-float-fast"></div>
        </div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <h1 className="text-4xl sm:text-5xl font-bold leading-tight mb-4">Misión y Visión</h1>
          <p className="text-blue-100 max-w-3xl">
            Marco orientador de la institución. Texto temporal que luego será
            reemplazado por el contenido oficial.
          </p>
        </div>
      </section>

      {/* Contenido principal */}
      <section className="py-14">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-6">
            {[
              { t: "Misión", d: "Formar estudiantes con pensamiento crítico y vocación científica, promoviendo valores, creatividad y compromiso social." },
              { t: "Visión", d: "Ser referente nacional en educación científica de excelencia, impulsando la innovación, la investigación y el liderazgo estudiantil." },
            ].map((b, i) => (
              <div key={i} className="bg-white rounded-xl shadow-lg p-8 hover:shadow-2xl transition-all duration-300 hover:-translate-y-1">
                <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-blue-400 to-purple-500 mb-4"></div>
                <h2 className="text-2xl font-bold text-[#0A2463] mb-3">{b.t}</h2>
                <p className="text-gray-700 leading-relaxed">{b.d}</p>
              </div>
            ))}
          </div>

          <div className="mt-10 bg-white rounded-xl shadow-lg p-6">
            <h3 className="text-xl font-semibold text-[#0A2463] mb-4">Valores</h3>
            <div className="flex flex-wrap gap-3">
              {["Integridad", "Respeto", "Curiosidad", "Rigor científico", "Colaboración", "Servicio"].map((v) => (
                <span key={v} className="px-4 py-2 rounded-full text-sm font-semibold text-[#0A2463] bg-[#FAA916]/20">
                  {v}
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
