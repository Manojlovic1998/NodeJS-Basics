const Product = require("../models/product");

const getProductList = (req, res, next) => {
  return Product.fetchAll((products) => {
    return res.render("admin/product-list", {
      docTitle: "Admin Product Listing",
      path: "/admin/product-list",
      products: products,
    });
  });
};

const getEditProduct = (req, res, next) => {
  let editing = req.query.edit;
  if (editing !== "true") {
    return res.redirect("/");
  }

  res.render("admin/edit-product", {
    docTitle: "Edit Product",
    path: "/admin/edit-product",
    editing,
  });
};

const getAddProduct = (req, res, next) => {
  res.render("admin/add-product", {
    docTitle: "Add New Product",
    path: "/admin/add-product",
  });
};

const postAddProduct = (req, res, next) => {
  const id = Math.random().toString();
  const title = req.body.title;
  const description = req.body.description;
  const imageUrl = req.body.imageUrl;
  const price = req.body.price;

  const product = new Product(id, title, imageUrl, description, price);
  product.save();
  res.redirect("/products");
};

module.exports = {
  getAddProduct,
  postAddProduct,
  getProductList,
  getEditProduct,
};
