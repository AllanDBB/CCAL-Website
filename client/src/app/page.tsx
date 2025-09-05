"use client";

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/buttons';
import { FeatureCard, Card } from '@/components/ui/cards';
import { homePageContent } from '@/lib/content/homepage';

export default function HomePage() {
  const [scrollY, setScrollY] = useState(0);
  const [isVisible, setIsVisible] = useState({});
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [particles, setParticles] = useState([]);

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    const handleMouseMove = (e) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener('scroll', handleScroll);
    window.addEventListener('mousemove', handleMouseMove);
    
    // Generar partículas solo en el cliente
    setParticles([...Array(10)].map(() => ({
      left: Math.random() * 100,
      top: Math.random() * 100,
      delay: Math.random() * 5,
      duration: 3 + Math.random() * 4
    })));
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  const observeElement = (elementId: string) => {
    useEffect(() => {
      const observer = new IntersectionObserver(
        ([entry]) => {
          setIsVisible(prev => ({
            ...prev,
            [elementId]: entry.isIntersecting
          }));
        },
        { threshold: 0.1, rootMargin: '50px' }
      );

      const element = document.getElementById(elementId);
      if (element) observer.observe(element);

      return () => {
        if (element) observer.unobserve(element);
      };
    }, [elementId]);
  };

  // Observar elementos
  observeElement('hero');
  observeElement('features');
  observeElement('stats');
  observeElement('news');
  observeElement('cta');
  observeElement('testimonials');

  return (
    <div className="min-h-screen overflow-x-hidden">
      {/* Hero Section */}
      <section 
        id="hero"
        className="relative min-h-screen bg-gradient-to-br from-[#0A2463] via-[#0d2d73] to-[#1a4d99] text-white overflow-hidden flex items-center"
      >
        {/* Elementos flotantes con parallax y mouse tracking */}
        <div 
          className="absolute inset-0"
          style={{
            transform: `translate3d(${scrollY * 0.05}px, ${scrollY * 0.1}px, 0)`,
          }}
        >
          <div 
            className="absolute top-20 left-10 w-32 h-32 bg-[#FAA916] rounded-full opacity-10 blur-sm animate-float-slow"
            style={{
              transform: `translate(${mousePosition.x * 0.01}px, ${mousePosition.y * 0.01}px)`
            }}
          ></div>
          <div 
            className="absolute top-40 right-20 w-24 h-24 bg-blue-300 rounded-full opacity-15 blur-sm animate-float-medium"
            style={{
              transform: `translate(${mousePosition.x * -0.008}px, ${mousePosition.y * 0.008}px)`
            }}
          ></div>
          <div 
            className="absolute bottom-20 left-1/4 w-16 h-16 bg-purple-400 rounded-full opacity-20 blur-sm animate-float-fast"
            style={{
              transform: `translate(${mousePosition.x * 0.005}px, ${mousePosition.y * -0.005}px)`
            }}
          ></div>
        </div>
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div 
              className={`text-center lg:text-left transform transition-all duration-1200 ease-out ${
                isVisible.hero ? 'translate-y-0 opacity-100 scale-100' : 'translate-y-32 opacity-0 scale-95'
              }`}
            >
              <div className="overflow-hidden">
                <h1 className={`text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight mb-6 transition-transform duration-1000 ${
                  isVisible.hero ? 'translate-y-0' : 'translate-y-full'
                }`}>
                  {homePageContent.hero.title.part1}
                  <span className={`text-[#FAA916] block transition-transform duration-1200 delay-300 ${
                    isVisible.hero ? 'translate-x-0' : 'translate-x-full'
                  }`}>{homePageContent.hero.title.part2}</span>
                  <span className={`block transition-transform duration-1400 delay-500 ${
                    isVisible.hero ? 'translate-x-0' : '-translate-x-full'
                  }`}>{homePageContent.hero.title.part3}</span>
                </h1>
              </div>
              
              <p className={`text-xl lg:text-2xl text-blue-100 mb-8 leading-relaxed transition-all duration-1000 delay-700 ${
                isVisible.hero ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
              }`}>
                {homePageContent.hero.description}
              </p>
              
              <div className={`flex flex-col sm:flex-row gap-4 justify-center lg:justify-start transition-all duration-1200 delay-1000 ${
                isVisible.hero ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
              }`}>
                <Button 
                  href="/admisiones" 
                  variant="secondary"
                  className="text-lg px-8 py-4 hover:shadow-2xl hover:shadow-[#FAA916]/25 transition-all duration-300"
                >
                  {homePageContent.hero.buttons.primary}
                </Button>
                <button className="text-lg px-8 py-4 border-2 border-white text-white hover:bg-white hover:text-[#0A2463] rounded-full font-semibold transition-all duration-300 transform hover:scale-105 hover:shadow-2xl">
                  {homePageContent.hero.buttons.secondary}
                </button>
              </div>
            </div>
            
            <div 
              className={`relative transform transition-all duration-1500 ease-out ${
                isVisible.hero ? 'translate-x-0 opacity-100 rotate-0' : 'translate-x-20 opacity-0 rotate-3'
              }`}
              style={{ transitionDelay: '600ms' }}
            >
              <div className="relative w-full h-80 lg:h-96 rounded-2xl overflow-hidden shadow-2xl bg-gradient-to-br from-blue-400 to-purple-500 flex items-center justify-center group transform hover:scale-105 transition-all duration-500 hover:shadow-3xl">
                <div className="text-white text-center transition-transform duration-500 group-hover:scale-110">
                  <div className="text-6xl mb-4 animate-bounce-gentle">🔬</div>
                  <div className="text-xl font-semibold">{homePageContent.hero.imageCard.title}</div>
                </div>
                
                {/* Efecto de brillo al hover */}
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
              </div>
              
              {/* Floating stats con animaciones mejoradas */}
              <div className={`absolute -bottom-6 -left-6 bg-white rounded-xl p-4 shadow-lg animate-float-up hover:shadow-2xl transition-all duration-300 ${
                isVisible.hero ? 'scale-100 opacity-100' : 'scale-0 opacity-0'
              }`} style={{ transitionDelay: '1200ms' }}>
                <div className="text-[#0A2463] font-bold text-2xl">{homePageContent.hero.stats.university.number}</div>
                <div className="text-sm text-gray-600">{homePageContent.hero.stats.university.label}</div>
              </div>
              
              <div className={`absolute -top-6 -right-6 bg-[#FAA916] rounded-xl p-4 shadow-lg animate-float-down hover:shadow-2xl transition-all duration-300 ${
                isVisible.hero ? 'scale-100 opacity-100' : 'scale-0 opacity-0'
              }`} style={{ transitionDelay: '1400ms' }}>
                <div className="text-[#0A2463] font-bold text-2xl">{homePageContent.hero.stats.experience.number}</div>
                <div className="text-sm text-[#0A2463]">{homePageContent.hero.stats.experience.label}</div>
              </div>
            </div>
          </div>
        </div>

        {/* Scroll Indicator mejorado */}
        <div className={`absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce transition-all duration-1000 delay-1600 ${
          isVisible.hero ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
        }`}>
          <div className="w-6 h-10 border-2 border-white rounded-full flex justify-center relative">
            <div className="w-1 h-3 bg-white rounded-full mt-2 animate-pulse"></div>
          </div>
          <div className="text-xs text-white/70 mt-2 text-center">{homePageContent.hero.scrollIndicator}</div>
        </div>
      </section>

      {/* Features Section */}
      <section 
        id="features" 
        className="py-20 bg-gradient-to-b from-gray-50 to-white relative overflow-hidden"
      >
        {/* Elementos de fondo animados */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute top-10 right-10 w-64 h-64 bg-[#0A2463] rounded-full animate-pulse-slow"></div>
          <div className="absolute bottom-10 left-10 w-48 h-48 bg-[#FAA916] rounded-full animate-pulse-slow" style={{ animationDelay: '2s' }}></div>
        </div>
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div 
            className={`text-center mb-16 transform transition-all duration-1200 ${
              isVisible.features ? 'translate-y-0 opacity-100 scale-100' : 'translate-y-12 opacity-0 scale-95'
            }`}
          >
            <h2 className="text-3xl lg:text-4xl font-bold text-[#0A2463] mb-4 relative">
              {homePageContent.features.title}
              <div className={`absolute -bottom-2 left-1/2 transform -translate-x-1/2 h-1 bg-gradient-to-r from-[#0A2463] to-[#FAA916] rounded-full transition-all duration-1000 ${
                isVisible.features ? 'w-24' : 'w-0'
              }`} style={{ transitionDelay: '500ms' }}></div>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              {homePageContent.features.description}
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {homePageContent.features.items.map((feature, index) => (
              <div 
                key={index}
                className={`transform transition-all duration-700 hover:scale-105 ${
                  isVisible.features 
                    ? 'translate-y-0 opacity-100 rotate-0' 
                    : 'translate-y-20 opacity-0 rotate-1'
                }`}
                style={{ 
                  transitionDelay: `${index * 200}ms`,
                  animationDelay: `${index * 200}ms`
                }}
              >
                <div className="group">
                  <FeatureCard
                    title={feature.title}
                    description={feature.description}
                    icon={<span className="text-4xl transition-transform duration-300 group-hover:scale-110">{feature.icon}</span>}
                    accentColor={feature.color}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section 
        id="stats"
        className="py-20 bg-[#0A2463] text-white relative overflow-hidden"
      >
        <div className="absolute inset-0 bg-gradient-to-r from-blue-900/50 to-purple-900/50"></div>
        
        {/* Elementos de fondo animados */}
        <div className="absolute inset-0">
          <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-transparent via-blue-500/5 to-transparent animate-pulse-slow"></div>
        </div>
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 text-center">
            {homePageContent.stats.map((stat, index) => (
              <div 
                key={index}
                className={`transform transition-all duration-1000 hover:scale-110 group ${
                  isVisible.stats 
                    ? 'translate-y-0 opacity-100 scale-100' 
                    : 'translate-y-20 opacity-0 scale-90'
                }`}
                style={{ transitionDelay: `${index * 300}ms` }}
              >
                <div className="relative">
                  <div className="text-5xl font-bold text-[#FAA916] mb-2 transition-all duration-300 group-hover:text-6xl">
                    {stat.number}
                  </div>
                  <div className="text-xl transition-all duration-300 group-hover:text-[#FAA916]">{stat.label}</div>
                  
                  {/* Efecto de resplandor */}
                  <div className="absolute inset-0 bg-[#FAA916] rounded-full opacity-0 group-hover:opacity-20 blur-xl transition-all duration-500 scale-150"></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* News Section */}
      <section 
        id="news"
        className="py-20 bg-gradient-to-br from-blue-50 to-indigo-100 relative overflow-hidden"
      >
        <div className="max-w-full px-4 sm:px-6 lg:px-8">
          <div 
            className={`max-w-7xl mx-auto flex justify-between items-center mb-12 transform transition-all duration-1000 ${
              isVisible.news ? 'translate-y-0 opacity-100' : 'translate-y-20 opacity-0'
            }`}
          >
            <div>
              <h2 className="text-3xl lg:text-4xl font-bold text-[#0A2463] mb-4 relative">
                {homePageContent.news.title}
                <div className={`absolute -bottom-2 left-0 h-1 bg-gradient-to-r from-[#0A2463] to-[#FAA916] rounded-full transition-all duration-1000 ${
                  isVisible.news ? 'w-32' : 'w-0'
                }`} style={{ transitionDelay: '500ms' }}></div>
              </h2>
              <p className="text-xl text-gray-600">
                {homePageContent.news.description}
              </p>
            </div>
            <Link 
              href="/noticias" 
              className="text-[#0A2463] hover:text-[#FAA916] font-semibold flex items-center gap-2 transition-all duration-300 hover:scale-105 group"
            >
              {homePageContent.news.viewAllText}
              <svg className="w-5 h-5 transition-transform duration-300 group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </Link>
          </div>
          
          {/* Contenedor de scroll horizontal con gradiente */}
          <div className="relative">
            <div className="overflow-x-auto scrollbar-hide">
              <div className="flex gap-6 pb-4 px-4 lg:px-8" style={{ width: 'fit-content' }}>
                {homePageContent.news.items.map((news, index) => (
                  <div 
                    key={index}
                    className={`flex-shrink-0 w-80 transform transition-all duration-700 hover:scale-105 group ${
                      isVisible.news 
                        ? 'translate-y-0 opacity-100' 
                        : 'translate-y-20 opacity-0'
                    }`}
                    style={{ transitionDelay: `${index * 150}ms` }}
                  >
                    <div className="bg-white rounded-xl shadow-lg overflow-hidden h-full hover:shadow-2xl transition-all duration-500 group-hover:-translate-y-2">
                      <div className="relative h-48 bg-gradient-to-br from-blue-400 to-purple-500 flex items-center justify-center overflow-hidden">
                        <div className="text-white text-center z-10">
                          <div className="text-4xl mb-2 transition-transform duration-300 group-hover:scale-110">📰</div>
                          <span className="absolute top-4 right-4 bg-[#FAA916] text-[#0A2463] text-xs font-semibold px-3 py-1 rounded-full transition-all duration-300 group-hover:scale-110">
                            {news.category}
                          </span>
                        </div>
                        
                        {/* Efecto de ondas */}
                        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
                      </div>
                      
                      <div className="p-6">
                        <div className="text-sm text-gray-500 mb-2">{news.date}</div>
                        <h3 className="text-lg font-bold text-[#0A2463] mb-2 line-clamp-2 group-hover:text-[#FAA916] transition-colors duration-300">{news.title}</h3>
                        <p className="text-gray-600 line-clamp-3 mb-4">{news.description}</p>
                        <div className="inline-flex items-center text-[#0A2463] font-medium hover:text-[#FAA916] transition-all duration-300 cursor-pointer group-hover:translate-x-2">
                          {homePageContent.news.readMoreText}
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-1 transition-transform duration-300 group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                          </svg>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            
            {/* Gradientes en los bordes para indicar scroll */}
            <div className="absolute left-0 top-0 w-8 h-full bg-gradient-to-r from-blue-50 to-transparent pointer-events-none"></div>
            <div className="absolute right-0 top-0 w-8 h-full bg-gradient-to-l from-indigo-100 to-transparent pointer-events-none"></div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section 
        id="cta"
        className="py-20 bg-gradient-to-r from-[#FAA916] to-[#ffb52e] relative overflow-hidden"
      >
        {/* Partículas flotantes - generadas en el cliente */}
        <div className="absolute inset-0">
          {particles.map((particle, i) => (
            <div
              key={i}
              className="absolute w-2 h-2 bg-white rounded-full opacity-20 animate-float-particle"
              style={{
                left: `${particle.left}%`,
                top: `${particle.top}%`,
                animationDelay: `${particle.delay}s`,
                animationDuration: `${particle.duration}s`
              }}
            ></div>
          ))}
        </div>
        
        <div 
          className={`relative max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8 transform transition-all duration-1000 ${
            isVisible.cta ? 'translate-y-0 opacity-100 scale-100' : 'translate-y-20 opacity-0 scale-95'
          }`}
        >
          <h2 className="text-3xl lg:text-4xl font-bold text-[#0A2463] mb-6">
            {homePageContent.cta.title}
          </h2>
          <p className="text-xl text-[#0A2463] mb-8 leading-relaxed">
            {homePageContent.cta.description}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button 
              href="/admisiones" 
              variant="primary"
              className="text-lg px-8 py-4 hover:shadow-2xl hover:shadow-[#0A2463]/25 transition-all duration-300"
            >
              {homePageContent.cta.buttons.primary}
            </Button>
            <button className="text-lg px-8 py-4 border-2 border-[#0A2463] text-[#0A2463] bg-white hover:bg-[#0A2463] hover:text-white rounded-full font-semibold transition-all duration-300 transform hover:scale-105 hover:shadow-2xl">
              {homePageContent.cta.buttons.secondary}
            </button>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section 
        id="testimonials"
        className="py-20 bg-gradient-to-b from-gray-50 to-white relative overflow-hidden"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div 
            className={`text-center mb-16 transform transition-all duration-1000 ${
              isVisible.testimonials ? 'translate-y-0 opacity-100' : 'translate-y-20 opacity-0'
            }`}
          >
            <h2 className="text-3xl lg:text-4xl font-bold text-[#0A2463] mb-4 relative">
              {homePageContent.testimonials.title}
              <div className={`absolute -bottom-2 left-1/2 transform -translate-x-1/2 h-1 bg-gradient-to-r from-[#0A2463] to-[#FAA916] rounded-full transition-all duration-1000 ${
                isVisible.testimonials ? 'w-40' : 'w-0'
              }`} style={{ transitionDelay: '500ms' }}></div>
            </h2>
            <p className="text-xl text-gray-600">
              {homePageContent.testimonials.description}
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {homePageContent.testimonials.items.map((testimonial, index) => (
              <div 
                key={index}
                className={`transform transition-all duration-700 hover:scale-105 ${
                  isVisible.testimonials 
                    ? 'translate-y-0 opacity-100 rotate-0' 
                    : 'translate-y-20 opacity-0 rotate-1'
                }`}
                style={{ transitionDelay: `${index * 250}ms` }}
              >
                <div className="group">
                  <Card
                    title={testimonial.title}
                    description={testimonial.description}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
