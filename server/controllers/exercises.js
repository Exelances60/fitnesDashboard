const Exercises = require("../models/Exercise");

exports.getExercises = async (req, res, next) => {
  const { page, search } = req.query;

  const pageSize = req.query.pageSize ? parseInt(req.query.pageSize) : 20;
  const currentPage = page ? parseInt(page) : 1;

  try {
    let exercises;
    let totalExercisesCount;

    if (search) {
      exercises = await Exercises.find({
        name: { $regex: search, $options: "i" },
      });
      totalExercisesCount = exercises.length;
    } else {
      totalExercisesCount = await Exercises.countDocuments();
      exercises = await Exercises.find()
        .skip((currentPage - 1) * pageSize)
        .limit(pageSize);
    }

    res.status(200).json({
      exercises,
      totalExercisesCount,
      currentPage,
      pageSize,
    });
  } catch (err) {
    res.status(500).json({ message: "Server Error" });
  }
};
