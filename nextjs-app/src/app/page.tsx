import ClientModules from "./components/ClientModules";
import SolicitudesTable from "./components/SolicitudesTable";

type Solicitud = {
  idSolicitud: number;
  dni: string;
  nombre: string;
  email: string;
  estado: string;
};

async function getSolicitudes(
  estado?: string,
  rol?: string,
  email?: string
): Promise<Solicitud[]> {
  await new Promise((resolve) => setTimeout(resolve, 3000));

  const url = new URL("http://localhost:6060/solicitudes");

  if (estado && estado !== "todos") url.searchParams.set("estado", estado);
  if (rol === "cliente" && email) url.searchParams.set("email", email);

  const res = await fetch(url.toString(), { cache: "no-store" });

  if (!res.ok) throw new Error("Error cargando solicitudes.");

  const data = await res.json();
  return data.solicitudes ?? [];
}

export default async function Page({
  searchParams
}: {
  searchParams: Promise<{ estado?: string; rol?: string; email?: string }>;
}) {
  const { estado, rol, email } = await searchParams;

  const solicitudes = await getSolicitudes(estado, rol, email);

  return (
    <main style={{ padding: 24, fontFamily: "system-ui" }}>
      <h1>Agencia de Viajes Oeste — Optimizado</h1>

      <ClientModules
        estado={estado || "todos"}
        rol={rol || "agente"}
        email={email || ""}
      />

      <div style={{ marginTop: 40 }}>
        <h2>Listado SSR</h2>
        <SolicitudesTable solicitudes={solicitudes} />
      </div>
    </main>
  );
}