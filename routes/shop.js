// Core Node.js Imports
const path = require("path");

// Third Party Package Imports
const express = require("express");
// Project Imports
const { getProducts } = require("../controllers/products");

// Express.js Router
const router = express.Router();

// Middleware
router.get("/", getProducts);

// Export Shop Router
module.exports = router;
