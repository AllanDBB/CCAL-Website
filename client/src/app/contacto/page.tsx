"use client";

import React, { useEffect, useState } from 'react';

export default function ContactoPage() {
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

  const contactInfo = [
    {
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
        </svg>
      ),
      title: "Dirección",
      content: "Av. Central Calle 18, Alajuela, 20101",
      detail: "Colegio Científico de Costa Rica, sede de Alajuela (UNED)"
    },
    {
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
        </svg>
      ),
      title: "Teléfono",
      content: "2431-4405",
      detail: "Lunes a Viernes, 7:00 AM - 5:00 PM"
    },
    {
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
        </svg>
      ),
      title: "Correo Electrónico",
      content: "info@ccalajuela.ed.cr",
      detail: "Respuesta en 24-48 horas hábiles"
    },
    {
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      ),
      title: "Horario de Atención",
      content: "Lunes a Viernes",
      detail: "7:00 AM - 5:00 PM"
    }
  ];

  const socialMedia = [
    {
      name: "Facebook",
      url: "https://facebook.com/ccalajuela",
      icon: (
        <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
          <path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z"></path>
        </svg>
      ),
      color: "hover:bg-blue-600"
    },
    {
      name: "Instagram",
      url: "https://instagram.com/ccalajuela",
      icon: (
        <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
          <rect x="2" y="2" width="20" height="20" rx="5" ry="5" fill="none" stroke="currentColor" strokeWidth="2"></rect>
          <path d="M16 11.37A4 4 0 1112.63 8 4 4 0 0116 11.37z" fill="none" stroke="currentColor" strokeWidth="2"></path>
          <circle cx="17.5" cy="6.5" r="1.5"></circle>
        </svg>
      ),
      color: "hover:bg-pink-600"
    },
    {
      name: "LinkedIn",
      url: "https://www.linkedin.com/company/colegio-científico-de-alajuela",
      icon: (
        <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
          <path d="M16 8a6 6 0 016 6v7h-4v-7a2 2 0 00-2-2 2 2 0 00-2 2v7h-4v-7a6 6 0 016-6zM2 9h4v12H2z"></path>
          <circle cx="4" cy="4" r="2"></circle>
        </svg>
      ),
      color: "hover:bg-blue-700"
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
              Contacto
            </h1>
            <p className="text-xl md:text-2xl text-blue-100 leading-relaxed">
              Estamos aquí para responder tus preguntas y ayudarte en tu camino educativo
            </p>
          </div>
        </div>
      </section>

      {/* Información de Contacto */}
      <section className="py-20 bg-gradient-to-b from-gray-50 to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div 
            id="info"
            data-animate
            className={`grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16 transition-all duration-1000 ${
              isVisible.info ? 'translate-y-0 opacity-100' : 'translate-y-20 opacity-0'
            }`}
          >
            {contactInfo.map((item, index) => (
              <div
                key={index}
                className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1 border-t-4 border-[#FAA916]"
              >
                <div className="text-[#0A2463] mb-4">
                  {item.icon}
                </div>
                <h3 className="text-lg font-bold text-[#0A2463] mb-2">
                  {item.title}
                </h3>
                <p className="text-gray-900 font-semibold mb-1">
                  {item.content}
                </p>
                <p className="text-gray-600 text-sm">
                  {item.detail}
                </p>
              </div>
            ))}
          </div>

          {/* Mapa y Redes Sociales */}
          <div className="grid lg:grid-cols-2 gap-8">
            {/* Mapa */}
            <div 
              id="map"
              data-animate
              className={`transition-all duration-1000 ${
                isVisible.map ? 'translate-x-0 opacity-100' : '-translate-x-20 opacity-0'
              }`}
            >
              <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
                <div className="bg-gradient-to-r from-[#0A2463] to-[#1a4d99] p-6">
                  <h2 className="text-2xl font-bold text-white flex items-center gap-3">
                    <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                    Ubicación
                  </h2>
                  <p className="text-blue-100 mt-2">
                    Colegio Científico de Costa Rica, sede de Alajuela (UNED)
                  </p>
                </div>
                <div className="relative w-full h-96">
                  <iframe 
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3929.847537788!2d-84.22464!3d10.014235!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8fa0f9ceabdb63f7%3A0x3c0ff8aeada9972b!2sColegio%20Cient%C3%ADfico%20de%20Costa%20Rica%2C%20sede%20de%20Alajuela%20(UNED)!5e0!3m2!1ses!2scr!4v1696700000000!5m2!1ses!2scr"
                    width="100%"
                    height="100%"
                    style={{ border: 0 }}
                    allowFullScreen
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    title="Mapa de ubicación CCAL"
                  ></iframe>
                </div>
              </div>
            </div>

            {/* Información Adicional y Redes Sociales */}
            <div 
              id="social"
              data-animate
              className={`space-y-8 transition-all duration-1000 ${
                isVisible.social ? 'translate-x-0 opacity-100' : 'translate-x-20 opacity-0'
              }`}
            >
              {/* Redes Sociales */}
              <div className="bg-white rounded-2xl shadow-xl p-8 border-t-4 border-[#0A2463]">
                <h2 className="text-2xl font-bold text-[#0A2463] mb-4">
                  Síguenos en Redes Sociales
                </h2>
                <p className="text-[#0A2463] mb-6">
                  Mantente al día con nuestras actividades, logros y novedades
                </p>
                <div className="flex gap-4">
                  {socialMedia.map((social, index) => (
                    <a
                      key={index}
                      href={social.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`w-14 h-14 bg-white border-2 border-[#0A2463] rounded-xl flex items-center justify-center text-[#0A2463] ${social.color} hover:text-white transition-all duration-300 hover:scale-110`}
                      aria-label={social.name}
                    >
                      {social.icon}
                    </a>
                  ))}
                </div>
              </div>

              {/* Preguntas Frecuentes */}
              <div className="bg-white rounded-2xl shadow-xl p-8 border-t-4 border-[#0A2463]">
                <h2 className="text-2xl font-bold text-[#0A2463] mb-4">
                  ¿Tienes Preguntas?
                </h2>
                <p className="text-gray-700 mb-6 leading-relaxed">
                  Nuestro equipo está disponible para ayudarte con información sobre:
                </p>
                <ul className="space-y-3 text-gray-700">
                  <li className="flex items-start gap-3">
                    <svg className="w-6 h-6 text-[#FAA916] flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <span>Proceso de admisión y requisitos</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <svg className="w-6 h-6 text-[#FAA916] flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <span>Plan de estudios y oferta académica</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <svg className="w-6 h-6 text-[#FAA916] flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <span>Actividades extracurriculares</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <svg className="w-6 h-6 text-[#FAA916] flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <span>Horarios y calendario académico</span>
                  </li>
                </ul>
              </div>

              {/* Horario Especial */}
              <div className="bg-gradient-to-br from-[#0A2463] to-[#1a4d99] rounded-2xl shadow-xl p-8 text-white">
                <h3 className="text-xl font-bold mb-3 flex items-center gap-2">
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  Nota Importante
                </h3>
                <p className="text-blue-100 text-sm leading-relaxed">
                  Durante periodos de vacaciones o días festivos, nuestro horario de atención puede variar. 
                  Te recomendamos contactarnos por correo electrónico o redes sociales para obtener una respuesta más rápida.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
