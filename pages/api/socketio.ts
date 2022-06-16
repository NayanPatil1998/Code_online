import { Server, Socket } from "socket.io";
// import { Socket } from "socket.io-client"
import { ACTIONS } from "../../helpers/SocketActions";

const userSocketmap: any = {};

const ioHandler = (req: any, res: any) => {
  // console.log(res.socket.server)
  let socketio: Server = res.socket.server.io;
  if (!socketio) {
    console.log("*First use, starting socket.io");

    const io = new Server(res.socket.server);

    // io.on(ACTIONS.JOIN, ({roomId, username}) => {
    //   console.log(roomId, username)
    // })

    socketio = io;
  }
  socketio.on("connection", (socket: Socket) => {
    console.log("Socket connected", socket.id);

    socket.on(ACTIONS.JOIN, async ({ roomId , username }) => {
      userSocketmap[socket.id] = username;
      // console.log("user SocketMap", userSocketmap);
     socket.join("room");
      // console.log("Data ", roomId, username);
      const clients = getAllConnectedClients(socketio, "room");
      console.log(clients);
      clients.forEach(({ socketId }) => {
        socketio.to(socketId).emit(ACTIONS.JOINED, {
          clients,
          username,
          socketId: socket.id,
        });
      });
    });
  });
  res.end();
};

export const config = {
  api: {
    bodyParser: false,
  },
};

export default ioHandler;

function getAllConnectedClients(io: Server, roomId: string) {
  return Array.from(io.sockets.adapter.rooms.get(roomId) || []).map(
    (socketId) => {
      return {
        socketId,
        username: userSocketmap[socketId],
      };
    }
  );
}
