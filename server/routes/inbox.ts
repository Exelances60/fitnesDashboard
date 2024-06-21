import { Router } from "express";
import * as inboxController from "../controllers/inbox";
import { isAuth } from "../middleware/isAuth";
import multer from "multer";
import { fileFilter } from "../utils/MulterFileFilter";
const router = Router();

router.get("/get-inbox", isAuth, inboxController.getInbox);

export { router as inboxRoutes };
