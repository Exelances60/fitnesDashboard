const express = require("express");
const { body } = require("express-validator");
const dashboardController = require("../controllers/dashboard");
const isAuth = require("../middleware/isAuth");

const router = express.Router();

module.exports = router;
