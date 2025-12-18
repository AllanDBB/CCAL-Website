"use client";

import React from 'react';
import Image from 'next/image';

const PageLoader = () => {
  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-white" style={{ isolation: 'isolate' }}>
      <div className="relative flex flex-col items-center justify-center gap-6">
        {/* Logo en el centro */}
        <div className="relative z-10 animate-pulse">
          <Image 
            src="/Logo.svg" 
            alt="CCAL Logo" 
            width={120} 
            height={80}
            className="w-28 sm:w-32 h-auto object-contain"
            priority
            style={{ maxWidth: '100%', height: 'auto' }}
          />
        </div>
        
        {/* Loader animado */}
        <div className="flex gap-2">
          <div className="w-3 h-3 bg-[#0A2463] rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
          <div className="w-3 h-3 bg-[#FAA916] rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
          <div className="w-3 h-3 bg-[#0A2463] rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
        </div>
        
        {/* Texto de carga */}
        <p className="text-[#0A2463] font-semibold text-sm animate-pulse">Cargando...</p>
      </div>
    </div>
  );
};

export default PageLoader;
