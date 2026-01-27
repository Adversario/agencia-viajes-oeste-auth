import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/Auth.css";
import { exchangeGithubCode } from "../services/authService";

function GithubCallback() {
  const navigate = useNavigate();
  const [status, setStatus] = useState("Procesando autenticación con GitHub...");
  const [error, setError] = useState("");

  useEffect(() => {
    const run = async () => {
      const params = new URLSearchParams(window.location.search);
      const code = params.get("code");
      const state = params.get("state");

      if (!code || !state) {
        setError("Faltan parámetros de GitHub (code/state). Intenta nuevamente.");
        setStatus("");
        return;
      }

      try {
        setStatus("Conectando con backend para validar GitHub...");
        const data = await exchangeGithubCode({ code, state });

        // Guardar sesión (JWT propio) + datos usuario
        localStorage.setItem("token", data.token);
        localStorage.setItem("user", JSON.stringify(data.user || {}));

        // Para compatibilidad con lógica anterior (email)
        if (data.user?.email) {
          localStorage.setItem("userEmail", data.user.email);
        } else {
          localStorage.setItem("userEmail", data.user?.login || "github-user");
        }

        navigate("/dashboard");
      } catch (e) {
        setError(e.message || "No se pudo iniciar sesión con GitHub.");
        setStatus("");
      }
    };

    run();
  }, [navigate]);

  return (
    <div className="auth-page">
      <div className="auth-card">
        <h1 className="auth-title">Agencia de Viajes Oeste</h1>
        <p className="auth-subtitle">Callback GitHub</p>

        {status ? <div className="alert success">{status}</div> : null}
        {error ? <div className="alert error">{error}</div> : null}

        {error ? (
          <button className="auth-button" onClick={() => navigate("/login")} type="button">
            Volver al Login
          </button>
        ) : null}
      </div>
    </div>
  );
}

export default GithubCallback;