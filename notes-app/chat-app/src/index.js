const path = require("path");
const http = require("http");
const express = require("express");
const socketio = require("socket.io");

const app = express();
const server = http.createServer(app);
const io = socketio(server);

const port = process.env.PORT || 3000
//Define path for Express configuration
const publicDirectoryPath = path.join(__dirname, "../public")
//use Express middleware to serve public content
app.use(express.static(publicDirectoryPath));

//Prints a new message when a new user connects
io.on("connection", () => {
    console.log("New WebSocket connection");
});


server.listen(port, () => {
    console.log(`Server is up and running in ${port}`);
});




/*We have everything we need to actually configure the server
We going to use the express static middleware to serve up whatever is at the
publicDirectoryPath this is all done on lines 1-13
*/

/*WebSocket protocol is used when creating real time applications with Node.JS
Set up communications: starts with the server, clients can connect
Full duplix communication - they both can initiate communications with one another
The difference between HTTP requests and WebSockerts is that HTTP requests is one way communications
This is important when making a chat app
persistent communication
*/  

/* What we just did when we tweeked up this page and refactored 
was that we created teh server outside of the express library
we are creating it ourselves and configuring it to use our express app, 
then we are starting it up using server.listen. With this in place it is 
going to be easy to set up socket.io. Socket IO is expected to be called 
with the raw http server when express creates that behind the scenes, 
we do not have access to that to pass it to the const io, which is why 
we have created it on our own with the const name server.
*/