import type { Access, FieldAccess, PayloadRequest } from "payload";

export const roles = [
  { label: "Administrador", value: "admin" },
  { label: "Dirección", value: "direccion" },
  { label: "Comunicación", value: "comunicacion" },
  { label: "Admisiones", value: "admisiones" },
  { label: "Docente", value: "docente" },
] as const;

export type Role = (typeof roles)[number]["value"];

type UserWithRole = { role?: Role | null };

export function hasRole(req: PayloadRequest, ...allowed: Role[]) {
  const role = (req.user as UserWithRole | null)?.role;
  return Boolean(role && (role === "admin" || allowed.includes(role)));
}

/** Acceso para quien tenga alguno de los roles (el administrador siempre puede). */
export const allow =
  (...allowed: Role[]): Access =>
  ({ req }) =>
    hasRole(req, ...allowed);

export const allowField =
  (...allowed: Role[]): FieldAccess =>
  ({ req }) =>
    hasRole(req, ...allowed);

export const loggedIn: Access = ({ req }) => Boolean(req.user);

export const anyone: Access = () => true;
