import Link from "next/link";
import type { ComponentProps, ReactNode } from "react";

export function Container({ className = "", children }: { className?: string; children: ReactNode }) {
  return <div className={`mx-auto w-full max-w-6xl px-4 sm:px-6 lg:px-8 ${className}`}>{children}</div>;
}

type ButtonVariant = "gold" | "navy" | "outline" | "outline-light";

const buttonStyles: Record<ButtonVariant, string> = {
  gold: "bg-gold-500 text-navy-950 hover:bg-gold-200",
  navy: "bg-navy-900 text-white hover:bg-navy-800",
  outline: "border border-navy-900/25 text-navy-900 hover:border-navy-900 hover:bg-navy-50",
  "outline-light": "border border-white/35 text-white hover:border-white hover:bg-white/10",
};

export function ButtonLink({
  variant = "navy",
  className = "",
  children,
  ...props
}: ComponentProps<typeof Link> & { variant?: ButtonVariant }) {
  return (
    <Link
      className={`inline-flex min-h-11 items-center justify-center gap-2 rounded-full px-6 text-[15px] font-semibold transition-colors ${buttonStyles[variant]} ${className}`}
      {...props}
    >
      {children}
    </Link>
  );
}

export function Eyebrow({ children, light = false }: { children: ReactNode; light?: boolean }) {
  return (
    <p
      className={`mb-4 text-xs font-semibold uppercase tracking-[0.18em] ${light ? "text-gold-500" : "text-gold-600"}`}
    >
      {children}
    </p>
  );
}

export function SectionHeading({
  eyebrow,
  title,
  lead,
  light = false,
  className = "",
}: {
  eyebrow?: string;
  title: ReactNode;
  lead?: ReactNode;
  light?: boolean;
  className?: string;
}) {
  return (
    <div className={`max-w-2xl ${className}`}>
      {eyebrow && <Eyebrow light={light}>{eyebrow}</Eyebrow>}
      <h2 className={`text-3xl leading-tight sm:text-4xl ${light ? "text-white" : "text-navy-950"}`}>{title}</h2>
      {lead && (
        <p className={`mt-4 text-lg leading-relaxed ${light ? "text-navy-100" : "text-muted"}`}>{lead}</p>
      )}
    </div>
  );
}

export function ArrowIcon({ className = "h-4 w-4" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 16 16" fill="none" aria-hidden="true">
      <path d="M3 8h10m-4-4 4 4-4 4" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export function PageHero({
  eyebrow,
  title,
  lead,
  aside,
  children,
}: {
  eyebrow?: string;
  title: string;
  lead?: string;
  aside?: ReactNode;
  children?: ReactNode;
}) {
  return (
    <section className="border-b border-line bg-paper">
      <Container className="grid items-end gap-10 pt-14 pb-12 sm:pt-20 sm:pb-16 lg:grid-cols-12">
        <div className={aside ? "lg:col-span-8" : "lg:col-span-12"}>
          {eyebrow && <Eyebrow>{eyebrow}</Eyebrow>}
          <h1 className="max-w-3xl text-4xl leading-[1.08] text-navy-950 sm:text-5xl lg:text-6xl">{title}</h1>
          {lead && <p className="mt-6 max-w-2xl text-lg leading-relaxed text-muted sm:text-xl">{lead}</p>}
          {children}
        </div>
        {aside && <div className="lg:col-span-4">{aside}</div>}
      </Container>
    </section>
  );
}
