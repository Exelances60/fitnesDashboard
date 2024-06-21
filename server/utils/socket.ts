import { Server } from "socket.io";
import { IncomingMessage, ServerResponse, Server as ServerType } from "http";

export const socket = (
  server: ServerType<typeof IncomingMessage, typeof ServerResponse>
) => {
  const io = new Server(server, {
    cors: {
      origin: "http://localhost:3000",
      methods: ["GET", "POST"],
    },
  });

  io.on("connection", async (socket) => {
    socket.on("disconnect", () => {
      console.log("user disconnected");
    });
  });
};
