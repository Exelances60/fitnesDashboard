"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CalendarActRepository = void 0;
const CalenderAcv_1 = __importDefault(require("../models/CalenderAcv"));
const Repository_1 = __importDefault(require("./Repository"));
class CalendarActRepository extends Repository_1.default {
    constructor() {
        super(CalenderAcv_1.default);
    }
}
exports.CalendarActRepository = CalendarActRepository;
//# sourceMappingURL=CalendarActRepository.js.map