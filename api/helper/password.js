const bcrypt = require("bcrypt");

async function hashPassword(password) {
  const salt = await bcrypt.genSalt(12);
  return bcrypt.hash(password, salt);
}

async function compare(password, hashedPassword) {
  return bcrypt.compareSync(password, hashedPassword, false);
}

module.exports = { hashPassword, compare };
