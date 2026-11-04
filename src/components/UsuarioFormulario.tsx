import { useState, type FormEvent } from "react";
import type { NuevoUsuario, TipoUsuario } from "../types/Usuario";

interface Props {
  onGuardar: (usuario: NuevoUsuario) => Promise<void>;
}

export default function UsuarioFormulario({ onGuardar }: Props) {
  const [nombre, setNombre] = useState("");
  const [apellido, setApellido] = useState("");
  const [edad, setEdad] = useState("");
  const [tipo, setTipo] = useState<TipoUsuario>("regular");
  const [guardando, setGuardando] = useState(false);

  async function manejarEnvio(evento: FormEvent<HTMLFormElement>) {
    evento.preventDefault();
    const edadNumero = Number(edad);
    if (
      !nombre.trim() ||
      !apellido.trim() ||
      !Number.isInteger(edadNumero) ||
      edadNumero < 1 ||
      edadNumero > 120
    )
      return;
    setGuardando(true);
    try {
      await onGuardar({
        nombre: nombre.trim(),
        apellido: apellido.trim(),
        edad: edadNumero,
        tipo,
      });
      setNombre("");
      setApellido("");
      setEdad("");
      setTipo("regular");
    } finally {
      setGuardando(false);
    }
  }

  return (
    <form
      onSubmit={(evento) => {
        void manejarEnvio(evento);
      }}
    >
      <div className="row g-3">
        <div className="col-md-6">
          <label htmlFor="nombre" className="form-label">
            Nombre
          </label>
          <input
            id="nombre"
            className="form-control"
            required
            maxLength={70}
            value={nombre}
            onChange={(e) => setNombre(e.target.value)}
          />
        </div>
        <div className="col-md-6">
          <label htmlFor="apellido" className="form-label">
            Apellido
          </label>
          <input
            id="apellido"
            className="form-control"
            required
            maxLength={70}
            value={apellido}
            onChange={(e) => setApellido(e.target.value)}
          />
        </div>
        <div className="col-md-6">
          <label htmlFor="edad" className="form-label">
            Edad
          </label>
          <input
            id="edad"
            type="number"
            min={1}
            max={120}
            step={1}
            className="form-control"
            required
            value={edad}
            onChange={(e) => setEdad(e.target.value)}
          />
        </div>
        <div className="col-md-6">
          <label htmlFor="tipo" className="form-label">
            Tipo de usuario
          </label>
          <select
            id="tipo"
            className="form-select"
            value={tipo}
            onChange={(e) => setTipo(e.target.value as TipoUsuario)}
          >
            <option value="regular">Regular</option>
            <option value="vip">VIP</option>
          </select>
        </div>
      </div>
      <div className="d-flex justify-content-end mt-4">
        <button
          disabled={guardando}
          className="btn btn-primary px-4"
          type="submit"
        >
          {guardando ? "Guardando..." : "Guardar usuario"}
        </button>
      </div>
    </form>
  );
}
