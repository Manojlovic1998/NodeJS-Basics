// Core Nodejs imports
const path = require("path");
const fs = require("fs");
// Project's imports
const rootPath = require("../util/path");

module.exports = class Cart {
  static addProduct(id, productPrice) {
    // Fetch the previous cart
    fs.readFile(path.join(rootPath, "data", "cart.json"), (error, fileData) => {
      // Default cart
      let cart = { products: [], totalPrice: 0 };
      // If file exists
      if (!error) {
        cart = JSON.parse(fileData);
      }
      // Analyze the cart => Find existing product
      const existingProductIndex = cart.products.findIndex(
        (prod) => prod.id === id
      );
      const existingProduct = cart.products[existingProductIndex];

      let updatedProduct;
      if (existingProduct) {
        updatedProduct = { ...existingProduct };
        updatedProduct.qty = updatedProduct.qty + 1;
        cart.products = [...cart.products];
        cart.products[existingProductIndex] = updatedProduct;
      } else {
        updatedProduct = { id: id, qty: 1 };
        cart.products = [...cart.products, updatedProduct];
      }
      cart.totalPrice = cart.totalPrice + +productPrice;
      fs.writeFile(
        path.join(rootPath, "data", "cart.json"),
        JSON.stringify(cart),
        (error) => {
          console.log(error);
        }
      );
    });
  }
};
