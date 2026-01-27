import { useMemo, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import "../styles/Auth.css";
import { registerLocal } from "../services/authService";

function Register() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [errors, setErrors] = useState({ email: "", password: "", general: "" });
  const [successMsg, setSuccessMsg] = useState("");
  const [loading, setLoading] = useState(false);

  const emailRegex = useMemo(() => /^[^\s@]+@[^\s@]+\.[^\s@]+$/, []);

  const validate = () => {
    const nextErrors = { email: "", password: "", general: "" };
    let ok = true;

    if (!email.trim()) {
      nextErrors.email = "El email es obligatorio.";
      ok = false;
    } else if (!emailRegex.test(email.trim())) {
      nextErrors.email = "Formato de email inválido (ej: usuario@dominio.com).";
      ok = false;
    }

    if (!password.trim()) {
      nextErrors.password = "La contraseña es obligatoria.";
      ok = false;
    } else if (password.trim().length < 6) {
      nextErrors.password = "La contraseña debe tener al menos 6 caracteres.";
      ok = false;
    }

    setErrors(nextErrors);
    return ok;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSuccessMsg("");
    setErrors({ email: "", password: "", general: "" });

    const isValid = validate();
    if (!isValid) return;

    try {
      setLoading(true);
      await registerLocal({
        email: email.trim().toLowerCase(),
        password: password.trim(),
      });

      setSuccessMsg("Registro exitoso. Redirigiendo al login...");
      setTimeout(() => {
        navigate("/login");
      }, 700);
    } catch (err) {
      setErrors((prev) => ({
        ...prev,
        general: err.message || "No se pudo registrar. Intenta nuevamente.",
      }));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-page">
      <div className="auth-card">
        <h1 className="auth-title">Agencia de Viajes Oeste</h1>
        <p className="auth-subtitle">Registro</p>

        {errors.general ? <div className="alert error">{errors.general}</div> : null}
        {successMsg ? <div className="alert success">{successMsg}</div> : null}

        <form onSubmit={handleSubmit} className="auth-form" noValidate>
          <label className="auth-label" htmlFor="email">
            Email
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
            placeholder="mínimo 6 caracteres"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            autoComplete="new-password"
          />
          {errors.password ? <p className="field-error">{errors.password}</p> : null}

          <button className="auth-button" type="submit" disabled={loading}>
            {loading ? "Registrando..." : "Registrarme"}
          </button>
        </form>

        <p className="auth-footer">
          ¿Ya tienes cuenta? <Link to="/login">Ir a Login</Link>
        </p>
      </div>
    </div>
  );
}

export default Register;