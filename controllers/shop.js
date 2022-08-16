// Project's imports
const Product = require("../models/product");
const Cart = require("../models/cart");

const getProducts = (req, res, next) => {
  // __dirname global variable that points to the folder in which we are using it
  return Product.fetchAll((products) => {
    res.render("shop/product-list", {
      products,
      docTitle: "Shop",
      path: "/products",
    });
  });
};

const getProductDetails = (req, res, next) => {
  const productId = req.params.id;
  return Product.fetchById(productId, (product) => {
    return res.render("shop/product-detail", {
      docTitle: product.title,
      path: `/products`,
      product,
    });
  });
};

const getIndex = (req, res, next) => {
  res.render("shop/index", { docTitle: "Landing Page", path: "/" });
};

const getCart = (req, res, next) => {
  res.render("shop/cart", { docTitle: "Cart", path: "/cart" });
};

const postCart = (req, res, next) => {
  const productId = req.body.productId;
  Product.fetchById(productId, (product) => {
    Cart.addProduct(productId, product.price);
    res.redirect("/cart");
  });
};

const getCheckout = (req, res, next) => {
  res.render("shop/checkout", { docTitle: "Checkout", path: "/checkout" });
};

module.exports = {
  getProducts,
  getIndex,
  getCart,
  getCheckout,
  getProductDetails,
  postCart,
};
