"use client";

import React from 'react';
import Link from 'next/link';

export default function TerminosDeUsoPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-[#0A2463] to-[#1a4d99] text-white py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Términos de Uso</h1>
          <p className="text-xl text-blue-100">
            Información sobre el propósito y uso de este sitio web
          </p>
        </div>
      </section>

      {/* Content Section */}
      <section className="py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white rounded-2xl shadow-xl p-8 md:p-12">
            
            {/* Propósito del Sitio Web */}
            <div className="mb-12">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 bg-[#FAA916] rounded-full flex items-center justify-center text-2xl">
                  🌐
                </div>
                <h2 className="text-3xl font-bold text-[#0A2463]">Propósito del Sitio Web</h2>
              </div>
              <div className="pl-15 space-y-4 text-gray-700 leading-relaxed">
                <p>
                  Este sitio web ha sido creado con el propósito de <strong>transmitir información</strong> sobre el 
                  Colegio Científico Costarricense Sede Alajuela (CCAL) de manera clara, accesible y actualizada.
                </p>
                <p>
                  Nuestro objetivo es proporcionar a estudiantes, padres de familia, educadores y la comunidad en general, 
                  acceso a información relevante sobre:
                </p>
                <ul className="list-disc pl-6 space-y-2">
                  <li>Nuestra historia y misión educativa</li>
                  <li>Programas académicos y oferta educativa</li>
                  <li>Actividades institucionales y extracurriculares</li>
                  <li>Recursos y servicios disponibles</li>
                  <li>Noticias y eventos de la comunidad CCAL</li>
                </ul>
              </div>
            </div>

            {/* Naturaleza Informativa */}
            <div className="mb-12 bg-blue-50 rounded-xl p-6 border-l-4 border-[#0A2463]">
              <div className="flex items-start gap-3">
                <div className="text-3xl">ℹ️</div>
                <div>
                  <h3 className="text-xl font-bold text-[#0A2463] mb-2">Sitio Web Informativo</h3>
                  <p className="text-gray-700">
                    Este sitio web es de carácter <strong>exclusivamente informativo</strong>. No procesamos 
                    transacciones comerciales, ni recopilamos datos personales sensibles. Nuestro único propósito 
                    es mantener a nuestra comunidad informada y conectada.
                  </p>
                </div>
              </div>
            </div>

            {/* Uso de la Información */}
            <div className="mb-12">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 bg-[#0A2463] rounded-full flex items-center justify-center text-2xl">
                  📋
                </div>
                <h2 className="text-3xl font-bold text-[#0A2463]">Uso de la Información</h2>
              </div>
              <div className="pl-15 space-y-4 text-gray-700 leading-relaxed">
                <p>
                  La información presentada en este sitio web está destinada para:
                </p>
                <ul className="list-disc pl-6 space-y-2">
                  <li>Consulta y referencia general sobre el CCAL</li>
                  <li>Conocer nuestros programas y actividades educativas</li>
                  <li>Mantenerse al día con noticias y eventos institucionales</li>
                  <li>Contactar con la institución para consultas específicas</li>
                </ul>
                <p className="mt-4">
                  Nos esforzamos por mantener toda la información actualizada y precisa. Si encuentra alguna 
                  inconsistencia o tiene preguntas, por favor contáctenos directamente.
                </p>
              </div>
            </div>

            {/* Responsabilidad */}
            <div className="mb-12">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 bg-[#FAA916] rounded-full flex items-center justify-center text-2xl">
                  ⚖️
                </div>
                <h2 className="text-3xl font-bold text-[#0A2463]">Responsabilidad</h2>
              </div>
              <div className="pl-15 space-y-4 text-gray-700 leading-relaxed">
                <p>
                  El contenido de este sitio web es de carácter informativo y está sujeto a cambios sin previo aviso. 
                  CCAL no se hace responsable por decisiones tomadas exclusivamente con base en la información aquí presentada.
                </p>
                <p>
                  Para información oficial, procesos de admisión o consultas específicas, recomendamos contactar 
                  directamente con las oficinas administrativas del colegio.
                </p>
              </div>
            </div>

            {/* Contacto */}
            <div className="bg-gradient-to-r from-[#0A2463] to-[#1a4d99] rounded-xl p-8 text-white">
              <div className="flex items-center gap-3 mb-4">
                <div className="text-3xl">📧</div>
                <h2 className="text-2xl font-bold">¿Tienes Preguntas?</h2>
              </div>
              <p className="mb-6">
                Si tienes alguna pregunta sobre el uso de este sitio web o necesitas más información sobre el CCAL, 
                no dudes en contactarnos.
              </p>
              <Link 
                href="/"
                className="inline-block bg-[#FAA916] text-[#0A2463] px-6 py-3 rounded-full font-semibold hover:bg-[#ffb52e] transition-all duration-300 hover:shadow-lg"
              >
                Volver al Inicio
              </Link>
            </div>

            {/* Footer Note */}
            <div className="mt-8 pt-6 border-t border-gray-200 text-center text-sm text-gray-500">
              <p>Última actualización: Octubre 2026</p>
              <p className="mt-2">© {new Date().getFullYear()} Colegio Científico Costarricense Sede Alajuela</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
