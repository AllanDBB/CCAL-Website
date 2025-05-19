"use client";

import React from 'react';
import Link from 'next/link';
import { socialMedia, legalLinks } from '@/lib/menuConfig';

const Footer = () => {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="mx-auto mt-16 mb-6 max-w-[95%] md:max-w-[94%] lg:max-w-[92%] rounded-xl bg-white shadow-lg">
      <div className="px-6 py-8 md:px-10">
        {/* Top section with logo and social links */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-6 pb-6 border-b border-gray-200">
          {/* Logo on the left */}
          <Link href="/">
            <div className="flex items-center cursor-pointer">
              <span className="text-xl font-bold text-[#0A2463]">
                CCAL<span className="text-[#FAA916]">.</span>
              </span>
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
                className="text-[#0A2463] hover:text-[#FAA916] transition-colors"
              >
                {platform.icon}
              </a>
            ))}
          </div>
        </div>
        
        {/* Bottom section with copyright and links */}
        <div className="pt-6 flex flex-col md:flex-row justify-between items-center">
          <div className="text-sm text-gray-600 mb-4 md:mb-0">
            © {currentYear} Colegio Científico Sede Alajuela.
          </div>
          <div className="flex flex-wrap justify-center gap-x-6">
            {legalLinks.map((link, index) => (
              <Link 
                key={index}
                href={link.link} 
                className="text-sm text-gray-600 hover:text-[#FAA916] transition-colors"
              >
                {link.title}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;