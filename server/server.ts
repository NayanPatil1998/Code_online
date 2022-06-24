import express from "express";
import path from "path";
import http from "http";
import { Server } from "socket.io";
import { ACTIONS } from "./SocketActions";

const app = express();
const server = http.createServer(app);
const io = new Server(server);

const userSocketMap: any = {};
function getAllConnectedClients(roomId: string) {
  // Map
  return Array.from(io.sockets.adapter.rooms.get(roomId) || []).map(
    (socketId) => {
      return {
        socketId,
        username: userSocketMap[socketId],
      };
    }
  );
}

io.on("connection", (socket) => {
  console.log("socket connected", socket.id);

  socket.on(ACTIONS.JOIN, ({ roomId, username }) => {
    userSocketMap[socket.id] = username;
    socket.join(roomId);
    const clients = getAllConnectedClients(roomId);
    clients.forEach(({ socketId }) => {
      io.to(socketId).emit(ACTIONS.JOINED, {
        clients,
        username,
        socketId: socket.id,
      });
    });
  });

  socket.on(ACTIONS.CODE_CHANGE, ({ roomId, html,css, js }) => {
      socket.in(roomId).emit(ACTIONS.CODE_CHANGE, { html,css, js });
  });

  socket.on(ACTIONS.SYNC_CODE, ({ socketId, html,css, js }) => {
    console.log(html,css, js)

      io.to(socketId).emit(ACTIONS.CODE_CHANGE, { html,css, js });
  });

  socket.on("disconnecting", () => {
    const rooms = Array.from(socket.rooms);
    rooms.forEach((roomId) => {
      socket.in(roomId).emit(ACTIONS.DISCONNECTED, {
        socketId: socket.id,
        username: userSocketMap[socket.id],
      });
      socket.leave(roomId);
    });
    delete userSocketMap[socket.id];
  });
});

const PORT = process.env.PORT || 5000;
server.listen(PORT, () => console.log(`Listening on port ${PORT}`));
