"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.InboxServices = void 0;
const ChatRepositroy_1 = require("../repository/ChatRepositroy");
const Message_1 = require("../repository/Message");
const Chat_1 = __importDefault(require("../models/Chat"));
const crypto_utils_1 = require("../utils/crypto-utils");
class InboxServices {
    constructor() {
        this.chatRepository = new ChatRepositroy_1.ChatRepository();
        this.messageRepository = new Message_1.MessageRepository();
    }
    async getInbox(req) {
        try {
            const chats = await Chat_1.default.find({
                "participants.participantId": req.params.userId,
            })
                .slice("messages", -150)
                .populate("messages participants.participantId")
                .lean();
            return chats;
        }
        catch (error) {
            throw new Error(error);
        }
    }
    async createChat(req) {
        try {
            const { senderId, receiverId, role } = req.body;
            const alreadyChat = await Chat_1.default.find({
                $and: [
                    { "participants.participantId": senderId },
                    { "participants.participantId": receiverId },
                ] || [
                    { "participants.participantId": receiverId },
                    { "participants.participantId": senderId },
                ],
            })
                .slice("messages", -150)
                .populate("messages participants.participantId")
                .lean();
            if (alreadyChat.length > 0) {
                return alreadyChat[0];
            }
            if (role === "owner") {
                const chat = await Chat_1.default.create({
                    participants: [
                        { participantId: senderId, participantType: "Owner" },
                        { participantId: receiverId, participantType: "Employee" },
                    ],
                    messages: [],
                });
                const getChat = await Chat_1.default.findById(chat._id);
                return getChat;
            }
            else {
                const chat = await Chat_1.default.create({
                    participants: [
                        { participantId: senderId, participantType: "Employee" },
                        { participantId: receiverId, participantType: "Owner" },
                    ],
                    messages: [],
                });
                const getChat = await Chat_1.default.findById(chat._id);
                return getChat;
            }
        }
        catch (error) {
            throw new Error(error);
        }
    }
    async deleteMessage(req) {
        try {
            const { messageId } = req.body;
            const message = await this.messageRepository.findById(messageId);
            if (!message) {
                throw new Error("Message not found");
            }
            const deleteMessage = (0, crypto_utils_1.encrypt)("This message has been deleted");
            message.content = deleteMessage;
            const newMessage = this.messageRepository.update(messageId, message);
            return newMessage;
        }
        catch (error) {
            throw new Error(error);
        }
    }
    async getChat(req) {
        try {
            const chat = await Chat_1.default.findById(req.params.chatId)
                .populate("participants.participantId messages")
                .lean();
            return chat;
        }
        catch (error) {
            throw new Error(error);
        }
    }
}
exports.InboxServices = InboxServices;
//# sourceMappingURL=InboxServices.js.map