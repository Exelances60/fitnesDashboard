"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.OwnerRepository = void 0;
const Repository_1 = __importDefault(require("./Repository"));
const Owner_1 = __importDefault(require("../models/Owner"));
class OwnerRepository extends Repository_1.default {
    constructor() {
        super(Owner_1.default);
    }
}
exports.OwnerRepository = OwnerRepository;
//# sourceMappingURL=OwnerRepository.js.map