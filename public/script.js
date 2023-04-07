var socket = io();

socket.on("from_server", () => {
  const div = document.createElement("div");
  div.innerText = "New message from server";
  document.body.appendChild(div);
});

let btn = document.getElementById("btn");

btn.onclick = function exec() {
  socket.emit("form_client");
};
