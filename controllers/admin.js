const Product = require("../models/product");

const getProductList = (req, res, next) => {
  return Product.fetchAll()
    .then(([rows, fieldData]) => {
      res.render("admin/product-list", {
        docTitle: "Admin Product Listing",
        path: "/admin/product-list",
        products: rows,
      });
    })
    .catch((error) => {
      console.log(error);
    });
};

const getEditProduct = (req, res, next) => {
  let editing = req.query.edit;
  if (editing !== "true") {
    return res.redirect("/");
  }

  let productId = req.params.id;
  Product.fetchById(productId, (product) => {
    if (!product) {
      return res.redirect("/");
    }

    res.render("admin/edit-product", {
      docTitle: "Edit Product",
      path: "/admin/edit-product",
      product,
      editing,
    });
  });
};

const postEditProduct = (req, res, next) => {
  // Req. body data
  const prodId = req.body.productId;
  const prodTitle = req.body.title;
  const prodDesc = req.body.description;
  const prodImgUrl = req.body.imageUrl;
  const prodPrice = req.body.price;
  // Product init
  const updatedProduct = new Product(
    prodId,
    prodTitle,
    prodImgUrl,
    prodDesc,
    prodPrice
  );
  updatedProduct.save();
  return res.redirect("/admin/product-list");
};

const getAddProduct = (req, res, next) => {
  res.render("admin/add-product", {
    docTitle: "Add New Product",
    path: "/admin/add-product",
  });
};

const postAddProduct = (req, res, next) => {
  const title = req.body.title;
  const description = req.body.description;
  const imageUrl = req.body.imageUrl;
  const price = req.body.price;

  const product = new Product(null, title, imageUrl, description, price);
  product.save();
  res.redirect("/products");
};

const postDeleteProduct = (req, res, next) => {
  const prodId = req.body.productId;
  Product.delete(prodId);
  res.redirect("/products");
};

module.exports = {
  getAddProduct,
  postAddProduct,
  getProductList,
  getEditProduct,
  postEditProduct,
  postDeleteProduct,
};
