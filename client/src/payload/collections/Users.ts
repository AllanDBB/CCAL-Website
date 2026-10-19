import type { CollectionConfig } from "payload";
import { allow, allowField, hasRole, roles } from "../access";

export const Users: CollectionConfig = {
  slug: "users",
  labels: { singular: "Usuario", plural: "Usuarios" },
  admin: {
    useAsTitle: "name",
    defaultColumns: ["name", "email", "role"],
    group: "Configuración",
    description: "Personas con acceso al panel. Solo el administrador puede crear usuarios o cambiar roles.",
  },
  auth: {
    maxLoginAttempts: 5,
    lockTime: 15 * 60 * 1000,
  },
  access: {
    create: allow(),
    delete: allow(),
    read: ({ req }) => (hasRole(req) ? true : req.user ? { id: { equals: req.user.id } } : false),
    update: ({ req }) => (hasRole(req) ? true : req.user ? { id: { equals: req.user.id } } : false),
  },
  fields: [
    { name: "name", label: "Nombre", type: "text", required: true },
    {
      name: "role",
      label: "Rol",
      type: "select",
      required: true,
      defaultValue: "docente",
      options: roles.map((r) => ({ ...r })),
      saveToJWT: true,
      access: { create: allowField(), update: allowField() },
      admin: {
        description:
          "Dirección: todo el contenido. Comunicación: noticias y fotos. Admisiones: proceso de admisión. Docente: noticias en borrador.",
      },
    },
  ],
};
