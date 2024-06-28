"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("dotenv/config");
const express_1 = __importDefault(require("express"));
const DatabaseServices_1 = __importDefault(require("./services/DatabaseServices"));
const ExpressAppServices_1 = __importDefault(require("./services/ExpressAppServices"));
const path_1 = __importDefault(require("path"));
const config_1 = require("./config");
const socket_1 = require("./utils/socket");
const app = (0, express_1.default)();
app.use("/images", express_1.default.static(path_1.default.join(__dirname, "images")));
const StartServer = async () => {
    await (0, DatabaseServices_1.default)();
    await (0, ExpressAppServices_1.default)(app);
    app.use((error, req, res, next) => {
        let message = error.message;
        const status = error.statusCode || 500; // eğer status kodu yoksa 500 döndürür
        const data = error.data;
        if (error.message.includes("Cast to ObjectId failed")) {
            message = "Invalid id";
        }
        if (error.message.includes("jwt expired")) {
            message = "Token expired";
        }
        res.status(status).json({ errorMessage: message, data: data });
    });
    const server = app.listen(config_1.PORT, () => {
        console.log(`Server is running on port ${config_1.PORT}`);
    });
    (0, socket_1.socket)(server);
};
StartServer();
exports.default = app;
//# sourceMappingURL=app.js.map