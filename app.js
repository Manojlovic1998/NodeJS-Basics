// Imports
const http = require("http");

// Takes event listener as an arg.
// Simply a function that will execute for every
// incoming request
const server = http.createServer(routes);

server.listen("3000", "localhost");
