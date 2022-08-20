// Project's imports
const Cart = require("./cart");
const db = require("../util/database");

class Product {
  constructor(id, title, imageUrl, description, price) {
    this.id = id;
    this.title = title;
    this.imageUrl = imageUrl;
    this.description = description;
    this.price = price;
  }

  save() {}

  static delete(productId) {}

  static fetchAll() {
    return db.execute("SELECT * FROM products");
  }

  static getById(productId) {}
}

module.exports = Product;
