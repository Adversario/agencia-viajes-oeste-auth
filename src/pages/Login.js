import { useMemo, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import "../styles/Auth.css";
import { loginLocal, getGithubAuthStartUrl } from "../services/authService";

function Login() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [errors, setErrors] = useState({ email: "", password: "", general: "" });
  const [loading, setLoading] = useState(false);

  const emailRegex = useMemo(() => /^[^\s@]+@[^\s@]+\.[^\s@]+$/, []);

  const validate = () => {
    const nextErrors = { email: "", password: "", general: "" };
    let ok = true;

    if (!email.trim()) {
      nextErrors.email = "El email es obligatorio.";
      ok = false;
    } else if (!emailRegex.test(email.trim())) {
      nextErrors.email = "Formato de email inválido.";
      ok = false;
    }

    if (!password.trim()) {
      nextErrors.password = "La contraseña es obligatoria.";
      ok = false;
    }

    setErrors(nextErrors);
    return ok;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrors({ email: "", password: "", general: "" });

    const isValid = validate();
    if (!isValid) return;

    try {
      setLoading(true);
      const token = await loginLocal({
        email: email.trim().toLowerCase(),
        password: password.trim(),
      });

      localStorage.setItem("token", token);
      localStorage.setItem("userEmail", email.trim().toLowerCase());
      localStorage.removeItem("user"); // por si venía de cloud

      navigate("/dashboard");
    } catch (err) {
      setErrors((prev) => ({
        ...prev,
        general: err.message || "No se pudo iniciar sesión. Intenta nuevamente.",
      }));
    } finally {
      setLoading(false);
    }
  };

  const handleGithubLogin = () => {
    // Redirige al backend, que a su vez redirige a GitHub
    window.location.href = getGithubAuthStartUrl();
  };

  return (
    <div className="auth-page">
      <div className="auth-card">
        <h1 className="auth-title">Agencia de Viajes Oeste</h1>
        <p className="auth-subtitle">Inicio de sesión</p>

        {errors.general ? <div className="alert error">{errors.general}</div> : null}

        <form onSubmit={handleSubmit} className="auth-form" noValidate>
          <label className="auth-label" htmlFor="email">
            Email (Login Local)
          </label>
          <input
            id="email"
            className={`auth-input ${errors.email ? "input-error" : ""}`}
            type="email"
            placeholder="ej: usuario@correo.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            autoComplete="email"
          />
          {errors.email ? <p className="field-error">{errors.email}</p> : null}

          <label className="auth-label" htmlFor="password">
            Contraseña
          </label>
          <input
            id="password"
            className={`auth-input ${errors.password ? "input-error" : ""}`}
            type="password"
            placeholder="tu contraseña"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            autoComplete="current-password"
          />
          {errors.password ? <p className="field-error">{errors.password}</p> : null}

          <button className="auth-button" type="submit" disabled={loading}>
            {loading ? "Ingresando..." : "Ingresar (Local)"}
          </button>
        </form>

        <div className="hint-box" style={{ marginTop: 16 }}>
          <p className="hint-title">O iniciar sesión con</p>
          <button className="auth-button" onClick={handleGithubLogin} type="button">
            Iniciar sesión con GitHub
          </button>
          <p className="hint-line" style={{ marginTop: 8, color: "var(--muted)" }}>
            Se abrirá GitHub para autorizar y volverás automáticamente al sistema.
          </p>
        </div>

        <p className="auth-footer">
          ¿No tienes cuenta? <Link to="/register">Ir a Registro</Link>
        </p>
      </div>
    </div>
  );
}

export default Login;