'use client';

import dynamic from "next/dynamic";
import { useRouter } from "next/navigation";
import { useState } from "react";

const SolicitudForm = dynamic(() => import("./SolicitudForm"), { ssr: false });
const EstadoFilter = dynamic(() => import("./EstadoFilter"), { ssr: false });

export default function ClientModules({
  estado,
  rol,
  email
}: {
  estado: string;
  rol: string;
  email: string;
}) {
  const router = useRouter();

  const [clientEmail, setClientEmail] = useState(email || "test@email.com");
  const [emailError, setEmailError] = useState<string | null>(null);

  const pushWithParams = (nextRol: string, nextEstado: string, nextEmail: string) => {
    const params = new URLSearchParams();

    if (nextEstado && nextEstado !== "todos") params.set("estado", nextEstado);

    if (nextRol === "cliente") {
      params.set("rol", "cliente");
      params.set("email", nextEmail);
    }

    const qs = params.toString();
    router.push(qs ? `/?${qs}` : "/");
    router.refresh();
  };

  const handleRolChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newRol = e.target.value;
    setEmailError(null);

    if (newRol === "agente") {
      pushWithParams("agente", estado, "");
      return;
    }

    // Cambia a cliente y aplica email actual
    pushWithParams("cliente", estado, clientEmail);
  };

  const applyClientEmail = () => {
    // validación simple
    const ok = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(clientEmail);
    if (!ok) {
      setEmailError("Email inválido.");
      return;
    }
    setEmailError(null);
    pushWithParams("cliente", estado, clientEmail);
  };

  return (
    <>
      <div style={{ display: "flex", gap: 12, alignItems: "center", flexWrap: "wrap", marginBottom: 20 }}>
        <div>
          <label style={{ marginRight: 8 }}>Rol:</label>
          <select value={rol} onChange={handleRolChange}>
            <option value="agente">Agente</option>
            <option value="cliente">Cliente</option>
          </select>
        </div>

        {rol === "cliente" && (
          <div style={{ display: "flex", gap: 8, alignItems: "center", flexWrap: "wrap" }}>
            <label>Email cliente:</label>
            <input
              type="email"
              value={clientEmail}
              onChange={(e) => setClientEmail(e.target.value)}
              placeholder="cliente@email.com"
              style={{ padding: 6 }}
            />
            <button type="button" onClick={applyClientEmail}>
              Aplicar
            </button>
            {emailError && <span style={{ color: "red" }}>{emailError}</span>}
          </div>
        )}
      </div>

      <SolicitudForm />

      <div style={{ marginTop: 20 }}>
        <EstadoFilter estadoActual={estado} />
      </div>
    </>
  );
}