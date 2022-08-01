// Imports
const http = require("http");
const fs = require("fs");

// func for event
function reqListener(req, res) {
  let url = req.url;
  let method = req.method;

  if (url === "/") {
    // Constructs the resp package that is going to be sent
    // over the http protocol
    res.write("<html>");
    res.write("<head><title>Enter Message</title></head>");
    res.write(
      '<body><form action="/message" method="POST"><input type="text" name="message"><br/><button type="submit">Submit</button></form></body>'
    );
    res.write("</html>");
    return res.end();
  }

  if (url === "/message" && method === "POST") {
    // Package Buffer
    const body = [];
    req.on("data", (chunk) => {
      body.push(chunk);
    });

    // On package stream end
    return req.on("end", () => {
      const parsedBody = Buffer.concat(body).toString();
      const message = parsedBody.split("=")[1];

      // Write message to file
      fs.writeFile("message.txt", message, () => {
        // Response status code
        res.statusCode = 302;
        // Redirect header
        res.setHeader("Location", "/");

        return res.end();
      });
    });
  }

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

server.listen("8000", "localhost");
