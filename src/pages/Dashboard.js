import { useMemo } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/Dashboard.css";
import { logout, logoutLocal } from "../services/authService";

function Dashboard() {
  const navigate = useNavigate();

  const session = useMemo(() => {
    const token = localStorage.getItem("token") || "";
    const userEmail = localStorage.getItem("userEmail") || "";

    let cloudUser = null;
    try {
      const raw = localStorage.getItem("user");
      cloudUser = raw ? JSON.parse(raw) : null;
    } catch (e) {
      cloudUser = null;
    }

    const provider = cloudUser?.provider === "github" ? "GitHub" : "Local";

    const name =
      provider === "GitHub"
        ? cloudUser?.name || cloudUser?.login || "Usuario GitHub"
        : userEmail || "Usuario Local";

    const email =
      provider === "GitHub"
        ? cloudUser?.email || "(email no disponible)"
        : userEmail || "(email no disponible)";

    const avatarUrl = provider === "GitHub" ? cloudUser?.avatarUrl || "" : "";

    return { token, provider, name, email, avatarUrl };
  }, []);

  const handleLogout = async () => {
    // 1) Avisar al backend (stateless)
    try {
      await logoutLocal();
    } catch (e) {}

    // 2) Limpieza de sesión en frontend (local + cloud)
    logout();

    // 3) Redirigir y reemplazar historial para evitar volver a /dashboard con "Back"
    navigate("/login", { replace: true });
  };

  return (
    <div className="dash-page">
      <div className="dash-card">
        <h1 className="dash-title">Bienvenido/a</h1>
        <p className="dash-subtitle">
          Sesión iniciada con: <strong>{session.provider}</strong>
        </p>

        <div className="dash-info">
          <p style={{ marginTop: 0 }}>
            <strong>Nombre:</strong> {session.name}
          </p>
          <p>
            <strong>Email:</strong> {session.email}
          </p>
          <p style={{ marginBottom: 0 }}>
            <strong>Token:</strong>{" "}
            <code>{session.token ? "Presente (guardado en localStorage)" : "No existe"}</code>
          </p>
        </div>

        {session.avatarUrl ? (
          <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 16 }}>
            <img
              src={session.avatarUrl}
              alt="Avatar GitHub"
              style={{
                width: 56,
                height: 56,
                borderRadius: "50%",
                border: "1px solid var(--border)",
              }}
            />
            <div style={{ color: "var(--muted)", fontSize: 13 }}>
              Avatar obtenido desde GitHub API.
            </div>
          </div>
        ) : null}

        <div className="dash-info">
          <p style={{ margin: 0 }}>
            Esta es una vista protegida. Si no hay token en <code>localStorage</code>, no puedes acceder
            a <code>/dashboard</code> escribiendo la URL.
          </p>
        </div>

        <button className="dash-button" onClick={handleLogout}>
          Cerrar sesión
        </button>
      </div>
    </div>
  );
}

export default Dashboard;