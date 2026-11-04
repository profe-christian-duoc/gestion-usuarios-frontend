import { useEffect, useState } from "react";
import UsuarioFormulario from "../components/UsuarioFormulario";
import UsuarioTabla from "../components/UsuarioTabla";
import { usuarioService } from "../services/usuarioService";
import type { NuevoUsuario, Usuario } from "../types/Usuario";

export default function UsuariosPage() {
  const [usuarios, setUsuarios] = useState<Usuario[]>([]);
  const [busqueda, setBusqueda] = useState("");
  const [filtroTipo, setFiltroTipo] = useState("todos");
  const [mostrarFormulario, setMostrarFormulario] = useState(false);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState("");

  async function cargarUsuarios() {
    try {
      setError("");
      const datos = await usuarioService.obtenerTodos();
      setUsuarios(datos);
    } catch {
      setError("No se pudieron cargar los usuarios.");
    } finally {
      setCargando(false);
    }
  }

  useEffect(() => {
    void cargarUsuarios();
  }, []);

  async function guardarUsuario(nuevo: NuevoUsuario) {
    try {
      setError("");
      await usuarioService.crear(nuevo);
      await cargarUsuarios();
      setMostrarFormulario(false);
    } catch {
      setError("No se pudo guardar el usuario.");
      throw new Error("No se pudo guardar el usuario.");
    }
  }

  async function eliminarUsuario(id: number) {
    if (!window.confirm("¿Deseas eliminar este usuario?")) return;
    try {
      setError("");
      await usuarioService.eliminar(id);
      await cargarUsuarios();
    } catch {
      setError("No se pudo eliminar el usuario.");
    }
  }

  const filtrados = usuarios.filter((usuario) => {
    const nombreCompleto =
      `${usuario.nombre} ${usuario.apellido}`.toLowerCase();
    return (
      nombreCompleto.includes(busqueda.toLowerCase()) &&
      (filtroTipo === "todos" || usuario.tipo === filtroTipo)
    );
  });
  const cantidadVip = usuarios.filter(
    (usuario) => usuario.tipo === "vip",
  ).length;

  return (
    <div className="container py-5">
      <div className="d-flex flex-wrap align-items-center justify-content-between gap-3 mb-4">
        <div>
          <p className="section-label mb-1">ADMINISTRACIÓN</p>
          <h1 className="h2 fw-bold mb-1">Gestión de usuarios</h1>
          <p className="text-secondary mb-0">
            Consulta, busca y administra registros locales.
          </p>
        </div>
        <button
          type="button"
          className="btn btn-primary"
          onClick={() => setMostrarFormulario((valor) => !valor)}
        >
          {mostrarFormulario ? "Cerrar formulario" : "+ Nuevo usuario"}
        </button>
      </div>
      <div className="row g-3 mb-4">
        <div className="col-sm-6">
          <div className="stat-card p-4">
            <p className="text-secondary small mb-1">Usuarios registrados</p>
            <span className="stat-number">{usuarios.length}</span>
          </div>
        </div>
        <div className="col-sm-6">
          <div className="stat-card p-4">
            <p className="text-secondary small mb-1">Usuarios VIP</p>
            <span className="stat-number">{cantidadVip}</span>
          </div>
        </div>
      </div>
      {error && (
        <div role="alert" className="alert alert-danger">
          {error}
        </div>
      )}
      {mostrarFormulario && (
        <section className="card panel-card mb-4">
          <div className="card-body p-4">
            <h2 className="h5 fw-bold mb-3">Registrar usuario</h2>
            <UsuarioFormulario onGuardar={guardarUsuario} />
          </div>
        </section>
      )}
      <section className="card panel-card">
        <div className="card-body p-4">
          <div className="d-flex flex-wrap justify-content-between align-items-center gap-2 mb-3">
            <h2 className="h5 fw-bold mb-0">Listado de usuarios</h2>
            <span className="text-secondary small">
              {filtrados.length} resultados
            </span>
          </div>
          <div className="row g-2 mb-4">
            <div className="col-md-8">
              <label htmlFor="busqueda" className="visually-hidden">
                Buscar por nombre o apellido
              </label>
              <input
                id="busqueda"
                className="form-control"
                placeholder="Buscar por nombre o apellido..."
                value={busqueda}
                onChange={(e) => setBusqueda(e.target.value)}
              />
            </div>
            <div className="col-md-4">
              <label htmlFor="filtro-tipo" className="visually-hidden">
                Filtrar tipo
              </label>
              <select
                id="filtro-tipo"
                className="form-select"
                value={filtroTipo}
                onChange={(e) => setFiltroTipo(e.target.value)}
              >
                <option value="todos">Todos los tipos</option>
                <option value="vip">VIP</option>
                <option value="regular">Regular</option>
              </select>
            </div>
          </div>
          {cargando ? (
            <p role="status">Cargando usuarios...</p>
          ) : (
            <UsuarioTabla
              usuarios={filtrados}
              onEliminar={(id) => {
                void eliminarUsuario(id);
              }}
            />
          )}
        </div>
      </section>
      <p className="small text-secondary mt-3 mb-0">
        Modo actual: almacenamiento local del navegador. No requiere iniciar
        Spring Boot.
      </p>
    </div>
  );
}
