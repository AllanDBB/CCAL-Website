"use client";

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { socialMedia } from '@/lib/menuConfig';

const Footer = () => {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="mt-16 bg-white border-t border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-10">
        {/* Top section with logo and social links */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-6 pb-6 border-b border-gray-200">
          {/* Logo on the left */}
          <Link href="/">
            <div className="cursor-pointer flex items-center">
              <Image 
                src="/Logo.svg" 
                alt="CCAL Logo" 
                width={100} 
                height={35}
                className="h-8 w-auto"
              />
            </div>
          </Link>
          
          {/* Social media links on the right */}
          <div className="flex items-center space-x-5">
            {socialMedia.map((platform, index) => (
              <a 
                key={index}
                href={platform.url} 
                target="_blank" 
                rel="noopener noreferrer" 
                aria-label={platform.name} 
                className="text-[#0A2463] hover:text-[#FAA916] transition-colors transform hover:scale-110 duration-200"
              >
                {platform.icon}
              </a>
            ))}
            {/* GitHub icon */}
            <a 
              href="https://github.com/AllanDBB" 
              target="_blank" 
              rel="noopener noreferrer" 
              aria-label="GitHub" 
              className="text-[#0A2463] hover:text-[#FAA916] transition-colors transform hover:scale-110 duration-200"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
              </svg>
            </a>
          </div>
        </div>
        
        {/* Bottom section with copyright and links */}
        <div className="pt-6 flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="text-sm text-gray-600 text-center md:text-left">
            © {currentYear} Colegio Científico Sede Alajuela.
          </div>
          <div className="flex flex-wrap justify-center items-center gap-4 md:gap-6">
            <Link 
              href="/terminos-de-uso" 
              className="text-sm text-gray-600 hover:text-[#FAA916] transition-colors"
            >
              Términos de Uso
            </Link>
            <span className="text-gray-400">•</span>
            <a 
              href="https://github.com/AllanDBB"
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm text-gray-600 hover:text-[#FAA916] transition-colors flex items-center gap-1"
            >
              <span>by</span>
              <span className="font-semibold">AllanDBB</span>
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;