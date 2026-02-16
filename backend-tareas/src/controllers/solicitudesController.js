const { readSolicitudes, addSolicitud } = require("../storage/solicitudesStorage");
const { sanitizeSolicitud, validateSolicitud } = require("../validators/solicitudValidator");

async function getSolicitudes(req, res) {
  const solicitudes = await readSolicitudes();

  const estado = (req.query.estado || "").trim();
  const filtradas = estado
    ? solicitudes.filter((s) => s.estado === estado)
    : solicitudes;

  return res.status(200).json({
    ok: true,
    count: filtradas.length,
    solicitudes: filtradas
  });
}

async function createSolicitud(req, res) {
  const raw = sanitizeSolicitud(req.body);
  const { ok, errors } = validateSolicitud(raw);

  if (!ok) {
    return res.status(400).json({
      ok: false,
      message: "Datos inválidos",
      errors
    });
  }

  const nueva = await addSolicitud(raw);

  return res.status(201).json({
    ok: true,
    message: "Solicitud creada",
    solicitud: nueva
  });
}

module.exports = { getSolicitudes, createSolicitud };