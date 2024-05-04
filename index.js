const express = require("express");
const cors = require("cors");
const http = require("http");
const { Socket } = require("socket.io");
const { Server } = require("socket.io");

const app = express();
app.use(cors());

const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: "https://makvana-karan.github.io/ChatApp_frontend/",
    methods: ["GET", "POST"],
  },
});

io.on("connection", (socket) => {
  console.log(`user connect in ${socket.id}`);

  socket.on("join_room", (data) => {
    socket.join(data);
  });

  socket.on("send_message", (data) => {
    socket.to(data.room).emit("receive_message", data);
  });

  socket.on("disconnect", () => {
    console.log("user disconnected", socket.id);
  });
});

server.listen(3001, () => {
  console.log("listening on 3001");
});
