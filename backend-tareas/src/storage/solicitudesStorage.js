const fs = require("fs");
const path = require("path");

const DATA_PATH = path.join(__dirname, "../../data/solicitudes.json");

function readJsonSafe(filePath) {
  try {
    if (!fs.existsSync(filePath)) return [];
    const raw = fs.readFileSync(filePath, "utf-8");
    if (!raw.trim()) return [];
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

function writeJsonAtomic(filePath, data) {
  const dir = path.dirname(filePath);
  if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });

  const tmpPath = `${filePath}.tmp`;
  fs.writeFileSync(tmpPath, JSON.stringify(data, null, 2), "utf-8");
  fs.renameSync(tmpPath, filePath);
}

async function readSolicitudes() {
  return readJsonSafe(DATA_PATH);
}

async function addSolicitud(form) {
  const solicitudes = readJsonSafe(DATA_PATH);

  const maxId = solicitudes.reduce((max, s) => {
    const idNum = Number(s.idSolicitud || 0);
    return Number.isFinite(idNum) ? Math.max(max, idNum) : max;
  }, 0);

  const nueva = {
    idSolicitud: maxId + 1,
    ...form,
    fechaRegistro: new Date().toISOString()
  };

  solicitudes.push(nueva);
  writeJsonAtomic(DATA_PATH, solicitudes);
  return nueva;
}

async function removeSolicitud(id) {
  const solicitudes = readJsonSafe(DATA_PATH);
  const nuevaLista = solicitudes.filter((s) => s.idSolicitud !== id);

  if (nuevaLista.length === solicitudes.length) return false;

  writeJsonAtomic(DATA_PATH, nuevaLista);
  return true;
}

module.exports = {
  readSolicitudes,
  addSolicitud,
  removeSolicitud
};