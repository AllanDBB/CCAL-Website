import React from "react";
import Link from "next/link";

interface OutlineButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  href?: string;
  className?: string;
}

const OutlineButton = ({
  children,
  href,
  className = "",
  ...props
}: OutlineButtonProps) => {
  const base =
    "inline-flex items-center justify-center rounded-full font-semibold px-6 py-2 border-2 border-[#0A2463] text-[#0A2463] bg-white hover:bg-[#0A2463] hover:text-white transition-colors focus:outline-none";

  if (href) {
    return (
      <Link href={href} className={`${base} ${className}`}>
        {children}
      </Link>
    );
  }

  return (
    <button className={`${base} ${className}`} {...props}>
      {children}
    </button>
  );
};

export default OutlineButton;