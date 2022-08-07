// Core NodeJS Imports
const http = require("http");

// Third Party Package Imports
const express = require("express");

// Instantiate Express App
const app = express();

// Takes event listener as an arg.
// Simply a function that will execute for every
// incoming request
const server = http.createServer(app);

server.listen("3000", "localhost");
