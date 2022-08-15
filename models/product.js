// Node.js core module imports
const fs = require("fs");
const path = require("path");
// Project's imports
const rootPath = require("../util/path");

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
      products.push(this);
      fs.writeFile(filePath, JSON.stringify(products), (error) => {
        console.log(error);
      });
    });
  }

  static fetchAll(templateRenderCallback) {
    getProductsFromFile(templateRenderCallback);
  }

  static fetchById(templateRenderCallback) {
    this.fetchAll((products) => {
      return templateRenderCallback(products);
    });
  }
}

module.exports = Product;
