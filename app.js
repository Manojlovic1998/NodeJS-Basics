// Core Node.js Package Imports
const path = require("path");
// Third Party Package Imports
const express = require("express");
const bodyParser = require("body-parser");
// Project Imports
const adminRoutes = require("./routes/admin.js");
const shopRoutes = require("./routes/shop.js");
const { get404ErrorPage } = require("./controllers/errors");
const sequelize = require("./util/database");
// Instantiate Express App
const app = express();

// Set a global value for template engine
app.set("view engine", "pug");
// Set dir where app's views can be found
app.set("views", "views");

// Middleware
// Parses the body of the req
app.use(bodyParser.urlencoded({ extended: false }));
// Serve static files from public using the FS
app.use(express.static(path.join(__dirname, "public")));
app.use("/admin", express.static(path.join(__dirname, "public")));

// Admin Router, with /admin filter
app.use("/admin", adminRoutes.routes);
// Shop Router
app.use(shopRoutes);

// 404 Route
app.use(get404ErrorPage);

// Server Config
const port = 3000;

// Sync database models
sequelize
  .sync()
  .then((result) => {
    // Takes event listener as an arg.
    // Simply a function that will execute for every
    // incoming request
    app.listen(port);
  })
  .catch((error) => {
    console.log(error);
  });
