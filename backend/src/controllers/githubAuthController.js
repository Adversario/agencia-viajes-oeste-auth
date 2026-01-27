const jwt = require("jsonwebtoken");
const { signToken } = require("../services/tokenService");
const {
  buildGithubAuthorizeUrl,
  exchangeCodeForAccessToken,
  fetchGithubUser,
  fetchGithubPrimaryEmail
} = require("../services/githubService");

function startGithubAuth(req, res) {
  try {
    const clientId = process.env.GITHUB_CLIENT_ID;
    const callbackUrl = process.env.GITHUB_CALLBACK_URL;
    const stateExpires = process.env.GITHUB_OAUTH_STATE_EXPIRES || "5m";
    const jwtSecret = process.env.JWT_SECRET || "dev_secret";

    if (!clientId || !callbackUrl) {
      return res.status(500).json({
        error: "Faltan variables de entorno de GitHub (GITHUB_CLIENT_ID o GITHUB_CALLBACK_URL)."
      });
    }

    // Crea un state firmado (anti-CSRF) con expiración corta
    const state = jwt.sign(
      { purpose: "github_oauth_state", nonce: Date.now().toString() },
      jwtSecret,
      { expiresIn: stateExpires }
    );

    const authorizeUrl = buildGithubAuthorizeUrl({
      clientId,
      redirectUri: callbackUrl,
      state
    });

    // Redirige a GitHub
    return res.redirect(authorizeUrl);
  } catch (err) {
    return res.status(500).json({ error: "No se pudo iniciar OAuth con GitHub." });
  }
}

async function githubCallback(req, res) {
  try {
    const { code, state } = req.query;
    const jwtSecret = process.env.JWT_SECRET || "dev_secret";

    if (!code) return res.status(400).json({ error: "Falta parámetro 'code'." });
    if (!state) return res.status(400).json({ error: "Falta parámetro 'state'." });

    // Validar state (anti-CSRF)
    try {
      const decoded = jwt.verify(state, jwtSecret);
      if (decoded.purpose !== "github_oauth_state") {
        return res.status(401).json({ error: "State inválido." });
      }
    } catch (e) {
      return res.status(401).json({ error: "State inválido o expirado." });
    }

    const clientId = process.env.GITHUB_CLIENT_ID;
    const clientSecret = process.env.GITHUB_CLIENT_SECRET;

    if (!clientId || !clientSecret) {
      return res.status(500).json({
        error: "Faltan variables de entorno (GITHUB_CLIENT_ID o GITHUB_CLIENT_SECRET)."
      });
    }

    // 1) Intercambiar code por access_token
    const accessToken = await exchangeCodeForAccessToken({
      clientId,
      clientSecret,
      code
    });

    // 2) Obtener perfil GitHub
    const ghUser = await fetchGithubUser(accessToken);

    // 3) Obtener email principal
    let email = ghUser.email;
    if (!email) {
      email = await fetchGithubPrimaryEmail(accessToken);
    }

    const user = {
      provider: "github",
      id: String(ghUser.id),
      login: ghUser.login,
      name: ghUser.name || ghUser.login,
      email: email || "",
      avatarUrl: ghUser.avatar_url || ""
    };

    // 4) Emitir JWT propio (unifica sesión local + cloud)
    const token = signToken({
      provider: "github",
      userId: `github:${user.id}`,
      login: user.login,
      name: user.name,
      email: user.email,
      avatarUrl: user.avatarUrl
    });

    return res.status(200).json({ token, user });
  } catch (err) {
    return res.status(500).json({ error: "Error al completar OAuth con GitHub." });
  }
}

module.exports = { startGithubAuth, githubCallback };