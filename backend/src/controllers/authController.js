const bcrypt = require("bcryptjs");
const { isValidEmail, isValidPassword } = require("../utils/validators");
const { findUserByEmail, createUser } = require("../services/userService");
const { signToken } = require("../services/tokenService");

async function register(req, res) {
  try {
    const { email, password } = req.body;

    // Validaciones backend
    if (!email || !password) {
      return res.status(400).json({ error: "Email y password son obligatorios." });
    }
    if (!isValidEmail(email)) {
      return res.status(400).json({ error: "Formato de email inválido." });
    }
    if (!isValidPassword(password)) {
      return res.status(400).json({ error: "La contraseña debe tener al menos 6 caracteres." });
    }

    const normalizedEmail = email.trim().toLowerCase();

    const existing = await findUserByEmail(normalizedEmail);
    if (existing) {
      return res.status(409).json({ error: "El email ya está registrado." });
    }

    const passwordHash = await bcrypt.hash(password, 10);

    const user = await createUser({
      email: normalizedEmail,
      passwordHash
    });

    // Registro exitoso: por seguridad no devolvemos hash
    return res.status(201).json({
      message: "Usuario registrado exitosamente.",
      user: { id: user.id, email: user.email }
    });
  } catch (err) {
    return res.status(500).json({ error: "Error interno en el servidor." });
  }
}

async function login(req, res) {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ error: "Email y password son obligatorios." });
    }
    if (!isValidEmail(email)) {
      return res.status(400).json({ error: "Formato de email inválido." });
    }

    const normalizedEmail = email.trim().toLowerCase();
    const user = await findUserByEmail(normalizedEmail);

    if (!user) {
      return res.status(401).json({ error: "Credenciales incorrectas." });
    }

    const ok = await bcrypt.compare(password, user.passwordHash);
    if (!ok) {
      return res.status(401).json({ error: "Credenciales incorrectas." });
    }

    const token = signToken({ userId: user.id, email: user.email });

    return res.status(200).json({ token });
  } catch (err) {
    return res.status(500).json({ error: "Error interno en el servidor." });
  }
}


async function logout(req, res) {
  return res.status(200).json({ message: "Logout exitoso (stateless)." });
}

module.exports = { register, login, logout };