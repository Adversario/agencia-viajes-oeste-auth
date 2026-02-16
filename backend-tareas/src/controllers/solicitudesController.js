const {
  readSolicitudes,
  addSolicitud,
  removeSolicitud
} = require("../storage/solicitudesStorage");

const { sanitizeSolicitud, validateSolicitud } = require("../validators/solicitudValidator");

const EMAIL_REGEX =
  /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)+$/;

async function getSolicitudes(req, res) {
  const solicitudes = await readSolicitudes();

  const estado = (req.query.estado || "").trim();
  const email = (req.query.email || "").trim().toLowerCase();

  // Si viene email, lo validamos para que sea defendible académicamente.
  if (email && !EMAIL_REGEX.test(email)) {
    return res.status(400).json({
      ok: false,
      message: "Parámetro email inválido.",
      errors: { email: "Email inválido." }
    });
  }

  let filtradas = solicitudes;

  if (estado) {
    filtradas = filtradas.filter((s) => s.estado === estado);
  }

  if (email) {
    filtradas = filtradas.filter((s) => s.email === email);
  }

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

async function deleteSolicitud(req, res) {
  const id = Number(req.params.id);

  if (!Number.isInteger(id) || id <= 0) {
    return res.status(400).json({ ok: false, message: "ID inválido." });
  }

  const eliminado = await removeSolicitud(id);

  if (!eliminado) {
    return res.status(404).json({ ok: false, message: "No encontrada." });
  }

  return res.status(200).json({
    ok: true,
    message: "Solicitud eliminada."
  });
}

module.exports = {
  getSolicitudes,
  createSolicitud,
  deleteSolicitud
};