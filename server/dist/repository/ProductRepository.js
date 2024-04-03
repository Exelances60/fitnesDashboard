"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductRepository = void 0;
const Product_1 = __importDefault(require("../models/Product"));
const Repository_1 = __importDefault(require("./Repository"));
class ProductRepository extends Repository_1.default {
    constructor() {
        super(Product_1.default);
    }
}
exports.ProductRepository = ProductRepository;
//# sourceMappingURL=ProductRepository.js.map