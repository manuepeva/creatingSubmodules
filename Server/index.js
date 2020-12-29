const express = require("express");
const socketio = require("socket.io");
const http = require("http");
const cors = require("cors");

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

app.use(router);

app.use(cors());

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
      text: `${user.name} Has joined the ${user.room}`,
    });

    socket.join(user.room);

    io.to(user.room).emit("roomData", {
      room: user.room,
      users: getSpecificUsers(user.room),
    });

    callback();
  });

  socket.on("sendMessage", (message, callback) => {
    const user = getUsers(socket.id);

    io.to(user.room).emit("message", { user: user.name, text: message });

    io.to(user.room).emit("roomData", {
      room: user.room,
      users: getSpecificUsers(user.room),
    });

    callback();
  });

  socket.on("disconnect", () => {
    const user = removeUsers(socket.id);

    if (user) {
      io.to(user.room).emit("message", {
        user: "Administrador",
        text: `${user.name} has left the Room ${user.room}`,
      });
    }
  });
});

server.listen(PORT, () => console.log(`Server has started on PORT ${PORT}`));
