import Image from "next/image";
import Link from "next/link";
import type { ComponentProps, ReactNode } from "react";
import type { ImageRef } from "@/content/types";

export function Container({ className = "", children }: { className?: string; children: ReactNode }) {
  return <div className={`mx-auto w-full max-w-[1320px] px-5 sm:px-8 ${className}`}>{children}</div>;
}

/** Etiqueta en monoespaciada, mayúsculas. */
export function Label({ children, className = "", light = false }: { children: ReactNode; className?: string; light?: boolean }) {
  return (
    <p className={`font-mono text-[12px] font-medium uppercase tracking-[0.08em] ${light ? "text-white/60" : "text-muted"} ${className}`}>
      {children}
    </p>
  );
}

export function AccentSquare({ className = "h-3 w-3" }: { className?: string }) {
  return <span className={`inline-block shrink-0 bg-accent ${className}`} aria-hidden="true" />;
}

type ButtonVariant = "ink" | "accent" | "outline" | "outline-light";

const buttonStyles: Record<ButtonVariant, string> = {
  ink: "bg-blue text-white hover:bg-blue-700",
  accent: "bg-accent text-ink hover:bg-white",
  outline: "border border-blue text-blue hover:bg-blue hover:text-white",
  "outline-light": "border border-white/40 text-white hover:border-white hover:bg-white hover:text-ink",
};

export function ButtonLink({
  variant = "ink",
  className = "",
  children,
  ...props
}: ComponentProps<typeof Link> & { variant?: ButtonVariant }) {
  return (
    <Link
      className={`inline-flex min-h-12 items-center justify-between gap-6 px-5 text-[15px] font-medium transition-colors ${buttonStyles[variant]} ${className}`}
      {...props}
    >
      {children}
    </Link>
  );
}

export function ArrowIcon({ className = "h-4 w-4" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 16 16" fill="none" aria-hidden="true">
      <path d="M2 8h11.5m-5-5 5 5-5 5" stroke="currentColor" strokeWidth="1.5" />
    </svg>
  );
}

/** Encabezado de sección suizo: índice + etiqueta a la izquierda, título grande a la derecha. */
export function SectionHeader({
  index,
  label,
  title,
  lead,
  action,
  light = false,
}: {
  index?: string;
  label: string;
  title: ReactNode;
  lead?: ReactNode;
  action?: ReactNode;
  light?: boolean;
}) {
  return (
    <div className={`grid gap-4 border-t pt-5 lg:grid-cols-12 ${light ? "border-white/25" : "border-line"}`}>
      <Label light={light} className="lg:col-span-3">
        {index && <span className={light ? "text-accent" : "text-ink"}>{index}</span>}
        {index && " — "}
        {label}
      </Label>
      <div className="lg:col-span-9">
        <h2 className={`text-3xl leading-[1.05] sm:text-4xl lg:text-5xl ${light ? "text-white" : "text-ink"}`}>{title}</h2>
        {lead && <p className={`mt-5 max-w-2xl text-lg leading-relaxed ${light ? "text-white/70" : "text-muted"}`}>{lead}</p>}
        {action && <div className="mt-6">{action}</div>}
      </div>
    </div>
  );
}

export function TextLink({ href, children, light = false }: { href: string; children: ReactNode; light?: boolean }) {
  return (
    <Link
      href={href}
      className={`group inline-flex items-center gap-2 border-b pb-1 text-[15px] font-medium transition-colors ${
        light ? "border-white/40 text-white hover:border-accent" : "border-blue text-blue hover:border-accent"
      }`}
    >
      {children}
      <ArrowIcon className="h-4 w-4 transition-transform group-hover:translate-x-1" />
    </Link>
  );
}

export function Photo({
  image,
  className = "",
  sizes,
  priority = false,
  caption,
}: {
  image: ImageRef;
  className?: string;
  sizes: string;
  priority?: boolean;
  caption?: string;
}) {
  return (
    <figure className={`group relative overflow-hidden bg-surface ${className}`}>
      <Image
        src={image.src}
        alt={image.alt}
        fill
        priority={priority}
        sizes={sizes}
        className="object-cover transition-transform duration-700 group-hover:scale-[1.03]"
      />
      {caption && (
        <figcaption className="absolute bottom-0 left-0 bg-white px-3 py-2 font-mono text-[11px] uppercase tracking-[0.08em] text-ink">
          {caption}
        </figcaption>
      )}
    </figure>
  );
}

export function PageHero({
  label,
  title,
  lead,
  aside,
  image,
  children,
}: {
  label: string;
  title: string;
  lead?: string;
  aside?: ReactNode;
  image?: ImageRef;
  children?: ReactNode;
}) {
  return (
    <section>
      <Container className="pt-12 pb-12 sm:pt-16 lg:pt-20 lg:pb-16">
        <Label className="flex items-center gap-3">
          <AccentSquare className="h-2.5 w-2.5" />
          {label}
        </Label>
        <div className="mt-8 grid gap-10 lg:grid-cols-12">
          <div className={aside ? "lg:col-span-8" : "lg:col-span-11"}>
            <h1 className="text-[2.5rem] leading-[1] tracking-[-0.04em] sm:text-6xl lg:text-7xl">{title}</h1>
          </div>
          {aside && <div className="lg:col-span-4 lg:self-end">{aside}</div>}
        </div>
        {(lead || children) && (
          <div className="mt-10 grid gap-8 lg:mt-12 lg:grid-cols-12">
            {lead && <p className="text-lg leading-relaxed text-muted lg:col-span-7 sm:text-xl">{lead}</p>}
            {children && <div className="lg:col-span-4 lg:col-start-9">{children}</div>}
          </div>
        )}
      </Container>
      {image && (
        <Container>
          <Photo image={image} priority sizes="(min-width: 1320px) 1256px, 100vw" className="aspect-[16/9] w-full sm:aspect-[21/9]" />
        </Container>
      )}
    </section>
  );
}
