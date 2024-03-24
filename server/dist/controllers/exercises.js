"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getExercises = void 0;
const Exercise_1 = __importDefault(require("../models/Exercise"));
const getExercises = async (req, res, next) => {
    const { page, search } = req.query;
    const pageSize = req.query.pageSize ? +req.query.pageSize : 20;
    const currentPage = page ? +page : 1;
    try {
        let exercises;
        let totalExercisesCount;
        if (search) {
            exercises = await Exercise_1.default.find({
                name: { $regex: search, $options: "i" },
            });
            totalExercisesCount = exercises.length;
        }
        else {
            totalExercisesCount = await Exercise_1.default.countDocuments();
            exercises = await Exercise_1.default.find()
                .skip((currentPage - 1) * pageSize)
                .limit(pageSize);
        }
        res.status(200).json({
            exercises,
            totalExercisesCount,
            currentPage,
            pageSize,
        });
    }
    catch (err) {
        res.status(500).json({ message: "Server Error" });
    }
};
exports.getExercises = getExercises;
//# sourceMappingURL=exercises.js.map