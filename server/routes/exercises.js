const express = require("express");
const router = express.Router();
const isAuth = require("../middleware/isAuth");
const exercisesController = require("../controllers/exercises");

router.get("/getExercises", isAuth, exercisesController.getExercises);

module.exports = router;
