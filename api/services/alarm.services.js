const { query } = require("../database/queries.model");

async function getStatus() {
  const sql = `SELECT * FROM Sensors WHERE name = ? OR name = ?`;
  return await query(sql, ['Pir', 'Buzzer']);
}

async function turnOnPir() {
  const sql = `UPDATE Sensors SET state = ? WHERE name = ?`;
  return await query(sql, [1, 'Pir']);
}

async function turnOnBuzzer() {
  const sql = `UPDATE Sensors SET state = ? WHERE name = ?`;
  return await query(sql, [0, 'Buzzer']);
}

async function turnOff() {
  const sql = `
    UPDATE Sensors
    SET state = CASE name
      WHEN 'Pir' THEN ?
      WHEN 'Buzzer' THEN ?
    END
    WHERE name IN (?, ?)
  `;
  return await query(sql, [0, 1, 'Pir', 'Buzzer']);
}

module.exports = { getStatus, turnOnPir, turnOnBuzzer, turnOff };
