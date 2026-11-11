import { useState, type SubmitEvent } from "react";
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
  const [errorGuardado, setErrorGuardado] = useState("");

  async function manejarEnvio(evento: SubmitEvent<HTMLFormElement>) {
    evento.preventDefault();
    if (guardando) return;
    const edadNumero = Number(edad);

    if (
      !nombre.trim() ||
      !apellido.trim() ||
      !Number.isInteger(edadNumero) ||
      edadNumero < 1 ||
      edadNumero > 120
    ) {
      return;
    }

    setGuardando(true);
    setErrorGuardado("");

    try {
      onGuardar({
        nombre: nombre.trim(),
        apellido: apellido.trim(),
        edad: edadNumero,
        tipo,
      });

      setNombre("");
      setApellido("");
      setEdad("");
      setTipo("regular");
    } catch (error) {
      console.error("Error al guardar usuario:", error);
      setErrorGuardado(
        "No se pudo registrar el usuario. Inténtalo nuevamente.",
      );
    } finally {
      setGuardando(false);
    }
  }

  return (
    <form onSubmit={manejarEnvio}>
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
        {errorGuardado && (
          <div className="alert alert-danger mt-3" role="alert">
            {errorGuardado}
          </div>
        )}
        <button
          type="submit"
          className="btn btn-primary px-4"
          disabled={guardando}
        >
          {guardando ? "Guardando..." : "Guardar usuario"}
        </button>
      </div>
    </form>
  );
}
