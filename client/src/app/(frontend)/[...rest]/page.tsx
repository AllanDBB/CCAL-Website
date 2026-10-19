import { notFound } from "next/navigation";

// Con dos layouts raíz (sitio y panel), las URL desconocidas del sitio
// necesitan esta ruta para mostrar la página 404 con el diseño del sitio.
export default function CatchAll() {
  notFound();
}
