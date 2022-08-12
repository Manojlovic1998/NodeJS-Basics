const getAddProduct = (req, res, next) => {
  res.render("add-product", {
    docTitle: "Add New Product",
    path: "/admin/add-product",
  });
};

// Dummy Products Data
const products = [];

const postAddProduct = (req, res, next) => {
  products.push({ title: req.body.title });
  res.render("shop", { products, docTitle: "Shop" });
};

const getProducts = (req, res, next) => {
  // __dirname global variable that points to the folder in which we are using it
  res.render("shop", { products, docTitle: "Shop", path: "/" });
};

module.exports = {
  getAddProduct,
  postAddProduct,
  getProducts,
};
