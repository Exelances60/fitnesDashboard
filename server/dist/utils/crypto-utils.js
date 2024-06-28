"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.decrypt = exports.encrypt = void 0;
const crypto_1 = __importDefault(require("crypto"));
require("dotenv/config");
const algorithm = "aes-256-ctr";
const secretKey = crypto_1.default
    .createHash("sha256")
    .update("deneme")
    .digest("base64")
    .slice(0, 32);
const encrypt = (text) => {
    const iv = crypto_1.default.randomBytes(16);
    const cipher = crypto_1.default.createCipheriv(algorithm, secretKey, iv);
    const encrypted = Buffer.concat([cipher.update(text), cipher.final()]);
    return {
        iv: iv.toString("hex"),
        content: encrypted.toString("hex"),
    };
};
exports.encrypt = encrypt;
const decrypt = (hash) => {
    const decipher = crypto_1.default.createDecipheriv(algorithm, secretKey, Buffer.from(hash.iv, "hex"));
    const decrypted = Buffer.concat([
        decipher.update(Buffer.from(hash.content, "hex")),
        decipher.final(),
    ]);
    return decrypted.toString();
};
exports.decrypt = decrypt;
//# sourceMappingURL=crypto-utils.js.map