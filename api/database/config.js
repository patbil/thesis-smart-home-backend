const mysql = require("mysql2/promise");

const pool = mysql.createPool({
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME,
  connectionLimit: process.env.DB_CONNECTION_LIMIT,
});

pool.getConnection((err, connection) => {
  if (err) {
    if (err.code === "PROTOCOL_CONNECTION_LOST") {
      errorlog.error("Database connection was closed.");
    }
    if (err.code === "ER_CON_COUNT_ERROR") {
      errorlog.error("Database has too many connections.");
    }
    if (err.code === "ECONNREFUSED") {
      errorlog.error("Database connection was refused.");
    }
  }
  if (connection) {
    infolog.info("Database connected successfully.");
    connection.release();
  }
});

pool.on("acquire", function (connection) {
  console.log("Connection %d acquired ", connection.threadId);
});

pool.on("enqueue", function () {
  console.log("Waiting for available connection slot");
});

pool.on("release", function (connection) {
  console.log("Connection %d released", connection.threadId);
});

module.exports = { pool }
