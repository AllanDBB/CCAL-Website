import React from 'react';
import Link from 'next/link';
import Image from 'next/image';

interface CardProps {
  title: string;
  description?: string;
  imageSrc?: string;
  imageAlt?: string;
  link?: string;
  className?: string;
  children?: React.ReactNode;
  imageClassName?: string;
}

const Card = ({
  title,
  description,
  imageSrc,
  imageAlt = "",
  link,
  className = "",
  children,
  imageClassName = ""
}: CardProps) => {
  const CardContent = () => (
    <div className={`bg-white rounded-xl shadow-md overflow-hidden transition-all duration-300 hover:shadow-lg ${className}`}>
      {imageSrc && (
        <div className="relative w-full h-48">
          <Image
            src={imageSrc}
            alt={imageAlt}
            fill
            className={`object-cover ${imageClassName}`}
          />
        </div>
      )}
      <div className="p-6">
        <h3 className="text-xl font-bold text-[#0A2463] mb-2">{title}</h3>
        {description && (
          <p className="text-gray-600 mb-4">{description}</p>
        )}
        {children}
      </div>
    </div>
  );

  if (link) {
    return (
      <Link href={link} className="block hover:-translate-y-1 transition-transform duration-300">
        <CardContent />
      </Link>
    );
  }

  return <CardContent />;
};

export default Card;