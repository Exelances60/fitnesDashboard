"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getChat = exports.deleteMessage = exports.createChat = exports.getInbox = void 0;
const InboxServices_1 = require("../services/InboxServices");
const getInbox = async (req, res, next) => {
    try {
        const inbox = await new InboxServices_1.InboxServices().getInbox(req);
        res.status(200).json({
            message: "Inbox fetched successfully",
            inbox,
        });
    }
    catch (error) {
        if (!error.statusCode) {
            error.statusCode = 500;
        }
        next(error);
    }
};
exports.getInbox = getInbox;
const createChat = async (req, res, next) => {
    try {
        const chat = await new InboxServices_1.InboxServices().createChat(req);
        res.status(201).json({
            message: "Chat created successfully",
            chat,
        });
    }
    catch (error) {
        if (!error.statusCode) {
            error.statusCode = 500;
        }
        next(error);
    }
};
exports.createChat = createChat;
const deleteMessage = async (req, res, next) => {
    try {
        const data = await new InboxServices_1.InboxServices().deleteMessage(req);
        res.status(200).json({
            message: "Message deleted successfully",
            data,
        });
    }
    catch (error) {
        if (!error.statusCode) {
            error.statusCode = 500;
        }
        next(error);
    }
};
exports.deleteMessage = deleteMessage;
const getChat = async (req, res, next) => {
    try {
        const chat = await new InboxServices_1.InboxServices().getChat(req);
        res.status(200).json({
            message: "Chat fetched successfully",
            chat,
        });
    }
    catch (error) {
        if (!error.statusCode) {
            error.statusCode = 500;
        }
        next(error);
    }
};
exports.getChat = getChat;
//# sourceMappingURL=inbox.js.map