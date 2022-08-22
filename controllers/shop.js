// Project's imports
const Product = require("../models/product");
const Cart = require("../models/cart");

const getProducts = (req, res, next) => {
  Product.findAll()
    .then((products) => {
      res.render("shop/product-list", {
        docTitle: "Product Listing",
        products: products,
        path: "/products",
      });
    })
    .catch((err) => {
      console.log(err);
    });
};

const getProductDetails = (req, res, next) => {
  const productId = req.params.id;
  Product.fetchById(productId)
    .then(([row, fieldData]) => {
      console.log(row[0]);
      res.render("shop/product-detail", {
        docTitle: row[0].title,
        path: `/products`,
        product: row[0],
      });
    })
    .catch((error) => console.log(error));
};

const getIndex = (req, res, next) => {
  res.render("shop/index", { docTitle: "Landing Page", path: "/" });
};

const getCart = (req, res, next) => {
  Cart.getCart((cart) => {
    Product.fetchAll((products) => {
      const cartProducts = [];
      for (product of products) {
        const cartProductData = cart.products.find((prod) => {
          return prod.id === product.id;
        });
        if (cartProductData) {
          cartProducts.push({ productData: product, qty: cartProductData.qty });
        }
      }
      res.render("shop/cart", {
        docTitle: "Cart",
        path: "/cart",
        products: cartProducts,
      });
    });
  });
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

const postCartDeleteProduct = (req, res, next) => {
  const prodId = req.body.productId;
  Product.fetchById(prodId, (product) => {
    Cart.deleteProduct(prodId, product.price);
    res.redirect("/cart");
  });
};

module.exports = {
  getProducts,
  getIndex,
  getCart,
  getCheckout,
  getProductDetails,
  postCart,
  postCartDeleteProduct,
};
