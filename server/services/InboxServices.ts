import { Request } from "express";
import { ChatRepository } from "../repository/ChatRepositroy";
import { MessageRepository } from "../repository/Message";
import Chat from "../models/Chat";

export class InboxServices {
  private chatRepository: ChatRepository;
  private messageRepository: MessageRepository;
  constructor() {
    this.chatRepository = new ChatRepository();
    this.messageRepository = new MessageRepository();
  }

  async getInbox(req: Request) {
    try {
    } catch (error) {}
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
      }).populate("messages");
      if (alreadyChat.length > 0) {
        return alreadyChat[0];
      }

      if (role === "owner") {
        const chat = await this.chatRepository.create({
          participants: [
            { participantId: senderId, participantType: "Owner" },
            { participantId: receiverId, participantType: "Employee" },
          ],
          messages: [],
        });
        return chat;
      } else {
        const chat = await this.chatRepository.create({
          participants: [
            { participantId: senderId, participantType: "Employee" },
            { participantId: receiverId, participantType: "Owner" },
          ],
          messages: [],
        });
        return chat;
      }
    } catch (error: any) {
      throw error;
    }
  }
}
