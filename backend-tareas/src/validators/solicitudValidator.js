const EMAIL_REGEX =
  /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)+$/;

const DNI_REGEX = /^\d{7,10}$/;

function sanitizeText(value) {
  const str = String(value ?? "").trim();
  // Sanitización básica para evitar inyección HTML simple en almacenamiento
  return str
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

function sanitizeSolicitud(body) {
  return {
    dni: sanitizeText(body.dni),
    nombre: sanitizeText(body.nombre),
    email: sanitizeText(body.email).toLowerCase(),
    origen: sanitizeText(body.origen),
    destino: sanitizeText(body.destino),
    tipoViaje: sanitizeText(body.tipoViaje || "solo_ida"),
    fechaSalida: sanitizeText(body.fechaSalida),
    fechaRegreso: sanitizeText(body.fechaRegreso),
    estado: sanitizeText(body.estado || "pendiente")
  };
}

function validateSolicitud(form) {
  const errors = {};

  const required = [
    ["dni", "DNI"],
    ["nombre", "Nombre"],
    ["email", "Email"],
    ["origen", "Origen"],
    ["destino", "Destino"],
    ["tipoViaje", "Tipo de viaje"],
    ["fechaSalida", "Fecha salida"],
    ["fechaRegreso", "Fecha regreso"],
    ["estado", "Estado"]
  ];

  for (const [key, label] of required) {
    if (!String(form[key] || "").trim()) {
      errors[key] = `${label} es obligatorio.`;
    }
  }

  if (form.email && !EMAIL_REGEX.test(form.email)) {
    errors.email = "Email inválido.";
  }

  if (form.dni && !DNI_REGEX.test(form.dni)) {
    errors.dni = "DNI inválido (7 a 10 dígitos).";
  }

  // Validación fechas: regreso > salida
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

  // Estado permitido (para filtrado)
  const allowed = ["pendiente", "en_proceso", "finalizada"];
  if (form.estado && !allowed.includes(form.estado)) {
    errors.estado = "Estado inválido.";
  }

  return { ok: Object.keys(errors).length === 0, errors };
}

module.exports = { sanitizeSolicitud, validateSolicitud };