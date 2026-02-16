require("dotenv").config();
const express = require("express");
const cors = require("cors");
const rateLimit = require("express-rate-limit");

const authRoutes = require("./routes/authRoutes");
const githubAuthRoutes = require("./routes/githubAuthRoutes");

const app = express();

// Rate limiter
const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutos
  max: 5, // 5 intentos por IP
  message: {
    message: "Demasiados intentos. Intenta nuevamente en 15 minutos."
  },
  standardHeaders: true,
  legacyHeaders: false
});

// Middleware
app.use(cors({ origin: "http://localhost:3000" }));
app.use(express.json());

// Health check
app.get("/api/health", (req, res) => {
  res.status(200).json({ ok: true, message: "Backend OK" });
});

// Rate limiter para endpoints de autenticación
app.use("/api/login", authLimiter);
app.use("/api/register", authLimiter);
app.use("/api/auth/github", authLimiter);

// Rutas locales
app.use("/api", authRoutes);

// Rutas Cloud GitHub
app.use("/api/auth", githubAuthRoutes);

// 404
app.use((req, res) => {
  res.status(404).json({ error: "Ruta no encontrada" });
});

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`✅ Backend corriendo en http://localhost:${PORT}`);
});