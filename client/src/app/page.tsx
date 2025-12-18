"use client";

import React, { useEffect, useState } from 'react';
import { Button } from '@/components/ui/buttons';
import { FeatureCard } from '@/components/ui/cards';
import { ImageCarousel } from '@/components/ui/carousel';
import { homePageContent } from '@/lib/content/homepage';

interface Particle {
  left: number;
  top: number;
  delay: number;
  duration: number;
}

export default function HomePage() {
  const [scrollY, setScrollY] = useState(0);
  const [isVisible, setIsVisible] = useState<{ [key: string]: boolean }>({});
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [particles, setParticles] = useState<Particle[]>([]);

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    const handleMouseMove = (e: MouseEvent) => {
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

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          setIsVisible(prev => ({
            ...prev,
            [entry.target.id]: entry.isIntersecting
          }));
        });
      },
      { threshold: 0.1, rootMargin: '50px' }
    );

    const elements = document.querySelectorAll('[data-animate]');
    elements.forEach(el => observer.observe(el));

    return () => observer.disconnect();
  }, []);

  return (
    <div className="min-h-screen overflow-x-hidden">
      <div className="fixed inset-0 -z-10 bg-gradient-to-br from-[#0A2463] via-[#0d2d73] to-[#1a4d99]"></div>

      {/* Hero Section - sin padding top ya que el navbar es transparente */}
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
              {/* Logo circular con efectos */}
              <div className="relative w-full h-80 lg:h-96 flex items-center justify-center">
                <div className="relative group">
                  {/* Círculo de fondo con gradiente animado */}
                  <div className="absolute inset-0 rounded-full bg-gradient-to-br from-white/30 via-white/20 to-transparent blur-3xl animate-pulse-slow"></div>
                  
                  {/* Círculo principal */}
                  <div className="relative w-72 h-72 lg:w-80 lg:h-80 rounded-full bg-white/10 backdrop-blur-lg border-4 border-white/30 flex items-center justify-center shadow-2xl overflow-hidden group-hover:scale-110 group-hover:border-white/50 transition-all duration-500">
                    {/* Efecto de brillo giratorio */}
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent rotate-45 -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
                    
                    {/* Logo */}
                    <div className="relative z-10 p-12">
                      <img 
                        src="/Logo.svg" 
                        alt="CCAL Logo" 
                        className="w-full h-full object-contain filter drop-shadow-2xl transition-transform duration-500 group-hover:scale-105"
                      />
                    </div>
                  </div>
                  
                  {/* Anillos decorativos */}
                  <div className="absolute inset-0 rounded-full border-2 border-white/20 scale-110 animate-ping-slow"></div>
                  <div className="absolute inset-0 rounded-full border border-white/10 scale-125"></div>
                </div>
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
        className="py-20 bg-white relative overflow-hidden"
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

      {/* Image Carousel Section */}
      <section 
        id="carousel"
        className="py-20 bg-white relative overflow-hidden"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div 
            className={`text-center mb-12 transform transition-all duration-1000 ${
              isVisible.carousel ? 'translate-y-0 opacity-100' : 'translate-y-20 opacity-0'
            }`}
          >
            <h2 className="text-3xl lg:text-4xl font-bold text-[#0A2463] mb-4 relative">
              {homePageContent.carousel.title}
              <div className={`absolute -bottom-2 left-1/2 transform -translate-x-1/2 h-1 bg-gradient-to-r from-[#0A2463] to-[#FAA916] rounded-full transition-all duration-1000 ${
                isVisible.carousel ? 'w-48' : 'w-0'
              }`} style={{ transitionDelay: '500ms' }}></div>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              {homePageContent.carousel.description}
            </p>
          </div>

          <div 
            className={`transform transition-all duration-1000 ${
              isVisible.carousel ? 'translate-y-0 opacity-100 scale-100' : 'translate-y-20 opacity-0 scale-95'
            }`}
            style={{ transitionDelay: '600ms' }}
          >
            <ImageCarousel images={homePageContent.carousel.images} autoPlay={true} interval={5000} />
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
    </div>
  );
}
