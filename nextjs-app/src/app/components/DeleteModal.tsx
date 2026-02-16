'use client';

export default function DeleteModal({
  id,
  onConfirm,
  onCancel
}: {
  id: number;
  onConfirm: () => void;
  onCancel: () => void;
}) {
  return (
    <div style={overlay}>
      <div style={modal}>
        <h3>Confirmar eliminación</h3>
        <p>¿Eliminar solicitud #{id}?</p>

        <div style={{ marginTop: 15 }}>
          <button onClick={onConfirm} style={{ marginRight: 10 }}>
            Sí, eliminar
          </button>
          <button onClick={onCancel}>Cancelar</button>
        </div>
      </div>
    </div>
  );
}

const overlay: React.CSSProperties = {
  position: "fixed",
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  background: "rgba(0,0,0,0.4)",
  display: "flex",
  justifyContent: "center",
  alignItems: "center"
};

const modal: React.CSSProperties = {
  background: "white",
  padding: 20,
  borderRadius: 8,
  minWidth: 300
};