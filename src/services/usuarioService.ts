import { usuariosIniciales } from "../data/usuariosIniciales";
import type { NuevoUsuario, Usuario } from "../types/Usuario";

const CLAVE_STORAGE = "gestion-usuarios-v1";

function guardarUsuarios(usuarios: Usuario[]): void {
  localStorage.setItem(CLAVE_STORAGE, JSON.stringify(usuarios));
}

function leerUsuarios(): Usuario[] {
  const guardados = localStorage.getItem(CLAVE_STORAGE);
  if (guardados === null) {
    guardarUsuarios(usuariosIniciales);
    return [...usuariosIniciales];
  }
  // El fallback evita que datos locales corruptos rompan toda la interfaz.
  try {
    const resultado: unknown = JSON.parse(guardados);
    if (!Array.isArray(resultado)) throw new Error("Formato inválido");
    return resultado as Usuario[];
  } catch {
    guardarUsuarios(usuariosIniciales);
    return [...usuariosIniciales];
  }
}

// API asíncrona intencional: mantiene el mismo contrato al pasar a Axios.
export const usuarioService = {
  async obtenerTodos(): Promise<Usuario[]> {
    return leerUsuarios();
  },

  async crear(datos: NuevoUsuario): Promise<Usuario> {
    const usuarios = leerUsuarios();
    const nuevo: Usuario = {
      ...datos,
      id: Math.max(0, ...usuarios.map((usuario) => usuario.id)) + 1,
    };
    guardarUsuarios([...usuarios, nuevo]);
    return nuevo;
  },

  async eliminar(id: number): Promise<void> {
    guardarUsuarios(leerUsuarios().filter((usuario) => usuario.id !== id));
  },
};
