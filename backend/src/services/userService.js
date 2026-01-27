const { readJson, writeJson } = require("../utils/fileDb");
const path = require("path");

const USERS_PATH = path.join(__dirname, "../../data/users.json");

async function getAllUsers() {
  const users = await readJson(USERS_PATH);
  return Array.isArray(users) ? users : [];
}

async function findUserByEmail(email) {
  const users = await getAllUsers();
  return users.find((u) => u.email === email) || null;
}

async function createUser({ email, passwordHash }) {
  const users = await getAllUsers();

  const newUser = {
    id: Date.now().toString(),
    email,
    passwordHash,
    createdAt: new Date().toISOString()
  };

  users.push(newUser);
  await writeJson(USERS_PATH, users);

  return newUser;
}

module.exports = { getAllUsers, findUserByEmail, createUser };