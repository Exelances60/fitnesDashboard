const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const helmet = require("helmet");
const authRoutes = require("./routes/auth");
const dashboardRoutes = require("./routes/dashboard");
const productRoutes = require("./routes/product");
require("dotenv").config();

const app = express();
const MONGODB_URI = `mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGO_PASSWORD}@cluster0.vs0ffby.mongodb.net/${process.env.MONGO_DEFAULT_DATABASE}`;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true })); // x-www-form-urlencoded <form>
app.use(helmet());
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Methods",
    "OPTIONS, GET, POST, PUT, PATCH, DELETE"
  );
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
  next();
});

app.use("/auth", authRoutes);
app.use("/dashboard", dashboardRoutes);
app.use("/products", productRoutes);

app.use((error, req, res, next) => {
  console.log(error);
  const status = error.statusCode || 500; // eğer status kodu yoksa 500 döndürür
  const message = error.message;
  const data = error.data;
  res.status(status).json({ message: message, data: data });
});

mongoose
  .connect(MONGODB_URI)
  .then(() => {
    app.listen(process.env.PORT || 3000);
  })
  .catch(() => {
    console.log("Connection failed!");
  });
