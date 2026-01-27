const fetch = require("node-fetch");

function buildGithubAuthorizeUrl({ clientId, redirectUri, state }) {
  const base = "https://github.com/login/oauth/authorize";
  const params = new URLSearchParams({
    client_id: clientId,
    redirect_uri: redirectUri,
    scope: "read:user user:email",
    state
  });
  return `${base}?${params.toString()}`;
}

async function exchangeCodeForAccessToken({ clientId, clientSecret, code }) {
  const url = "https://github.com/login/oauth/access_token";

  let response;
  try {
    response = await fetch(url, {
      method: "POST",
      headers: {
        "Accept": "application/json",
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        client_id: clientId,
        client_secret: clientSecret,
        code
      })
    });
  } catch (e) {
    throw new Error("Error de red al intercambiar code por token.");
  }

  const data = await safeJson(response);

  if (!response.ok) {
    throw new Error(data?.error_description || "GitHub token exchange failed.");
  }

  if (!data?.access_token) {
    throw new Error("No se recibió access_token desde GitHub.");
  }

  return data.access_token;
}

async function fetchGithubUser(accessToken) {
  const url = "https://api.github.com/user";

  const response = await fetch(url, {
    headers: {
      "Accept": "application/vnd.github+json",
      "Authorization": `Bearer ${accessToken}`,
      "User-Agent": "AgenciaViajesOeste-App"
    }
  });

  const data = await safeJson(response);

  if (!response.ok) {
    throw new Error(data?.message || "No se pudo obtener usuario GitHub.");
  }

  return data;
}

async function fetchGithubPrimaryEmail(accessToken) {
  const url = "https://api.github.com/user/emails";

  const response = await fetch(url, {
    headers: {
      "Accept": "application/vnd.github+json",
      "Authorization": `Bearer ${accessToken}`,
      "User-Agent": "AgenciaViajesOeste-App"
    }
  });

  const data = await safeJson(response);

  if (!response.ok || !Array.isArray(data)) {
    return "";
  }

  // preferimos primary + verified; si no hay, tomamos el primero disponible
  const primaryVerified = data.find((e) => e.primary && e.verified);
  if (primaryVerified?.email) return primaryVerified.email;

  const anyEmail = data.find((e) => e.email);
  return anyEmail?.email || "";
}

async function safeJson(response) {
  try {
    return await response.json();
  } catch (e) {
    return null;
  }
}

module.exports = {
  buildGithubAuthorizeUrl,
  exchangeCodeForAccessToken,
  fetchGithubUser,
  fetchGithubPrimaryEmail
};