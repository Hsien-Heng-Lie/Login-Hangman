const sql = require("mssql");
require("dotenv").config();

const connect = async () => {
  const pool = new sql.ConnectionPool({
    user: process.env.DATABASE_User,
    password: process.env.DATABASE_KEY,
    server: process.env.DATABASE_Connection_String,
    database: process.env.DATABASE_Hangman,
    options: {
      trustServerCertificate: true,
    },
  });

  return await pool.connect();
};

module.exports = connect();
