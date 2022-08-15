// Third Party Package Imports
const express = require("express");
// Project Imports
const {
  getProducts,
  getIndex,
  getCart,
  getCheckout,
  getProductDetails,
  postCart,
} = require("../controllers/shop");

// Express.js Router
const router = express.Router();

// / => GET
router.get("/", getIndex);

// /products => GET
router.get("/products", getProducts);

// /products/:id => GET
router.get("/products/:id", getProductDetails);

// /cart => GET
router.get("/cart", getCart);

// /cart => POST
router.post("/cart", postCart);

// /checkout => GET
router.get("/checkout", getCheckout);

// Export Shop Router
module.exports = router;
