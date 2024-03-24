"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const ModelSchema = mongoose_1.Schema;
const exerciseSchema = new ModelSchema({
    bodyPart: {
        type: String,
        require: true,
    },
    equipment: {
        type: String,
        require: true,
    },
    gifUrl: {
        type: String,
        require: true,
    },
    name: {
        type: String,
        require: true,
    },
    secondaryMuscle: {
        type: Array.of(String),
        require: true,
    },
    instructions: {
        type: Array.of(String),
        require: true,
    },
});
const Exercise = (0, mongoose_1.model)("Exercise", exerciseSchema);
exports.default = Exercise;
//# sourceMappingURL=Exercise.js.map