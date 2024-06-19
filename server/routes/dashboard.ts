import { Router } from "express";
import * as dashboardController from "../controllers/dashboard";
import { isAuth } from "../middleware/isAuth";

const router = Router();

router.get("/", isAuth, dashboardController.getDashboard);

router.get("/charts/:chartType", isAuth, dashboardController.getCharts);

export { router as dashboardRoutes };
