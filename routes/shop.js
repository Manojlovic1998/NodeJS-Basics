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
  postCartDeleteProduct,
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

// /cart/delete-item => POST
router.post("/cart/delete-item", postCartDeleteProduct);

// /checkout => GET
router.get("/checkout", getCheckout);

// Export Shop Router
module.exports = router;
