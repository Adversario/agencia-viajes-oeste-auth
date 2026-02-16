const EMAIL_REGEX =
  /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)+$/;

// RUT básico Chile: 7-8 dígitos + guion + dígito o K
// Ej: 12345678-9, 11111111-K
const RUT_REGEX = /^\d{7,8}-[0-9kK]$/;

function sanitizeText(value) {
  const str = String(value ?? "").trim();
  return str
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

function sanitizeSolicitud(body) {
  const rut = sanitizeText(body.rut).toUpperCase();

  return {
    rut,
    nombreCliente: sanitizeText(body.nombreCliente),
    email: sanitizeText(body.email).toLowerCase(),
    origen: sanitizeText(body.origen),
    destino: sanitizeText(body.destino),
    tipoViaje: sanitizeText(body.tipoViaje || "solo_ida"),
    nombreBuscable: sanitizeText(body.nombreBuscable),
    fechaSalida: sanitizeText(body.fechaSalida),
    fechaRegreso: sanitizeText(body.fechaRegreso),
    estado: sanitizeText(body.estado || "pendiente")
  };
}

function validateSolicitud(form) {
  const errors = {};

  const requiredFields = [
    ["rut", "RUT"],
    ["nombreCliente", "Nombre del cliente"],
    ["email", "Email"],
    ["origen", "Origen"],
    ["destino", "Destino"],
    ["tipoViaje", "Tipo de viaje"],
    ["nombreBuscable", "Nombre buscable"],
    ["fechaSalida", "Fecha salida"],
    ["fechaRegreso", "Fecha regreso"],
    ["estado", "Estado"]
  ];

  for (const [key, label] of requiredFields) {
    if (!String(form[key] || "").trim()) {
      errors[key] = `${label} es obligatorio.`;
    }
  }

  if (form.email && !EMAIL_REGEX.test(form.email)) {
    errors.email = "Email inválido.";
  }

  if (form.rut && !RUT_REGEX.test(form.rut)) {
    errors.rut = "RUT inválido (ej: 12345678-9 o 11111111-K).";
  }

  if (form.fechaSalida && form.fechaRegreso) {
    const salida = new Date(form.fechaSalida);
    const regreso = new Date(form.fechaRegreso);

    if (Number.isNaN(salida.getTime()) || Number.isNaN(regreso.getTime())) {
      errors.fechaSalida = errors.fechaSalida || "Fecha salida inválida.";
      errors.fechaRegreso = errors.fechaRegreso || "Fecha regreso inválida.";
    } else if (regreso <= salida) {
      errors.fechaRegreso = "La fecha de regreso debe ser mayor a la fecha de salida.";
    }
  }

  return { ok: Object.keys(errors).length === 0, errors };
}

module.exports = { sanitizeSolicitud, validateSolicitud };