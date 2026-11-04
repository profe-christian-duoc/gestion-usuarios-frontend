export type TipoUsuario = "vip" | "regular";

export interface Usuario {
  id: number;
  nombre: string;
  apellido: string;
  edad: number;
  tipo: TipoUsuario;
}

export type NuevoUsuario = Omit<Usuario, "id">;
