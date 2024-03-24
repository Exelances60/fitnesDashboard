import { Router } from "express";
import { isAuth } from "../middleware/isAuth";
import * as calenderActController from "../controllers/calenderAct";

const router = Router();

router.delete("/delete-act/:actId", isAuth, calenderActController.deleteAct);

export default router;
