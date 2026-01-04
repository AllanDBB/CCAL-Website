import { Button } from "@/components/ui/buttons";

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-gray-50 to-gray-100">
      <div className="max-w-2xl mx-auto px-4 py-16 text-center">
        <div className="mb-8">
          <h1 className="text-9xl font-bold text-primary-600 mb-4">404</h1>
          <h2 className="text-3xl md:text-4xl font-semibold text-gray-800 mb-4">
            Página no encontrada
          </h2>
          <p className="text-lg text-gray-600 mb-8">
            Lo sentimos, la página que estás buscando no existe o ha sido movida.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <Button href="/" variant="primary" className="px-8 py-3 text-lg">
            Volver al inicio
          </Button>
          <Button href="/contacto" variant="secondary" className="px-8 py-3 text-lg">
            Contáctanos
          </Button>
        </div>

        <div className="mt-12 text-sm text-gray-500">
          <p>Si crees que esto es un error, por favor contáctanos.</p>
        </div>
      </div>
    </div>
  );
}
