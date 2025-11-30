import express from "express";
import { Server } from "socket.io";
const app = express();
import http from "http";
const server = http.createServer(app);
const io = new Server(server);
let users = {};
io.on("connection", (socket) => {
  socket.on("join-room", ({ roomId, username }) => {
    if (!users[roomId]) {
      users[roomId] = [];
    }
    // handling duplicates
    users[roomId] = users[roomId].filter(
      (user) => user.username !== username
    );
    users[roomId].push({ socketId: socket.id, username: username });
    socket.join(roomId);
    io.to(roomId).emit("joined", { clients: users[roomId],newUser:username,socketId:socket.id});
  });
  socket.on('code-change',({roomId,code})=>{
    io.to(roomId).emit('code-change',code)
  })
});

const Port = process.env.PORT || "3000";
server.listen(Port, () => {
  console.log(`server is running on port ${Port}`);
});
