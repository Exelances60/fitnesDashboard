"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const body_parser_1 = __importDefault(require("body-parser"));
const cors_1 = __importDefault(require("cors"));
const helmet_1 = __importDefault(require("helmet"));
const routes_1 = require("../routes");
exports.default = async (app) => {
    app.use(body_parser_1.default.json());
    app.use(body_parser_1.default.urlencoded({ extended: true }));
    const corsOptions = {
        origin: "http://localhost:3000" || "http://localhost:3000",
        methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
        preflightContinue: false,
        optionsSuccessStatus: 204,
    };
    app.use((0, cors_1.default)(corsOptions));
    app.use((0, helmet_1.default)());
    app.use("/auth", routes_1.authRoutes);
    app.use("/dashboard", routes_1.dashboardRoutes);
    app.use("/products", routes_1.productRoutes);
    app.use("/orders", routes_1.orderRoutes);
    app.use("/customers", routes_1.customerRoutes);
    app.use("/exercises", routes_1.exercisesRoutes);
    app.use("/calendarAct", routes_1.calendarActRoutes);
    app.use("/employees", routes_1.employeeRoutes);
    app.use("/inbox", routes_1.inboxRoutes);
    return app;
};
//# sourceMappingURL=ExpressAppServices.js.map