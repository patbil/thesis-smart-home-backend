const { query } = require("../database/queries.model");

async function getInfo() {
  const sql = `SELECT * FROM Servos`;
  return await query(sql);
}

async function getBlindState() {
  const sql = `SELECT * FROM Servos WHERE name = ?`;
  return await query(sql, ["Roleta"]);
}

async function update(address, state) {
  const sql = `UPDATE Servos SET state = ? WHERE address = ?`;
  return await query(sql, [state, address]);
}

module.exports = { getInfo, update, getBlindState };
