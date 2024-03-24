"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const calenderAcvSchema = new mongoose_1.Schema({
    date: {
        type: Date,
        require: true,
    },
    text: {
        type: String,
        require: true,
    },
    type: {
        type: String,
        require: true,
    },
    color: {
        type: String,
        require: true,
    },
    customerId: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: "Customer",
        require: true,
    },
});
const CalenderAcv = (0, mongoose_1.model)("CalenderAcv", calenderAcvSchema);
exports.default = CalenderAcv;
//# sourceMappingURL=CalenderAcv.js.map