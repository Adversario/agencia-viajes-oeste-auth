const express = require("express");
const path = require("path");
const fs = require("fs");

const { readSolicitudes, addSolicitud, getDataPath } = require("./storage");
const { validateSolicitud, sanitizeSolicitud } = require("./validators");
const { renderHtml } = require("./renderPage");

const app = express();
const PORT = 5050;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use("/static", express.static(path.join(__dirname, "../../client/dist")));

app.get("/api/solicitudes", async (req, res) => {
  const solicitudes = await readSolicitudes();
  res.status(200).json({
    ok: true,
    count: solicitudes.length,
    dataPath: getDataPath(),
    solicitudes
  });
});

app.get("/", async (req, res) => {
  const compiledAppPath = path.join(__dirname, "../dist/App.cjs");
  if (!fs.existsSync(compiledAppPath)) {
    return res
      .status(500)
      .send("Falta compilar SSR App. Corre: npm run build (en ssr-server) y recarga.");
  }

  const solicitudes = await readSolicitudes();

  const initialData = {
    meta: {
      count: solicitudes.length,
      dataPath: getDataPath(),
      serverTime: new Date().toISOString()
    },
    solicitudes,
    errors: {},
    form: {
      rut: "",
      nombreCliente: "",
      email: "",
      origen: "",
      destino: "",
      tipoViaje: "solo_ida",
      nombreBuscable: "",
      fechaSalida: "",
      fechaRegreso: "",
      estado: "pendiente"
    },
    message: ""
  };

  const html = renderHtml(initialData);
  res.status(200).send(html);
});

app.post("/solicitudes", async (req, res) => {
  const solicitudes = await readSolicitudes();
  const raw = sanitizeSolicitud(req.body);
  const { ok, errors } = validateSolicitud(raw);

  if (!ok) {
    const initialData = {
      meta: {
        count: solicitudes.length,
        dataPath: getDataPath(),
        serverTime: new Date().toISOString()
      },
      solicitudes,
      errors,
      form: raw,
      message: "Corrige los errores del formulario."
    };
    const html = renderHtml(initialData);
    return res.status(400).send(html);
  }

  await addSolicitud(raw);
  return res.redirect("/");
});

app.use((req, res) => {
  res.status(404).send("Ruta no encontrada (SSR Server).");
});

app.listen(PORT, () => {
  console.log(`✅ SSR Server corriendo en http://localhost:${PORT}`);
  console.log(`➡️  GET SSR: http://localhost:${PORT}/`);
  console.log(`➡️  API JSON: http://localhost:${PORT}/api/solicitudes`);
});