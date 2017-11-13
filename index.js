const express = require("express");
const app = express();
const server = require('http').Server(app);
const io = require('socket.io')(server);

var port = process.env.PORT || 8080;

server.listen(port);

app.use((err, request, response, next) => {
  console.log(err);
  response.status(500).send('Something broke!');
});

app.use(express.static('public'));

io.on("connection", (socket) => {
  console.log("A client connected!")
  socket.on("sendMessage", (data) => {
    io.emit("message", {target: data.target, message: data.message, displayTime: data.displayTime || 5000});
  });
  socket.on("disconnect", () => {
    console.log("A client disconnected!");
  });
});

console.log(`Ready! (Port: ${port})`);
