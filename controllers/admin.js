// Project's imports
const Product = require("../models/product");
const getProductList = (req, res, next) => {
  Product.findAll()
    .then((products) => {
      res.render("admin/product-list", {
        docTitle: "Product Listing",
        products: products,
      });
    })
    .catch((err) => {
      console.log(err);
    });
};

const getEditProduct = (req, res, next) => {
  let editing = req.query.edit;
  if (editing !== "true") {
    return res.redirect("/");
  }

  let productId = req.params.id;
  Product.findByPk(productId)
    .then((product) => {
      if (!product) {
        return res.redirect("/");
      }

      res.render("admin/edit-product", {
        docTitle: "Edit Product",
        path: "/admin/edit-product",
        product,
        editing,
      });
    })
    .catch((err) => {
      console.log(err);
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
  Product.update(
    {
      title: prodTitle,
      description: prodDesc,
      imageUrl: prodImgUrl,
      price: prodPrice,
    },
    {
      where: {
        id: prodId,
      },
    }
  )
    .then(() => {
      res.redirect("/admin/product-list");
    })
    .catch((err) => {
      console.log(err);
    });
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
  Product.create({
    title: title,
    price: price,
    imageUrl: imageUrl,
    description: description,
  })
    .then((result) => {
      console.log(result);
      res.redirect("/products");
    })
    .catch((err) => {
      console.log(err);
    });
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
