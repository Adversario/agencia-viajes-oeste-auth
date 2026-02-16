import SolicitudForm from "./components/SolicitudForm";
import EstadoFilter from "./components/EstadoFilter";

type Estado = "pendiente" | "en_proceso" | "finalizada";

type Solicitud = {
  idSolicitud: number;
  dni: string;
  nombre: string;
  email: string;
  origen: string;
  destino: string;
  tipoViaje: string;
  fechaSalida: string;
  fechaRegreso: string;
  fechaRegistro: string;
  estado: Estado;
};

async function getSolicitudes(estado?: string): Promise<Solicitud[]> {
  const url = new URL("http://localhost:6060/solicitudes");

  if (estado && estado !== "todos") {
    url.searchParams.set("estado", estado);
  }

  const res = await fetch(url.toString(), { cache: "no-store" });

  if (!res.ok) {
    throw new Error("Error cargando solicitudes.");
  }

  const data = await res.json();
  return data.solicitudes ?? [];
}

export default async function Page({
  searchParams
}: {
  searchParams: Promise<{ estado?: string }>;
}) {
  const { estado } = await searchParams;
  const solicitudes = await getSolicitudes(estado);

  return (
    <main style={{ padding: 24, fontFamily: "system-ui" }}>
      <h1>Agencia de Viajes Oeste — Next.js SSR</h1>

      <SolicitudForm />

      <div style={{ marginTop: 40 }}>
        <h2>Listado SSR + Filtrado por estado</h2>

        <EstadoFilter estadoActual={estado || "todos"} />

        <p style={{ color: "#666", marginTop: 10 }}>
          Filtro actual: <strong>{estado || "todos"}</strong>
        </p>

        {solicitudes.length === 0 ? (
          <p>No hay solicitudes para este filtro.</p>
        ) : (
          <table style={{ marginTop: 10 }}>
            <thead>
              <tr>
                <th>ID</th>
                <th>DNI</th>
                <th>Nombre</th>
                <th>Email</th>
                <th>Estado</th>
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
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </main>
  );
}