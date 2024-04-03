"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ExerciseRepository = void 0;
const Repository_1 = __importDefault(require("./Repository"));
const Exercise_1 = __importDefault(require("../models/Exercise"));
class ExerciseRepository extends Repository_1.default {
    constructor() {
        super(Exercise_1.default);
    }
}
exports.ExerciseRepository = ExerciseRepository;
//# sourceMappingURL=ExersiceRepository.js.map