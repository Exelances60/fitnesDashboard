"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PeddingAccountRepository = void 0;
const PendingAccounts_1 = __importDefault(require("../models/PendingAccounts"));
const Repository_1 = __importDefault(require("./Repository"));
class PeddingAccountRepository extends Repository_1.default {
    constructor() {
        super(PendingAccounts_1.default);
    }
}
exports.PeddingAccountRepository = PeddingAccountRepository;
//# sourceMappingURL=PeddingAccountRepository.js.map