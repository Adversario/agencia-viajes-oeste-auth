const express = require("express");
const cors = require("cors");

const solicitudesRoutes = require("./routes/solicitudesRoutes");

const app = express();
const PORT = process.env.PORT || 6060;

app.use(cors({ origin: true }));
app.use(express.json());

app.get("/health", (req, res) => {
  res.json({ ok: true, service: "backend-tareas", port: PORT });
});

app.use("/", solicitudesRoutes);

app.use((req, res) => {
  res.status(404).json({ ok: false, message: "Ruta no encontrada" });
});

app.listen(PORT, () => {
  console.log(`✅ backend-tareas corriendo en http://localhost:${PORT}`);
  console.log(`➡️  Health: http://localhost:${PORT}/health`);
  console.log(`➡️  GET   : http://localhost:${PORT}/solicitudes`);
  console.log(`➡️  POST  : http://localhost:${PORT}/solicitudes`);
});