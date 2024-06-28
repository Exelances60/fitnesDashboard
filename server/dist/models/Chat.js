"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const chatSchema = new mongoose_1.Schema({
    participants: [
        {
            participantId: {
                type: mongoose_1.Schema.Types.ObjectId,
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
            type: mongoose_1.Schema.Types.ObjectId,
            ref: "Message",
            required: true,
        },
    ],
});
const Chat = (0, mongoose_1.model)("Chat", chatSchema);
exports.default = Chat;
//# sourceMappingURL=Chat.js.map