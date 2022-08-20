require("dotenv").config();
// Get the client
const mysql2 = require("mysql2");

// Create the connection to database
const pool = mysql2.createPool({
  host: "localhost",
  user: "anon",
  database: "node-complete",
  password: process.env.SQLPASSWORD,
});

module.exports = pool.promise();
