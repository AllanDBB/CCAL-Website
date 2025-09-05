import React from "react";
import Link from "next/link";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  href?: string;
  variant?: "primary" | "secondary";
  className?: string;
  animation?: "scale" | "shadow" | "rotate" | "none";
}

const Button = ({
  children,
  href,
  variant = "primary",
  className = "",
  animation = "scale",
  ...props
}: ButtonProps) => {
  const base =
    "inline-flex items-center justify-center rounded-full font-semibold px-6 py-2 transition-colors transition-transform duration-300 focus:outline-none";
  const variants = {
    primary: "bg-[#0A2463] text-white hover:bg-[#09204e]",
    secondary: "bg-[#FAA916] text-[#0A2463] hover:bg-[#ffb52e]",
  };
  const animations = {
    scale: "hover:-translate-y-1 hover:scale-105",
    shadow: "hover:shadow-xl",
    rotate: "hover:-rotate-3",
    none: "",
  };

  const classes = `${base} ${variants[variant]} ${animations[animation]} ${className}`;

  if (href) {
    return (
      <Link href={href} className={classes}>
        {children}
      </Link>
    );
  }

  return (
    <button className={classes} {...props}>
      {children}
    </button>
  );
};

export default Button;