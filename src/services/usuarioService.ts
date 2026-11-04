import { usuariosIniciales } from "../data/usuariosIniciales";
import type { NuevoUsuario, Usuario } from "../types/Usuario";

const CLAVE_STORAGE = "gestion-usuarios";

// Guardar usuarios en localStorage
function guardarUsuarios(usuarios: Usuario[]): void {
  localStorage.setItem(CLAVE_STORAGE, JSON.stringify(usuarios));
}

// Obtener usuarios desde localStorage
function leerUsuarios(): Usuario[] {
  const guardados = localStorage.getItem(CLAVE_STORAGE);

  // Si todavía no existen datos, cargar usuarios iniciales
  if (guardados === null) {
    guardarUsuarios(usuariosIniciales);
    return [...usuariosIniciales];
  }

  try {
    return JSON.parse(guardados) as Usuario[];
  } catch {
    guardarUsuarios(usuariosIniciales);
    return [...usuariosIniciales];
  }
}

// Servicio de usuarios
export const usuarioService = {
  obtenerTodos(): Usuario[] {
    return leerUsuarios();
  },

  crear(datos: NuevoUsuario): void {
    const usuarios = leerUsuarios();

    const nuevo: Usuario = {
      ...datos,
      id: Math.max(0, ...usuarios.map((u) => u.id)) + 1,
    };

    guardarUsuarios([...usuarios, nuevo]);
  },

  eliminar(id: number): void {
    const usuarios = leerUsuarios();

    const actualizados = usuarios.filter((usuario) => usuario.id !== id);

    guardarUsuarios(actualizados);
  },
};
