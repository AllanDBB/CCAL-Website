"use client";

import React, { useEffect, useState } from 'react';
import Link from 'next/link';

export default function OfertaAcademicaPage() {
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

  const asignaturas = [
    {
      categoria: "Ciencias Básicas",
      color: "from-[#0A2463] to-[#1a4d99]",
      icon: "🔬",
      materias: [
        { nombre: "Física", nivel: "Nivel Universitario", descripcion: "Mecánica, electromagnetismo, termodinámica y física moderna" },
        { nombre: "Química", nivel: "Nivel Universitario", descripcion: "Química general, orgánica, inorgánica y analítica" },
        { nombre: "Biología", nivel: "Nivel Universitario", descripcion: "Biología celular, molecular, genética y ecología" }
      ]
    },
    {
      categoria: "Matemáticas",
      color: "from-purple-600 to-purple-800",
      icon: "📐",
      materias: [
        { nombre: "Precálculo", nivel: "Fundamentos Avanzados", descripcion: "Funciones, trigonometría y análisis matemático" },
        { nombre: "Cálculo", nivel: "Nivel Universitario", descripcion: "Cálculo diferencial e integral" }
      ]
    },
    {
      categoria: "Tecnología",
      color: "from-blue-500 to-blue-700",
      icon: "💻",
      materias: [
        { nombre: "Programación", nivel: "Desarrollo de Software", descripcion: "Algoritmos, estructuras de datos y desarrollo de aplicaciones" },
        { nombre: "Robótica", nivel: "Diseño e Innovación", descripcion: "Construcción, programación y diseño de robots" }
      ]
    },
    {
      categoria: "Lenguaje y Comunicación",
      color: "from-[#FAA916] to-[#ffb52e]",
      icon: "📚",
      materias: [
        { nombre: "Español", nivel: "Gramática y Comprensión", descripcion: "Análisis textual, redacción académica y comunicación efectiva" },
        { nombre: "Inglés", nivel: "Nivel Avanzado", descripcion: "Inglés conversacional, técnico y académico" }
      ]
    },
    {
      categoria: "Ciencias Sociales",
      color: "from-green-600 to-green-800",
      icon: "🌍",
      materias: [
        { nombre: "Historia", nivel: "Nacional y Universal", descripcion: "Análisis histórico y desarrollo del pensamiento crítico" },
        { nombre: "Geografía", nivel: "Física y Humana", descripcion: "Geografía mundial, recursos naturales y geopolítica" }
      ]
    },
    {
      categoria: "Educación Física",
      color: "from-red-500 to-red-700",
      icon: "⚽",
      materias: [
        { nombre: "Deporte", nivel: "Desarrollo Integral", descripcion: "Actividad física, deportes y vida saludable" }
      ]
    }
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-[#0A2463] via-[#0d2d73] to-[#1a4d99] text-white overflow-hidden py-24">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute -top-10 -left-10 w-64 h-64 bg-[#FAA916] rounded-full opacity-10 blur-3xl animate-float-slow"></div>
          <div className="absolute top-20 right-10 w-48 h-48 bg-blue-300 rounded-full opacity-15 blur-2xl animate-float-medium"></div>
        </div>
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl">
            <h1 className="text-5xl md:text-6xl font-bold leading-tight mb-6">
              Oferta Académica
            </h1>
            <p className="text-xl md:text-2xl text-blue-100 leading-relaxed">
              Formación científica integral con estándares universitarios
            </p>
          </div>
        </div>
      </section>

      {/* Introducción */}
      <section className="py-16 bg-gradient-to-b from-gray-50 to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div 
            id="intro"
            data-animate
            className={`max-w-4xl mx-auto text-center transition-all duration-1000 ${
              isVisible.intro ? 'translate-y-0 opacity-100' : 'translate-y-20 opacity-0'
            }`}
          >
            <h2 className="text-3xl font-bold text-[#0A2463] mb-6">
              Preparación Preuniversitaria de Excelencia
            </h2>
            <p className="text-lg text-gray-700 leading-relaxed mb-8">
              Nuestro plan de estudios está diseñado para brindar a los estudiantes una formación científica 
              rigurosa con <strong>estándares de nivel universitario</strong>, complementada con habilidades 
              en tecnología, humanidades y desarrollo personal.
            </p>
          </div>
        </div>
      </section>

      {/* Asignaturas por Categoría */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="space-y-16">
            {asignaturas.map((categoria, catIndex) => (
              <div
                key={catIndex}
                id={`cat-${catIndex}`}
                data-animate
                className={`transition-all duration-1000 ${
                  isVisible[`cat-${catIndex}`] ? 'translate-y-0 opacity-100' : 'translate-y-20 opacity-0'
                }`}
              >
                <div className={`bg-gradient-to-r ${categoria.color} rounded-2xl p-6 mb-6 shadow-xl`}>
                  <div className="flex items-center gap-4">
                    <div className="text-5xl">{categoria.icon}</div>
                    <h2 className="text-3xl font-bold text-white">
                      {categoria.categoria}
                    </h2>
                  </div>
                </div>

                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {categoria.materias.map((materia, matIndex) => (
                    <div
                      key={matIndex}
                      className="bg-white border-2 border-gray-200 rounded-xl p-6 hover:border-[#FAA916] hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
                    >
                      <h3 className="text-xl font-bold text-[#0A2463] mb-2">
                        {materia.nombre}
                      </h3>
                      <div className="inline-block px-3 py-1 bg-[#FAA916]/20 text-[#0A2463] rounded-full text-sm font-semibold mb-3">
                        {materia.nivel}
                      </div>
                      <p className="text-gray-700 leading-relaxed">
                        {materia.descripcion}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Programas Especiales */}
      <section className="py-20 bg-gradient-to-b from-gray-50 to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div 
            id="especiales"
            data-animate
            className={`transition-all duration-1000 ${
              isVisible.especiales ? 'translate-y-0 opacity-100' : 'translate-y-20 opacity-0'
            }`}
          >
            <h2 className="text-4xl font-bold text-[#0A2463] mb-12 text-center">
              Programas Adicionales
            </h2>

            <div className="grid md:grid-cols-2 gap-8">
              {/* Progrentis */}
              <div className="bg-white rounded-2xl shadow-xl p-8 border-t-4 border-purple-600 hover:shadow-2xl transition-all duration-300">
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-16 h-16 bg-gradient-to-br from-purple-600 to-purple-800 rounded-xl flex items-center justify-center">
                    <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                    </svg>
                  </div>
                  <h3 className="text-2xl font-bold text-[#0A2463]">Progrentis</h3>
                </div>
                <p className="text-gray-700 leading-relaxed">
                  Plataforma de desarrollo de habilidades cognitivas para mejorar la comprensión lectora, 
                  velocidad de procesamiento y capacidades mentales de los estudiantes.
                </p>
              </div>

              {/* Entrenamiento Olimpiadas */}
              <div className="bg-gradient-to-br from-[#FAA916] to-[#ffb52e] rounded-2xl shadow-xl p-8 hover:shadow-2xl transition-all duration-300">
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-16 h-16 bg-white/30 backdrop-blur-sm rounded-xl flex items-center justify-center">
                    <svg className="w-8 h-8 text-[#0A2463]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
                    </svg>
                  </div>
                  <h3 className="text-2xl font-bold text-[#0A2463]">Entrenamiento para Olimpiadas</h3>
                </div>
                <p className="text-[#0A2463] leading-relaxed mb-4">
                  <strong>Clases adicionales especializadas</strong> para la preparación de estudiantes en olimpiadas 
                  nacionales e internacionales. Nuestros estudiantes participan activamente en:
                </p>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm text-[#0A2463]">
                  <div className="bg-white/30 backdrop-blur-sm rounded-lg p-3">
                    <h4 className="font-bold mb-2">Ciencias</h4>
                    <ul className="space-y-1">
                      <li>• OLCOQUIM (Química)</li>
                      <li>• OLCOFI (Física)</li>
                      <li>• OLICOCIBI (Biología)</li>
                      <li>• IChO (Química)</li>
                      <li>• IMChO (Química)</li>
                      <li>• Iberoamericanas de Química</li>
                      <li>• Iberoamericanas de Física</li>
                      <li>• Iberoamericanas de Biología</li>
                    </ul>
                  </div>
                  
                  <div className="bg-white/30 backdrop-blur-sm rounded-lg p-3">
                    <h4 className="font-bold mb-2">Matemáticas</h4>
                    <ul className="space-y-1">
                      <li>• OMI (Informática)</li>
                      <li>• IMO (Matemática)</li>
                      <li>• Canguro Matemático</li>
                      <li>• Iberoamericanas de Matemática</li>
                    </ul>
                  </div>
                  
                  <div className="bg-white/30 backdrop-blur-sm rounded-lg p-3">
                    <h4 className="font-bold mb-2">Tecnología</h4>
                    <ul className="space-y-1">
                      <li>• OCI (Informática)</li>
                      <li>• WRO (Robótica)</li>
                      <li>• STEAM Racing (F1 in Schools)</li>
                    </ul>
                  </div>
                  
                  <div className="bg-white/30 backdrop-blur-sm rounded-lg p-3">
                    <h4 className="font-bold mb-2">Humanidades</h4>
                    <ul className="space-y-1">
                      <li>• OCA (Astronomía)</li>
                      <li>• OLA (Lingüística)</li>
                      <li>• Filosofía</li>
                      <li>• LUVA (Literatura)</li>
                    </ul>
                  </div>
                </div>
                
                <p className="text-[#0A2463] text-sm mt-4 font-semibold italic">
                  Y muchas competencias más a nivel nacional e internacional
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-20 bg-gradient-to-br from-[#0A2463] via-[#0d2d73] to-[#1a4d99] text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-bold mb-6">
            Formación Científica Integral
          </h2>
          <p className="text-xl text-blue-100 mb-8 leading-relaxed">
            Nuestro plan de estudios combina rigor académico con desarrollo personal, 
            preparando a los estudiantes para los desafíos universitarios y profesionales
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link 
              href="/admisiones"
              className="px-8 py-4 bg-[#FAA916] text-[#0A2463] rounded-full font-semibold hover:bg-[#ffb52e] transition-all duration-300 hover:shadow-xl"
            >
              Proceso de Admisión
            </Link>
            <Link 
              href="/nosotros/mision-vision"
              className="px-8 py-4 border-2 border-white text-white hover:bg-white hover:text-[#0A2463] rounded-full font-semibold transition-all duration-300"
            >
              Nuestra Misión
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
