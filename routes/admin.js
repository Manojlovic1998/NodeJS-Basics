// Node.js Core Package Imports
const path = require("path");

// Third Party Package Imports
const express = require("express");

// Create Express.js router
const router = express.Router();

// Dummy Products Data
const products = [];

// /admin/add-product => GET
router.get("/add-product", (req, res, next) => {
  res.render("add-product", {
    docTitle: "Add New Product",
    path: "/admin/add-product",
  });
});

// /admin/add-product => POST
router.post("/add-product", (req, res, next) => {
  products.push({ title: req.body.title });
  res.render("shop", { products, docTitle: "Shop" });
});

exports.routes = router;
exports.products = products;
