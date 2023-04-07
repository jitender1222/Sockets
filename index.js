const express = require("express");

// creata a socketio
const socketio = require("socket.io");

// creating a http request
const http = require("http");

const app = express();

// creating a server
const Server = http.createServer(app);
const io = socketio(Server);

// making a connection when an event is triggered
io.on("connection", (socket) => {
  console.log("a user is connected", socket.id);

  socket.on("form_client", () => {
    console.log("event coming from client");
  });

  setInterval(() => {
    socket.emit("from_server");
  }, 4000);
});

app.use("/", express.static(__dirname + "/public"));

// establishing a web socket connection
Server.listen(3000, () => {
  console.log("Server is started");
});
