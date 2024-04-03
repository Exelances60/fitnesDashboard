"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserRepository = void 0;
const Owner_1 = __importDefault(require("../models/Owner"));
const Repository_1 = __importDefault(require("./Repository"));
class UserRepository extends Repository_1.default {
    constructor() {
        super(Owner_1.default);
    }
}
exports.UserRepository = UserRepository;
//# sourceMappingURL=UserRepository.js.map