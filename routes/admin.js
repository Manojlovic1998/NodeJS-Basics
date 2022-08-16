// Node.js Core Package Imports
const path = require("path");

// Third Party Package Imports
const express = require("express");
const {
  getAddProduct,
  postAddProduct,
  getProductList,
  getEditProduct,
} = require("../controllers/admin");

// Create Express.js router
const router = express.Router();

// /admin/add-product => GET
router.get("/add-product", getAddProduct);

// /admin/products => GET
router.get("/product-list", getProductList);

// /admin/edit-product => GET
router.get("/edit-product/:id", getEditProduct);

// /admin/add-product => POST
router.post("/add-product", postAddProduct);

exports.routes = router;
