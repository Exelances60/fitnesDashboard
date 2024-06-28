"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MessageRepository = void 0;
const Repository_1 = __importDefault(require("./Repository"));
const Message_1 = __importDefault(require("../models/Message"));
class MessageRepository extends Repository_1.default {
    constructor() {
        super(Message_1.default);
    }
}
exports.MessageRepository = MessageRepository;
//# sourceMappingURL=Message.js.map