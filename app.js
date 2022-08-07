// Core NodeJS Imports
const http = require("http");

// Third Party Package Imports
const express = require("express");
const bodyParser = require("body-parser");

// Instantiate Express App
const app = express();

// Middleware
// Parses the body of the req
app.use(bodyParser.urlencoded({ extended: false }));

// Middleware
app.use("/add-product", (req, res, next) => {
  console.log(req.body);
  res.send(
    '<form action="/add-product" method="POST"><input type="text" name="title"><button type="submit">Submit</button></form>'
  );
});

// Middleware
app.use("/", (req, res, next) => {
  console.log("First middleware!");
  res.send("<h1>Hello from Express!</h1>");
  next(); // Allows the request to continue to the next middleware in line.
});

// Server Config
const port = 3000;

// Takes event listener as an arg.
// Simply a function that will execute for every
// incoming request
app.listen(port);
