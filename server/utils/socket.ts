import { Server } from "socket.io";
import { IncomingMessage, ServerResponse, Server as ServerType } from "http";
import { encrypt } from "./crypto-utils";
import { ChatRepository } from "../repository/ChatRepositroy";
import { IChat } from "../models/Chat";
import Message from "../models/Message";

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
    console.log("a user connected");

    socket.on("joinRoom", (chatId) => {
      socket.join(chatId);
    });

    socket.on("notification", (notification) => {
      io.emit("notification", notification);
    });

    socket.on("disconnect", () => {
      console.log("user disconnected");
    });

    socket.on("message", async (message) => {
      io.emit("message", message);
    });

    socket.on("sendMessage", async (message) => {
      io.emit("notification", message);
      const encryptedMessage = encrypt(message.content as string);
      const newMessage = await Message.create({
        chatId: message.chatId,
        senderId: message.senderId,
        receiverId: message.receiverId,
        content: encryptedMessage,
      });

      const chat = await new ChatRepository().findById<IChat>(message.chatId);
      chat?.messages.push(newMessage._id);
      chat?.save();

      io.to(message.chatId).emit("message", newMessage);
    });
  });
};
