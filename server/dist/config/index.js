"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PORT = exports.JWT_SECRET = exports.MONGODB_URI = void 0;
require("dotenv/config");
exports.MONGODB_URI = `mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGO_PASSWORD}@cluster0.vs0ffby.mongodb.net/${process.env.MONGO_DEFAULT_DATABASE}`;
exports.JWT_SECRET = process.env.JWT_SECRET;
exports.PORT = process.env.PORT || 3000;
//# sourceMappingURL=index.js.map