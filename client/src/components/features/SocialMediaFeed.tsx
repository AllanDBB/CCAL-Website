"use client";

import React from 'react';

interface SocialMediaFeedProps {
  embedCode?: string;
}

const SocialMediaFeed: React.FC<SocialMediaFeedProps> = ({ embedCode }) => {
  // Si hay código de embed de SociableKit, lo renderizamos
  if (embedCode) {
    return (
      <div 
        className="sociablekit-feed"
        dangerouslySetInnerHTML={{ __html: embedCode }}
      />
    );
  }

  // Placeholder mientras se configura SociableKit
  return (
    <div className="text-center py-12">
      <div className="text-6xl mb-4 text-[#0A2463]">◉</div>
      <h3 className="text-2xl font-bold text-[#0A2463] mb-4">Feed de Redes Sociales</h3>
      <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
        Aquí se mostrará el feed de SociableKit con los últimos posts de Instagram, Facebook y más.
      </p>
      <div className="bg-gray-50 rounded-lg p-6 max-w-2xl mx-auto border border-gray-200">
        <p className="text-sm text-gray-700 mb-4">
          <strong>Pasos para configurar SociableKit:</strong>
        </p>
        <ol className="text-left text-sm text-gray-600 space-y-3 mb-6">
          <li className="flex items-start gap-2">
            <span className="font-bold text-[#FAA916] min-w-[20px]">1.</span>
            <span>Ve a <a href="https://www.sociablekit.com" target="_blank" rel="noopener noreferrer" className="text-[#0A2463] hover:text-[#FAA916] font-semibold underline">SociableKit.com</a> y crea una cuenta</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="font-bold text-[#FAA916] min-w-[20px]">2.</span>
            <span>Crea un widget de Instagram, Facebook o combinado</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="font-bold text-[#FAA916] min-w-[20px]">3.</span>
            <span>Copia el código de embed que te proporcionen</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="font-bold text-[#FAA916] min-w-[20px]">4.</span>
            <span>Pega el código en <code className="bg-gray-200 px-2 py-1 rounded text-xs">SocialMediaFeed.tsx</code></span>
          </li>
        </ol>
        <div className="bg-white rounded-lg p-4 border-2 border-dashed border-gray-300">
          <p className="text-xs text-gray-500 font-mono">
            {`<SocialMediaFeed embedCode="..." />`}
          </p>
        </div>
      </div>
    </div>
  );
};

export default SocialMediaFeed;
