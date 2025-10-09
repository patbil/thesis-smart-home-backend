const { query } = require("../database/queries.model");

async function getInfo() {
  const sql = `SELECT * FROM Sensors WHERE name = ?`;
  return await query(sql, ["Light"]);
}

async function update(state) {
  const sql = `UPDATE Sensors SET state = ? WHERE name = ?`;
  return await query(sql, [state, "Light"]);
}

module.exports = { getInfo, update };
