// Third Party Package Imports
const express = require("express");

// Create Express.js router
const router = express.Router();

// Middleware
router.get("/add-product", (req, res, next) => {
  res.send(
    '<form action="/product" method="POST"><input type="text" name="title"><button type="submit">Submit</button></form>'
  );
});

// Middleware
router.post("/product", (req, res, next) => {
  console.log(req.body);
  res.redirect("/");
});

module.exports = router;
