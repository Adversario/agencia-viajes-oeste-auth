'use client';

import { useState } from "react";
import { useRouter } from "next/navigation";

type Errors = Record<string, string>;

export default function SolicitudForm() {
  const router = useRouter();

  const [form, setForm] = useState({
    dni: "",
    nombre: "",
    email: "",
    origen: "",
    destino: "",
    tipoViaje: "solo_ida",
    fechaSalida: "",
    fechaRegreso: "",
    estado: "pendiente"
  });

  const [errors, setErrors] = useState<Errors>({});
  const [loading, setLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const validateClient = (): Errors => {
    const newErrors: Errors = {};

    if (!form.dni.match(/^\d{7,10}$/)) {
      newErrors.dni = "DNI inválido (7 a 10 dígitos).";
    }

    if (!form.email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) {
      newErrors.email = "Email inválido.";
    }

    if (form.fechaSalida && form.fechaRegreso) {
      const salida = new Date(form.fechaSalida);
      const regreso = new Date(form.fechaRegreso);
      if (regreso <= salida) {
        newErrors.fechaRegreso = "La fecha de regreso debe ser mayor a la de salida.";
      }
    }

    return newErrors;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const clientErrors = validateClient();
    if (Object.keys(clientErrors).length > 0) {
      setErrors(clientErrors);
      return;
    }

    setErrors({});
    setLoading(true);

    try {
      const res = await fetch("http://localhost:6060/solicitudes", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form)
      });

      const data = await res.json();

      if (!res.ok) {
        setErrors(data.errors || { general: "Error en el servidor." });
        setLoading(false);
        return;
      }

      setForm({
        dni: "",
        nombre: "",
        email: "",
        origen: "",
        destino: "",
        tipoViaje: "solo_ida",
        fechaSalida: "",
        fechaRegreso: "",
        estado: "pendiente"
      });

      router.refresh();
    } catch {
      setErrors({ general: "No se pudo conectar con el servidor." });
    }

    setLoading(false);
  };

  return (
    <form onSubmit={handleSubmit} style={{ marginTop: 24 }}>
      <h2>Registrar nueva solicitud</h2>

      {errors.general && (
        <div style={{ color: "red", marginBottom: 10 }}>
          {errors.general}
        </div>
      )}

      <div style={{ display: "grid", gap: 10, maxWidth: 500 }}>
        <input name="dni" placeholder="DNI" required value={form.dni} onChange={handleChange} />
        {errors.dni && <span style={{ color: "red" }}>{errors.dni}</span>}

        <input name="nombre" placeholder="Nombre" required value={form.nombre} onChange={handleChange} />

        <input name="email" type="email" placeholder="Email" required value={form.email} onChange={handleChange} />
        {errors.email && <span style={{ color: "red" }}>{errors.email}</span>}

        <input name="origen" placeholder="Origen" required value={form.origen} onChange={handleChange} />

        <input name="destino" placeholder="Destino" required value={form.destino} onChange={handleChange} />

        <select name="tipoViaje" value={form.tipoViaje} onChange={handleChange}>
          <option value="solo_ida">Solo ida</option>
          <option value="ida_vuelta">Ida y vuelta</option>
        </select>

        <input name="fechaSalida" type="datetime-local" required value={form.fechaSalida} onChange={handleChange} />

        <input name="fechaRegreso" type="datetime-local" required value={form.fechaRegreso} onChange={handleChange} />
        {errors.fechaRegreso && <span style={{ color: "red" }}>{errors.fechaRegreso}</span>}

        <div>
          <label>
            <input type="radio" name="estado" value="pendiente" checked={form.estado === "pendiente"} onChange={handleChange} />
            Pendiente
          </label>
          <label style={{ marginLeft: 10 }}>
            <input type="radio" name="estado" value="en_proceso" checked={form.estado === "en_proceso"} onChange={handleChange} />
            En proceso
          </label>
          <label style={{ marginLeft: 10 }}>
            <input type="radio" name="estado" value="finalizada" checked={form.estado === "finalizada"} onChange={handleChange} />
            Finalizada
          </label>
        </div>

        <button disabled={loading}>
          {loading ? "Guardando..." : "Registrar"}
        </button>
      </div>
    </form>
  );
}