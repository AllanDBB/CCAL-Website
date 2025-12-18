"use client";

import React, { useEffect, useState } from 'react';
import { ImageCarousel } from '@/components/ui/carousel';
import Link from 'next/link';

export default function ExcelenciaCCALPage() {
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

  const programas = [
    {
      categoria: "Ciencias Exactas",
      color: "from-[#0A2463] to-[#1a4d99]",
      icon: "⚗",
      areas: ["Física", "Química", "Biología"],
      descripcion: "Programas intensivos con nivel universitario en ciencias básicas"
    },
    {
      categoria: "Matemáticas",
      color: "from-purple-600 to-purple-800",
      icon: "∑",
      areas: ["Precálculo", "Cálculo", "Análisis Matemático"],
      descripcion: "Formación avanzada en matemáticas aplicadas"
    },
    {
      categoria: "Tecnología",
      color: "from-blue-500 to-blue-700",
      icon: "⌘",
      areas: ["Programación", "Robótica", "Inteligencia Artificial"],
      descripcion: "Desarrollo de habilidades tecnológicas del futuro"
    }
  ];

  const logros = [
    {
      numero: "1er",
      titulo: "Lugar Nacional",
      descripcion: "Feria Científica Nacional 2024",
      icon: "★"
    },
    {
      numero: "15+",
      titulo: "Premios Internacionales",
      descripcion: "Competencias científicas globales",
      icon: "◆"
    },
    {
      numero: "95%",
      titulo: "Ingreso Universitario",
      descripcion: "A las mejores universidades del país",
      icon: "▲"
    },
    {
      numero: "300+",
      titulo: "Proyectos de Investigación",
      descripcion: "Desarrollados por nuestros estudiantes",
      icon: "●"
    }
  ];

  const galeriaCiencia = {
    title: "Proyectos Destacados",
    images: [
      {
        src: "/images/proyectos.jpeg",
        alt: "Proyecto de Física",
        caption: "Investigación en energías renovables - 1er Lugar Nacional"
      },
      {
        src: "/images/laboratorio.jpg",
        alt: "Proyecto de Química",
        caption: "Desarrollo de bioplásticos - Premio Internacional"
      },
      {
        src: "/images/lab.jpeg",
        alt: "Proyecto de Biología",
        caption: "Conservación de especies endémicas"
      },
      {
        src: "/images/estudiantes.jpeg",
        alt: "Proyecto de Robótica",
        caption: "Robot autónomo para agricultura - Mención Honorífica"
      },
      {
        src: "/images/cientifica.jpeg",
        alt: "Feria Científica",
        caption: "Participación en Feria Científica Nacional"
      },
      {
        src: "/images/campus.jpeg",
        alt: "Instalaciones Modernas",
        caption: "Infraestructura de primer nivel para la investigación"
      },
      {
        src: "/images/actividades.jpeg",
        alt: "Trabajo Colaborativo",
        caption: "Equipos científicos desarrollando soluciones innovadoras"
      }
    ]
  };

  const reconocimientos = [
    {
      año: "2024",
      titulo: "Premio a la Innovación Educativa",
      institucion: "MEP Costa Rica"
    },
    {
      año: "2023",
      titulo: "Mejor Proyecto de Sostenibilidad",
      institucion: "Intel ISEF"
    },
    {
      año: "2023",
      titulo: "Institución del Año",
      institucion: "Asociación Colegios Científicos"
    },
    {
      año: "2022",
      titulo: "Excelencia Académica",
      institucion: "CONARE"
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
              Excelencia CCAL
            </h1>
            <p className="text-xl md:text-2xl text-blue-100 leading-relaxed">
              Donde la ciencia, la innovación y la excelencia académica se encuentran para transformar vidas
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
            <h2 className="text-3xl md:text-4xl font-bold text-[#0A2463] mb-6">
              Formación Integral de Alto Nivel
            </h2>
            <p className="text-lg text-gray-700 leading-relaxed mb-4">
              En el CCAL combinamos excelencia académica con desarrollo personal, preparando a nuestros estudiantes 
              para ser líderes científicos y ciudadanos comprometidos con el desarrollo del país.
            </p>
            <p className="text-lg text-gray-700 leading-relaxed">
              Nuestros programas de estudio van más allá del currículo tradicional, ofreciendo experiencias 
              de aprendizaje que desarrollan el pensamiento crítico, la creatividad y la pasión por la ciencia.
            </p>
          </div>
        </div>
      </section>

      {/* Programas Académicos */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div 
            id="programas"
            data-animate
            className={`text-center mb-16 transition-all duration-1000 ${
              isVisible.programas ? 'translate-y-0 opacity-100' : 'translate-y-20 opacity-0'
            }`}
          >
            <h2 className="text-3xl lg:text-4xl font-bold text-[#0A2463] mb-4">
              Programas Académicos
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Oferta educativa diseñada para formar científicos de clase mundial
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {programas.map((programa, index) => (
              <div
                key={index}
                id={`programa-${index}`}
                data-animate
                className={`transition-all duration-700 ${
                  isVisible[`programa-${index}`] ? 'translate-y-0 opacity-100' : 'translate-y-20 opacity-0'
                }`}
                style={{ transitionDelay: `${index * 200}ms` }}
              >
                <div className={`h-full bg-gradient-to-br ${programa.color} rounded-2xl p-8 text-white shadow-xl hover:shadow-2xl hover:scale-105 transition-all duration-300`}>
                  <div className="text-6xl mb-4">{programa.icon}</div>
                  <h3 className="text-2xl font-bold mb-4">{programa.categoria}</h3>
                  <p className="mb-6 opacity-90">{programa.descripcion}</p>
                  <div className="space-y-2">
                    {programa.areas.map((area, i) => (
                      <div key={i} className="flex items-center gap-2">
                        <div className="w-2 h-2 bg-white rounded-full"></div>
                        <span className="font-medium">{area}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Logros Estadísticas */}
      <section className="py-20 bg-gradient-to-br from-[#0A2463] to-[#1a4d99] text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div 
            id="logros"
            data-animate
            className={`text-center mb-16 transition-all duration-1000 ${
              isVisible.logros ? 'translate-y-0 opacity-100' : 'translate-y-20 opacity-0'
            }`}
          >
            <h2 className="text-3xl lg:text-4xl font-bold mb-4">
              Logros y Reconocimientos
            </h2>
            <p className="text-xl text-blue-100">
              Números que respaldan nuestra excelencia
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {logros.map((logro, index) => (
              <div
                key={index}
                className={`text-center transition-all duration-700 hover:scale-110 ${
                  isVisible.logros ? 'translate-y-0 opacity-100' : 'translate-y-20 opacity-0'
                }`}
                style={{ transitionDelay: `${index * 150}ms` }}
              >
                <div className="text-6xl mb-4">{logro.icon}</div>
                <div className="text-5xl font-bold text-[#FAA916] mb-2">{logro.numero}</div>
                <div className="text-xl font-semibold mb-2">{logro.titulo}</div>
                <div className="text-blue-100">{logro.descripcion}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Galería de Proyectos */}
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
              {galeriaCiencia.title}
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
              Proyectos de investigación desarrollados por nuestros estudiantes que han obtenido reconocimientos nacionales e internacionales
            </p>
          </div>

          <div
            className={`transition-all duration-1000 ${
              isVisible.galeria ? 'translate-y-0 opacity-100' : 'translate-y-20 opacity-0'
            }`}
            style={{ transitionDelay: '400ms' }}
          >
            <ImageCarousel images={galeriaCiencia.images} autoPlay={true} interval={6000} />
          </div>
        </div>
      </section>

      {/* Reconocimientos Timeline */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div 
            id="reconocimientos"
            data-animate
            className={`text-center mb-16 transition-all duration-1000 ${
              isVisible.reconocimientos ? 'translate-y-0 opacity-100' : 'translate-y-20 opacity-0'
            }`}
          >
            <h2 className="text-3xl lg:text-4xl font-bold text-[#0A2463] mb-4">
              Reconocimientos Recientes
            </h2>
            <p className="text-xl text-gray-600">
              Premios y distinciones que nos enorgullecen
            </p>
          </div>

          <div className="max-w-4xl mx-auto">
            {reconocimientos.map((item, index) => (
              <div
                key={index}
                id={`reconocimiento-${index}`}
                data-animate
                className={`flex gap-8 mb-8 transition-all duration-700 ${
                  isVisible[`reconocimiento-${index}`] ? 'translate-x-0 opacity-100' : '-translate-x-20 opacity-0'
                }`}
                style={{ transitionDelay: `${index * 150}ms` }}
              >
                <div className="flex-shrink-0 w-24 text-center">
                  <div className="text-3xl font-bold text-[#FAA916]">{item.año}</div>
                </div>
                <div className="flex-grow bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl p-6 shadow-md hover:shadow-xl transition-all duration-300 border-l-4 border-[#0A2463]">
                  <h3 className="text-xl font-bold text-[#0A2463] mb-2">{item.titulo}</h3>
                  <p className="text-gray-600">{item.institucion}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-[#FAA916] to-[#ffb52e]">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl lg:text-4xl font-bold text-[#0A2463] mb-6">
            ¿Listo para alcanzar la excelencia?
          </h2>
          <p className="text-xl text-[#0A2463] mb-8">
            Forma parte de la próxima generación de científicos costarricenses
          </p>
          <Link
            href="/admisiones"
            className="inline-block px-8 py-4 bg-[#0A2463] text-white rounded-full font-semibold text-lg hover:bg-[#0d2d73] transition-all duration-300 transform hover:scale-105 shadow-xl hover:shadow-2xl"
          >
            Información de Admisiones
          </Link>
        </div>
      </section>
    </div>
  );
}
