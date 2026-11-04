import { Link } from "react-router";
export default function NoEncontradoPage() {
  return (
    <div className="container py-5 text-center">
      <p className="display-1 fw-bold">404</p>
      <h1 className="h3">Página no encontrada</h1>
      <p className="text-secondary">La ruta que buscas no existe.</p>
      <Link className="btn btn-primary" to="/">
        Volver al inicio
      </Link>
    </div>
  );
}
