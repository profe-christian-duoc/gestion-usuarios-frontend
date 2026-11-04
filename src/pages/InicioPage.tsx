import { Link } from "react-router";

export default function InicioPage() {
  return (
    <>
      <section className="hero py-5">
        <div className="container py-4 py-md-5">
          <span className="eyebrow">SISTEMA DEMOSTRATIVO</span>
          <h1 className="display-5 fw-bold mt-3">
            Gestiona tus usuarios
            <br />
            de forma simple.
          </h1>
          <p className="lead text-white-50 mt-3 col-md-8 col-lg-6">
            Una aplicación creada con React 19 y TypeScript. Hoy utiliza
            almacenamiento local; en clase aprenderemos a conectarla con Spring
            Boot.
          </p>
          <Link to="/usuarios" className="btn btn-light btn-lg mt-3">
            Ver usuarios →
          </Link>
        </div>
      </section>
      <section className="container py-5">
        <div className="row g-4">
          <div className="col-md-4">
            <div className="card feature-card h-100">
              <div className="card-body p-4">
                <div className="feature-icon">01</div>
                <h2 className="h5 mt-3">Componentes</h2>
                <p className="text-secondary mb-0">
                  Una interfaz organizada en piezas reutilizables.
                </p>
              </div>
            </div>
          </div>
          <div className="col-md-4">
            <div className="card feature-card h-100">
              <div className="card-body p-4">
                <div className="feature-icon">02</div>
                <h2 className="h5 mt-3">Almacenamiento local</h2>
                <p className="text-secondary mb-0">
                  Los datos permanecen en este navegador con localStorage.
                </p>
              </div>
            </div>
          </div>
          <div className="col-md-4">
            <div className="card feature-card h-100">
              <div className="card-body p-4">
                <div className="feature-icon">03</div>
                <h2 className="h5 mt-3">Preparado para API</h2>
                <p className="text-secondary mb-0">
                  Un servicio separa los datos de los componentes.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
