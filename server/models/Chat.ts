import { Schema, Types, model, Document } from "mongoose";

export interface IChat extends Document {
  _id: Types.ObjectId;
  participants: { participantId: Types.ObjectId; participantType: string }[];
  messages: Types.ObjectId[];
}

const chatSchema = new Schema<IChat>({
  participants: [
    {
      participantId: {
        type: Schema.Types.ObjectId,
        required: true,
        refPath: "participants.participantType",
      },
      participantType: {
        type: String,
        required: true,
        enum: ["Employee", "Owner"],
      },
    },
  ],
  messages: [
    {
      type: Schema.Types.ObjectId,
      ref: "Message",
      required: true,
    },
  ],
});

const Chat = model<IChat>("Chat", chatSchema);

export default Chat;
