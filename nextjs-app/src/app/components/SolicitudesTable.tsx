'use client';

import { useState } from "react";
import { useRouter } from "next/navigation";
import dynamic from "next/dynamic";

const DeleteModal = dynamic(() => import("./DeleteModal"), {
  ssr: false
});

type Solicitud = {
  idSolicitud: number;
  dni: string;
  nombre: string;
  email: string;
  estado: string;
};

export default function SolicitudesTable({
  solicitudes
}: {
  solicitudes: Solicitud[];
}) {
  const [selectedId, setSelectedId] = useState<number | null>(null);
  const router = useRouter();

  const handleDelete = async () => {
    if (!selectedId) return;

    await fetch(`http://localhost:6060/solicitudes/${selectedId}`, {
      method: "DELETE"
    });

    setSelectedId(null);
    router.refresh();
  };

  return (
    <>
      <table style={{ marginTop: 10 }}>
        <thead>
          <tr>
            <th>ID</th>
            <th>DNI</th>
            <th>Nombre</th>
            <th>Email</th>
            <th>Estado</th>
            <th>Acción</th>
          </tr>
        </thead>
        <tbody>
          {solicitudes.map((s) => (
            <tr key={s.idSolicitud}>
              <td>{s.idSolicitud}</td>
              <td>{s.dni}</td>
              <td>{s.nombre}</td>
              <td>{s.email}</td>
              <td>{s.estado}</td>
              <td>
                <button onClick={() => setSelectedId(s.idSolicitud)}>
                  Eliminar
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {selectedId && (
        <DeleteModal
          id={selectedId}
          onConfirm={handleDelete}
          onCancel={() => setSelectedId(null)}
        />
      )}
    </>
  );
}