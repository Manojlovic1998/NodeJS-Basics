// Dotenv imports
require("dotenv").config();

// Using sequelize
const Sequelize = require("sequelize");

const sequelize = new Sequelize(
  "node-complete",
  "anon",
  process.env.SQLPASSWORD,
  { dialect: "mysql", host: "localhost" }
);


module.exports = sequelize;