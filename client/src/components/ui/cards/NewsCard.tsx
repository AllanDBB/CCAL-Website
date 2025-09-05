import React from 'react';
import Link from 'next/link';
import Image from 'next/image';

interface NewsCardProps {
  title: string;
  excerpt: string;
  imageSrc: string;
  imageAlt?: string;
  date: string;
  category?: string;
  link: string;
}

const NewsCard = ({
  title,
  excerpt,
  imageSrc,
  imageAlt = "",
  date,
  category,
  link
}: NewsCardProps) => {
  return (
    <Link href={link} className="block hover:-translate-y-1 transition-transform duration-300">
      <div className="bg-white rounded-xl shadow-md overflow-hidden">
        <div className="relative w-full h-48">
          <Image
            src={imageSrc}
            alt={imageAlt || title}
            fill
            className="object-cover"
          />
          {category && (
            <span className="absolute top-4 right-4 bg-[#FAA916] text-[#0A2463] text-xs font-semibold px-3 py-1 rounded-full">
              {category}
            </span>
          )}
        </div>
        <div className="p-6">
          <div className="text-sm text-gray-500 mb-2">{date}</div>
          <h3 className="text-xl font-bold text-[#0A2463] mb-2 line-clamp-2">{title}</h3>
          <p className="text-gray-600 line-clamp-3">{excerpt}</p>
          <div className="mt-4 inline-flex items-center text-[#0A2463] font-medium">
            Leer más
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
            </svg>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default NewsCard;