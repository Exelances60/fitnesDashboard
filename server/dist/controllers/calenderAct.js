"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteAct = void 0;
const CalenderAcv_1 = __importDefault(require("../models/CalenderAcv"));
const Customer_1 = __importDefault(require("../models/Customer"));
const throwBadRequestError_1 = __importDefault(require("../utils/err/throwBadRequestError"));
const deleteAct = async (req, res, next) => {
    const actId = req.params.actId;
    try {
        const act = await CalenderAcv_1.default.findById(actId);
        if (!act) {
            const error = new Error("Could not find act.");
            error.statusCode = 404;
            throw error;
        }
        await CalenderAcv_1.default.findByIdAndDelete(actId);
        const fetchedUser = await Customer_1.default.findById(act.customerId);
        if (!fetchedUser) {
            return (0, throwBadRequestError_1.default)("Could not find user");
        }
        fetchedUser.calendarAcv.filter((act) => act.toString() !== actId);
        await fetchedUser.save();
        res.status(200).json({ message: "Deleted act.", status: 200 });
    }
    catch (err) {
        if (!err.statusCode) {
            err.statusCode = 500;
        }
        next(err);
    }
};
exports.deleteAct = deleteAct;
//# sourceMappingURL=calenderAct.js.map