import { ButtonLink, Container } from "@/components/site/ui";

export default function NotFound() {
  return (
    <Container className="flex min-h-[60vh] flex-col items-start justify-center py-24">
      <p className="font-serif text-7xl text-gold-600">404</p>
      <h1 className="mt-4 text-4xl text-navy-950 sm:text-5xl">No encontramos esta página</h1>
      <p className="mt-4 max-w-xl text-lg text-muted">Es posible que la dirección haya cambiado o que la página ya no exista.</p>
      <div className="mt-8 flex flex-wrap gap-3">
        <ButtonLink href="/" variant="navy">
          Ir al inicio
        </ButtonLink>
        <ButtonLink href="/admisiones" variant="outline">
          Admisiones
        </ButtonLink>
      </div>
    </Container>
  );
}
