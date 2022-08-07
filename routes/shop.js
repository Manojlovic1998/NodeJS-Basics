// Third Party Package Imports
const express = require("express");

// Express.js Router
const router = express.Router();

// Middleware
router.get("/", (req, res, next) => {
  res.send("<h1>Hello from Express!</h1>");
});

// Export Shop Router
module.exports = router;
