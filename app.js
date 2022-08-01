// Imports
const http = require("http");

// func for event
function reqListener(req, res) {
  // Logs the req received
  console.log(req.url, req.method, req.headers);

  // Constructs the resp package that is going to be sent
  // over the http protocol
  res.setHeader("Content-Type", "text/html");
  res.write("<html>");
  res.write("<head><title>My First Page</title></head>");
  res.write("<body><h1>My First Page</h1></body>");
  res.write("</html>");
  res.end();
}

// Takes event listner as an arg.
// Simply a function that will execute for every
// incoming request
const server = http.createServer(reqListener);

server.listen("3000", "localhost");
