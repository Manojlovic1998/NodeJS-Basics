// Core Node.js Imports
const path = require("path");

// Third Party Package Imports
const express = require("express");
// Project Imports
const {
  getProducts,
  getIndex,
  getCart,
  getCheckout,
} = require("../controllers/shop");

// Express.js Router
const router = express.Router();

// Middleware
router.get("/", getIndex);

router.get("/products", getProducts);

router.get("/cart", getCart);

router.get("/checkout", getCheckout);

// Export Shop Router
module.exports = router;
