import { Router } from "express";
import { isAuth } from "../middleware/isAuth";
import * as exercisesController from "../controllers/exercises";

const router = Router();

router.get("/getExercises", isAuth, exercisesController.getExercises);

export default router;
