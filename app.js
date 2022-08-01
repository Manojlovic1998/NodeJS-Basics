// Imports
const http = require("http");

// func for event
function reqListener(req, res) {
  console.log(req);
}

// Takes event listner as an arg.
// Simply a function that will execute for every
// incoming request
const server = http.createServer(reqListener);

server.listen("3000", "localhost");
