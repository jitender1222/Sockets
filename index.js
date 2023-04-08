const express = require("express");

// creata a socketio
const socketio = require("socket.io");

// creating a http request
const http = require("http");

const connect = require("./config/db");
const Chat = require("./models/chatSchema");

const app = express();

// creating a server
const Server = http.createServer(app);
const io = socketio(Server);

// making a connection when an event is triggered
io.on("connection", (socket) => {
  socket.on("join_room", (data) => {
    socket.join(data.roomid);
  });

  socket.on("form_client", async (data) => {
    const chat = await Chat.create({
      roomId: data.roomid,
      content: data.msg,
      user: data.username,
    });
    io.to(data.roomid).emit("form_server", data);
  });
});

// set up ejs
app.set("view engine", "ejs");

app.use("/", express.static(__dirname + "/public"));

app.get("/chat/:roomid", async (req, res) => {
  const chats = await Chat.find({
    id: req.params.id,
  }).select("content user");
  console.log(chats);
  res.render("index", {
    name: "jitender",
    id: req.params.roomid,
    chats: chats,
  });
});

// establishing a web socket connection
Server.listen(3000, async () => {
  console.log("Server is started");
  await connect();
});
