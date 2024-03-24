"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("dotenv/config");
const express_1 = __importDefault(require("express"));
const body_parser_1 = __importDefault(require("body-parser"));
const mongoose_1 = __importDefault(require("mongoose"));
const path_1 = __importDefault(require("path"));
const cors_1 = __importDefault(require("cors"));
const helmet_1 = __importDefault(require("helmet"));
const auth_1 = __importDefault(require("./routes/auth"));
const dashboard_1 = __importDefault(require("./routes/dashboard"));
const product_1 = __importDefault(require("./routes/product"));
const order_1 = __importDefault(require("./routes/order"));
const customer_1 = __importDefault(require("./routes/customer"));
const exercises_1 = __importDefault(require("./routes/exercises"));
const calenderAct_1 = __importDefault(require("./routes/calenderAct"));
const employees_1 = __importDefault(require("./routes/employees"));
const app = (0, express_1.default)();
const MONGODB_URI = `mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGO_PASSWORD}@cluster0.vs0ffby.mongodb.net/${process.env.MONGO_DEFAULT_DATABASE}`;
app.use(body_parser_1.default.json());
app.use("/images", express_1.default.static(path_1.default.join(__dirname, "images")));
app.use(body_parser_1.default.urlencoded({ extended: true }));
app.use((0, cors_1.default)());
/* app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Methods",
    "OPTIONS, GET, POST, PUT, PATCH, DELETE"
  );
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
  next();
}); */
app.use((0, helmet_1.default)());
app.use("/auth", auth_1.default);
app.use("/dashboard", dashboard_1.default);
app.use("/products", product_1.default);
app.use("/orders", order_1.default);
app.use("/customers", customer_1.default);
app.use("/exercises", exercises_1.default);
app.use("/calendarAct", calenderAct_1.default);
app.use("/employees", employees_1.default);
app.use((error, req, res, next) => {
    console.log(error);
    const status = error.statusCode || 500; // eğer status kodu yoksa 500 döndürür
    const message = error.message;
    const data = error.data;
    res.status(status).json({ message: message, data: data });
});
mongoose_1.default
    .connect(MONGODB_URI)
    .then(() => {
    app.listen(process.env.PORT || 3000);
    console.log("Connected!");
})
    .catch(() => {
    console.log("Connection failed!");
});
//# sourceMappingURL=app.js.map