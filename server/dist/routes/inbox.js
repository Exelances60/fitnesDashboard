"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.inboxRoutes = void 0;
const express_1 = require("express");
const inboxController = __importStar(require("../controllers/inbox"));
const isAuth_1 = require("../middleware/isAuth");
const router = (0, express_1.Router)();
exports.inboxRoutes = router;
router.get("/get-inbox/:userId", isAuth_1.isAuth, inboxController.getInbox);
router.post("/create-chat", isAuth_1.isAuth, inboxController.createChat);
router.post("/delete-message", isAuth_1.isAuth, inboxController.deleteMessage);
router.get("/get-chat/:chatId", isAuth_1.isAuth, inboxController.getChat);
//# sourceMappingURL=inbox.js.map