"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("dotenv/config");
const express_1 = __importDefault(require("express"));
const DatabaseServices_1 = __importDefault(require("./services/DatabaseServices"));
const ExpressAppServices_1 = __importDefault(require("./services/ExpressAppServices"));
const config_1 = require("./config");
const StartServer = async () => {
    const app = (0, express_1.default)();
    /* app.use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader(
      "Access-Control-Allow-Methods",
      "OPTIONS, GET, POST, PUT, PATCH, DELETE"
    );
    res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
    next();
  }); */
    await (0, DatabaseServices_1.default)();
    await (0, ExpressAppServices_1.default)(app);
    app.use((error, req, res, next) => {
        const status = error.statusCode || 500; // eğer status kodu yoksa 500 döndürür
        const message = error.message;
        const data = error.data;
        res.status(status).json({ message: message, data: data });
    });
    app.listen(config_1.PORT, () => {
        console.log(`Server is running on port ${config_1.PORT}`);
    });
};
StartServer();
//# sourceMappingURL=app.js.map