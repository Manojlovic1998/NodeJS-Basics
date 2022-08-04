# NodeJS Basics

This project covers NodeJS basics, such as:

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
- _path_ module provides utilities for working with file and directory paths.
- os module provides utilities such as methods and properties used for interacting with the operating system.

When importing modules it is important to take a note of the path format used for the module import. In case you are using relative path the `require("./http")` the require method will look for module within the relative path. However, if you use just the module name, then it will look at the global scope and try to find the NodeJS module there.

```JavaScript
// NodeJS Imports
const http = require("http");

// func. for event listener
// Simply a function that will execute for every
// incoming request. It will print the the req to the stdout medium,
// in case of running it from the terminal emulator it will default to it.
function reqListener(req, res) {
console.log(req);
}

// Takes event listener func as an arg.
const server = http.createServer(reqListener);

// Listen to port 3000 at your localhost address for incoming req
server.listen("3000", "localhost");
```

## NodeJS Program Lifecycle

Note: A process is an active entity as opposed to a program, which is considered to be a passive entity. A new process is created only when running an executable file.

**Preamble:**
NodeJS is JavaScript runtime that is built on top of Chrome's V8 engine. It uses an event-driven, non-blocking I/O model that makes it most scalable and popular framework.
Non-blocking means that multiple requests can be processed in parallel.

**The Event loop:**
Event loop makes tasks very fast and is also able to perform multitasking. Event loop is what allows NodeJS to perform non-blocking I/O operations. NodeJS is single-threaded event-driven platform that is capable of running non-blocking, asynchronous programs. It does this by assigning operations to the operating system whenever and wherever possible.

Now, most operating systems are multi-threaded hence can handle multiple operations executing in the background. When one process is completed the kernel tells Node.js this and the respective callback assigned to that operation is added to the event queue which will eventually be executed.

_Event loop features_ are:

- Event loop is an endless loop, which waits to receive tasks, it then executes them and then sleeps until it receives more tasks.
- The event loop executes tasks from the event queue only when the call stack is empty i.e there is no ongoing task.
- The event loop allows us to use callbacks and promisees.
- The event loop executes the tasks starting from the oldest first.

**How Event Loop Works?**

When NodeJS starts it initializes the event loop. The event loop uses one single javascript thread to handle requests. The event loop is responsible for handling event callbacks. Event loop is aware of the callbacks and the events that trigger them.

In Node.js _libuv_ module is used to perform async operations. This module/lib. is also used by the Nodejs logic to manage a special thread pool called _libuv thread pool_. This thread pool is comprised of four threads. To this thread pool (worker pool)operations that are resource heavy are offloaded by the event loop. Example of such heavy processes are: opening and closing network connections, I/O streams of data to a file, setting timeouts and intervals...

The libuv thread pool may complete a task which in turn results in a signal being picked up by NodeJS which in turn triggers the callback function that handles errors or other operations depending on the process that was executed by the thread. This callback function is not immediately executed. It is first sent to the event queue. In the event queue there is order of function execution which NodeJS follows. Depending on the phase in which the current event loop iteration is depends what will be done by the event loop.

The event loop has a certain order at which it goes through the callbacks.

In the beginning of the iteration it checks for _timers_ (tries to execute setTimeout, setInterval callbacks) and executes any due timer callbacks.

In the second phase of iteration it goes through any _pending callbacks_ that are related to I/O processes. I/O operations are typically file operations and some sort of network operations where data is streamed. At some point NodeJS will leave this part of the iteration phase and move to the next one, even if there are many callbacks standing in the event queue it will leave them for the next iteration.

In the third phase of iteration event loop will enter the _poll phase_. In poll phase it will look for new I/O events and, if possible, it will execute their callbacks immediately. If it is not possible to execute their callbacks immediately it will add them as a _pending callbacks_ to be executed in the next iteration. Additionally, in the poll phase it will again check for any timer based callbacks that are due to be executed and if that is the case it will jump to the _timer phase_ and execute them right away. Otherwise, it will continue to the next phase.

The fourth phase is called the _check phase_ where any `setImmediate()` callbacks will be executed. `setImediate()` is a bit like `setTimeout()` or `setInterval()` it is just that it executes immediately but after open callbacks have been executed. They will execute faster but after the current cycle has finished with the open callbacks.

The last phase is _close callbacks_ during this phase some close callbacks are executed such as `socket.on('close',...)`.

Internally NodeJS keeps track of its open event listeners, it has a counter/references which it increments by one for every new callback that is registered and reduces the counter by one for every event listener that it does not need anymore or that it has finished.

[Additional Reading Material](https://nodejs.org/en/docs/guides/event-loop-timers-and-nexttick/)

![NodeJS Libuv Thread Pool Diagram](assets/img/nodejs-event-loop-diagram.png)

## Requests & Responses in NodeJS

Accessing the contents of the req. received by the nodejs server is easy. If you have have created the basic http server setup, the req. and res. objects will be provided to the callback function.

When it comes to constructing the response package, nodejs server provides the callback func. with the second argument object which includes all the necessary methods to do so.

```JavaScript

const server = http.createServer((req, res) => {
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
});
```

Note: The above code is the most basic setup that you could use to run a server. For production grade applications you are not going to use this approach. This approach is more to show the very basics of NodeJS. Good example would be the Express.js framework.
