// Core Node.js Package Imports
const path = require("path");

// Third Party Package Imports
const express = require("express");
const bodyParser = require("body-parser");
// Project Imports
const adminRoutes = require("./routes/admin.js");
const shopRoutes = require("./routes/shop.js");
const rootDir = require("./util/path.js");

// Instantiate Express App
const app = express();

// Middleware
// Parses the body of the req
app.use(bodyParser.urlencoded({ extended: false }));
// Serve static files from public using the FS
app.use(express.static(path.join(rootDir, "public")));

// Router with /admin filter
app.use("/admin", adminRoutes);
// Router
app.use(shopRoutes);

// 404 Route
app.use((req, res, next) => {
  res.status(404).sendFile(path.join(__dirname, "views", "404-page.html"));
});

// Server Config
const port = 3000;

// Takes event listener as an arg.
// Simply a function that will execute for every
// incoming request
app.listen(port);
