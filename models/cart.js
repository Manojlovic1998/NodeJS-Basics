// Core Nodejs imports
const path = require("path");
const fs = require("fs");
// Project's imports
const rootPath = require("../util/path");

const cartStorePath = path.join(rootPath, "data", "cart.json");

module.exports = class Cart {
  static addProduct(id, productPrice) {
    // Fetch the previous cart
    fs.readFile(cartStorePath, (error, fileData) => {
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
      fs.writeFile(cartStorePath, JSON.stringify(cart), (error) => {
        console.log(error);
      });
    });
  }

  static deleteProduct(id, productPrice) {
    fs.readFile(cartStorePath, (error, fileStoreData) => {
      if (error) {
        return;
      }

      const cart = JSON.parse(fileStoreData);
      const updatedCart = { ...cart };
      const product = updatedCart.products.find((prod) => (prod.id = id));
      const productQty = product.qty;
      updatedCart.products = updatedCart.products.filter(
        (prod) => prod.id !== id
      );
      updatedCart.totalPrice =
        updatedCart.totalPrice - productPrice * productQty;

      fs.writeFile(cartStorePath, JSON.stringify(updatedCart), (error) => {
        console.log(error);
      });
    });
  }

  static getCart(getCartCallBack) {
    fs.readFile(cartStorePath, (error, fileStoreData) => {
      const cartData = JSON.parse(fileStoreData);
      if (error) {
        getCartCallBack(null);
      } else {
        getCartCallBack(cartData);
      }
    });
  }
};
