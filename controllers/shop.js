const Product = require("../models/product");

const getProducts = (req, res, next) => {
  // __dirname global variable that points to the folder in which we are using it
  Product.fetchAll((products) => {
    res.render("shop/product-list", {
      products,
      docTitle: "Shop",
      path: "/products",
    });
  });
};

const getIndex = (req, res, next) => {
  res.render("shop/index", { docTitle: "Landing Page", path: "/" });
};

const getCart = (req, res, next) => {
  res.render("shop/cart", { docTitle: "Cart", path: "/cart" });
};

const getCheckout = (req, res, next) => {
  res.render("shop/checkout", { docTitle: "Checkout", path: "/checkout" });
};

module.exports = {
  getProducts,
  getIndex,
  getCart,
  getCheckout,
};
