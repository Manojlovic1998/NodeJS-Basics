// Core Node.js Imports
const path = require("path");

// Third Party Package Imports
const express = require("express");
// Project Imports
const rootDir = require("../util/path");
const adminData = require("./admin");

// Express.js Router
const router = express.Router();

// Middleware
router.get("/", (req, res, next) => {
  // __dirname global variable that points to the folder in which we are using it
  const products = adminData.products;
  res.render("shop", { products, docTitle: "Shop" });
});

// Export Shop Router
module.exports = router;
