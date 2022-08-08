// Core Node.js Imports
const path = require("path");

// Third Party Package Imports
const express = require("express");

// Express.js Router
const router = express.Router();

// Middleware
router.get("/", (req, res, next) => {
  // __dirname global variable that points to the folder in which we are using it
  res.sendFile(path.join(__dirname, "../", "views", "shop.html"));
});

// Export Shop Router
module.exports = router;
