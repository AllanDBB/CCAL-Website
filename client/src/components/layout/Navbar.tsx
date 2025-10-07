"use client";

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { menuItems } from '@/lib/menuConfig';
import NavbarDropdown from './NavbarDropdown';

const Navbar = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ease-in-out ${
      scrolled 
        ? 'bg-white shadow-xl' 
        : 'bg-transparent'
    }`}>
      <div className={`max-w-7xl mx-auto flex items-center justify-between px-4 sm:px-6 lg:px-8 transition-all duration-500 ${
        scrolled ? 'py-3 h-[64px]' : 'py-4 h-[72px]'
      }`}>
        <div className="flex items-center">
          <Link href="/">
            <div className="cursor-pointer flex items-center">
              <Image 
                src="/Logo.svg" 
                alt="CCAL Logo" 
                width={120} 
                height={40}
                className="h-10 w-auto transition-opacity duration-300"
                priority
              />
            </div>
          </Link>
        </div>

        {/* Menú para desktop - ahora oculto por debajo de 1260px */}
        <nav className="hidden xl:flex">
          <ul className="flex items-center space-x-5 xl:space-x-8">
            {menuItems.map((item, index) => (
              <li key={index} className="relative">
                {item.submenu ? (
                  <NavbarDropdown title={item.title} items={item.submenu} scrolled={scrolled} />
                ) : (
                  <Link 
                    href={item.link} 
                    className={`font-semibold transition-colors relative py-2 group ${
                      scrolled ? 'text-[#0A2463] hover:text-[#FAA916]' : 'text-white hover:text-[#FAA916]'
                    }`}
                  >
                    {item.title}
                    <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-[#FAA916] transition-all duration-300 group-hover:w-full"></span>
                  </Link>
                )}
              </li>
            ))}
          </ul>
        </nav>
        
        {/* Botones de acción - ahora ocultos por debajo de 1260px */}
        <div className="hidden xl:flex items-center">
          <button 
            disabled
            className={`px-4 xl:px-5 py-2 rounded-full font-semibold text-sm transition-all cursor-not-allowed ${
              scrolled
                ? 'text-[#0A2463]/50 bg-[#FAA916]/60'
                : 'text-[#0A2463]/70 bg-[#FAA916]/80'
            }`}
          >
            ▷ ADMISIONES
          </button>
        </div>
        
        {/* Botón de menú móvil - ahora visible hasta 1260px */}
        <button 
          className="xl:hidden flex flex-col justify-center items-center p-2"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          aria-label="Menú"
        >
          <span className={`block w-6 h-0.5 transition-all duration-300 ${
            scrolled ? 'bg-[#0A2463]' : 'bg-white'
          } ${mobileMenuOpen ? 'rotate-45 translate-y-1' : ''}`}></span>
          <span className={`block w-6 h-0.5 mt-1.5 mb-1.5 transition-all duration-300 ${
            scrolled ? 'bg-[#0A2463]' : 'bg-white'
          } ${mobileMenuOpen ? 'opacity-0' : ''}`}></span>
          <span className={`block w-6 h-0.5 transition-all duration-300 ${
            scrolled ? 'bg-[#0A2463]' : 'bg-white'
          } ${mobileMenuOpen ? '-rotate-45 -translate-y-1' : ''}`}></span>
        </button>
      </div>

      {/* Menú móvil - mejorado para asegurar visibilidad completa */}
      <div 
        className={`overflow-hidden transition-all duration-300 xl:hidden ${
          mobileMenuOpen 
            ? 'max-h-screen opacity-100 visible shadow-lg' 
            : 'max-h-0 opacity-0 invisible'
        }`}
      >
        <nav className="bg-white rounded-b-xl">
          <div className="max-h-[70vh] overflow-y-auto">
            <ul className="flex flex-col p-5 space-y-4">
              {menuItems.map((item, index) => (
                <li key={index} className="pb-4 border-b border-opacity-10 border-[#0A2463]">
                  {item.submenu ? (
                    <div className="space-y-2">
                      <p className="font-bold text-[#0A2463] text-base">{item.title}</p>
                      <ul className="pl-4 space-y-3">
                        {item.submenu.map((subItem, subIndex) => (
                          <li key={subIndex}>
                            <Link 
                              href={subItem.link} 
                              className="text-[#0A2463] hover:text-[#FAA916] transition-colors text-sm block py-1"
                              onClick={() => setMobileMenuOpen(false)}
                            >
                              {subItem.title}
                            </Link>
                          </li>
                        ))}
                      </ul>
                    </div>
                  ) : (
                    <Link 
                      href={item.link} 
                      className="block font-semibold text-[#0A2463] hover:text-[#FAA916] transition-colors"
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      {item.title}
                    </Link>
                  )}
                </li>
              ))}
              <li className="flex flex-col pt-2">
                <button 
                  disabled
                  className="w-full px-5 py-3 rounded-full font-semibold text-center text-[#0A2463]/50 bg-[#FAA916]/60 cursor-not-allowed"
                >
                  ▷ ADMISIONES
                </button>
              </li>
            </ul>
          </div>
        </nav>
      </div>
    </header>
  );
};

export default Navbar;