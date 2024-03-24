import { Router } from "express";
import { body } from "express-validator";
/* import * as dashboardController from "../controllers/dashboard"; */
import { isAuth } from "../middleware/isAuth";

const router = Router();

export { router as dashboardRoutes };
