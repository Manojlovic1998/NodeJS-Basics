// Imports
const fs = require("fs");

// func for event
const requestHandler = (req, res) => {
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
};

// Module is a global object exposed by node
module.exports = requestHandler;
