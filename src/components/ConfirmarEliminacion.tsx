interface Props {
  nombreUsuario: string;
  onConfirmar: () => void;
  onCancelar: () => void;
}

export default function ConfirmarEliminacion({
  nombreUsuario,
  onConfirmar,
  onCancelar,
}: Props) {
  return (
    <div
      className="modal d-block"
      tabIndex={-1}
      role="dialog"
      aria-modal="true"
      aria-labelledby="titulo-confirmacion"
      style={{ backgroundColor: "rgba(0,0,0,0.5)" }}
    >
      <div className="modal-dialog modal-dialog-centered">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title" id="titulo-confirmacion">
              Confirmar eliminación
            </h5>

            <button
              type="button"
              className="btn-close"
              aria-label="Cerrar"
              onClick={onCancelar}
            />
          </div>

          <div className="modal-body">
            <p className="mb-0">
              ¿Estás seguro de que deseas eliminar a{" "}
              <strong>{nombreUsuario}</strong>?
            </p>
            <p className="text-danger small mt-2 mb-0">
              Esta acción no se puede deshacer.
            </p>
          </div>

          <div className="modal-footer">
            <button
              type="button"
              className="btn btn-secondary"
              onClick={onCancelar}
            >
              Cancelar
            </button>

            <button
              type="button"
              className="btn btn-danger"
              onClick={onConfirmar}
            >
              Sí, eliminar
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
