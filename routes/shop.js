// Core Node.js Imports
const path = require("path");

// Third Party Package Imports
const express = require("express");
const rootDir = require("../util/path");
// Express.js Router
const router = express.Router();

// Middleware
router.get("/", (req, res, next) => {
  // __dirname global variable that points to the folder in which we are using it
  res.sendFile(path.join(rootDir, "views", "shop.html"));
});

// Export Shop Router
module.exports = router;
