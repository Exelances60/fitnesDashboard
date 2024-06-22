import { Schema, Types, model } from "mongoose";

export interface IMessage extends Document {
  _id: Types.ObjectId;
  chatId: Types.ObjectId;
  senderId: Types.ObjectId;
  receiverId: Types.ObjectId;
  content: {
    iv: string;
    content: string;
  };
}

const messageSchema = new Schema<IMessage>({
  chatId: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: "Chat",
  },
  senderId: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: "User",
  },
  receiverId: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: "User",
  },
  content: {
    iv: {
      type: String,
      required: true,
    },
    content: {
      type: String,
      required: true,
    },
  },
});

const Message = model<IMessage>("Message", messageSchema);

export default Message;
