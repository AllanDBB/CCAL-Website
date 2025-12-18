"use client";

import React from 'react';
import Image from 'next/image';

const PageLoader = () => {
  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-white">
      <div className="relative flex items-center justify-center">
        {/* Logo en el centro */}
        <div className="absolute inset-0 flex items-center justify-center z-10">
          <Image 
            src="/Logo.svg" 
            alt="CCAL Logo" 
            width={100} 
            height={70}
            className="w-24 h-auto object-contain"
            priority
          />
        </div>
        
        {/* Loader animado */}
        <div className="ccal-loader"></div>
      </div>
    </div>
  );
};

export default PageLoader;
