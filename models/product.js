// Node.js core module imports
const fs = require("fs");
const path = require("path");
// Project's imports
const rootPath = require("../util/path");
const Cart = require("./cart");

// Path where data should be stored
const filePath = path.join(rootPath, "data", "products.json");

// Util for getting products from file
const getProductsFromFile = (renderCallback) => {
  // Try to read the file at the filePath
  fs.readFile(filePath, (error, fileData) => {
    // If error return empty list
    if (error) {
      return renderCallback([]);
    }

    // Fallback, if no error, parse json and return it
    return renderCallback(JSON.parse(fileData));
  });
};

class Product {
  constructor(id, title, imageUrl, description, price) {
    this.id = id;
    this.title = title;
    this.imageUrl = imageUrl;
    this.description = description;
    this.price = price;
  }

  save() {
    getProductsFromFile((products) => {
      if (this.id) {
        const existingProductIndex = products.findIndex(
          (prod) => prod.id === this.id
        );
        const updatedProducts = [...products];
        updatedProducts[existingProductIndex] = this;

        fs.writeFile(filePath, JSON.stringify(updatedProducts), (error) => {
          console.log(error);
        });
      } else {
        this.id = Math.random().toString();
        products.push(this);
        fs.writeFile(filePath, JSON.stringify(products), (error) => {
          console.log(error);
        });
      }
    });
  }

  static delete(productId) {
    getProductsFromFile((products) => {
      const product = products.find((prod) => {
        return prod.id === productId;
      });
      // Filter products by omitting the value that matched the id
      let updatedProducts = products.filter((prod) => {
        return prod.id !== productId;
      });
      fs.writeFile(filePath, JSON.stringify(updatedProducts), (error) => {
        if (!error) {
          Cart.deleteProduct(productId, product.price);
        }
      });
    });
  }

  static fetchAll(templateRenderCallback) {
    getProductsFromFile(templateRenderCallback);
  }

  static fetchById(productId, templateRenderCallback) {
    getProductsFromFile((products) => {
      let product = products.find((product) => product.id === productId);
      return templateRenderCallback(product);
    });
  }
}

module.exports = Product;
