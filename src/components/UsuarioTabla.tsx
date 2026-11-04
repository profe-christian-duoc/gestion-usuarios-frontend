import type { Usuario } from "../types/Usuario";
import UsuarioBadge from "./UsuarioBadge";

interface Props {
  usuarios: Usuario[];
  onEliminar: (id: number) => void;
}

export default function UsuarioTabla({ usuarios, onEliminar }: Props) {
  if (usuarios.length === 0)
    return (
      <div className="alert alert-light border">
        No hay usuarios para mostrar.
      </div>
    );
  return (
    <div className="table-responsive">
      <table className="table table-hover align-middle mb-0">
        <thead className="table-light">
          <tr>
            <th scope="col">ID</th>
            <th scope="col">Nombre</th>
            <th scope="col">Apellido</th>
            <th scope="col">Edad</th>
            <th scope="col">Tipo</th>
            <th scope="col" className="text-end">
              Acciones
            </th>
          </tr>
        </thead>
        <tbody>
          {usuarios.map((usuario) => (
            <tr key={usuario.id}>
              <td className="text-secondary">#{usuario.id}</td>
              <td className="fw-semibold">{usuario.nombre}</td>
              <td>{usuario.apellido}</td>
              <td>{usuario.edad}</td>
              <td>
                <UsuarioBadge tipo={usuario.tipo} />
              </td>
              <td className="text-end">
                <button
                  className="btn btn-sm btn-outline-danger"
                  type="button"
                  onClick={() => onEliminar(usuario.id)}
                  aria-label={`Eliminar a ${usuario.nombre} ${usuario.apellido}`}
                >
                  Eliminar
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
