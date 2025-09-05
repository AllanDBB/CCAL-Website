import React from 'react';
import Link from 'next/link';

interface FeatureCardProps {
  title: string;
  description: string;
  icon?: React.ReactNode;
  link?: string;
  accentColor?: string;
}

const FeatureCard = ({
  title,
  description,
  icon,
  link,
  accentColor = "#FAA916"
}: FeatureCardProps) => {
  const CardContent = () => (
    <div className="bg-white rounded-xl shadow-md overflow-hidden p-6 h-full border-t-4" style={{ borderTopColor: accentColor }}>
      {icon && (
        <div className="mb-4 text-3xl" style={{ color: accentColor }}>
          {icon}
        </div>
      )}
      <h3 className="text-xl font-bold text-[#0A2463] mb-3">{title}</h3>
      <p className="text-gray-600">{description}</p>
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

export default FeatureCard;