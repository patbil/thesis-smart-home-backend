const { query } = require("../database/queries.model");

async function pushTemperature(data) {
  const sql = `INSERT INTO Temperature (value, timestamp) VALUES (?, ?)`;
  return await query(sql, Object.values(data));
}

async function pushHumidity(data) {
  const sql = `INSERT INTO Humidity (value, timestamp) VALUES (?, ?)`;
  return await query(sql, Object.values(data));
}

async function getHumidityStats(start, end) {
  const sql = `SELECT * FROM Humidity WHERE timestamp BETWEEN ? AND ?`;
  return await query(sql, [start, end]);
}

async function getTemperatureStats(start, end) {
  const sql = `SELECT * FROM Temperature WHERE timestamp BETWEEN ? AND ?`;
  return await query(sql, [start, end]);
}

module.exports = {
  pushTemperature,
  pushHumidity,
  getTemperatureStats,
  getHumidityStats,
};
