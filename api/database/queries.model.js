const { pool } = require("./config");

function fetchConn() {
  try {
    return pool.getConnection();
  } catch (err) {
    console.error(err);
  }
}

async function query(q, data) {
  const connection = await fetchConn();
  try {
    await connection.beginTransaction();
    const result = data
      ? await connection.execute(q, [data])
      : await connection.execute(q);
    await connection.commit();
    return result[0];
  } catch (err) {
    console.error(err);
    await connection.rollback();
  } finally {
    connection?.release();
  }
}

module.exports = { query };
