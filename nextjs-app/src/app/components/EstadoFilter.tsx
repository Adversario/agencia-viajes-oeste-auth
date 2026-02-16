'use client';

import { useRouter } from "next/navigation";

export default function EstadoFilter({ estadoActual }: { estadoActual: string }) {
  const router = useRouter();

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value;
    if (value === "todos") {
      router.push("/");
    } else {
      router.push(`/?estado=${value}`);
    }
    router.refresh();
  };

  return (
    <div style={{ marginTop: 10 }}>
      <label style={{ marginRight: 8 }}>Filtrar por estado:</label>
      <select value={estadoActual} onChange={handleChange}>
        <option value="todos">Todos</option>
        <option value="pendiente">Pendiente</option>
        <option value="en_proceso">En proceso</option>
        <option value="finalizada">Finalizada</option>
      </select>
    </div>
  );
}