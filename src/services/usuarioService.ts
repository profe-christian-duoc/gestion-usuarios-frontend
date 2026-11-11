import { usuariosIniciales } from "../data/usuariosIniciales";
import type { NuevoUsuario, Usuario } from "../types/Usuario";
import { api } from "../api/axiosConfig";

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
  async obtenerTodos(): Promise<Usuario[]> {
    const respuesta = await api.get<Usuario[]>("/usuarios");
    return respuesta.data;
  },

  async crear(datos: NuevoUsuario): Promise<void> {
    await api.post("/usuarios", datos);
  },

  eliminar(id: number): void {
    const usuarios = leerUsuarios();

    const actualizados = usuarios.filter((usuario) => usuario.id !== id);

    guardarUsuarios(actualizados);
  },
};
