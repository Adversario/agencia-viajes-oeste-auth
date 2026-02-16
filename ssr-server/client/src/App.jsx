import React, { useEffect, useMemo, useState } from "react";

export default function App({ initialData }) {
  const { solicitudes, errors, form, message, meta } = initialData;

  const [hydrated, setHydrated] = useState(false);
  useEffect(() => setHydrated(true), []);

  const datalistOptions = useMemo(() => {
    const names = (solicitudes || []).map((s) => s.nombreCliente).filter(Boolean);
    return Array.from(new Set(names));
  }, [solicitudes]);

  return (
    <div className="container">
      <h1>SSR — Agencia de Viajes Oeste</h1>

      <div style={{ display: "flex", gap: 10, alignItems: "center", flexWrap: "wrap", marginBottom: 10 }}>
        <span className="badge">Renderizado en servidor + Hydration (React 18)</span>
        <span className="badge">{hydrated ? "Hidratado ✅ (cliente)" : "Solo SSR (antes de JS)"}</span>
      </div>

      {/* Panel de evidencia SSR + persistencia */}
      <div className="card" style={{ marginBottom: 16 }}>
        <h2 style={{ marginTop: 0 }}>Estado del sistema (SSR)</h2>
        <p style={{ color: "#aab7d6", marginTop: 6 }}>
          Estos datos vienen desde el servidor (SSR) y demuestran persistencia y render del listado.
        </p>
        <div style={{ display: "grid", gap: 8 }}>
          <div><strong>Total solicitudes:</strong> {meta?.count ?? (solicitudes || []).length}</div>
          <div><strong>Archivo persistencia:</strong> <code>{meta?.dataPath || "(desconocido)"}</code></div>
          <div><strong>ServerTime (SSR):</strong> <code>{meta?.serverTime || "(sin dato)"}</code></div>
        </div>
      </div>

      {message ? <div className="msg">{message}</div> : null}

      <div className="card">
        <h2>Crear solicitud</h2>

        <form method="POST" action="/solicitudes">
          <div className="row">
            <div>
              <label>1) ID solicitud (autogenerado servidor)</label>
              <input value="(se asigna al guardar)" readOnly />
            </div>

            <div>
              <label>11) Fecha registro (servidor)</label>
              <input value="(se asigna al guardar)" readOnly />
            </div>
          </div>

          <div className="row">
            <div>
              <label>2) RUT (Chile)</label>
              <input
                name="rut"
                required
                pattern="^\d{7,8}-[0-9kK]$"
                placeholder="Ej: 12345678-9 o 11111111-K"
                defaultValue={form?.rut || ""}
              />
              {errors?.rut ? <p className="error">{errors.rut}</p> : null}
            </div>

            <div>
              <label>4) Email</label>
              <input name="email" type="email" required defaultValue={form?.email || ""} />
              {errors?.email ? <p className="error">{errors.email}</p> : null}
            </div>
          </div>

          <div className="row">
            <div>
              <label>3) Nombre cliente</label>
              <input name="nombreCliente" required minLength={2} defaultValue={form?.nombreCliente || ""} />
              {errors?.nombreCliente ? <p className="error">{errors.nombreCliente}</p> : null}
            </div>

            <div>
              <label>8) Nombre cliente buscable</label>
              <input
                name="nombreBuscable"
                list="clientes"
                required
                placeholder="Escribe y elige o escribe nuevo"
                defaultValue={form?.nombreBuscable || ""}
              />
              <datalist id="clientes">
                {datalistOptions.map((n) => (
                  <option key={n} value={n} />
                ))}
              </datalist>
              {errors?.nombreBuscable ? <p className="error">{errors.nombreBuscable}</p> : null}
            </div>
          </div>

          <div className="row">
            <div>
              <label>5) Origen</label>
              <input name="origen" required defaultValue={form?.origen || ""} />
              {errors?.origen ? <p className="error">{errors.origen}</p> : null}
            </div>

            <div>
              <label>6) Destino</label>
              <input name="destino" required defaultValue={form?.destino || ""} />
              {errors?.destino ? <p className="error">{errors.destino}</p> : null}
            </div>
          </div>

          <div className="row">
            <div>
              <label>7) Tipo viaje</label>
              <select name="tipoViaje" defaultValue={form?.tipoViaje || "solo_ida"} required>
                <option value="solo_ida">Solo ida</option>
                <option value="ida_vuelta">Ida y vuelta</option>
              </select>
              {errors?.tipoViaje ? <p className="error">{errors.tipoViaje}</p> : null}
            </div>

            <div>
              <label>12) Estado</label>
              <div style={{ display: "flex", gap: 14, flexWrap: "wrap", marginTop: 8 }}>
                <label style={{ marginTop: 0 }}>
                  <input type="radio" name="estado" value="pendiente" defaultChecked={(form?.estado || "pendiente") === "pendiente"} required />{" "}
                  Pendiente
                </label>
                <label style={{ marginTop: 0 }}>
                  <input type="radio" name="estado" value="en_proceso" defaultChecked={form?.estado === "en_proceso"} />{" "}
                  En proceso
                </label>
                <label style={{ marginTop: 0 }}>
                  <input type="radio" name="estado" value="finalizada" defaultChecked={form?.estado === "finalizada"} />{" "}
                  Finalizada
                </label>
              </div>
              {errors?.estado ? <p className="error">{errors.estado}</p> : null}
            </div>
          </div>

          <div className="row">
            <div>
              <label>9) Fecha salida</label>
              <input name="fechaSalida" type="datetime-local" required defaultValue={form?.fechaSalida || ""} />
              {errors?.fechaSalida ? <p className="error">{errors.fechaSalida}</p> : null}
            </div>

            <div>
              <label>10) Fecha regreso</label>
              <input name="fechaRegreso" type="datetime-local" required defaultValue={form?.fechaRegreso || ""} />
              {errors?.fechaRegreso ? <p className="error">{errors.fechaRegreso}</p> : null}
            </div>
          </div>

          <button className="btn" type="submit">Guardar solicitud</button>
        </form>
      </div>

      <div className="card">
        <h2>Listado SSR (desde persistencia)</h2>
        <p style={{ color: "#aab7d6", marginTop: 6 }}>
          La lista debe coincidir con <code>server/data/solicitudes.json</code>
        </p>

        {(solicitudes || []).length === 0 ? (
          <p>No hay solicitudes registradas aún.</p>
        ) : (
          <table>
            <thead>
              <tr>
                <th>ID</th>
                <th>RUT</th>
                <th>Cliente</th>
                <th>Email</th>
                <th>Origen → Destino</th>
                <th>Tipo</th>
                <th>Salida / Regreso</th>
                <th>Registro</th>
                <th>Estado</th>
              </tr>
            </thead>
            <tbody>
              {solicitudes.map((s) => (
                <tr key={s.idSolicitud}>
                  <td>{s.idSolicitud}</td>
                  <td>{s.rut}</td>
                  <td>{s.nombreCliente}</td>
                  <td>{s.email}</td>
                  <td>{s.origen} → {s.destino}</td>
                  <td>{s.tipoViaje}</td>
                  <td>
                    <div><strong>Salida:</strong> {s.fechaSalida}</div>
                    <div><strong>Regreso:</strong> {s.fechaRegreso}</div>
                  </td>
                  <td>{s.fechaRegistro}</td>
                  <td>{s.estado}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}