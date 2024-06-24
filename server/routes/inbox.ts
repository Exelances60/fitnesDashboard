import { Router } from "express";
import * as inboxController from "../controllers/inbox";
import { isAuth } from "../middleware/isAuth";
const router = Router();

router.get("/get-inbox", isAuth, inboxController.getInbox);

router.post("/create-chat", isAuth, inboxController.createChat);

router.post("/delete-message", isAuth, inboxController.deleteMessage);

export { router as inboxRoutes };
