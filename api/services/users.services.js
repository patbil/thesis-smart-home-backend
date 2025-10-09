const { query } = require("../database/queries.model");

async function getAll() {
  const sql = `SELECT id, name, surname, username, email, role FROM Users`;
  return await query(sql);
}

async function getById(id) {
  const sql = `SELECT id, name, surname, username, email, role FROM Users WHERE id = ?`;
  return await query(sql, [id]);
}

async function createUser(data) {
  const sql = `INSERT INTO Users (name, surname, username, email, password, role) VALUES (?, ?, ?, ?, ?, ?)`;
  return await query(sql, data);
}

async function removeUser(id) {
  const sql = `DELETE FROM Users WHERE id = ?`;
  return await query(sql, [id]);
}

async function updateUser(data, id) {
  const sql = `UPDATE Users SET name = ?, surname = ?, username = ?, email = ?, password = ?, role = ? WHERE id = ?`;
  return await query(sql, [...data, id]);
}

async function userExist(email) {
  const sql = `SELECT id, name, surname, username, email, password, role FROM Users WHERE email = ?`;
  return await query(sql, [email]);
}

module.exports = {
  getAll,
  getById,
  removeUser,
  createUser,
  updateUser,
  userExist,
};
