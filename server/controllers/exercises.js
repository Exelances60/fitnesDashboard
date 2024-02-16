const Exercises = require("../models/Exercise");
exports.getExercises = (req, res, next) => {
  Exercises.find()
    .then((exercises) => {
      res.status(200).json({
        message: "Exercises fetched successfully!",
        exercises: exercises,
      });
    })
    .catch((error) => {
      next(error);
    });
};
