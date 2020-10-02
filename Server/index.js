const express = require("express");
const socketio = require("socket.io");
const http = require("http");
const {
  addUsers,
  removeUsers,
  getUsers,
  getSpecificUsers,
} = require("./Users/Users");

const PORT = process.env.PORT || 1100;

const router = require("./Router/Router");

const app = express();

const server = http.createServer(app);

const io = socketio(server);

io.on("connection", (socket) => {
  socket.on("join", ({ name, room }, callback) => {
    const { error, user } = addUsers({ id: socket.id, name, room });

    if (error) {
      return callback(error);
    }
    socket.emit("message", {
      user: "Administrador",
      text: `${user.name} Welcome to the room ${user.room}`,
    });

    socket.broadcast.to(user.room).emit("message", {
      user: "Administrador",
      text: `${user.name} Has joined the ${user.room}}`,
    });

    socket.join(user.room);

    callback();
  });

  socket.on("sendMessage", (message, callback) => {
    const user = getUsers(socket.id);

    io.to(user.room).emit("message", { user: user.name, text: message });

    callback();
  });

  socket.on("disconnect", () => {
    console.log("Some user had left the Chat from backend!");
  });
});

app.use(router);

server.listen(PORT, () => console.log(`Server has started on PORT ${PORT}`));
