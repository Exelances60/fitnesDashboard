import { Request } from "express";
import { ChatRepository } from "../repository/ChatRepositroy";
import { MessageRepository } from "../repository/Message";
import Chat, { IChat } from "../models/Chat";
import { IMessage } from "../models/Message";
import { encrypt } from "../utils/crypto-utils";

export class InboxServices {
  private chatRepository: ChatRepository;
  private messageRepository: MessageRepository;
  constructor() {
    this.chatRepository = new ChatRepository();
    this.messageRepository = new MessageRepository();
  }

  async getInbox(req: Request) {
    try {
      const chats = await Chat.find({
        "participants.participantId": req.params.userId,
      })
        .slice("messages", -150)
        .populate("messages participants.participantId")
        .lean();
      return chats;
    } catch (error: any) {
      throw new Error(error);
    }
  }

  async createChat(req: Request) {
    try {
      const { senderId, receiverId, role } = req.body;
      const alreadyChat: any = await Chat.find({
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
        const chat = await Chat.create({
          participants: [
            { participantId: senderId, participantType: "Owner" },
            { participantId: receiverId, participantType: "Employee" },
          ],
          messages: [],
        });
        const getChat = await Chat.findById(chat._id)
          .populate("messages participants.participantId")
          .lean();

        return getChat;
      } else {
        const chat = await Chat.create({
          participants: [
            { participantId: senderId, participantType: "Employee" },
            { participantId: receiverId, participantType: "Owner" },
          ],
          messages: [],
        });
        const getChat = await Chat.findById(chat._id)
          .populate("messages participants.participantId")
          .lean();
        return getChat;
      }
    } catch (error: any) {
      throw new Error(error);
    }
  }

  async deleteMessage(req: Request) {
    try {
      const { messageId } = req.body;
      const message = await this.messageRepository.findById<IMessage>(
        messageId
      );
      if (!message) {
        throw new Error("Message not found");
      }
      const deleteMessage = encrypt("This message has been deleted");
      message.content = deleteMessage;
      const newMessage = this.messageRepository.update(messageId, message);
      return newMessage;
    } catch (error: any) {
      throw new Error(error);
    }
  }
}
