import type { TipoUsuario } from "../types/Usuario";

interface Props {
  tipo: TipoUsuario;
}

export default function UsuarioBadge({ tipo }: Props) {
  return (
    <span
      className={`badge rounded-pill ${tipo === "vip" ? "text-bg-warning" : "text-bg-secondary"}`}
    >
      {tipo === "vip" ? "★ VIP" : "Regular"}
    </span>
  );
}
