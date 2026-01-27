const fs = require("fs").promises;

async function readJson(filePath) {
  try {
    const raw = await fs.readFile(filePath, "utf-8");
    return JSON.parse(raw);
  } catch (err) {
    // Si no existe o está vacío, devolvemos array vacío
    return [];
  }
}

async function writeJson(filePath, data) {
  const pretty = JSON.stringify(data, null, 2);
  await fs.writeFile(filePath, pretty, "utf-8");
}

module.exports = { readJson, writeJson };