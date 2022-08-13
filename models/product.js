// Node.js core module imports
const fs = require("fs");
const path = require("path");
// Project's imports
const rootPath = require("../util/path");

class Product {
  constructor(title) {
    this.title = title;
  }

  save() {
    const filePath = path.join(rootPath, "data", "products.json");

    fs.readFile(filePath, (error, fileData) => {
      let products = [];

      if (!error) {
        products = JSON.parse(fileData);
      }
      products.push(this);

      fs.writeFile(filePath, JSON.stringify(products), (error) => {
        console.log(error);
      });
    });
  }

  static fetchAll() {
    return products;
  }
}

module.exports = Product;
