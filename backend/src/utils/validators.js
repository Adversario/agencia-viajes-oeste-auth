function isValidEmail(email) {
  const value = String(email || "").trim().toLowerCase();
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return regex.test(value);
}

function isValidPassword(password) {
  return String(password || "").trim().length >= 6;
}

module.exports = { isValidEmail, isValidPassword };