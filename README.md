# NodeJS Basics

This project coveres NodeJS basics, such as:

- Creating a Node Server
- Node Lifecycle & Event Loop
- Understanding Requests
- Sending Responses
- Request & Response Headers
- Routing Requests
- Redirecting Requests
- Parsing Request Bodies
- Understanding Event Driven Code Execution
- Blocking and Non-Blocking Code
- Node Module System

## Creating a Node Server

To spin up a server using Node you need to import some of the Node's core functionality.

Node Core Modules:

- _http_ module is designed with http interface to support many of the protocols features.
- _https_ module is designed for http protocol over TLS/SSL.
- _fs_ module enables us to interact with the file system. In a way it is modeled on standard POSIX functions.
- _path_ module provides utillities for working with file and directory paths.
- os module provides utilities such as methods and properties used for interacting with the operating system.

When importing modules it is important to take a note of the path format used for the module import. In case you are using relative path the `require("./http")` the require method will look for module within the relative path. However, if you use just the module name, then it will look at the global scope and try to find the NodeJS module there.

```JavaScript
// NodeJS Imports
const http = require("http");

// func. for event listner
// Simply a function that will execute for every
// incoming request. It will print the the req to the stdout medium,
// in case of running it from the terminal emulator it will default to it.
function reqListener(req, res) {
console.log(req);
}

// Takes event listner func as an arg.
const server = http.createServer(reqListener);

// Listen to port 3000 at your localhost address for incoming req
server.listen("3000", "localhost");
```
