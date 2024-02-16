const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const helmet = require("helmet");
const authRoutes = require("./routes/auth");
const dashboardRoutes = require("./routes/dashboard");
const productRoutes = require("./routes/product");
const orderRoutes = require("./routes/order");
const axios = require("axios");
const Exercises = require("./models/Exercise");
const fs = require("fs");
const customerRoutes = require("./routes/customer");
const exercisesRoutes = require("./routes/exercises");
const path = require("path");
const cors = require("cors");

require("dotenv").config();

const app = express();

const MONGODB_URI = `mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGO_PASSWORD}@cluster0.vs0ffby.mongodb.net/${process.env.MONGO_DEFAULT_DATABASE}`;

app.use(bodyParser.json());

app.use("/images", express.static(path.join(__dirname, "images")));

app.use(bodyParser.urlencoded({ extended: true }));

app.use(cors());

/* app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Methods",
    "OPTIONS, GET, POST, PUT, PATCH, DELETE"
  );
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
  next();
}); */

app.use(helmet());

app.use(async (req, res, next) => {
  const options = {
    method: "GET",
    url: "https://exercisedb.p.rapidapi.com/exercises",
    params: { limit: "1000" },
    headers: {
      "X-RapidAPI-Key": "a550badb16msha21c027e2067399p13ce05jsn541e4ed1688e",
      "X-RapidAPI-Host": "exercisedb.p.rapidapi.com",
    },
  };

  try {
    const { data } = await axios.request(options);

    data.forEach(async (exercise, index) => {
      axios
        .request(exercise.gifUrl, { responseType: "stream" })
        .then((response) => {
          response.data.pipe(fs.createWriteStream(`./images/${index}.gif`));
        });
      const exerciseModel = new Exercises({
        name: exercise.name,
        gifUrl: exercise.gifUrl,
        bodyPart: exercise.bodyPart,
        equipment: exercise.equipment,
        instructions: exercise.instructions,
        secondaryMuscles: exercise.secondaryMuscles,
      });
      await exerciseModel.save();
    });
  } catch (error) {
    console.error(error);
  }
});

app.use("/auth", authRoutes);
app.use("/dashboard", dashboardRoutes);
app.use("/products", productRoutes);
app.use("/orders", orderRoutes);
app.use("/customers", customerRoutes);
app.use("/exercises", exercisesRoutes);

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
