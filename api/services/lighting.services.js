const { query } = require("../database/queries.model");

async function getInfo() {
  const sql = "SELECT * FROM Lights";
  return await query(sql);
}

async function update(name, state) {
  const sql = "UPDATE Lights SET state = ? WHERE name = ?";
  return await query(sql, [state, name]);
}

module.exports = { getInfo, update };
