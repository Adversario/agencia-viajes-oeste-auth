const API_BASE_URL = "http://localhost:4000/api";

/* ==========
   AUTH LOCAL
================*/
export async function registerLocal({ email, password }) {
  let response;

  try {
    response = await fetch(`${API_BASE_URL}/register`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });
  } catch (networkError) {
    throw new Error("Error de red. Revisa tu conexión e intenta nuevamente.");
  }

  const data = await safeJson(response);

  if (!response.ok) {
    const msg = data?.error || "No se pudo registrar el usuario.";
    throw new Error(msg);
  }

  return data;
}

export async function loginLocal({ email, password }) {
  let response;

  try {
    response = await fetch(`${API_BASE_URL}/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });
  } catch (networkError) {
    throw new Error("Error de red. Revisa tu conexión e intenta nuevamente.");
  }

  const data = await safeJson(response);

  if (!response.ok) {
    const msg = data?.error || "Credenciales incorrectas.";
    throw new Error(msg);
  }

  if (!data?.token) {
    throw new Error("Respuesta inválida del servidor (sin token).");
  }

  return data.token;
}

export async function logoutLocal() {
  try {
    await fetch(`${API_BASE_URL}/logout`, { method: "POST" });
  } catch (e) {
    // igual cerramos localmente
  }
}

/* ==================
   AUTH CLOUD GITHUB
======================= */

// URL que inicia el flujo OAuth (redirige a GitHub)
export function getGithubAuthStartUrl() {
  return `${API_BASE_URL}/auth/github`;
}

// Intercambia code/state con el backend y obtiene { token, user }
export async function exchangeGithubCode({ code, state }) {
  const url = `${API_BASE_URL}/auth/github/callback?code=${encodeURIComponent(
    code
  )}&state=${encodeURIComponent(state)}`;

  let response;
  try {
    response = await fetch(url, { method: "GET" });
  } catch (e) {
    throw new Error("Error de red al conectar con el backend (GitHub OAuth).");
  }

  const data = await safeJson(response);

  if (!response.ok) {
    const msg = data?.error || "No se pudo completar el login con GitHub.";
    throw new Error(msg);
  }

  if (!data?.token) {
    throw new Error("Respuesta inválida del servidor (sin token).");
  }

  return data; // { token, user }
}

/* ================
   SESSION HELPERS
===================== */
export function isAuthenticated() {
  const token = localStorage.getItem("token");
  return Boolean(token && token.trim().length > 0);
}

export function logout() {
  localStorage.removeItem("token");
  localStorage.removeItem("userEmail");
  localStorage.removeItem("user"); // cloud user
}

async function safeJson(response) {
  try {
    return await response.json();
  } catch (e) {
    return null;
  }
}