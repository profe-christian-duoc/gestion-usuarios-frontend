export default function AcercaPage() {
  return (
    <div className="container py-5">
      <p className="section-label">SOBRE EL PROYECTO</p>
      <h1 className="h2 fw-bold">Acerca del sistema</h1>
      <p className="lead text-secondary mt-3">
        Aplicación para aprender a conectar un frontend React con una API REST
        (con Spring y Java).
      </p>
      <div className="card panel-card mt-4">
        <div className="card-body p-4">
          <h2 className="h5">Etapa 1: almacenamiento local</h2>
          <p>
            La información se guarda en <code>localStorage</code> mediante{" "}
            <code>usuarioService.ts</code>.
          </p>
          <h2 className="h5 mt-4">Etapa 2: Spring Boot + Axios</h2>
          <p className="mb-0">
            Durante la clase reemplazaremos las funciones del servicio por
            llamadas HTTP a <code>http://localhost:8080/usuarios</code>. El
            layout, las páginas y los componentes permanecerán iguales.
          </p>
        </div>
      </div>
    </div>
  );
}
