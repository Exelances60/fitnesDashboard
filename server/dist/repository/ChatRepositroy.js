"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ChatRepository = void 0;
const Repository_1 = __importDefault(require("./Repository"));
const Chat_1 = __importDefault(require("../models/Chat"));
class ChatRepository extends Repository_1.default {
    constructor() {
        super(Chat_1.default);
    }
}
exports.ChatRepository = ChatRepository;
//# sourceMappingURL=ChatRepositroy.js.map