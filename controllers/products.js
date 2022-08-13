const Product = require("../models/product");

const getAddProduct = (req, res, next) => {
  res.render("add-product", {
    docTitle: "Add New Product",
    path: "/admin/add-product",
  });
};

const postAddProduct = (req, res, next) => {
  const product = new Product(req.body.title);
  product.save();
  res.redirect("/");
};

const getProducts = (req, res, next) => {
  // __dirname global variable that points to the folder in which we are using it
  const products = Product.fetchAll();
  res.render("shop", { products, docTitle: "Shop", path: "/" });
};

module.exports = {
  getAddProduct,
  postAddProduct,
  getProducts,
};
