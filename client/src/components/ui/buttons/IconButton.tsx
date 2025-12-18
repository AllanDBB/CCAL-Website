import React from "react";

interface IconButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  icon: React.ReactNode;
  "aria-label": string;
  className?: string;
}

const IconButton = ({
  icon,
  className = "",
  ...props
}: IconButtonProps) => (
  <button
    className={`inline-flex items-center justify-center rounded-full p-2 bg-[#FAA916] text-[#0A2463] hover:bg-[#0A2463] hover:text-white transition-colors focus:outline-none ${className}`}
    {...props}
  >
    {icon}
  </button>
);

export default IconButton;