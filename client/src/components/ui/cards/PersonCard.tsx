import React from 'react';
import Image from 'next/image';
import Link from 'next/link';

interface PersonCardProps {
  name: string;
  role: string;
  imageSrc: string;
  description?: string;
  email?: string;
  socialLinks?: {
    platform: string;
    url: string;
    icon: React.ReactNode;
  }[];
  link?: string;
}

const PersonCard = ({
  name,
  role,
  imageSrc,
  description,
  email,
  socialLinks,
  link
}: PersonCardProps) => {
  const CardContent = () => (
    <div className="bg-white rounded-xl shadow-md overflow-hidden text-center group">
      <div className="relative w-full h-64 overflow-hidden">
        <Image
          src={imageSrc}
          alt={name}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
        
        {socialLinks && (
          <div className="absolute bottom-0 left-0 right-0 flex justify-center gap-3 p-4 translate-y-full group-hover:translate-y-0 transition-transform duration-300">
            {socialLinks.map((link, index) => (
              <a
                key={index}
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-white rounded-full p-2 text-[#0A2463] hover:text-[#FAA916] transition-colors"
                aria-label={link.platform}
              >
                {link.icon}
              </a>
            ))}
          </div>
        )}
      </div>
      
      <div className="p-6">
        <h3 className="text-xl font-bold text-[#0A2463]">{name}</h3>
        <div className="text-[#FAA916] font-medium mb-2">{role}</div>
        
        {description && (
          <p className="text-gray-600 mt-3 mb-3">{description}</p>
        )}
        
        {email && (
          <a 
            href={`mailto:${email}`} 
            className="inline-flex items-center text-sm text-[#0A2463] hover:text-[#FAA916]"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" viewBox="0 0 20 20" fill="currentColor">
              <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
              <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
            </svg>
            {email}
          </a>
        )}
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

export default PersonCard;