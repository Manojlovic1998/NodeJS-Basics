// Node.js Core Package Imports
const path = require("path");

// Third Party Package Imports
const express = require("express");
const { getAddProduct, postAddProduct } = require("../controllers/products");

// Create Express.js router
const router = express.Router();

// /admin/add-product => GET
router.get("/add-product", getAddProduct);

// /admin/add-product => POST
router.post("/add-product", postAddProduct);

exports.routes = router;
