// Node.js Core Package Imports
const path = require("path");

// Third Party Package Imports
const express = require("express");

// Project Imports
const rootDir = require("../util/path");

// Create Express.js router
const router = express.Router();

// Dummy Products Data
const products = [];

// /admin/add-product => GET
router.get("/add-product", (req, res, next) => {
  res.sendFile(path.join(rootDir, "views", "add-product.html"));
});

// /admin/add-product => POST
router.post("/add-product", (req, res, next) => {
  console.log(req.body);
  products.push({ title: req.body.title });
  res.redirect("/");
});

exports.routes = router;
exports.products = products;
