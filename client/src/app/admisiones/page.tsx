"use client";

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { ImageCarousel } from '@/components/ui/carousel';

export default function AdmisionesPage() {
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

  const requisitos = [
    "Cursar noveno año",
    "Tener notas iguales o mayores a 85 en el promedio anual de todas las materias",
    "Tener nota de conducta igual o mayor a 90 en séptimo, octavo y noveno año",
    "No haber repetido o arrastrado años lectivos",
    "Aplicar la PAA (Prueba de Aptitud Académica)"
  ];

  const procesoSteps = [
    {
      numero: "1",
      titulo: "Cumplir Requisitos",
      descripcion: "Verificar promedios de 85+ en materias y 90+ en conducta (7°, 8° y 9°)"
    },
    {
      numero: "2",
      titulo: "Matricular",
      descripcion: "Completar formulario de admisión y aportar documentos requeridos"
    },
    {
      numero: "3",
      titulo: "Presentar la PAA",
      descripcion: "Realizar la Prueba de Aptitud Académica en la fecha establecida"
    },
    {
      numero: "4",
      titulo: "Consultar Resultados",
      descripcion: "Esperar publicación de resultados (finales de noviembre)"
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
              Admisiones 2026
            </h1>
            <p className="text-xl md:text-2xl text-blue-100 leading-relaxed">
              ¡Sé parte de los Colegios Científicos Costarricenses!
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
            className={`max-w-4xl mx-auto transition-all duration-1000 ${
              isVisible.intro ? 'translate-y-0 opacity-100' : 'translate-y-20 opacity-0'
            }`}
          >
            <div className="bg-white rounded-2xl shadow-xl p-8 border-t-4 border-[#FAA916]">
              <div className="bg-gradient-to-r from-[#FAA916] to-[#ffb52e] text-[#0A2463] rounded-xl p-6 mb-6 text-center">
                <h2 className="text-2xl font-bold mb-2">
                  Admisiones 2026
                </h2>
                <p className="text-lg font-semibold">
                  Pronto anunciaremos las fechas y detalles del proceso de admisión 2026
                </p>
              </div>
              <h2 className="text-3xl font-bold text-[#0A2463] mb-4">
                Proceso de Admisión 2026
              </h2>
              <p className="text-gray-700 leading-relaxed mb-4">
                El proceso de admisión estará dirigido a estudiantes que se encuentren <strong>cursando 9° año</strong> y 
                desean formar parte de alguna de las 14 sedes de los Colegios Científicos de Costa Rica para el ciclo lectivo 2026.
              </p>
              <div className="bg-blue-50 border-l-4 border-[#0A2463] p-4 rounded">
                <p className="text-[#0A2463] font-semibold">
                  📅 Fecha de la PAA: 10 de Octubre de 2026
                </p>
                <p className="text-gray-700 text-sm mt-1">
                  Las listas de admitidos se publicarán a finales de noviembre
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ¿Qué es la PAA? */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div 
            id="paa"
            data-animate
            className={`transition-all duration-1000 ${
              isVisible.paa ? 'translate-y-0 opacity-100' : 'translate-y-20 opacity-0'
            }`}
          >
            <h2 className="text-4xl font-bold text-[#0A2463] mb-8 text-center">
              ¿Qué es la PAA?
            </h2>
            
            <div className="grid md:grid-cols-2 gap-8 mb-12">
              <div className="bg-gradient-to-br from-[#0A2463] to-[#1a4d99] rounded-2xl p-8 text-white shadow-xl">
                <h3 className="text-2xl font-bold mb-4">Prueba de Aptitud Académica</h3>
                <p className="text-blue-100 leading-relaxed mb-4">
                  Es una prueba escrita que se realiza en los Colegios Científicos con los estudiantes que 
                  matricularon y cumplieron los requisitos para aplicar.
                </p>
                <div className="space-y-3">
                  <div className="flex items-start gap-3">
                    <svg className="w-6 h-6 text-[#FAA916] flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <span>Razonamiento lógico-verbal</span>
                  </div>
                  <div className="flex items-start gap-3">
                    <svg className="w-6 h-6 text-[#FAA916] flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <span>Razonamiento matemático</span>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-2xl p-8 shadow-xl border-2 border-gray-200">
                <h3 className="text-2xl font-bold text-[#0A2463] mb-4">Características</h3>
                <ul className="space-y-3 text-gray-700">
                  <li className="flex items-start gap-3">
                    <span className="text-[#FAA916] font-bold">•</span>
                    <span>Mide destrezas en ciencia, tecnología, matemáticas y análisis crítico</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-[#FAA916] font-bold">•</span>
                    <span><strong>No es una prueba de conocimiento acumulativo</strong></span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-[#FAA916] font-bold">•</span>
                    <span>No hay un temario específico para estudiar</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-[#FAA916] font-bold">•</span>
                    <span>Se completa con conocimientos de 7°, 8° y 9° año</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-[#FAA916] font-bold">•</span>
                    <span>No hay nota mínima para &quot;ganar&quot; (depende del cupo disponible)</span>
                  </li>
                </ul>
              </div>
            </div>

            {/* Botón de práctica */}
            <div className="text-center">
              <a
                href="#"
                className="inline-flex items-center gap-3 px-8 py-4 bg-[#FAA916] text-[#0A2463] rounded-full font-bold text-lg hover:bg-[#ffb52e] transition-all duration-300 hover:shadow-xl hover:-translate-y-1"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
                Descargar Práctica de la PAA
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Requisitos */}
      <section className="py-20 bg-gradient-to-b from-gray-50 to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div 
            id="requisitos"
            data-animate
            className={`transition-all duration-1000 ${
              isVisible.requisitos ? 'translate-y-0 opacity-100' : 'translate-y-20 opacity-0'
            }`}
          >
            <h2 className="text-4xl font-bold text-[#0A2463] mb-8 text-center">
              Requisitos para Aplicar
            </h2>
            
            <div className="max-w-3xl mx-auto">
              <div className="bg-white rounded-2xl shadow-xl overflow-hidden border-t-4 border-[#0A2463]">
                <div className="p-8">
                  <div className="space-y-4">
                    {requisitos.map((requisito, index) => (
                      <div 
                        key={index}
                        className="flex items-start gap-4 p-4 bg-gray-50 rounded-lg hover:bg-blue-50 transition-all duration-300"
                      >
                        <div className="w-8 h-8 bg-[#FAA916] rounded-full flex items-center justify-center text-[#0A2463] font-bold flex-shrink-0">
                          {index + 1}
                        </div>
                        <p className="text-gray-800 pt-1">{requisito}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Proceso Paso a Paso */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div 
            id="proceso"
            data-animate
            className={`transition-all duration-1000 ${
              isVisible.proceso ? 'translate-y-0 opacity-100' : 'translate-y-20 opacity-0'
            }`}
          >
            <h2 className="text-4xl font-bold text-[#0A2463] mb-12 text-center">
              Proceso de Admisión
            </h2>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {procesoSteps.map((step, index) => (
                <div 
                  key={index}
                  className="relative bg-white rounded-xl p-6 shadow-lg border-2 border-gray-200 hover:border-[#FAA916] hover:shadow-xl transition-all duration-300"
                >
                  <div className="absolute -top-4 -left-4 w-12 h-12 bg-gradient-to-br from-[#0A2463] to-[#1a4d99] rounded-full flex items-center justify-center text-white font-bold text-xl shadow-lg">
                    {step.numero}
                  </div>
                  <h3 className="text-xl font-bold text-[#0A2463] mb-3 mt-4">
                    {step.titulo}
                  </h3>
                  <p className="text-gray-700 leading-relaxed">
                    {step.descripcion}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Cálculo de Nota */}
      <section className="py-20 bg-gradient-to-b from-gray-50 to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div 
            id="nota"
            data-animate
            className={`max-w-4xl mx-auto transition-all duration-1000 ${
              isVisible.nota ? 'translate-y-0 opacity-100' : 'translate-y-20 opacity-0'
            }`}
          >
            <h2 className="text-4xl font-bold text-[#0A2463] mb-8 text-center">
              Cálculo de Nota de Ingreso
            </h2>
            
            <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
              <div className="bg-gradient-to-r from-[#0A2463] to-[#1a4d99] p-6 text-white">
                <h3 className="text-2xl font-bold">Composición de la Nota Final</h3>
              </div>
              <div className="p-8">
                <div className="space-y-4">
                  <div className="flex items-center justify-between p-6 bg-blue-50 rounded-lg">
                    <span className="text-lg font-semibold text-[#0A2463]">Prueba de Aptitud Académica</span>
                    <span className="text-3xl font-bold text-[#FAA916]">90%</span>
                  </div>
                  <div className="flex items-center justify-between p-6 bg-orange-50 rounded-lg">
                    <span className="text-lg font-semibold text-[#0A2463]">Nota de Presentación</span>
                    <span className="text-3xl font-bold text-[#FAA916]">10%</span>
                  </div>
                  <div className="flex items-center justify-between p-6 bg-gradient-to-r from-[#0A2463] to-[#1a4d99] rounded-lg">
                    <span className="text-lg font-bold text-white">Total</span>
                    <span className="text-3xl font-bold text-[#FAA916]">100%</span>
                  </div>
                </div>
                <div className="mt-6 p-4 bg-gray-50 rounded-lg">
                  <p className="text-sm text-gray-700">
                    <strong>Nota de Presentación:</strong> Promedio de las materias de 7°, 8° y 9° año. 
                    En caso de materias fragmentadas (como Inglés o Estudios Sociales), se ponderarán para obtener una nota unificada.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Información Importante */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div 
            id="importante"
            data-animate
            className={`transition-all duration-1000 ${
              isVisible.importante ? 'translate-y-0 opacity-100' : 'translate-y-20 opacity-0'
            }`}
          >
            <h2 className="text-4xl font-bold text-[#0A2463] mb-12 text-center">
              Información Importante
            </h2>
            
            <div className="grid md:grid-cols-2 gap-8">
              <div className="bg-gradient-to-br from-red-50 to-orange-50 rounded-2xl p-8 border-l-4 border-red-500">
                <div className="flex items-start gap-4">
                  <svg className="w-8 h-8 text-red-600 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                  </svg>
                  <div>
                    <h3 className="text-xl font-bold text-[#0A2463] mb-2">
                      Admisión NO Intercambiable
                    </h3>
                    <p className="text-gray-700 leading-relaxed">
                      Solo puede aplicar a <strong>una sede</strong>. No puede matricular en dos sedes al mismo tiempo. 
                      La elección debe basarse en cercanía geográfica y capacidades socioeconómicas.
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-2xl p-8 border-l-4 border-[#0A2463]">
                <div className="flex items-start gap-4">
                  <svg className="w-8 h-8 text-[#0A2463] flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <div>
                    <h3 className="text-xl font-bold text-[#0A2463] mb-2">
                      Sistema de Becas
                    </h3>
                    <p className="text-gray-700 leading-relaxed">
                      Los Colegios Científicos poseen un <strong>sistema de apoyo socioeconómico</strong> en forma de becas 
                      para apoyar a estudiantes admitidos que lo necesiten.
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-gradient-to-br from-yellow-50 to-orange-50 rounded-2xl p-8 border-l-4 border-[#FAA916]">
                <div className="flex items-start gap-4">
                  <svg className="w-8 h-8 text-[#FAA916] flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                  </svg>
                  <div>
                    <h3 className="text-xl font-bold text-[#0A2463] mb-2">
                      Cupos por Sede
                    </h3>
                    <p className="text-gray-700 leading-relaxed">
                      Cada sede admite entre <strong>30 y 35 estudiantes</strong>. Cada sede es autónoma y elige 
                      la cantidad según su situación particular.
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-2xl p-8 border-l-4 border-purple-600">
                <div className="flex items-start gap-4">
                  <svg className="w-8 h-8 text-purple-600 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                  </svg>
                  <div>
                    <h3 className="text-xl font-bold text-[#0A2463] mb-2">
                      No se Puede Repetir
                    </h3>
                    <p className="text-gray-700 leading-relaxed">
                      El proceso de admisión solo se realiza en <strong>9° año</strong>. No se puede repetir en 10° año 
                      aunque no haya alcanzado la nota de ingreso.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Galería de Vida Estudiantil */}
      <section className="py-20 bg-gradient-to-b from-gray-50 to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div 
            id="galeria"
            data-animate
            className={`text-center mb-12 transition-all duration-1000 ${
              isVisible.galeria ? 'translate-y-0 opacity-100' : 'translate-y-20 opacity-0'
            }`}
          >
            <h2 className="text-3xl lg:text-4xl font-bold text-[#0A2463] mb-4">
              Tu Futuro en el CCAL
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
              Conoce cómo es un día típico en el Colegio Científico de Alajuela
            </p>
          </div>

          <div
            className={`transition-all duration-1000 ${
              isVisible.galeria ? 'translate-y-0 opacity-100' : 'translate-y-20 opacity-0'
            }`}
            style={{ transitionDelay: '400ms' }}
          >
            <ImageCarousel 
              images={[
                {
                  src: "/images/laboratorio.jpg",
                  alt: "Estudiantes en laboratorio",
                  caption: "Experimenta con equipos de última generación"
                },
                {
                  src: "/images/estudiantes.jpeg",
                  alt: "Clase interactiva",
                  caption: "Clases dinámicas con profesores especializados"
                },
                {
                  src: "/images/actividades.jpeg",
                  alt: "Actividades extracurriculares",
                  caption: "Clubes, deportes y actividades culturales"
                },
                {
                  src: "/images/graduacion.jpeg",
                  alt: "Ceremonia de graduación",
                  caption: "Prepárate para tu futuro universitario"
                },
                {
                  src: "/images/cientifica.jpeg",
                  alt: "Feria científica",
                  caption: "Participa en ferias científicas nacionales e internacionales"
                },
                {
                  src: "/images/3.jpeg",
                  alt: "Campus CCAL",
                  caption: "Un ambiente ideal para tu formación académica"
                },
                {
                  src: "/images/futbol-chill2.jpeg",
                  alt: "Deportes y convivencia",
                  caption: "Desarrollo integral: mente y cuerpo"
                },
                {
                  src: "/images/proyecto.jpeg",
                  alt: "Trabajo en equipo",
                  caption: "Colaboración y aprendizaje conjunto"
                }
              ]} 
              autoPlay={true} 
              interval={6000} 
            />
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-20 bg-gradient-to-br from-[#0A2463] via-[#0d2d73] to-[#1a4d99] text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-bold mb-6">
            ¿Listo para Ser Parte del CCAL?
          </h2>
          <p className="text-xl text-blue-100 mb-8 leading-relaxed">
            Para más información sobre el proceso de admisión, fechas importantes y requisitos específicos, 
            no dudes en contactarnos.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link 
              href="/contacto"
              className="px-8 py-4 bg-[#FAA916] text-[#0A2463] rounded-full font-semibold hover:bg-[#ffb52e] transition-all duration-300 hover:shadow-xl"
            >
              Contactar al CCAL
            </Link>
            <Link 
              href="/nosotros/historia"
              className="px-8 py-4 border-2 border-white text-white hover:bg-white hover:text-[#0A2463] rounded-full font-semibold transition-all duration-300"
            >
              Conocer Nuestra Historia
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
