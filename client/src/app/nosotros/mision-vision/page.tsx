"use client";

import React, { useEffect, useState } from 'react';

export default function MisionVisionPage() {
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

  const habilidades = [
    "Adaptabilidad al cambio",
    "Resiliencia",
    "Trabajo en equipo",
    "Pensamiento crítico",
    "Resolución de problemas",
    "Empoderamiento",
    "Emprendimiento",
    "Liderazgo",
    "Investigación",
    "Innovación"
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-[#0A2463] via-[#0d2d73] to-[#1a4d99] text-white overflow-hidden py-24">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-12 left-10 w-48 h-48 bg-[#FAA916] rounded-full opacity-10 blur-3xl animate-float-medium"></div>
          <div className="absolute -bottom-8 right-12 w-40 h-40 bg-blue-300 rounded-full opacity-15 blur-2xl animate-float-fast"></div>
        </div>
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl">
            <h1 className="text-5xl md:text-6xl font-bold leading-tight mb-6">
              Misión y Visión
            </h1>
            <p className="text-xl md:text-2xl text-blue-100 leading-relaxed">
              Estamos enfocados en buscar la mejor formación académica para nuestros estudiantes, 
              llevando al límite el potencial de nuestro alumnado
            </p>
          </div>
        </div>
      </section>

      {/* Misión y Visión */}
      <section className="py-20 bg-gradient-to-b from-gray-50 to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-8">
            {/* Misión */}
            <div 
              id="mision"
              data-animate
              className={`transition-all duration-1000 ${
                isVisible.mision ? 'translate-y-0 opacity-100' : 'translate-y-20 opacity-0'
              }`}
            >
              <div className="bg-white rounded-2xl shadow-xl p-8 h-full border-t-4 border-[#0A2463] hover:shadow-2xl transition-all duration-300">
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-16 h-16 rounded-xl bg-gradient-to-br from-[#0A2463] to-[#1a4d99] flex items-center justify-center">
                    <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <h2 className="text-3xl font-bold text-[#0A2463]">Misión</h2>
                </div>
                <p className="text-gray-700 text-lg leading-relaxed">
                  Brindar a los estudiantes un excelente servicio académico enfocado al área de las <strong>ciencias, 
                  las ingenierías y la investigación</strong>, formándolos de manera integral a la vez que se consideran 
                  los más altos valores costarricenses, preocupándose por la creación, preservación, cultivo, transmisión 
                  y búsqueda del conocimiento de los discentes en el campo de las ciencias y la tecnología.
                </p>
              </div>
            </div>

            {/* Visión */}
            <div 
              id="vision"
              data-animate
              className={`transition-all duration-1000 ${
                isVisible.vision ? 'translate-y-0 opacity-100' : 'translate-y-20 opacity-0'
              }`}
              style={{ transitionDelay: '200ms' }}
            >
              <div className="bg-gradient-to-br from-[#FAA916] to-[#ffb52e] rounded-2xl shadow-xl p-8 h-full hover:shadow-2xl transition-all duration-300">
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-16 h-16 rounded-xl bg-white/30 backdrop-blur-sm flex items-center justify-center">
                    <svg className="w-8 h-8 text-[#0A2463]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                    </svg>
                  </div>
                  <h2 className="text-3xl font-bold text-[#0A2463]">Visión</h2>
                </div>
                <p className="text-[#0A2463] text-lg leading-relaxed">
                  La búsqueda de una adecuada inserción de los jóvenes en la realidad nacional, formando <strong>líderes 
                  capaces, creativos, con espíritu crítico</strong>, un sano interés en la innovación tecnológica y 
                  la gestión del conocimiento sustentado en las ciencias y humanidades que cause un <strong>impacto 
                  positivo en nuestra sociedad</strong>.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Habilidades y Competencias */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div 
            id="habilidades"
            data-animate
            className={`transition-all duration-1000 ${
              isVisible.habilidades ? 'translate-y-0 opacity-100' : 'translate-y-20 opacity-0'
            }`}
          >
            <div className="text-center mb-12">
              <h2 className="text-4xl font-bold text-[#0A2463] mb-4">
                Habilidades Blandas y Competencias
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Desarrollamos en nuestros estudiantes las competencias necesarias para 
                enfrentar los desafíos del siglo XXI
              </p>
            </div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-5 gap-4">
              {habilidades.map((habilidad, index) => (
                <div
                  key={index}
                  className={`bg-white border-2 border-gray-200 rounded-xl p-6 text-center hover:border-[#FAA916] hover:shadow-lg transition-all duration-300 hover:-translate-y-1 ${
                    isVisible.habilidades ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
                  }`}
                  style={{ transitionDelay: `${index * 50}ms` }}
                >
                  <div className="w-12 h-12 bg-gradient-to-br from-[#0A2463] to-[#1a4d99] rounded-full mx-auto mb-4 flex items-center justify-center">
                    <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <h3 className="text-[#0A2463] font-semibold text-sm">
                    {habilidad}
                  </h3>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-20 bg-gradient-to-br from-[#0A2463] via-[#0d2d73] to-[#1a4d99] text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-bold mb-6">
            Formamos Líderes del Futuro
          </h2>
          <p className="text-xl text-blue-100 mb-8 leading-relaxed">
            A través de nuestra misión y visión, llevamos al límite el potencial de cada estudiante, 
            formándolos como profesionales íntegros comprometidos con el desarrollo de Costa Rica
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a 
              href="/nosotros/historia"
              className="px-8 py-4 bg-[#FAA916] text-[#0A2463] rounded-full font-semibold hover:bg-[#ffb52e] transition-all duration-300 hover:shadow-xl"
            >
              Conoce Nuestra Historia
            </a>
            <a 
              href="/oferta"
              className="px-8 py-4 border-2 border-white text-white hover:bg-white hover:text-[#0A2463] rounded-full font-semibold transition-all duration-300"
            >
              Oferta Académica
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
