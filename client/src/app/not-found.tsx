import { ArrowIcon, ButtonLink, Container, Label } from "@/components/site/ui";

export default function NotFound() {
  return (
    <Container className="flex min-h-[70vh] flex-col justify-center py-24">
      <Label>Error 404</Label>
      <h1 className="mt-6 text-[clamp(3rem,10vw,9rem)] leading-[0.9] tracking-[-0.055em]">
        Página no
        <br />
        encontrada<span className="text-accent">.</span>
      </h1>
      <div className="mt-12 flex flex-wrap gap-3 border-t border-line pt-8">
        <ButtonLink href="/" variant="ink" className="min-w-56">
          Ir al inicio <ArrowIcon />
        </ButtonLink>
        <ButtonLink href="/admisiones" variant="outline" className="min-w-56">
          Admisiones <ArrowIcon />
        </ButtonLink>
      </div>
    </Container>
  );
}
