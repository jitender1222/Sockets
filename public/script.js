var socket = io();

let input = document.getElementById("inp");
let btn = document.getElementById("btn");
let ul = document.getElementById("list");

btn.onclick = function exec() {
  socket.emit("form_client", {
    msg: input.value,
  });
};

console.log(input.value);

socket.on("form_server", (data) => {
  let msg = document.createElement("li");
  msg.innerText = data.msg;
  ul.appendChild(msg);
});
