// Core NodeJS Imports
const http = require("http");

// Third Party Package Imports
const express = require("express");

// Instantiate Express App
const app = express();

// Middleware
app.use((req, res, next) => {
  console.log("First middleware!");
  next();
});

app.use((req, res, next) => {
  console.log("Second middleware!");
  res.send("<h1>This is second middleware response!</h1>");
});

// Takes event listener as an arg.
// Simply a function that will execute for every
// incoming request
const server = http.createServer(app);

server.listen("3000", "localhost");
