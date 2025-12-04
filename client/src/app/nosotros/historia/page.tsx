"use client";

import React, { useEffect, useState } from 'react';

export default function HistoriaPage() {
  const [isVisible, setIsVisible] = useState<{ [key: string]: boolean }>({});

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible((prev) => ({
              ...prev,
              [entry.target.id]: true,
            }));
          }
        });
      },
      { threshold: 0.1, rootMargin: '50px' }
    );

    const elements = document.querySelectorAll('[data-animate]');
    elements.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, []);

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-[#0A2463] via-[#0d2d73] to-[#1a4d99] text-white overflow-hidden py-24">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute -top-10 -left-10 w-64 h-64 bg-[#FAA916] rounded-full opacity-10 blur-3xl animate-float-slow"></div>
          <div className="absolute top-20 right-10 w-48 h-48 bg-blue-300 rounded-full opacity-15 blur-2xl animate-float-medium"></div>
          <div className="absolute bottom-10 left-1/3 w-40 h-40 bg-purple-400 rounded-full opacity-10 blur-2xl animate-float-fast"></div>
        </div>
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl">
            <h1 className="text-5xl md:text-6xl font-bold leading-tight mb-6">
              Nuestra Historia
            </h1>
            <p className="text-xl md:text-2xl text-blue-100 leading-relaxed">
              Más de 19 años forjando el futuro científico de Costa Rica desde Alajuela
            </p>
          </div>
        </div>
      </section>

      {/* Fundación Section */}
      <section className="py-20 bg-gradient-to-b from-gray-50 to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div 
            id="fundacion"
            data-animate
            className={`transition-all duration-1000 ${
              isVisible.fundacion ? 'translate-y-0 opacity-100' : 'translate-y-20 opacity-0'
            }`}
          >
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div>
                <div className="inline-block px-4 py-2 bg-[#FAA916] text-[#0A2463] rounded-full font-semibold text-sm mb-6">
                  11 de Abril de 2006
                </div>
                <h2 className="text-4xl font-bold text-[#0A2463] mb-6">
                  El Nacimiento de una Institución de Excelencia
                </h2>
                <div className="space-y-4 text-gray-700 text-lg leading-relaxed">
                  <p>
                    El Colegio Científico de Costa Rica sede Alajuela es la <strong>sede número nueve del SNCCCR</strong>, 
                    con un área de atención a comunidad educativa principalmente de las provincias de Alajuela y Heredia.
                  </p>
                  <p>
                    Esta sede se crea el <strong>11 de abril en el año 2006</strong>, fecha en la que se conmemora al 
                    Héroe Nacional Juan Santamaría por su papel protagónico en la Batalla de Rivas.
                  </p>
                </div>
              </div>
              
              <div className="relative">
                <div className="bg-gradient-to-br from-[#0A2463] to-[#1a4d99] rounded-2xl p-8 text-white shadow-2xl">
                  <h3 className="text-2xl font-bold mb-6">Convenio Fundacional</h3>
                  <div className="space-y-4">
                    <div className="flex items-start gap-3">
                      <div className="w-2 h-2 bg-[#FAA916] rounded-full mt-2 flex-shrink-0"></div>
                      <p>Ministerio de Educación Pública</p>
                    </div>
                    <div className="flex items-start gap-3">
                      <div className="w-2 h-2 bg-[#FAA916] rounded-full mt-2 flex-shrink-0"></div>
                      <p>Ministerio de Ciencia, Tecnología y Telecomunicaciones</p>
                    </div>
                    <div className="flex items-start gap-3">
                      <div className="w-2 h-2 bg-[#FAA916] rounded-full mt-2 flex-shrink-0"></div>
                      <p>Universidad Estatal a Distancia (UNED)</p>
                    </div>
                  </div>
                  <div className="mt-6 pt-6 border-t border-white/20">
                    <p className="text-sm text-blue-100">
                      Firmando como Rector el Señor <strong>Rodrigo Arias Camacho</strong>, 
                      actual jerarca de la UNED y gran aliado de los Colegios Científicos.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>



      {/* Equipo y Propuesta Educativa */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div 
            id="equipo"
            data-animate
            className={`transition-all duration-1000 ${
              isVisible.equipo ? 'translate-y-0 opacity-100' : 'translate-y-20 opacity-0'
            }`}
          >
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="text-4xl font-bold text-[#0A2463] mb-6">
                  Excelencia Docente y Administrativa
                </h2>
                <div className="space-y-4 text-gray-700 text-lg leading-relaxed">
                  <p>
                    El equipo docente y administrativo reúne <strong>grandes académicos</strong>, personas que inspiran 
                    a la comunidad educativa con su excelencia y su amor por la educación costarricense.
                  </p>
                  <p>
                    Este grupo de profesionales desarrolla un <strong>proyecto educativo de vanguardia</strong>, que 
                    plasma en los estudiantes altos estándares académicos y valor como seres humanos integrales que 
                    impacten de manera positiva sus comunidades.
                  </p>
                </div>
              </div>

              <div className="bg-gradient-to-br from-[#FAA916] to-[#ffb52e] rounded-2xl p-8 shadow-2xl">
                <h3 className="text-2xl font-bold text-[#0A2463] mb-6">Propuesta STEAM</h3>
                <p className="text-[#0A2463] mb-6 leading-relaxed">
                  Dentro de esta propuesta preuniversitaria, damos un enfoque especial a las áreas STEAM, 
                  sin dejar de lado actividades extracurriculares, proyectos con impacto a la comunidad y voluntariado.
                </p>
                <div className="space-y-3">
                  <div className="bg-white/30 backdrop-blur-sm rounded-lg p-3 text-[#0A2463]">
                    <strong>Habilidades Blandas:</strong> Creatividad, resiliencia, empatía
                  </div>
                  <div className="bg-white/30 backdrop-blur-sm rounded-lg p-3 text-[#0A2463]">
                    <strong>Habilidades Científicas:</strong> Análisis, trabajo en equipo, resolución de problemas
                  </div>
                  <div className="bg-white/30 backdrop-blur-sm rounded-lg p-3 text-[#0A2463]">
                    <strong>Metodología:</strong> Prácticas innovadoras y uso de tecnología
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Lemas y Filosofía */}
      <section className="py-20 bg-gradient-to-br from-[#0A2463] via-[#0d2d73] to-[#1a4d99] text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div 
            id="lemas"
            data-animate
            className={`text-center transition-all duration-1000 ${
              isVisible.lemas ? 'translate-y-0 opacity-100 scale-100' : 'translate-y-20 opacity-0 scale-95'
            }`}
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-4">Nuestra Filosofía</h2>
            <p className="text-2xl text-[#FAA916] font-semibold mb-12">
              Somos más que una fórmula
            </p>
            
            <div className="max-w-3xl mx-auto mb-12">
              <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 border-2 border-white/20">
                <div className="text-[#FAA916] text-5xl font-bold mb-4">&quot;</div>
                <p className="text-3xl font-semibold mb-4">
                  Ser mejores para servir mejor a Costa Rica
                </p>
                <p className="text-blue-100 text-lg">
                  Lema del Sistema Nacional de Colegios Científicos de Costa Rica
                </p>
              </div>
            </div>

            <div className="max-w-3xl mx-auto">
              <p className="text-xl text-blue-100 leading-relaxed">
                Nos enorgullece ser una institución educativa de <strong>excelencia académica</strong> con 
                <strong> visión preuniversitaria</strong>, contribuyendo en la formación de futuros profesionales 
                de la mano de sus familias y el equipo docente y administrativo.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
