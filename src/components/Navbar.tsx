import { NavLink } from "react-router";

export default function Navbar() {
  const claseEnlace = ({ isActive }: { isActive: boolean }) =>
    `nav-link px-3 ${isActive ? "active fw-semibold" : ""}`;

  return (
    <nav className="navbar navbar-expand-md navbar-dark navbar-custom">
      <div className="container">
        <NavLink className="navbar-brand fw-bold" to="/">
          ◈ UserManager
        </NavLink>
        <div
          className="d-flex flex-wrap gap-1 ms-auto"
          aria-label="Navegación principal"
        >
          <NavLink end to="/" className={claseEnlace}>
            Inicio
          </NavLink>
          <NavLink to="/usuarios" className={claseEnlace}>
            Usuarios
          </NavLink>
          <NavLink to="/acerca" className={claseEnlace}>
            Acerca de
          </NavLink>
        </div>
      </div>
    </nav>
  );
}
