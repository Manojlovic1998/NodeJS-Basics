// Third Party Package Imports
const express = require("express");
const bodyParser = require("body-parser");

// Project Imports
const adminRoutes = require("./routes/admin.js");
const shopRoutes = require("./routes/shop.js");

// Instantiate Express App
const app = express();

// Middleware
// Parses the body of the req
app.use(bodyParser.urlencoded({ extended: false }));

app.use(adminRoutes);
app.use(shopRoutes);

// Server Config
const port = 3000;

// Takes event listener as an arg.
// Simply a function that will execute for every
// incoming request
app.listen(port);
