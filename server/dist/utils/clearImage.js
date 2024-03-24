"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
const clearImage = (filePath) => {
    filePath = path_1.default.join(__dirname, "..", filePath); // bu dosyanın içindeki dosyaya gitmek için
    fs_1.default.unlink(filePath, (err) => console.log(err));
};
exports.default = clearImage;
//# sourceMappingURL=clearImage.js.map