"use client";

import React, { useState } from 'react';

interface PhotoGridProps {
  images: {
    src: string;
    alt: string;
    title?: string;
  }[];
  columns?: 2 | 3 | 4;
}

export default function PhotoGrid({ images, columns = 3 }: PhotoGridProps) {
  const [selectedImage, setSelectedImage] = useState<number | null>(null);

  const gridCols = {
    2: 'md:grid-cols-2',
    3: 'md:grid-cols-2 lg:grid-cols-3',
    4: 'md:grid-cols-2 lg:grid-cols-4'
  };

  return (
    <>
      <div className={`grid grid-cols-1 ${gridCols[columns]} gap-6`}>
        {images.map((image, index) => (
          <div
            key={index}
            className="group relative overflow-hidden rounded-xl shadow-lg cursor-pointer transform transition-all duration-300 hover:scale-105 hover:shadow-2xl"
            onClick={() => setSelectedImage(index)}
          >
            <div 
              className="w-full h-64 bg-cover bg-center transition-transform duration-500 group-hover:scale-110"
              style={{ backgroundImage: `url(${image.src})` }}
              role="img"
              aria-label={image.alt}
            />
            {/* Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              <div className="absolute bottom-0 left-0 right-0 p-4">
                {image.title && (
                  <h3 className="text-white font-semibold text-lg">
                    {image.title}
                  </h3>
                )}
              </div>
            </div>
            {/* Zoom icon */}
            <div className="absolute top-4 right-4 bg-white/20 backdrop-blur-sm p-2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v6m3-3H7" />
              </svg>
            </div>
          </div>
        ))}
      </div>

      {/* Modal/Lightbox */}
      {selectedImage !== null && (
        <div
          className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4"
          onClick={() => setSelectedImage(null)}
        >
          <button
            className="absolute top-4 right-4 text-white hover:text-gray-300 transition-colors"
            onClick={() => setSelectedImage(null)}
            aria-label="Close"
          >
            <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>

          <button
            className="absolute left-4 top-1/2 -translate-y-1/2 text-white hover:text-gray-300 transition-colors disabled:opacity-30"
            onClick={(e) => {
              e.stopPropagation();
              setSelectedImage(prev => (prev! > 0 ? prev! - 1 : images.length - 1));
            }}
            aria-label="Previous image"
          >
            <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>

          <div className="max-w-5xl max-h-[90vh] relative" onClick={(e) => e.stopPropagation()}>
            <div 
              className="w-full h-full bg-cover bg-center rounded-lg"
              style={{ 
                backgroundImage: `url(${images[selectedImage].src})`,
                minHeight: '400px',
                maxHeight: '80vh'
              }}
              role="img"
              aria-label={images[selectedImage].alt}
            />
            {images[selectedImage].title && (
              <div className="mt-4 text-center">
                <p className="text-white text-xl font-semibold">
                  {images[selectedImage].title}
                </p>
              </div>
            )}
            <div className="text-center text-white/70 mt-2">
              {selectedImage + 1} / {images.length}
            </div>
          </div>

          <button
            className="absolute right-4 top-1/2 -translate-y-1/2 text-white hover:text-gray-300 transition-colors disabled:opacity-30"
            onClick={(e) => {
              e.stopPropagation();
              setSelectedImage(prev => (prev! < images.length - 1 ? prev! + 1 : 0));
            }}
            aria-label="Next image"
          >
            <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>
      )}
    </>
  );
}
