"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.socket = void 0;
const socket_io_1 = require("socket.io");
const crypto_utils_1 = require("./crypto-utils");
const ChatRepositroy_1 = require("../repository/ChatRepositroy");
const Message_1 = __importDefault(require("../models/Message"));
const socket = (server) => {
    const io = new socket_io_1.Server(server, {
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
            const encryptedMessage = (0, crypto_utils_1.encrypt)(message.content);
            const newMessage = await Message_1.default.create({
                chatId: message.chatId,
                senderId: message.senderId,
                receiverId: message.receiverId,
                content: encryptedMessage,
            });
            const chat = await new ChatRepositroy_1.ChatRepository().findById(message.chatId);
            chat?.messages.push(newMessage._id);
            chat?.save();
            io.to(message.chatId).emit("message", newMessage);
        });
    });
};
exports.socket = socket;
//# sourceMappingURL=socket.js.map